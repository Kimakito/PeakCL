# Signature e-mail PeakCL

`signature-peakcl.html` — signature HTML aux couleurs du design system v2 (indigo `#13004D`, bleu `#427CFF`, lavande `#875FD5`), avec le **logo carré à la mascotte**.

## Contenu

Charlotte Lacroix · Création et accompagnement de projets web · VOTRE PARTENAIRE DIGITAL
Tél 07 43 51 76 27 · Mail peakcl73@gmail.com · Web www.peakcl.com · Zone Savoie

## Logo

Chargé à distance depuis le site : `https://peakcl.com/peakcl/logo-mark.png`
(source dans le repo : `public/peakcl/logo-mark.png`).

Le logo carré ne contient pas de « PeakCL » lisible : le nom est donc écrit en toutes lettres dans la ligne « PeakCL · Votre partenaire digital ».

⚠️ Ne pas déplacer ni renommer ce fichier : la signature de tous les mails déjà envoyés casserait.

## Installation Gmail

1. Ouvrir `signature-peakcl.html` dans un navigateur (double-clic).
2. Tout sélectionner (`Cmd+A`) puis copier (`Cmd+C`) — copier le **rendu**, pas le code.
3. Gmail → ⚙️ → *Voir tous les paramètres* → onglet *Général* → *Signature* → *Créer*.
4. Coller (`Cmd+V`) dans le champ, nommer la signature, définir en signature par défaut (nouveaux messages + réponses).
5. *Enregistrer les modifications* en bas de page.

## Installation Apple Mail

1. Mail → Réglages → Signatures → `+`, créer une signature bidon, décocher *Toujours utiliser la police par défaut*.
2. Fermer Mail.
3. Remplacer le contenu du `.mailsignature` correspondant dans
   `~/Library/Mobile Documents/com~apple~mail/Data/V*/MailData/Signatures/`
   par le HTML (garder les en-têtes `Content-*` en haut du fichier).
4. Verrouiller le fichier (Lire les informations → Verrouillé) pour que Mail ne l'écrase pas.

## Installation Outlook

Coller le rendu (même méthode que Gmail) dans Insertion → Signature → Signatures.
Outlook ignore les `border-radius` : les coins du logo s'affichent droits, sans casse par ailleurs.

## Modifier

Tout est en styles inline dans le HTML — pas de `<style>`, pas de flexbox, tables uniquement (contraintes clients mail).
Après modification, régénérer un aperçu :

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --window-size=760,260 --screenshot=apercu.png \
  "file://$PWD/signature-peakcl.html"
```
