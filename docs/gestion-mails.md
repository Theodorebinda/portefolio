# Gestion des mails

Ce document decrit l'etat actuel de l'envoi de mails dans le portfolio et propose une trajectoire pour rendre cette logique reutilisable dans plusieurs fonctionnalites.

## Etat actuel

L'envoi de mail est aujourd'hui gere uniquement par le formulaire de contact:

- Composant: `src/components/contactForm.tsx`
- Fournisseur utilise: `@emailjs/browser`
- Execution: cote client, directement depuis le navigateur
- Champs envoyes: `name`, `email`, `message`
- Validation locale: champs requis + format email simple
- Retour utilisateur: popup de succes apres envoi
- Gestion d'erreur: `console.error`, sans message visible pour l'utilisateur

Le projet contient aussi `resend` dans les dependances, mais il n'est pas encore utilise dans le code applicatif.

## Limites actuelles

- Les identifiants EmailJS de service/template/public key sont exposes cote client.
- La logique d'envoi est liee au composant du formulaire de contact.
- Il n'existe pas de service mail centralise utilisable par les routes API, les actions serveur ou les composants.
- Aucun historique d'envoi n'est conserve.
- Aucun systeme de retry n'existe si le fournisseur echoue.
- Les erreurs ne sont pas normalisees.
- Les templates ne sont pas versionnes dans le code.
- Il n'y a pas de distinction claire entre mails transactionnels, notifications admin et reponses utilisateur.

## Objectif

Mettre en place une couche mail partagee, capable de servir les besoins actuels et futurs:

- Formulaire de contact.
- Notification admin quand un visiteur envoie un message.
- Accuse de reception automatique au visiteur.
- Notification admin quand une recommandation LinkedIn est creee.
- Notification utilisateur quand une recommandation est approuvee ou rejetee.
- Notification liee aux articles de blog, par exemple publication ou brouillon a relire.
- Messages lies a la page `hire`, par exemple demande de collaboration.
- Futurs mails d'administration ou de suivi analytique.

## Architecture cible

Centraliser l'envoi dans un module serveur:

```txt
src/lib/mail/
  index.ts
  types.ts
  provider.ts
  templates/
    contact-admin.ts
    contact-user.ts
    recommendation-created-admin.ts
    recommendation-status-user.ts
```

Responsabilites proposees:

- `types.ts`: definir les types de mails supportes et leurs payloads.
- `provider.ts`: encapsuler le fournisseur externe, par exemple Resend.
- `templates/`: construire les sujets, textes et HTML des mails.
- `index.ts`: exposer une fonction publique comme `sendMail()`.

Exemple d'interface cible:

```ts
await sendMail({
  type: "contact.admin",
  to: adminEmails,
  payload: {
    name,
    email,
    message,
  },
});
```

## Fournisseur recommande

Pour les prochaines evolutions, privilegier un fournisseur serveur comme Resend, deja present dans les dependances.

Avantages:

- La cle API reste cote serveur.
- Les templates peuvent etre versionnes.
- La meme couche peut etre appelee depuis les routes API et les actions serveur.
- Le `replyTo` peut etre configure proprement avec l'email du visiteur.
- Les erreurs peuvent etre remontees et journalisees de facon uniforme.

EmailJS peut rester temporairement pour le formulaire existant, mais il devrait etre remplace progressivement par une route serveur.

## Variables d'environnement cible

Ne pas stocker de secrets dans le code. Prevoir des variables comme:

```env
RESEND_API_KEY="..."
MAIL_FROM="Portfolio Theodore <noreply@theodorebinda.me>"
MAIL_REPLY_TO="contact@theodorebinda.me"
MAIL_ADMIN_RECIPIENTS="contact@theodorebinda.me"
MAIL_ENABLED="true"
```

Notes:

- `MAIL_ADMIN_RECIPIENTS` peut contenir plusieurs emails separes par des virgules.
- `MAIL_ENABLED=false` peut servir en local ou en preview pour eviter les vrais envois.
- Les environnements de production et de preview doivent avoir des valeurs separees.

## Flux recommande pour le contact

1. Le visiteur remplit le formulaire.
2. Le client valide les champs pour un retour rapide.
3. Le client appelle une route serveur, par exemple `POST /api/contact`.
4. La route serveur valide les donnees avec un schema partage, idealement `zod`.
5. La route appelle `sendMail()` deux fois:
   - mail admin avec le message complet;
   - accuse de reception pour le visiteur.
6. La route retourne une reponse claire au client.
7. Le composant affiche un succes ou une erreur lisible.

## Matrice des mails

| Evenement | Destinataire | Priorite | Statut |
| --- | --- | --- | --- |
| Nouveau message contact | Admin | Haute | A faire |
| Accuse de reception contact | Visiteur | Moyenne | A faire |
| Nouvelle recommandation LinkedIn | Admin | Haute | A faire |
| Recommandation approuvee | Visiteur | Moyenne | A faire |
| Recommandation rejetee | Visiteur | Basse | Optionnel |
| Article de blog publie | Admin ou abonne futur | Basse | Futur |
| Demande depuis la page hire | Admin | Haute | Futur |

## Gestion des erreurs

La couche mail doit retourner un resultat normalise:

```ts
type MailResult =
  | { ok: true; providerId?: string }
  | { ok: false; code: string; message: string };
```

Comportements recommandes:

- Ne jamais exposer l'erreur brute du fournisseur a l'utilisateur.
- Logger les erreurs serveur avec assez de contexte: type de mail, destinataire, provider id si disponible.
- Permettre au formulaire de dire simplement: "Le message n'a pas pu etre envoye. Reessayez plus tard."
- Ne pas bloquer une action principale non critique si un mail secondaire echoue.

## Templates

Chaque template devrait definir:

- `subject`
- `text`
- `html`
- `replyTo` si necessaire

Les templates doivent rester simples au depart. Le texte brut est important pour la delivrabilite et les clients mail qui bloquent le HTML.

## Securite et anti-abus

Avant d'ouvrir une route publique d'envoi:

- Valider les champs cote serveur.
- Limiter la taille du message.
- Ajouter un rate limit par IP ou par session.
- Ajouter un honeypot invisible si le spam augmente.
- Ne jamais autoriser le client a choisir librement le `to`.
- Utiliser une allowlist des destinataires admin.

## Migration progressive

1. Documenter l'existant et choisir la structure cible.
2. Creer `src/lib/mail` avec un provider serveur Resend.
3. Creer une route `POST /api/contact`.
4. Brancher le formulaire de contact sur cette route.
5. Supprimer l'appel direct a EmailJS cote client.
6. Ajouter les mails pour les recommandations LinkedIn.
7. Ajouter les mails pour les futurs besoins blog/hire/admin.
8. Retirer les dependances EmailJS si elles ne sont plus utilisees.

## Points a verifier avant production

- Domaine d'envoi verifie chez le fournisseur mail.
- SPF, DKIM et DMARC configures sur le domaine.
- Adresse `MAIL_FROM` valide et stable.
- Adresse `replyTo` correctement configuree.
- Tests manuels sur production ou preview.
- Comportement clair quand `MAIL_ENABLED=false`.
- Aucun secret expose dans le bundle client.

