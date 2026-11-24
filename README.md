# Portfolio — Roger Camara

Portfolio personnel développé avec React et Vite. Il présente mon parcours, mes compétences, mes projets et mes expériences autour des systèmes intelligents, de l'IoT et des systèmes embarqués.

## Technologies

- React 19
- Vite 8
- CSS
- EmailJS pour le formulaire de contact
- react-simple-maps et world-atlas pour la visualisation cartographique

## Prérequis

- Node.js `^20.19.0` ou `>=22.12.0`
- npm

## Installation

```bash
npm ci
```

## Configuration du formulaire de contact

Copier `.env.example` vers `.env`, puis renseigner les identifiants du projet EmailJS :

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Les variables préfixées par `VITE_` sont intégrées au code envoyé au navigateur. Ne jamais y placer de mot de passe, de clé privée ou de secret serveur.

## Développement

```bash
npm run dev
```

## Vérification et build de production

```bash
npm run lint
npm run build
```

Pour prévisualiser le build localement :

```bash
npm run preview
```

## Déploiement

Déployer le contenu du dossier `dist/` généré par `npm run build`. Configurer les trois variables EmailJS dans les variables d'environnement de la plateforme d'hébergement avant le build.


## Architecture actuelle

Le portfolio est une application React monopage. La navigation entre les rubriques utilise les ancres HTML (`#home`, `#about`, etc.) ; aucun routeur n'est nécessaire.

## Installation

```bash
npm ci
npm run dev
```

Pour vérifier le code et préparer une version de production :

```bash
npm run lint
npm run build
```

Le formulaire de contact utilise EmailJS. Copiez `.env.example` vers `.env`, puis renseignez les trois variables `VITE_EMAILJS_*` depuis votre compte EmailJS. Ces variables préfixées par `VITE_` sont intégrées au code client lors du build : elles ne doivent pas contenir de secret serveur.
