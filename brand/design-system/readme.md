# PeakCL — Design System v2

> Agence de communication pour **indépendants, TPE et PME**.
> PeakCL, c'est **Charlotte Lacroix**, freelance basée à Albertville (Savoie).
> Nouvelle identité 2026 : **claire, ronde, joyeuse et colorée** — carrés arrondis,
> dégradés lumineux, logotype custom « bubble », mascotte kawaii.

Cette v2 remplace l'ancien univers sombre/anthracite. La marque garde son fond
(un seul interlocuteur, accompagnement humain, professionnalisme) mais change de peau :
un univers **optimiste et accessible**, construit sur une grille de **carrés arrondis**
(le motif du logo) et une palette de **5 familles de couleurs** déclinées en clair,
foncé et dégradé.

## Sources fournies (uploads/, copiées dans assets/)
- `carres-couleurs.svg/png` — la palette officielle : 4 carrés dégradés (bleu, turquoise, lavande, jaune).
- `logo-vertical.svg/png` — logotype empilé P/E/A/K/CL, un carré-lettre par couleur.
- `logo-carre-compo.svg/png` — composition carrée : mascotte + lettres sur fond de carrés géants.
- `fond-clair-logotype.svg/png` — logotype horizontal violet dégradé sur fond bleu dégradé.
- `fond-fonce-logo.svg/png` — logo carré multicolore sur fond violet profond (#2E0296 env.).
- `illustration-mascotte-logo.svg/png` — mascotte intégrée dans la grille de lettres (fond indigo).
- `mascotte-ligne.svg/png` — mascotte Charlotte en pied, trait indigo sur fond transparent.
- `image-presentation.png` — photo lifestyle (bureau, montagne au crépuscule, dominante violette) + carrés logo.

## Font note (à valider)
Le logotype est un **lettrage custom** (jamais recomposé en texte). Aucun fichier de police fourni →
substitutions Google Fonts : **Baloo 2** (titres — rond, plein, écho du logo) et
**Nunito** (texte courant — ronde, chaleureuse). ➡️ À confirmer ou remplacer.

---

## CONTENT FUNDAMENTALS — comment on écrit

**Langue** : français. Public B2B de proximité — zéro jargon, zéro anglicisme gratuit.

**Qui parle** : Charlotte, au **« je »** (jamais « nous » : pas d'équipe, c'est un atout).
Promesse : *« délègue-moi toute ta communication en ligne »*.

**Adresse** : **tutoiement**, direct et complice. Ton de partenaire, pas de prestataire.

**Ton** : joyeux, confiant, concret. On vend du **temps gagné** et de la **cohérence**
(un seul interlocuteur pour site + identité + réseaux + Google). Résultats mesurables,
jamais survendus.

**Casse** :
- Titres : phrase normale (capitale initiale), pas de Title Case.
- Kickers : MAJUSCULES Nunito 700, interlettrage `--ls-kicker`.
- Boutons : minuscule de phrase (« Réserver un appel »).

**Exemples de copy**
- Héros : « Pas le temps pour ton site, tes réseaux et ton image ? Délègue-moi toute ta communication en ligne. »
- CTA : « Remplir le brief (8 min) » · « Réserver un appel » · « Voir le portfolio »
- Réassurance : « Un seul interlocuteur, du diagnostic à la mise en ligne. » · « Devis sous 48 h. »
- Preuves : *5/5 sur Google · +20 projets livrés · délai moyen 14 j.*

**Émojis** : non. La personnalité passe par la couleur, les carrés arrondis et la mascotte.

---

## VISUAL FOUNDATIONS

**Posture** : **clair par défaut** (fond blanc / `--neutre-50`), couleur apportée par les
carrés dégradés et les aplats pastel. Un mode **sombre de marque** existe pour les moments
forts (héros, fins de page, réseaux sociaux) : fond violet profond `--grad-bg-dark`.

**Couleurs — 5 familles × 3 déclinaisons** (clair / foncé / dégradé) :
- Turquoise `#96F0F7` / `#4DAFC9` — fraîcheur, tech.
- Bleu `#94D4FF` / `#427CFF` (dégradé → `#6191FF`) — confiance ; **accent interactif par défaut** (liens, boutons secondaires).
- Lavande `#BABAFF` / `#875FD5` — douceur, créativité.
- Jaune `#F2EB96` / `#F2D04B` — énergie ; **CTA primaire** (texte indigo dessus).
- Violet/Indigo `#360099` / `#13004D` — profondeur ; `--indigo-900` est **l'encre de marque**
  (texte, traits, contours de la mascotte). Jamais de noir pur.
- Les dégradés officiels (`--grad-*`) reprennent les stops exacts des SVG, orientés 135°
  (clair en haut-gauche → foncé en bas-droite).

**Typographie** : titres Baloo 2 700-800, serrés (`--lh-tight`). Corps Nunito 400/600.
Kickers Nunito 700 majuscules espacées.

**Motif signature** : le **carré arrondi** (radius généreux, coins ~18-24 % du côté).
Il vient du logo et sert partout : cartes, vignettes, pastilles, mosaïques décoratives.
Les compositions jouent la **mosaïque légèrement désaxée** (rotations 1-3°, grille imparfaite)
comme sur `logo-carre-compo`.

**Fonds** : blanc ou `--neutre-50` ; sections mises en avant sur aplat pastel clair
(`--*-200` à faible dose) ou sur `--grad-bg-dark` (texte blanc). Imagerie photo :
dominantes **violettes/crépusculaires**, montagne, ambiance cosy-tech (cf. image-presentation).

**Coins** : ronds et généreux — `--radius-md 16px` par défaut, `--radius-lg 24px` cartes,
pill pour tags et boutons. L'énergie vient de la **rondeur**, pas des angles.

**Cartes** : fond blanc, bordure 1px `--border`, ombre `--shadow-sm→md`, radius `--radius-lg`.
Cartes « couleur » : fond dégradé de famille, contenu encré indigo (familles claires)
ou blanc (violet/indigo). Survol : remontée 2px + ombre `--shadow-md`.

**Ombres** : douces, teintées indigo (`rgba(19,0,77,…)`), jamais grises/noires.
CTA jaune : lueur `--shadow-cta`.

**Animation** : ronde et joyeuse — `--ease-spring` pour les apparitions, `--ease-out` sinon.
Durées 120/220/420ms. Entrées par le bas + léger scale. Survol : +ombre, -2px.
Appui : `scale(0.97)`. Pas de boucles décoratives infinies.

**États** : hover = élévation + éclaircissement ; press = scale(0.97) + `--accent-press` ;
focus = anneau bleu `--focus-ring` 2px offset 2px ; disabled = opacité 0.45.

**Transparence/flou** : nav sticky et overlays en blanc translucide + `backdrop-filter: blur(12px)`.

---

## ICONOGRAPHY

- **Icônes** : **Lucide** via CDN (trait 2px, bouts arrondis — cohérent avec la rondeur).
  Substitution assumée, aucun set fourni. Couleur `currentColor` ; indigo par défaut,
  famille de couleur pour les usages thématiques.
- **Puces maison** : le **petit carré arrondi** coloré (8-12px, radius 30%) remplace la puce
  générique ; décliné dans les 5 familles.
- **Mascotte** : `assets/mascotte-ligne.svg` (Charlotte en pied, trait indigo `#13004D`) —
  à poser sur fonds clairs ou pastel. Version intégrée à la grille de lettres :
  `assets/illustration-mascotte-logo.svg` (fond indigo). Atout différenciant n°1 : l'utiliser
  dans les héros, la page contact, les états vides.
- **Logos** : vertical (`logo-vertical.svg`), horizontal violet (`fond-clair-logotype.svg`,
  fonds clairs/bleus), carré multicolore (`fond-fonce-logo.svg`, fonds sombres),
  composition riche (`logo-carre-compo.svg`). Ne jamais redessiner ni recomposer en texte.
- **Émoji** : jamais.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="palette"></i>
<script>lucide.createIcons();</script>
```

---

## INDEX

- `styles.css` — point d'entrée global (imports only).
- `tokens/` — fonts · colors · typography · spacing · effects · base.
- `guidelines/` — cartes specimens (Colors, Type, Spacing, Brand).
- `assets/` — logos, mascotte, palette, image de présentation.
- `components/` — primitives React : Button, IconButton, Badge, Tag, Card, Input, Select,
  Checkbox, Radio, Switch, Tabs, Alert (groupes `actions/`, `forms/`, `display/`).
- `ui_kits/website/` — landing page de l'agence (héros, services, méthode, contact).
- `SKILL.md` — wrapper Agent Skill.

Composants exposés via le namespace global après chargement de `_ds_bundle.js` (généré).
