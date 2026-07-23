# PeakCL — Design System

> Agence de communication pour **indépendants, TPE et PME**.
> Univers : **la montagne · l'ascension · la visibilité · la technologie**.
> Valeurs à transmettre : **confiance · qualité · accompagnement humain · professionnalisme**.

PeakCL aide les petites structures à gagner en visibilité. Le design system traduit
cette promesse : on accompagne le client dans une **ascension** (du pied de la montagne
au sommet / "peak"), avec une exécution **technique et soignée**, dans un univers
**sombre, premium et différenciant** — volontairement à l'opposé des codes des thèmes
WordPress d'agence (héros pastel, cartes arrondies à liseré coloré, dégradés violets mous).

## Sources fournies
- `uploads/PeakCL.logo.png` → copié dans `assets/peakcl-logo-badge.png`. Badge hexagonal
  dessiné à la main : pic de montagne **jaune**, vague-circuit **turquoise** (tech + visibilité),
  lettrage « PEAK » jaune + « CL » **violet**, chevrons ascendants jaunes, fond **anthracite**.
- Aucune charte typographique fournie → voir **Font note** ci-dessous.

---

## Font note (à valider)
Aucun fichier de police n'a été fourni. Choix recommandés, chargés via Google Fonts :
- **Space Grotesk** — affichage / titres. Géométrique, technique, assuré (la "tech" + la rigueur).
- **Hanken Grotesk** — texte courant. Chaleureuse et très lisible (l'"accompagnement humain").
- **Space Mono** — étiquettes, kickers, données. Évoque le circuit / le code.

➡️ **À confirmer ou remplacer** par vos polices de marque si elles existent.

---

## CONTENT FUNDAMENTALS — comment on écrit

**Langue** : français. Public B2B de proximité (indépendants, TPE, PME) — pas de jargon d'agence
parisienne, pas d'anglicismes gratuits.

**Qui parle** : PeakCL, c'est **Charlotte Lacroix**, freelance solo basée à Albertville (Savoie).
La marque parle donc au **« je »** (jamais « nous/on » : il n'y a pas d'équipe, et c'est un atout —
un seul interlocuteur). Promesse centrale : *« délègue-moi toute ta communication en ligne »*.

**Adresse au client** : **tutoiement** (« tu »), proche et direct — comme la section « méthode »
du site (« Tu remplis un formulaire… »). Ton de partenaire qui grimpe à tes côtés, pas de
prestataire au-dessus de toi. (Une variante vouvoiement reste possible pour un contexte plus
institutionnel.)

**Ton** : confiant mais accessible. Direct, concret, rassurant. Je promets des résultats
mesurables sans survendre, j'explique simplement, et je vends surtout du **temps gagné** et de la
**cohérence** (un seul interlocuteur pour site + identité + réseaux + Google).

**Casse** :
- Titres : phrase normale (capitale initiale), pas de Title Case anglo-saxon.
- Kickers / sur-titres : **MAJUSCULES** en mono, interlettrage large (`--ls-kicker`).
- Boutons : minuscule de phrase (« Prendre rendez-vous »), jamais tout en capitales.

**Vocabulaire de marque** (le champ lexical de l'ascension) :
*sommet, cap, cordée, visibilité, gravir, point culminant, trajectoire, palier, boussole, élan.*
Exemples : « Atteignons votre sommet », « On trace la voie », « Visibilité au sommet ».

**Exemples de copy**
- Héros (réel) : « Pas le temps pour ton site, tes réseaux et ton image ? Délègue-moi toute ta
  communication en ligne. » · accroche montagne : « Ta com', **au sommet**. »
- CTA primaire (réel) : « Remplir le brief (8 min) » · « Réserver un appel » · « Je veux déléguer »
- CTA secondaire : « Voir le portfolio » · « Comment je travaille »
- Réassurance : « Un seul interlocuteur, du diagnostic à la mise en ligne. » · « Devis sous 48 h. »
- Preuves réelles : *5/5 sur Google · +20 projets livrés · délai moyen 14 j.*
- Anti-jargon : « être trouvé sur Google » plutôt que « stratégie SEO omnicanale ».

**Émojis** : **non** dans l'UI et le marketing. La personnalité passe par la couleur, la
géométrie (chevrons, hexagone) et le mono. Les pictos sont des **icônes ligne**, pas des émojis.

---

## VISUAL FOUNDATIONS

**Posture générale** : **sombre par défaut** (canvas anthracite `--bg #1B1E25`), lumière qui
vient des accents jaune & turquoise — comme une lumière de sommet sur la roche. Premium,
contrasté, un peu « brutaliste-tech » mais soigné.

**Couleurs**
- **Jaune** `#E9DE1F` = couleur primaire / CTA / « lumière du sommet ». À doser : c'est
  l'accent qui attire l'œil (un seul jaune dominant par écran).
- **Turquoise** `#19BDBD` = secondaire / liens / éléments tech & data / tracés.
- **Violet** `#A618CC` = **accent UNIQUEMENT** : un badge, un point, une micro-emphase. Jamais
  une surface, jamais un dégradé de fond, jamais un bouton primaire.
- **Anthracite** : échelle `--ink-*` froide (légèrement bleutée) pour fonds, surfaces, bordures.
- Pas de dégradés violets mous. Les seuls dégradés admis : halos radiaux discrets jaune/turquoise
  (lueur de sommet) et un dégradé anthracite vertical sur les fonds de section.

**Typographie** : titres en Space Grotesk **bold**, très serrés (`--ls-tight`, `--lh-tight`) —
ça « monte ». Kickers en Space Mono majuscule espacé. Corps en Hanken Grotesk.

**Espacement / mise en page** : grille 4px (`--space-*`). Sections aérées
(`--section-y` 64→128px). Conteneur 1200px. On aime l'asymétrie maîtrisée et les
**lignes diagonales ascendantes** plutôt que des grilles parfaitement plates.

**Fonds** : anthracite uni ou très légèrement dégradé. Motif récurrent : **grille-circuit**
fine (`.peak-grid-bg`, lignes à 4 % d'opacité, maille 48px) évoquant la carte topographique /
le circuit imprimé. Halos de lumière radiaux jaune/turquoise derrière les éléments forts.
Imagerie photo : **froide, contrastée**, montagne / altitude / brume, jamais des photos
corporate génériques sur fond blanc.

**Géométrie signature** : l'**hexagone** (du badge) et le **chevron ascendant** (`▲`). On les
réutilise comme puces, séparateurs, masques (`--clip-hex`, `--clip-chevron-up`,
`--clip-tag` pour les étiquettes biseautées).

**Coins (radii)** : tendus. `--radius-md 8px` par défaut, `--radius-lg 14px` pour les grandes
cartes. Pas de pilules omniprésentes (le pill est réservé aux tags/badges). L'énergie vient
des **angles**, pas de l'arrondi.

**Cartes** : surface `--surface` (`#23272F`), bordure 1px `--border` (blanc 9 %), ombre
`--shadow-md`. Au survol : remontée de 2px + bordure qui s'éclaire en turquoise et fine lueur.
Les cartes « mises en avant » prennent un filet supérieur jaune (3px) ou un coin biseauté.

**Bordures** : hairline `rgba(255,255,255,.09)` partout ; bordure forte `--ink-500` ;
bordure accent turquoise sur focus/hover/sélection.

**Ombres & lueurs** : ombres profondes et froides sur le canvas sombre (`--shadow-*`).
Lueurs signature (`--glow-yellow`, `--glow-turquoise`, `--glow-violet`) pour CTA, focus,
état actif — c'est la « lumière de sommet ».

**Transparence & flou** : barre de navigation et overlays en `backdrop-filter: blur` sur
anthracite translucide. Le flou est réservé aux éléments **fixes/flottants** (nav sticky,
modales, toasts), pas au contenu courant.

**Animation** : assurée, légèrement « ressort » à la montée. Easing par défaut `--ease-out`
(décélération franche) ; `--ease-spring` pour les apparitions d'accent. Durées 120/220/420ms.
Les éléments **entrent par le bas** (translateY) — métaphore de l'ascension. Pas de boucles
décoratives infinies sur le contenu. Survol = +luminosité / lueur ; appui = léger
`scale(0.97)` + assombrissement.

**États**
- *Hover* : éclaircissement de l'accent + lueur ; sur surfaces, remontée 2px + bordure turquoise.
- *Active/press* : `scale(0.97)`, couleur `--accent-press`.
- *Focus* : anneau turquoise 2px (`--focus-ring`), offset 2px.
- *Disabled* : opacité 0.4, curseur not-allowed, pas de lueur.

---

## ICONOGRAPHY

- **Système** : **Lucide** (icônes ligne, trait ~2px, bouts arrondis) — chargé via CDN.
  Aligné avec la rigueur « tech » et la chaleur du brand. Aucun set d'icônes n'a été fourni,
  donc **substitution assumée par Lucide** (à valider).
- **Style** : trait fin et régulier, jamais de pictos pleins multicolores. Couleur héritée du
  texte (`currentColor`) ; on les passe en turquoise pour les éléments tech/positifs, en jaune
  pour la mise en avant.
- **Puces & marqueurs de marque** : le **chevron ascendant** et l'**hexagone** servent de puces
  maison (voir `--clip-*`) — c'est la signature visuelle, à utiliser plutôt qu'une icône générique
  quand on liste des bénéfices/étapes.
- **Émoji** : jamais. **Unicode** : usage ponctuel du chevron `▲` / flèche `↗` comme glyphe d'ascension.
- **Mascotte de marque** : `assets/charlotte-vector.svg` (SVG vectoriel, net à toute taille,
  mi-corps, logo sur la salopette) + variantes PNG `charlotte-wave.png` / `charlotte-present.png`.
  C'est un atout différenciant fort — l'illustration de Charlotte humanise la marque et casse
  les codes des sites d'agence génériques. À utiliser dans les héros, la section « pourquoi moi »,
  le contact. Préférer le **SVG** dès que possible.
- **Logo** : `assets/peakcl-logo-badge.png` (badge complet). À utiliser sur fond sombre.
  Prévoir une version vectorielle / monochrome pour les petites tailles (non fournie).

Pour charger Lucide :
```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="mountain"></i>
<script>lucide.createIcons();</script>
```

---

## INDEX — contenu du système

**Racine**
- `styles.css` — point d'entrée global (imports only). Les consommateurs lient ce fichier.
- `readme.md` — ce document.
- `SKILL.md` — wrapper Agent Skill (Claude Code).

**Tokens** (`tokens/`)
- `fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `effects.css` · `base.css`

**Foundation cards** (`guidelines/`) — specimens visibles dans l'onglet Design System
(Colors, Type, Spacing, Brand).

**Composants** (`components/`) — primitives React de marque. Voir la section Components du
système (Button, IconButton, Badge, Tag, Card, Input, Select, Checkbox, Switch, Tabs, Alert).

**UI kits** (`ui_kits/`)
- `website/` — site marketing générique de l'agence (héros, services, méthode, contact).

**Refonte home** (racine) — `PeakCL Home.html` : refonte complète de la home réelle
(peakcl.com), tutoiement, mascotte intégrée. **Tweaks** : thème Sombre/Clair, 3 variantes de
héros (Split / Centré / Éditorial), accent Jaune/Turquoise. Modules dans `ui_kits/website/HomeSections1-3.jsx`.
Les emplacements d'images (`<image-slot>`) attendent tes captures de portfolio et une photo montagne.

Tout composant s'utilise via `window.PeakCL.<Nom>` après chargement de `_ds_bundle.js`
(généré automatiquement). Namespace : **PeakCL** (vérifier avec `check_design_system`).
