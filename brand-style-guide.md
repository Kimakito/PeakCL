# PeakCL — Charte graphique (source de vérité pour IA génératrice d'images)

> **Objet.** Document de référence destiné à une IA génératrice d'images (ChatGPT/DALL·E, Midjourney, Flux, Imagen, etc.).
> Il décrit l'identité visuelle de **PeakCL** — agence de communication solo de **Charlotte Lacroix** (Albertville, Savoie) — avec assez de précision pour produire des visuels cohérents sans revoir le site.
> **Source :** design system v2 du site (React 19 / Tailwind v4 / shadcn-ui), fichiers `src/design-system/tokens/*`, `src/styles.css`, composants et documents de marque.
> **Univers :** *clair, rond, joyeux, coloré* — carrés arrondis, dégradés lumineux, mascotte kawaii, encre indigo (jamais de noir pur).

---

## 1. Vision générale

| Axe | Valeur |
|---|---|
| **Personnalité de la marque** | Chaleureuse, optimiste, humaine, complice, compétente sans être froide. « Une vraie personne, pas un pôle anonyme. » |
| **Valeurs ressenties** | Proximité, cohérence, simplicité, confiance, énergie positive, artisanat local (Savoie). |
| **Émotion transmise** | Légèreté rassurante — on se sent accueilli, entre de bonnes mains, sans stress. Joie douce, pas euphorie criarde. |
| **Ton** | Direct, tutoyant/complice, franc, concret. Jamais corporate, jamais survendu. |
| **Cible** | Indépendants, TPE, PME de proximité (Savoie). Niches de tête : **thérapeutes / praticiens bien-être** et **indépendants locaux** (artisans, professions libérales) ; sous-cluster fort : **monde animal / équestre**. |
| **Niveau de modernité** | Élevé (8/10) — design contemporain 2026, dégradés mesh, verre teinté, micro-interactions. Mais accessible, pas « techno froid ». |
| **Niveau de minimalisme** | Moyen (5/10) — épuré dans la structure mais **assumé coloré**. Espace négatif généreux, pourtant la couleur est omniprésente. Ce n'est PAS un minimalisme monochrome à la Apple. |
| **Niveau de sophistication** | Élevé (7/10) — dégradés soignés, ombres teintées, rythme maîtrisé — au service de la chaleur, jamais du luxe distant. |
| **Perception globale** | « SaaS friendly + illustration kawaii » : la rigueur d'un produit tech moderne, réchauffée par une mascotte dessinée et une palette candy pastel. |

**Mots-clés :**
`Joyeux` · `Rond` · `Coloré` · `Lumineux` · `Humain` · `Chaleureux` · `Optimiste` · `Accessible` · `Moderne` · `Pastel-candy` · `Local / artisanal` · `Doux` · `Confiant` · `Ludique-mais-pro`

**Anti-mots-clés (ce que la marque n'est PAS) :**
`Sombre corporate` · `Anthracite / gris acier` · `Luxe froid` · `Néon agressif` · `Brutalist` · `Grunge` · `Minimalisme monochrome` · `Skeuomorphisme 3D lourd` · `Stock-photo générique`.

---

## 2. Palette de couleurs

Palette **5 familles × déclinaisons (claire / foncée / dégradé)** issues des « carrés couleurs » du logo, plus une échelle de neutres dérivés de l'encre indigo. **Règle d'or : jamais de noir pur ni de gris neutre — le sombre est toujours de l'indigo `#13004D`.**

### 2.1 Couleurs primitives (familles)

| Nom | HEX | RGB | HSL | Rôle | Fréquence | Importance |
|---|---|---|---|---|---|---|
| Turquoise clair | `#96F0F7` | 150, 240, 247 | 184°, 84%, 78% | Fraîcheur, tech, accents/halos | Moyenne | ●●● |
| Turquoise foncé | `#4DAFC9` | 77, 175, 201 | 193°, 53%, 55% | Positif/succès, encre turquoise | Moyenne | ●●● |
| Bleu clair | `#94D4FF` | 148, 212, 255 | 205°, 100%, 79% | Haut de dégradé, aplats doux | Moyenne | ●● |
| Bleu médian | `#6191FF` | 97, 145, 255 | 223°, 100%, 69% | Stop de dégradé bleu | Faible | ●● |
| Bleu (accent) | `#427CFF` | 66, 124, 255 | 222°, 100%, 63% | **Accent interactif** (liens, primary, boutons) | Élevée | ●●●● |
| Lavande clair | `#BABAFF` | 186, 186, 255 | 240°, 100%, 86% | Douceur, sélection, bordures fortes | Moyenne | ●●● |
| Lavande foncé | `#875FD5` | 135, 95, 213 | 260°, 58%, 60% | Créativité, haut du dégradé violet | Moyenne | ●●● |
| Jaune clair | `#F2EB96` | 242, 235, 150 | 54°, 78%, 77% | Haut du dégradé jaune, aplat énergie | Moyenne | ●●● |
| Jaune (CTA) | `#F2D04B` | 242, 208, 75 | 48°, 86%, 62% | **CTA primaire** (texte indigo dessus) | Élevée | ●●●● |
| Violet médian | `#5F3AB9` | 95, 58, 185 | 258°, 52%, 48% | Stop de dégradé | Faible | ●● |
| Violet profond | `#360099` | 54, 0, 153 | 261°, 100%, 30% | Profondeur, lien survolé, encre accent | Moyenne | ●●● |
| Violet sombre | `#291267` | 41, 18, 103 | 256°, 70%, 24% | Stop de dégradé indigo | Faible | ● |
| **Indigo 900 (encre)** | `#13004D` | 19, 0, 77 | 255°, 100%, 15% | **Encre de marque** : texte, traits, contours mascotte, fond sombre | Très élevée | ●●●●● |

### 2.2 Neutres (dérivés de l'indigo — jamais gris pur)

| Nom | HEX | RGB | Rôle |
|---|---|---|---|
| Blanc | `#FFFFFF` | 255, 255, 255 | Fond des cartes, texte inverse |
| Neutre 50 | `#FAFAFF` | 250, 250, 255 | Fond doux (teinte lavande imperceptible) |
| Neutre 100 | `#F3F2FC` | 243, 242, 252 | Surfaces secondaires, muted |
| Neutre 200 | `#E6E4F5` | 230, 228, 245 | Bordures par défaut |
| Neutre 400 | `#A9A3C9` | 169, 163, 201 | Texte désactivé, icônes discrètes |
| Neutre 600 | `#6C6493` | 108, 100, 147 | Texte secondaire (muted) |

### 2.3 Rôles sémantiques

| Rôle | Mode clair | Mode sombre |
|---|---|---|
| **Primary** (accent interactif) | `#427CFF` bleu | `#427CFF` bleu |
| **Secondary** | `#F3F2FC` neutre-100 | `#2A1566` indigo lavé |
| **Accent** | `#96F0F7` turquoise clair | turquoise 30% sur indigo |
| **Background (site)** | `#FFEAA9` jaune pâle chaud (fond unique homogène) | `#13004D` indigo profond |
| **Surface / Card** | `#FFFFFF` blanc | `#2A1566` + 7% blanc |
| **Text (corps)** | `#13004D` indigo | `#FAFAFF` neutre-50 |
| **Muted text** | `#574F82` / `#6C6493` | `#B7AEE0` |
| **Border** | `#E6E4F5` | blanc 12% (`rgba(255,255,255,.12)`) |
| **Success / positive** | `#4DAFC9` turquoise | idem |
| **Warning** | `#F2D04B` jaune (usage parcimonieux) | `#F2D96A` |
| **Error / destructive** | `#F51D31` rouge | `#FF5A68` corail |
| **CTA** | `#F2D04B` jaune, texte `#13004D` | idem |
| **Highlight / sélection** | `#BABAFF` lavande, texte indigo | idem |
| **Focus ring** | `#6191FF` bleu | `#6191FF` |
| **Fond sombre de marque** | `radial-gradient(circle at 50% 45%, #3A07A8, #2E0296 55%, #250085)` | — |

### 2.4 Dégradés officiels (stops exacts, orientation 135° : clair haut-gauche → foncé bas-droite)

| Nom | Définition |
|---|---|
| Turquoise | `linear-gradient(135deg, #97F0F7 0%, #4DAFC9 100%)` |
| Bleu | `linear-gradient(135deg, #94D4FF 8%, #6191FF 100%)` |
| Lavande | `linear-gradient(135deg, #BABAFF 0%, #875FD5 100%)` |
| Jaune | `linear-gradient(135deg, #F2EB96 0%, #F2D966 50%, #F2D04B 100%)` |
| Violet | `linear-gradient(135deg, #BABAFF 0%, #7F66D1 33%, #5F3AB9 54%, #481AA7 73%, #360099 100%)` |
| Indigo | `linear-gradient(135deg, #875FD5 0%, #442887 44%, #291267 67%, #13004D 100%)` |
| **Texte multicolore** | `linear-gradient(100deg, #F2D04B 0%, #4DAFC9 45%, #360099 100%)` (jaune→turquoise→violet) |
| **Hero mesh** (aurora) | superposition de radial-gradients pastel lavande + turquoise + jaune, très flous |

### 2.5 Caractérisation globale

- **Température :** globalement **froide-tempérée** (bleu, turquoise, lavande dominent) réchauffée par le **jaune** et le fond crème `#FFEAA9`. Équilibre chaud/froid volontaire.
- **Saturation :** **pastel-vive** — teintes claires désaturées (candy), teintes foncées franches et profondes (violet/indigo saturés).
- **Luminosité :** **haute** en mode clair (fonds lumineux, aplats laiteux) ; **très basse mais colorée** en mode sombre (indigo profond, jamais noir).
- **Harmonie :** **analogique bleu→violet** (le cœur de la roue chromatique tourne autour de 190°–260°), ponctuée d'un **accent complémentaire jaune** (~48°). Cohésion assurée par le fait que toutes les familles descendent vers la même encre indigo.

---

## 3. Typographie

Deux familles rondes et chaleureuses (substitutions Google Fonts, le logotype lui-même est un **lettrage custom « bubble » à ne jamais recomposer en texte**).

- **Display / titres — `Baloo 2`** (rond, plein, joyeux, écho du logotype). Graisses 500/600/**700**/800.
- **Corps — `Nunito`** (ronde, lisible, chaleureuse). Graisses 400/600/700/800 + italique 400.
- Fallback : `system-ui, sans-serif`.

> *Estimation :* les polices sont des substituts (aucun fichier fourni). Le lettrage réel du logo est un dessin custom aux formes très rondes et pleines — s'en inspirer sans le reproduire au texte.

### Échelle & hiérarchie

| Style | Police | Taille | Poids | Line-height | Letter-spacing | Casse | Alignement | Usage |
|---|---|---|---|---|---|---|---|---|
| Hero | Baloo 2 | 56 px | 700–800 | 1.05 | −0.01em | Phrase | Gauche/centre | Titre d'accroche héros |
| H1 | Baloo 2 | 44 px | 700 | 1.05 | −0.01em | Phrase | Gauche | Titre de page |
| H2 | Baloo 2 | 32 px | 700 | 1.05–1.25 | −0.01em | Phrase | Gauche | Titre de section |
| H3 | Baloo 2 | 24 px | 700 | 1.25 | −0.01em | Phrase | Gauche | Sous-section, titre de carte |
| H4 | Baloo 2 | 19 px | 600–700 | 1.25 | 0 | Phrase | Gauche | Petit titre |
| Body large | Nunito | 18 px | 400 | 1.55 | 0 | Phrase | Gauche | Chapô, intro |
| Body | Nunito | 16 px | 400 | 1.55 | 0 | Phrase | Gauche | Texte courant |
| Small | Nunito | 14 px | 400/600 | 1.55 | 0 | Phrase | Gauche | Aides, métadonnées |
| Caption | Nunito | 12.5 px | 400 | 1.4 | 0 | Phrase | Gauche | Légendes |
| **Kicker / sur-titre** | Nunito | 12–13 px | 700 | 1.2 | **+0.14em** | **MAJUSCULES** | Gauche | Étiquette au-dessus des titres |
| Bouton | Nunito | 14 px | 600 (semibold) | 1 | 0 | Minuscule de phrase | Centré | Libellé de CTA |
| Label / Tag | Nunito | 12–13 px | 600 | 1 | +0.04em | Souvent MAJ | Centré | Puces, badges |
| Citation | Nunito | 18–20 px | 400 italique | 1.55 | 0 | Phrase | Gauche | Témoignages |
| Code / mono | monospace système | 13 px | 400 | 1.45 | 0 | — | Gauche | Rare (démos techniques) |

**Règles de casse :** titres en **phrase normale** (pas de Title Case), kickers en **MAJUSCULES espacées**, boutons en **minuscule de phrase** (« Réserver un appel »). **Titres serrés** (line-height 1.05, tracking négatif) = signature.

---

## 4. Espacements

Grille de base **4 px**. Rythme aéré, sections respirantes.

### Échelle d'espacement

| Token | Valeur |
|---|---|
| space-1 | 4 px |
| space-2 | 8 px |
| space-3 | 12 px |
| space-4 | 16 px |
| space-5 | 20 px |
| space-6 | 24 px |
| space-8 | 32 px |
| space-10 | 40 px |
| space-12 | 48 px |
| space-16 | 64 px |
| space-20 | 80 px |
| space-24 | 96 px |

### Règles de mise en page

- **Largeur max de contenu :** `--container: 1160px`, centré.
- **Espacement vertical entre sections :** `clamp(64px, 9vw, 120px)` (fluide selon la largeur).
- **Padding interne des cartes :** 24 px (`p-6`) — header, contenu et footer partagent ce padding.
- **Grille :** colonnes flex/grid, gouttières 16–24 px ; mosaïques décoratives légèrement désaxées (rotations 1–3°).
- **Rythme vertical :** line-height corps 1.55 ; titres serrés 1.05 ; respiration généreuse autour des titres.
- **Zones respirantes :** beaucoup d'espace négatif autour du contenu principal et de la mascotte ; jamais de contenu collé aux bords.

### Rayons de bordure (coins ronds généreux — signature « carrés »)

| Token | Valeur | Usage |
|---|---|---|
| radius-sm | 10 px | Petits éléments, inputs compacts |
| radius-md | 16 px | **Défaut** (boutons, inputs) |
| radius-lg | 24 px | **Cartes** |
| radius-xl | 32 px | Grands conteneurs, panneaux |
| radius-2xl / 3xl / 4xl | 40 / 48 / 56 px | Blocs héros, grandes surfaces |
| radius-pill | 999 px | Tags, badges, **boutons pilule (CTA)** |

### Hauteurs de boutons

- Petit : 32 px · Défaut : 36 px · Large : 40 px · CTA pilule : ~48 px (padding 12 px vertical / 24 px horizontal).

---

## 5. Formes

- **Forme dominante : le carré arrondi** (« carré » PeakCL), coins ~18–24 % du côté. Vient du logo et se retrouve partout : cartes, vignettes, pastilles, puces, mosaïques.
- **Coins :** toujours ronds et généreux. **Aucun angle vif.** L'énergie vient de la rondeur, pas des arêtes.
- **Cartes :** rectangles à coins 24 px, fond blanc, contour fin.
- **Boutons :** pilule (999 px) pour les CTA ; 16 px pour les boutons secondaires.
- **Icônes :** tracé linéaire à bouts arrondis (voir §8).
- **Éléments décoratifs :** petits carrés arrondis colorés, cercles flous (blobs), pastilles pilule.
- **Courbes / géométrie :** blobs organiques flous en fond, mosaïques de carrés légèrement pivotés (grille « imparfaite »).
- **Niveau de rondeur :** **très élevé** — c'est un pilier identitaire.

---

## 6. Ombres

Ombres **douces, teintées indigo** (`rgba(19,0,77,…)`) — **jamais grises ni noires.**

| Nom | Valeur | Élévation |
|---|---|---|
| shadow-sm | `0 2px 8px rgba(19,0,77,.08)` | Repos léger |
| shadow-md | `0 6px 20px rgba(19,0,77,.12)` | Cartes, survol |
| shadow-lg | `0 16px 40px rgba(19,0,77,.16)` | Modales, éléments flottants |
| shadow-cta | `0 6px 18px rgba(242,208,75,.45)` | **Lueur jaune** sous le CTA primaire |
| shadow-glow | `0 20px 60px -20px (violet 40%)` | Halo violet diffus (héros, cartes vedettes) |

- **Flou :** large et diffus (8→60 px). **Opacité :** basse (0.08→0.16). **Distance :** verticale douce.
- **Douceur :** très élevée — ombres « nuage », jamais dures. **Superposition :** possible (ombre portée + glow coloré) pour les éléments vedettes.
- **Mode sombre :** ombres noires plus profondes autorisées (`rgba(0,0,0,.35→.5)`) car le fond est déjà indigo.

---

## 7. Bordures

- **Épaisseur :** 1 px par défaut ; 1.5–2 px pour les états focus / traits de mascotte.
- **Couleur :** `#E6E4F5` (neutre-200) en clair ; `rgba(255,255,255,.12)` en sombre. Bordure « forte » = lavande `#BABAFF`.
- **Opacité :** pleine en clair ; translucide en sombre.
- **Style :** plein (solid) uniquement. Pas de pointillés décoratifs (sauf perforations de la « pellicule » portfolio).
- **Radius :** aligné sur l'échelle §4 (10 / 16 / 24 / 32 / pill).
- **Bordures « verre teinté » :** contour turquoise translucide (`turquoise 22%`) sur cartes glass.
- **Bordures dégradées animées :** conic-gradient violet→turquoise→jaune qui tourne (cadres vedettes).

---

## 8. Icônes

- **Bibliothèque : Lucide** (lucide-react). Style **linéaire, trait ~2 px, bouts et jointures arrondis** — cohérent avec la rondeur générale.
- **Angles :** arrondis. **Détail :** faible à moyen — pictos simples, lisibles, jamais chargés.
- **Taille :** 16 px dans les boutons/texte, 20–24 px en autonomie, jusqu'à 32–40 px pour les puces de section.
- **Couleur :** `currentColor` — indigo par défaut, ou couleur de famille pour les usages thématiques.
- **Cohérence :** un seul set (Lucide) partout, pas de mélange de styles.
- **Puces maison :** **petit carré arrondi coloré** (8–12 px, radius ~30 %) remplaçant la puce générique, décliné dans les 5 familles.
- **Émojis : jamais.**

---

## 9. Photographies

Style photographique cohérent, à dominante crépusculaire/violette et ambiance cosy-tech.

| Critère | Description |
|---|---|
| **Style** | Lifestyle authentique, chaleureux, « vraie vie d'indépendant » — bureau, ordinateur, carnet, montagne. Pas de stock-photo lisse. |
| **Cadrage** | Plans moyens et rapprochés, sujet décentré (règle des tiers), respiration autour. |
| **Distance focale perçue** | 35–50 mm équivalent — perspective naturelle, légère compression, pas de grand-angle déformant. |
| **Luminosité** | Douce, lumière d'heure dorée / crépuscule ; contre-jours tamisés. |
| **Contraste** | Moyen, doux — ombres colorées (violet/bleu) plutôt que noires. |
| **Palette** | Dominantes **violettes / crépusculaires**, touches turquoise et jaune chaud. En phase avec la palette de marque. |
| **Saturation** | Moyenne-basse, teintée (grade violet/magenta). |
| **Profondeur de champ** | Faible à moyenne — arrière-plans doux, bokeh léger. |
| **Textures** | Bois, papier, tissu, montagne — matières naturelles et cosy. |
| **Émotions** | Sérénité, concentration heureuse, proximité, ancrage local (Savoie). |
| **Composition** | Aérée, un sujet clair, négatif généreux ; souvent associée à des **carrés arrondis** du logo en surimpression. |
| **Orientation** | Paysage pour les héros/bannières, portrait pour les mises en avant. |
| **Traitement** | Grade violet/crépuscule ; grain très léger possible ; coins arrondis quand la photo est encadrée (radius 16–24 px). |

---

## 10. Illustrations

L'illustration maîtresse est la **mascotte de Charlotte** (personnage récurrent), dans un style vectoriel affirmé.

| Critère | Description |
|---|---|
| **Style** | Illustration **kawaii / cartoon vectoriel** — personnage féminin stylisé, mignon, expressif, amical. |
| **Niveau de détail** | Faible-moyen — formes simplifiées, silhouette lisible, pas de rendu réaliste. |
| **Traits** | **Contour ligne claire, couleur encre indigo `#13004D`**, épaisseur régulière, extrémités arrondies. |
| **Ombres** | Minimales — aplats + éventuellement une ombre douce diffuse (glow turquoise autour de la mascotte). |
| **Textures** | Aucune (aplats propres) ; éventuel halo lumineux. |
| **Aplats** | Oui — couleurs plates candy issues des 5 familles. |
| **Dégradés** | Sur les fonds et les carrés-lettres, pas sur le trait du personnage. |
| **Formes** | Rondes, pleines, amicales — cohérentes avec les « carrés » et la typo Baloo 2. |
| **Poses** | Bibliothèque de poses expressives : présente/accueille, victoire (bras levés), dab, tablette graphique, tient un graphique qui monte, ampoule (idée), selfie réseaux, devant l'ordi, marche, archère (ciblage), assise détendue, sieste sur le logo. Cadrage héros normalisé 2:3 (pieds en bas). |

---

## 11. Motifs graphiques récurrents

- **Carrés arrondis colorés** (motif signature) — isolés en puces, ou en **mosaïque légèrement désaxée** (rotations 1–3°, grille imparfaite), déclinés dans les 5 familles + dégradés.
- **Blobs de couleur flous** (radius 9999 px, `blur ~90px`, `mix-blend: screen`, opacité ~0.5) dérivant lentement en fond : violet → turquoise → jaune.
- **Aurora / mesh gradient** — nappes radiales pastel superposées, très floutées (`blur 60–72px, saturate 125–132%`), animées en dérive lente.
- **Grille en points/lignes** subtile (`grid-bg`, mailles 48–56 px, opacité ~6 %) masquée en dégradé radial.
- **Ciel étoilé discret** — micro-points blancs (halo héros, page « Qui suis-je » en crawl type Star Wars).
- **Dégradés de marque** linéaires 135° et **texte en dégradé** multicolore (jaune→turquoise→violet), parfois animé (panoramique).
- **Cadres à bordure dégradée conique animée** (violet→turquoise→jaune qui tourne) pour les éléments vedettes.
- **Halo / glow coloré** derrière les éléments importants (turquoise ou violet).
- **Grain premium très léger** (bruit SVG, opacité ~5 %, `mix-blend: overlay`) sur les héros pour éviter les aplats plats.
- **Effets « pellicule 35 mm »** (perforations, grain, vignette, spotlight néon) pour le portfolio.

---

## 12. Boutons

| Variante | Fond | Texte | Bordure | Rayon | Ombre | Survol | Appui | Focus | Désactivé |
|---|---|---|---|---|---|---|---|---|---|
| **CTA primaire** | Dégradé bleu (ou jaune `#F2D04B` sur fond sombre) | Blanc (ou indigo sur jaune) | — | pilule 999px | glow (`shadow-glow` / `shadow-cta`) | dégradé qui glisse + `scale(1.03)` | `scale(0.97)` | anneau bleu 2px offset 2px | opacité 0.45–0.5 |
| **Primary (shadcn)** | `#427CFF` bleu | Blanc | — | 16 px | shadow douce | `bg-primary/90` | scale léger | anneau bleu | opacité 0.5 |
| **Secondary** | `#F3F2FC` neutre-100 | Indigo | — | 16 px | shadow-sm | `secondary/80` | — | anneau | opacité 0.5 |
| **Outline** | Fond/transparent | Foreground | 1px input | 16 px | shadow-sm | fond accent turquoise | — | anneau | opacité 0.5 |
| **Ghost** | Transparent | Foreground | — | 16 px | — | fond accent + texte accent-foreground | — | anneau | opacité 0.5 |
| **Ghost (CTA)** | `card/40` translucide + `backdrop-blur` | Foreground | 1px border | pilule | — | `card/70` | — | anneau | — |
| **Link** | — | Bleu primary | — | — | — | souligné | — | anneau | — |

- **Icône :** flèche `→` (Lucide `ArrowRight`) glissant vers la droite au survol dans les CTA.
- **Transition :** 300 ms sur les CTA (`all`), 120–220 ms ailleurs.

---

## 13. Cartes (Cards)

| Attribut | Valeur |
|---|---|
| **Structure** | Header (titre + description) / Content / Footer, chacun padding 24 px. |
| **Fond** | Blanc `#FFFFFF` (clair) ou `#2A1566`+7% blanc (sombre). Variante « glass » : voile violet + contour turquoise translucide. |
| **Bordure** | 1 px `#E6E4F5` (clair) / blanc 12 % (sombre). |
| **Ombre** | `shadow-sm` au repos → `shadow-md` au survol. |
| **Rayon** | 24 px (`radius-lg`) — parfois 16 px pour les petites cartes. |
| **Contenu** | Titre (Baloo 2 / semibold Nunito), description muted 14 px, icône ou puce carré arrondi. |
| **Alignement** | Texte à gauche ; icône en tête. |
| **Ratio** | Souple ; vignettes portfolio en 16:9 ou carré arrondi. |
| **Survol (`card-hover`)** | `translateY(-4px)` + bord qui s'éclaire turquoise + ombre violette diffuse ; transition 0.3 s `cubic-bezier(0.22,1,0.36,1)`. |
| **Cartes « couleur »** | Fond = dégradé de famille ; texte indigo (familles claires) ou blanc (violet/indigo). |

---

## 14. Animations

Animation **ronde et joyeuse**, discrète, jamais gratuite. Tout en `transform`/`opacity` (GPU). Respecte `prefers-reduced-motion`.

| Paramètre | Valeur |
|---|---|
| **Durées** | rapide 120 ms · moyen 220 ms · lent 420 ms (jusqu'à ~0.9 s pour les tracés au scroll). |
| **Courbes** | `--ease-out: cubic-bezier(0.16,1,0.3,1)` (sorties douces) · `--ease-spring: cubic-bezier(0.34,1.56,0.64,1)` (rebond léger pour apparitions) · `cubic-bezier(0.22,1,0.36,1)` (cartes). |
| **Fade / entrée** | Apparition par le bas (`translateY(18px)` → 0) + fondu, léger scale — souvent en cascade (délais 70/120/170/240 ms). |
| **Survol** | Élévation −2 à −4 px + ombre renforcée + éclaircissement du bord. |
| **Scroll** | Lignes de process qui se tracent (`scaleX/Y` piloté au scroll), Ken Burns lent sur les captures portfolio, crawl en perspective (page « Qui suis-je »), marquee de logos, barre de progression dégradée en haut. |
| **Micro-interactions** | Flèche de CTA qui avance, soulignement de nav de gauche à droite, étoiles d'avis qui « poppent », halo curseur qui suit (desktop), mascotte qui s'incline vers la souris. |
| **Transitions** | Fondu entre poses de mascotte (0.2 s), dégradés animés (panoramique 6–8 s), aurora en dérive (22–38 s), bordures coniques qui tournent (12 s). |
| **Règle** | Pas de boucles décoratives infinies agressives ; appui = `scale(0.97)`. |

---

## 15. Iconographie (sujets représentés)

| Catégorie | Présence | Détail |
|---|---|---|
| **Personnes** | Forte | La **mascotte de Charlotte** (personnage kawaii récurrent) ; sinon indépendants/artisans en photo lifestyle. |
| **Objets** | Moyenne | Ordinateur portable, tablette graphique, smartphone (réseaux), carnet, ampoule (idée), graphique qui monte, cible/arc. |
| **Nature** | Moyenne | Montagne (Savoie/Alpes), ciel crépusculaire, étoiles. |
| **Technologie** | Moyenne | Écrans, interfaces, pictos SaaS — traités avec chaleur, jamais froids. |
| **Animaux** | Ponctuelle | Sous-cluster niche (monde équestre / médiation animale) — chevaux, animaux domestiques, selon le client. |
| **Architecture** | Faible | Rare ; contexte local éventuel. |
| **Abstraction** | Forte | Carrés arrondis, blobs, dégradés, mailles — le décor est surtout abstrait-géométrique. |
| **Niveau de réalisme** | **Mixte** : mascotte = illustration cartoon stylisée ; photos = réalisme doux crépusculaire ; décor = abstrait géométrique. |

---

## 16. Style graphique global (synthèse)

> **« SaaS friendly & kawaii pastel »** — un design produit contemporain 2026 (dégradés mesh lumineux, verre teinté, ombres douces teintées, micro-interactions soignées) **réchauffé** par un univers illustré : une **mascotte cartoon** à l'encre indigo, un **motif signature de carrés arrondis** issu du logo, et une **palette candy de 5 familles** (turquoise, bleu, lavande, jaune, violet/indigo) déclinées en clair/foncé/dégradé.
>
> Tout est **rond** (coins généreux 16–24 px, pilules, formes pleines), **lumineux** (fonds crème `#FFEAA9` ou blancs, aplats pastel laiteux) et **coloré sans jamais être criard** (saturation pastel, dégradés 135° doux). Le **sombre existe** pour les moments forts, mais c'est un **indigo profond `#13004D` — jamais de noir pur ni de gris neutre**, y compris dans les ombres (teintées indigo) et les traits.
>
> Le résultat est **joyeux, chaleureux, humain et accessible**, tout en restant **crédible et professionnel** : l'inverse d'un corporate anthracite froid comme d'un flat-design générique. La marque incarne une personne — Charlotte, freelance en Savoie — pas une agence anonyme.

---

## 17. Contraintes de génération — Règles à respecter

**Couleurs**
- Toujours utiliser la palette PeakCL : turquoise `#96F0F7/#4DAFC9`, bleu `#427CFF`, lavande `#BABAFF/#875FD5`, jaune `#F2D04B`, violet/indigo `#360099/#13004D`, fond crème `#FFEAA9`.
- **Ne jamais utiliser de noir pur (`#000`) ni de gris neutre.** Tout sombre = indigo `#13004D` ; toute ombre = indigo translucide.
- Toujours des dégradés doux orientés ~135° (clair haut-gauche → foncé bas-droite).
- Ne jamais utiliser de couleurs fluo/néon agressives ; garder une saturation **pastel-candy**.
- Le jaune est réservé aux CTA/accents énergie, en petite dose.

**Formes & composition**
- Toujours des **coins arrondis généreux** (16–24 px et plus) ; **jamais d'angles vifs**.
- Toujours réutiliser le **motif de carrés arrondis** (isolés ou en mosaïque légèrement pivotée 1–3°).
- Toujours conserver **beaucoup d'espace négatif** ; composition aérée, un sujet clair.
- Ne jamais surcharger : lisibilité et respiration priment.

**Lumière, ombres, effets**
- Toujours des **ombres très douces et teintées** (indigo), jamais dures ni noires.
- Halos/glows colorés diffus autorisés (turquoise, violet) derrière les éléments vedettes.
- Blobs flous et mesh gradients pastel bienvenus en fond.
- Ne jamais utiliser d'effets **3D lourds**, de biseaux, de skeuomorphisme, de reflets métalliques, de contours durs.
- Grain très léger toléré ; jamais de texture grunge marquée.

**Typographie (si texte dans l'image)**
- Titres en police **ronde et pleine type Baloo 2** ; corps type Nunito. Casse phrase pour les titres, MAJUSCULES espacées pour les sur-titres.
- Ne jamais recomposer le **logotype** en texte : c'est un lettrage custom.

**Personnage / mascotte**
- Style **illustration kawaii vectorielle**, **contour à l'encre indigo `#13004D`**, aplats candy, peu d'ombres.
- Cohérente avec le personnage de Charlotte ; expressive, amicale, ronde.
- Ne jamais la rendre en 3D réaliste ni photoréaliste.

**Photographie (si photo)**
- Ambiance **crépusculaire / heure dorée**, dominante violette, contraste doux, profondeur de champ faible.
- Sujets : indépendants/artisans locaux, bureau cosy-tech, montagne (Savoie). Authentique, pas stock-photo lisse.

**Interdits transverses**
- Pas d'émojis. Pas d'esthétique corporate anthracite. Pas de flat-design plat et générique. Pas de dégradés arc-en-ciel criards. Pas de gris/noir.

---

## 18. Prompt de référence (à copier dans un générateur d'images)

```
Modern-but-warm brand visual in the PeakCL style: a joyful, rounded, pastel-candy design system.
Soft mesh/aurora gradients blending turquoise (#96F0F7, #4DAFC9), sky blue (#427CFF), lavender
(#BABAFF, #875FD5) and warm yellow (#F2D04B), grounded by deep indigo ink (#13004D) — NEVER pure
black, never neutral gray. Signature motif: rounded squares (18–24% corner radius) used as tiles,
bullets and a slightly rotated (1–3°) imperfect mosaic. Everything is rounded and generous: pill
buttons, 16–24px rounded cards, full soft shapes — no sharp corners, no hard edges.

Lighting: bright, airy, cream/white backgrounds (#FFEAA9 / #FFFFFF) or a deep-indigo dark-mode
background; very soft indigo-tinted shadows and diffuse colored glows (turquoise/violet) behind key
elements. Optional element: a cute kawaii vector mascot drawn with a clean INDIGO-INK outline
(#13004D), flat candy fills, minimal shading, friendly and expressive.

Typography (if any): rounded, full display type like Baloo 2 for headings, Nunito for body; sentence
case titles, spaced uppercase kickers. Mood: optimistic, human, warm, accessible yet professional —
a solo freelance brand from Savoie, France, not a cold anonymous agency.

Style: contemporary SaaS-friendly UI aesthetic meets kawaii pastel illustration, generous negative
space, gentle 135° gradients, subtle grain.

AVOID: pure black, neutral gray, neon/fluorescent colors, heavy 3D, bevels, skeuomorphism, metallic
reflections, hard outlines, grunge, flat generic stock look, emojis, corporate anthracite.
```

---

*Document généré à partir des tokens et composants réels du site PeakCL (design system v2). Les valeurs typographiques (familles de police) sont des substitutions assumées ; le logotype réel est un lettrage custom à ne pas recomposer.*
</content>
</invoke>
