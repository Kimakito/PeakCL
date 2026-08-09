# Supports print PeakCL — carte de visite & flyer

Deux gabarits HTML aux couleurs et polices du design system v2, prêts à exporter en PDF pour l'imprimeur.
Le HTML est la **source** : on modifie le texte dedans, puis on ré-exporte.

| Support | Fichier | Format fini | Page (avec fond perdu) |
|---|---|---|---|
| Carte de visite | `carte-visite/carte-visite-peakcl.html` | 85 × 55 mm | **91 × 61 mm** (+3 mm) |
| Flyer A5 | `flyer/flyer-peakcl.html` | 148 × 210 mm | **154 × 216 mm** (+3 mm) |

Dans les deux cas : **page 1 = recto, page 2 = verso.**
Les PDF exportés (`*.pdf`) sont à côté des HTML.

## Aperçu

```bash
open -a "Google Chrome" carte-visite/carte-visite-peakcl.html flyer/flyer-peakcl.html
```

À l'écran, un liseré pointillé marque le trait de coupe : tout ce qui déborde part au massicot.
Il ne s'imprime pas.

## Export PDF pour l'imprimeur

Chrome → ⌘P :

- Destination : **Enregistrer au format PDF**
- Marges : **aucune**
- **Graphiques d'arrière-plan : coché** ← sans ça, tous les aplats disparaissent
- Échelle : **100 %**

En ligne de commande (même résultat, arrière-plans inclus) :

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --virtual-time-budget=8000 --no-pdf-header-footer \
  --print-to-pdf=flyer/flyer-peakcl.pdf "file://$PWD/flyer/flyer-peakcl.html"
```

Vérifier le PDF obtenu : 2 pages, MediaBox 437 × 612 pt pour le flyer (154 × 216 mm), 258 × 173 pt pour la carte.

## Ce que l'imprimeur doit savoir

- **Fond perdu 3 mm** déjà intégré : ne pas demander à l'imprimeur d'en rajouter, ne pas recadrer.
- **Marge de sécurité** : aucun texte à moins de 5 mm du trait de coupe.
- Les fonds sont des **aplats et dégradés**, pas des photos : un papier **mat 350 g** (carte) / **170 g** (flyer) rend bien la matière.
- Le PDF est en **RVB**. Si l'imprimeur exige du CMJN, le lui faire convertir : les indigos `#13004D` / `#360099` foncent légèrement, c'est normal et attendu.
- Ne pas activer de « correction automatique des couleurs » côté imprimeur.

## Règles de mise en page (à respecter si on modifie)

- Le décor est en **SVG inline**, avec `viewBox="0 0 154 216"` (flyer) ou `"0 0 91 61"` (carte) : **1 unité SVG = 1 mm de page**. Déplacer un blob = changer son `translate(x,y)` en millimètres.
- Les blobs sont des courbes fermées lissées, réutilisées d'un support à l'autre. Les masques (`clipPath` en `objectBoundingBox`) servent aux pastilles et aux vignettes des étapes.
- **Pas de noir pur, pas de gris neutre** : tout sombre est de l'indigo (charte §17).
- Le jaune `#F2D04B` reste un accent : CTA, chiffres d'étapes, un mot de la baseline.

## Contenu à tenir à jour

Téléphone, e-mail, `peakcl.com`, les réseaux, et le témoignage (verso du flyer, repris de `src/content/peakcl/testimonials.ts`).
Les deux QR codes pointent vers :

| QR | Cible |
|---|---|
| Carte (verso) + flyer (pied de verso) | `https://calendly.com/peakcl73/faisons-connaissance` |
| Flyer (bloc CTA du recto) | `https://peakcl.com/diagnostic` |

Pour les régénérer après un changement d'URL :

```bash
cd assets
npx qrcode -t svg -e M -m 1 -d '#13004D' -l '#0000' -o qr-rdv.svg "https://…"
```

Réseaux repris du visuel « Retrouve-moi aussi ici » : Instagram **@peakcl73**, Facebook **web.peakcl**, LinkedIn **charlotte-lacroix-peakcl**.
À noter : le site (`src/routes/index.tsx`) pointe encore vers `facebook.com/PeakCL73` — un des deux est à corriger.

## Assets (`assets/`)

| Fichier | Origine |
|---|---|
| `logo-carre-fond-fonce.svg`, `logotype-horizontal.svg` | recadrages de `public/design-system/` (fond d'origine retiré) |
| `mascotte-joie.png`, `mascotte-reflexion.png`, `mascotte-idee-bust.png`, `mascotte-explosion-joie.png` | `brand/mascotte émotions/`, fond blanc détouré, hauteur 1400 px |
| `mascotte-idee.png`, `mascotte-salut.png`, `mascotte-joyeuse.png` | mêmes sources, déjà transparentes — poses en pied disponibles, non utilisées pour l'instant |
| `cover-sites-web / reseaux / design / automatisation.png` | couvertures des stories à la une Instagram (`sites-web`, `réseaux`, `graphisme`, `tips`), recadrées en rond avec alpha |
| `qr-rdv.svg`, `qr-diagnostic.svg` | générés avec `npx qrcode` |
| `fonts.css` + `fonts/` | Baloo 2 + Nunito (latin + latin-ext) **embarquées en base64** : l'impression ne dépend d'aucune connexion |
