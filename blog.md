# Blog dynamique

Date de mise a jour: 18 juin 2026

Le blog du portfolio est maintenant une V1 dynamique basee sur Next.js App Router, Prisma/PostgreSQL, Auth.js, Cloudinary et `@pubwave/editor`.

## Fonctionnalites livrees

- Page publique `/blog` dynamique avec articles publies, recherche, filtre par tag, article vedette et pagination.
- Page publique `/blog/[slug]` avec rendu Markdown securise, metadata dynamique, Open Graph/Twitter card, JSON-LD `BlogPosting`, CTA contact/partage et articles similaires.
- Admin securise `/admin/blog`, `/admin/blog/new`, `/admin/blog/[id]/edit`.
- Workflow admin: brouillon, publication, depublication, archivage.
- Upload d'images admin via `POST /api/upload` vers Cloudinary.
- Editeur Notion-like via `@pubwave/editor`, avec conversion vers Markdown stocke en base.
- Sitemap dynamique incluant les articles publies.
- Seed Prisma pour categories, tags et article demo si un admin existe.

## Variables d'environnement

Le blog utilise les variables deja presentes:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."
ADMIN_EMAILS="admin@example.com,theodorebinda@gmail.com"
```

Ajouter aussi pour l'upload Cloudinary:

```env
CLOUDINARY_CLOUD_NAME="cloud-name"
CLOUDINARY_API_KEY="api-key"
CLOUDINARY_API_SECRET="api-secret"
```

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` peut servir de fallback pour le nom du cloud, mais l'upload signe necessite toujours `CLOUDINARY_API_SECRET`.

## Schema Prisma

Modeles ajoutes:

- `BlogPost`
- `BlogCategory`
- `BlogTag`
- `BlogPostTag`
- enum `BlogPostStatus`: `DRAFT`, `IN_REVIEW`, `PUBLISHED`, `ARCHIVED`

Relation inverse ajoutee sur `User`:

```prisma
blogPosts BlogPost[] @relation("BlogPostAuthor")
```

Les commentaires ne font pas partie de la V1.

## Routes publiques

- `GET /blog`
  - Affiche uniquement les articles `PUBLISHED`.
  - Parametres supportes: `q`, `tag`, `page`.
  - Les cartes pointent vers `/blog/[slug]`.

- `GET /blog/[slug]`
  - Affiche uniquement un article `PUBLISHED`.
  - Retourne `404` si l'article est introuvable, brouillon, archive ou depublie.
  - Rend `content` avec `react-markdown`, `remark-gfm` et `rehype-sanitize`.

## Routes admin

- `/admin/blog`: liste tous les articles, avec filtres par statut.
- `/admin/blog/new`: creation d'un brouillon.
- `/admin/blog/[id]/edit`: edition d'un article.

Ces pages appellent `auth()` cote serveur et redirigent les non-admins vers `/`.

## API

Toutes les routes admin verifient `session.user.role === "ADMIN"`.

- `POST /api/admin/blog/posts`
  - Cree un article en `DRAFT`.
  - Genere un slug unique si besoin.
  - Upsert les tags libres.

- `PATCH /api/admin/blog/posts/[id]`
  - Met a jour partiellement un article.
  - Gere les conflits de slug avec suffixe numerique.
  - Resynchronise les tags si `tagNames` est fourni.

- `DELETE /api/admin/blog/posts/[id]`
  - Archive l'article via `status = ARCHIVED`.

- `POST /api/admin/blog/posts/[id]/publish`
  - Publie l'article si titre, slug, extrait, contenu et auteur sont presents.
  - Definit `status = PUBLISHED` et `publishedAt`.

- `POST /api/admin/blog/posts/[id]/unpublish`
  - Repasse l'article en `DRAFT`.
  - Remet `publishedAt` a `null`.

- `POST /api/upload`
  - Recoit un `FormData` avec le champ `image`.
  - Accepte `jpeg`, `png`, `webp`, `avif`.
  - Limite: 5 MB.
  - Retourne `{ secureUrl, url, publicId, width, height }`.

## Commandes migration et seed

Installer les dependances si necessaire:

```bash
npm install @pubwave/editor chart.js zod react-markdown remark-gfm rehype-sanitize
npm install -D tsx
```

Appliquer les migrations:

```bash
npx prisma migrate deploy
```

En developpement local avec base locale:

```bash
npx prisma migrate dev
```

Executer le seed:

```bash
npx prisma db seed
```

Le seed cree les categories/tags de base. L'article demo est cree seulement si un utilisateur dont l'email est dans `ADMIN_EMAILS` existe deja en base.

## Tests rapides

- `npm run build`
- `npx prisma migrate status`
- `npx prisma db seed`
- Verifier `/blog`.
- Verifier `/blog/[slug]` pour un article publie.
- Verifier qu'un article brouillon ou archive n'est pas visible publiquement.
- Se connecter avec LinkedIn comme admin.
- Creer un article depuis `/admin/blog/new`.
- Uploader une image de couverture.
- Publier, depublier puis archiver depuis `/admin/blog`.
- Verifier que `/sitemap.xml` contient les articles publies.

## Notes techniques

- Les pages blog publiques sont marquees `force-dynamic` pour eviter que le build depende de la disponibilite de la base distante.
- Le contenu est stocke en Markdown dans `BlogPost.content`.
- `@pubwave/editor` travaille en JSON Tiptap; le wrapper `src/components/Editor.tsx` convertit ce JSON en Markdown pour respecter le contrat de stockage.
- Le rendu public du Markdown est sanitize avec `rehype-sanitize`.
- Les images Markdown integrees par l'editeur utilisent l'API `/api/upload`.
