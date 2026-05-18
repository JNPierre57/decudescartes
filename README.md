# Déçu des Cartes — Site vitrine Astro

## 1) Architecture du projet

```txt
.
├─ public/
│  ├─ images/                 # Fallbacks d'images (hero, sections, shorts)
│  └─ videos/                 # Vidéos MP4 compressées en background
├─ src/
│  ├─ layouts/
│  │  └─ MainLayout.astro     # Squelette HTML global
│  ├─ lib/
│  │  └─ youtube.ts           # Récupération auto des 3 derniers shorts
│  ├─ pages/
│  │  └─ index.astro          # Page principale cinématique
│  └─ styles.css              # Styles globaux Tailwind + utilitaires
├─ .env.example               # Variables d'environnement
├─ astro.config.mjs
├─ tailwind.config.mjs
└─ package.json
```

## 2) Installation Node.js

- Recommandé: Node.js **20 LTS**.
- Vérification:

```bash
node -v
npm -v
```

## 3) Installation et lancement

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:4321`.

## 4) Où placer les vidéos

Placez vos fichiers ici:

- `public/videos/hero-hyperspace.mp4`
- `public/videos/identity-flight.mp4`
- `public/videos/elite-combat.mp4`

Conseils encodage:
- MP4 (H.264), 1080p max
- bitrate modéré (4 à 8 Mbps)
- piste audio supprimée

## 5) Où placer les images fallback

- `public/images/hero-fallback.jpg`
- `public/images/identity-fallback.jpg`
- `public/images/elite-fallback.jpg`
- `public/images/short-placeholder.jpg`

## 6) Personnaliser textes et liens

Tout est centralisé dans `src/pages/index.astro`.

- Hero: titre/sous-titre/bouton
- Statut live: variable `liveNow`
- Réseaux sociaux footer: remplacez les `href="#"`

## 7) Variables d'environnement

Copiez:

```bash
cp .env.example .env
```

Puis remplissez:
- `YOUTUBE_API_KEY`
- `YOUTUBE_CHANNEL_ID`

## 8) Créer une clé YouTube Data API

1. Ouvrir Google Cloud Console.
2. Créer (ou choisir) un projet.
3. Activer **YouTube Data API v3**.
4. Aller dans **Identifiants** > **Créer une clé API**.
5. Restreindre la clé (quota + referrers/IP selon usage).

## 9) Récupération automatique des 3 derniers Shorts

La logique est dans `src/lib/youtube.ts`.

- Appel API côté build Astro.
- Prend les vidéos récentes de la chaîne.
- Limite à 3 éléments.
- Si erreur API: placeholders automatiques (layout intact).

## 10) Build statique final

```bash
npm run build
```

Résultat dans `dist/` (compatible FTP / upload manuel).

## 11) Tester le build

```bash
npm run preview
```

## 12) Déploiement OVHcloud Web Hosting (FTP)

1. Générer `dist/`.
2. Ouvrir FileZilla.
3. Se connecter en FTP/SFTP OVH.
4. Uploader le contenu de `dist/` dans `www/`.
5. Vérifier le domaine pointe vers l'hébergement OVH.

## 13) Déploiement Scaleway Object Storage

1. Créer un bucket public static website.
2. Uploader tout le contenu de `dist/`.
3. Configurer `index.html` comme document racine.
4. Ajouter CDN/domain custom si besoin.

## 14) Domaine + HTTPS

- OVH: SSL Let's Encrypt depuis l'espace client.
- Scaleway + domaine custom: certificat via proxy/CDN (ex: Cloudflare) ou service TLS frontal.
- Toujours forcer HTTPS + redirection HTTP->HTTPS.

## 15) Compatibilité Twitch API (plus tard)

Section `#live` prête pour branchement API:
- remplacer `liveNow` par une donnée réelle (endpoint serverless ou cron JSON).
- garder fallback offline si API indisponible.
