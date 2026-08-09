# Supports print PeakCL — carte de visite & flyer

Deux gabarits HTML aux couleurs et polices du design system v2, prêts à exporter en PDF pour l'imprimeur.
Le HTML est la **source** : on modifie le texte dedans, puis on ré-exporte.

| Support | Fichier | Format fini | Page (avec fond perdu) |
|---|---|---|---|
| Carte de visite | `carte-visite/carte-visite-peakcl.html` | 85 × 55 mm | **91 × 61 mm** (+3 mm) |
| Carte — forme de dorure | `carte-visite/carte-visite-peakcl-dorure.html` | 85 × 55 mm | **91 × 61 mm** (+3 mm) |
| Flyer A5 | `flyer/flyer-peakcl.html` | 148 × 210 mm | **154 × 216 mm** (+3 mm) |
| Flyer — forme de dorure | `flyer/flyer-peakcl-dorure.html` | 148 × 210 mm | **154 × 216 mm** (+3 mm) |

Dans les deux cas : **page 1 = recto, page 2 = verso.**
Les PDF exportés (`*.pdf`) sont à côté des HTML.

## Aperçu

```bash
open -a "Google Chrome" carte-visite/carte-visite-peakcl.html flyer/flyer-peakcl.html
```

À l'écran, un liseré pointillé marque le trait de coupe : tout ce qui déborde part au massicot.
Sur la carte, ce liseré est **arrondi (R 3 mm)** et un second pointillé plus clair marque la zone de sécurité.
Aucun des deux ne s'imprime. L'aperçu écran de la carte affiche aussi les coins arrondis et une ombre : le PDF, lui, reste rectangulaire (c'est la découpe qui arrondit).

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
Les formes de dorure s'exportent de la même façon, aux mêmes dimensions que leur support.

## Parti pris « premium » — carte **et** flyer

Les quatre faces (carte recto/verso, flyer recto/verso) sont en **indigo profond**
(dégradé `#1E0072 → #13004D → #0A002C`) : plus de face crème, c'est le fond sombre qui porte
l'effet luxe. **Aucune mascotte** sur les supports print — les formes organiques de la marque
suffisent à porter l'identité. Trois couches, identiques sur les deux supports :

1. **Motif gaufré** — les blobs de la marque en tracé, dédoublés (ombre `#05001A` décalée de +0,18 mm sur la carte / +0,22 mm sur le flyer, lumière `#8E7BE0` décalée d'autant en sens inverse). Imprimé, ça donne un relief simulé ; en gaufrage à sec réel, c'est ce tracé qui sert de plaque.
2. **Or** — logotype, nom, filets, titres et pictos en or (`#F2D04B`, rampe `#FBF1C4 → #D6A02A` pour le logotype). Prévu pour être **doré à chaud** si le budget le permet, sinon l'impression quadri suffit.
3. **Contenu** — blocs « verre » (blanc à 7 % + bordure or) pour le CTA, les services et l'avis ; QR codes toujours sur pastille blanche (le blanc est **obligatoire** pour qu'ils restent scannables).

Côté flyer, les illustrations ont été remplacées :

- la mascotte du recto → un **ornement organique** (nappes turquoise/lavande + contours or) posé dans le décor SVG, avec le **logo carré** en médaillon au centre de l'anneau or (`assets/logo-carre-mascotte.svg`, 34 mm, coins arrondis 4,5 mm, liseré or) ;
- les vignettes rondes des services (`cover-*.png`, qui montraient la mascotte) → des **pictos au trait** dans une pastille blob dégradée ;
- les mascottes des 3 étapes → des **blobs dégradés avec le numéro en indigo**.

### Finitions à demander à l'imprimeur

| Finition | Réglage | Obligatoire ? |
|---|---|---|
| Angles arrondis (carte) | **découpe à la forme, rayon 3 mm**, les 4 coins | oui — la maquette est pensée pour |
| Papier | carte : mat 350–400 g ou soft-touch · flyer : mat 170–250 g | recommandé |
| Dorure à chaud or | sur les éléments `#F2D04B`, d'après les fichiers de forme | option |
| Gaufrage à sec | sur le motif de blobs du fond | option |
| Tranche dorée / irisée | tranche or ou holographique | option, coût élevé |

### Fichiers de forme pour la dorure

`carte-visite/carte-visite-peakcl-dorure.pdf` et `flyer/flyer-peakcl-dorure.pdf` — à envoyer
**en plus** du PDF quadri correspondant, jamais à la place.

- 2 pages chacun, même format et même géométrie que la quadri : les PDF se superposent au repérage.
- **Noir 100 % sur blanc** : le noir n'est pas une encre ici, il dit à l'imprimeur où poser la feuille d'or.
- Dorés sur la **carte** : logotype, « Charlotte Lacroix », les deux filets, les pastilles et pictos du verso, les pictos réseaux.
- Dorés sur le **flyer** : logotype, « simplifiée. », les deux filets, le titre du CTA, les titres d'étapes, les 5 étoiles, « Charlotte Lacroix » au pied.
- Pas dorés (absents des fichiers) : fonds, motif gaufré, logo carré du recto flyer, textes courants, cartes services, pastilles, QR codes.
- Les **filets sont plus courts** que sur la quadri : la quadri les fait mourir en dégradé, la dorure ne sait faire que de l'aplat.
- Traits fins : les pictos de la carte font environ **0,2 mm**. Si l'imprimeur annonce une limite au-dessus, décommenter `.puce, .reseaux svg{ display:none }` dans le HTML de la forme (équivalent sur le flyer : `.etape b{ color:transparent }` pour retirer les petits corps) — le reste de la forme ne bouge pas.
- Si l'imprimeur demande une **couleur d'accompagnement nommée** plutôt que du noir (`Dorure`, `Foil`, un Pantone en surimpression), le lui dire : c'est une conversion à faire de son côté, le tracé est déjà bon.

Le fichier de dorure du flyer est une **copie du fichier quadri** dont seules les couleurs changent
(les éléments non dorés passent en `transparent` et gardent leur place). Après toute modification
d'un support, reporter les mêmes coordonnées dans sa forme et vérifier la superposition avant d'envoyer.

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
- Le jaune `#F2D04B` reste un accent : CTA, titres d'étapes, un mot de la baseline. **Sur les supports print**, il joue le rôle d'or et porte le logotype, les noms et les filets.
- **Pas de mascotte sur le print**, à une exception près : le logo carré au centre de l'ornement du flyer. Le reste de l'espace se construit avec les blobs (nappes translucides, contours or, pastilles masquées).

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

Réseaux : Instagram **@peakcl73**, Facebook **PeakCL73** (`https://www.facebook.com/PeakCL73/`), LinkedIn **charlotte-lacroix-peakcl**. Même compte Facebook que le site (`src/lib/links.ts`).

## Assets (`assets/`)

| Fichier | Origine |
|---|---|
| `logo-carre-fond-fonce.svg`, `logotype-horizontal.svg` | recadrages de `public/design-system/` (fond d'origine retiré) |
| `logotype-horizontal-noir.svg` | même copie, lettres en noir 100 % — sert au fichier de forme de dorure |
| `logo-carre-mascotte.svg` | copie de `brand/logos/1PeakCL-logo-carré.svg` — médaillon au centre de l'ornement du flyer (seul endroit où la mascotte reste sur le print) |
| `logotype-horizontal-or.svg` | copie de `logotype-horizontal.svg` dont le dégradé violet→indigo des lettres est remplacé par une rampe or (`#FBF1C4 → #F2EB96 → #F2D04B → #E3B23C → #D6A02A`) — carte **et** flyer |
| `mascotte-*.png` (7 poses) | `brand/mascotte émotions/`, détourées, hauteur 1400 px — **plus utilisées sur le print** depuis le passage en premium, conservées pour le web et les réseaux |
| `cover-sites-web / reseaux / design / automatisation.png` | couvertures des stories à la une Instagram — **plus utilisées sur le flyer** (elles montraient la mascotte), conservées pour Instagram |
| `qr-rdv.svg`, `qr-diagnostic.svg` | générés avec `npx qrcode` |
| `fonts.css` + `fonts/` | Baloo 2 + Nunito (latin + latin-ext) **embarquées en base64** : l'impression ne dépend d'aucune connexion |
