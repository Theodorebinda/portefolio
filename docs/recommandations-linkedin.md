# Recommandations LinkedIn

Cette fonctionnalite permet aux visiteurs connectes avec LinkedIn d'ajouter une recommandation publique pour Theodore. Les recommandations sont stockees en PostgreSQL avec Prisma, puis visibles apres moderation admin.

## Variables d'environnement

Ajouter ces variables dans l'environnement local et sur l'hebergeur:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
AUTH_SECRET="random-secret"
AUTH_LINKEDIN_ID="linkedin-client-id"
AUTH_LINKEDIN_SECRET="linkedin-client-secret"
ADMIN_EMAILS="admin@example.com,contact@theodorebinda.me"
```

`ADMIN_EMAILS` est une liste separee par des virgules. Un utilisateur connecte avec un email present dans cette liste obtient le role `ADMIN` dans sa session.

## Configuration LinkedIn

Dans le portail LinkedIn Developer:

- Activer le produit `Sign in with LinkedIn using OpenID Connect`.
- Configurer le callback OAuth:

```txt
https://votre-domaine.com/api/auth/callback/linkedin
```

En local:

```txt
http://localhost:3000/api/auth/callback/linkedin
```

Le provider Auth.js demande les scopes:

```txt
openid profile email
```

## Base de donnees

Le schema Prisma ajoute les modeles Auth.js (`User`, `Account`, `Session`, `VerificationToken`) et `Recommendation`.

Commandes utiles:

```bash
npx prisma generate
npx prisma migrate dev --name add_linkedin_recommendations
```

En production:

```bash
npx prisma migrate deploy
```

## Headline LinkedIn

LinkedIn OIDC fournit le profil de base via Auth.js. Apres connexion, l'application tente aussi un appel serveur non bloquant:

```txt
GET https://api.linkedin.com/v2/me
```

avec `account.access_token`, pour lire `localizedHeadline`.

Si LinkedIn retourne `403`, si le champ est absent, ou si l'appel echoue, la connexion continue normalement. Le formulaire affiche alors un champ `Titre professionnel` que l'utilisateur peut remplir ou modifier.

Les tokens LinkedIn ne sont pas stockes durablement: l'adapter Prisma est enveloppe pour enregistrer uniquement les champs de liaison de compte necessaires (`provider`, `providerAccountId`, `type`, `userId`).

## Workflow utilisateur

1. Le visiteur clique sur `Dites quelque chose sur Theodore`.
2. S'il n'est pas connecte, il est redirige vers LinkedIn.
3. Apres connexion, il revient sur `/?recommendation=1`.
4. La modale s'ouvre avec ses informations LinkedIn.
5. Il saisit une recommandation de 50 a 500 caracteres, une note optionnelle, et accepte le consentement public + stockage, coche par defaut.
6. La recommandation est creee avec le statut `PENDING`.
7. Le message de succes annonce que la recommandation sera visible apres moderation.

## Moderation

La page admin est:

```txt
/admin/recommandations
```

Elle affiche les recommandations `PENDING`. Les admins peuvent approuver ou rejeter. Seules les recommandations `APPROVED` avec les deux consentements sont affichees publiquement.

## Affichage public

La page publique est:

```txt
/recommandations
```

Elle affiche les recommandations approuvees avec pagination de 6 elements par page: avatar, nom, titre professionnel, date, message et note.

## API

- `GET /api/recommendations?page=1`: liste publique paginee.
- `POST /api/recommendations`: creation protegee par session.
- `PATCH /api/admin/recommendations/:id`: moderation admin, avec `APPROVED` ou `REJECTED`.

## Tests

Verifier:

- `npm run build`.
- Connexion LinkedIn et retour sur `/?recommendation=1`.
- Le fallback du headline si `/v2/me` echoue.
- Rejet des messages hors plage 50-500 caracteres.
- Rejet si le consentement est decoche.
- Creation en `PENDING`.
- Affichage public uniquement apres approbation.
- Refus de `/admin/recommandations` et `/api/admin/*` pour un non-admin.
