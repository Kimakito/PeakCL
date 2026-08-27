# Plan d'acquisition PeakCL — décisions du 26/08/2026

Ce document fige ce qui a été décidé et fait dans le code, et ce qui reste à
faire hors du site. Il sert de point de reprise : dans trois mois, la question
sera « qu'est-ce qui a produit des leads », et on ne pourra y répondre que si
la ligne de départ est écrite quelque part.

Le diagnostic de départ, en une phrase : le site n'est pas le problème. C'est
une machine à convertir branchée sur presque aucun flux entrant, et dont le
tunnel demandait à un inconnu son chiffre d'affaires avant de lui avoir rien
donné.

---

## 1. Fuites réparées (elles coûtaient des leads réels)

| Problème | Conséquence | État |
|---|---|---|
| `/diagnostic` ne demandait pas d'e-mail | L'edge function HubSpot répondait `skipped: no_email` : **aucun** lead de ce formulaire n'est jamais arrivé dans le CRM | corrigé |
| `netlify-forms.html` ne déclarait que 2 champs pour `diagnostic` | Netlify n'enregistre que les champs déclarés : toutes les réponses de qualification étaient jetées | corrigé |
| `/diagnostic` sans `leadType` ni `source` | Lead sans origine, donc inattribuable à un canal | corrigé |
| Aucun événement de conversion global | Impossible de lire un taux de conversion dans GA4 | `generate_lead` envoyé par `submitNetlifyForm` |

> **À faire dans GA4, une seule fois** : Admin → Événements → marquer
> `generate_lead` comme **événement clé**. Sans ça, il est collecté mais
> n'apparaît pas comme conversion dans les rapports d'acquisition.

---

## 2. Friction d'entrée : deux tunnels séparés au lieu d'un seul mal calibré

Avant, `/diagnostic` et `/reservation-appel` posaient les mêmes questions de
closing et menaient au même endroit. Un visiteur venu de Google devait annoncer
son chiffre d'affaires et s'engager à honorer un rendez-vous de 45 minutes
avant d'avoir rien reçu.

Désormais :

- **`/diagnostic` = entrée froide.** Trois champs obligatoires (prénom/nom,
  e-mail, activité), plus site et ville facultatifs. Les questions de
  qualification restent, dans un bloc dépliable explicitement facultatif.
  Promesse : les 3 actions prioritaires par e-mail sous 2 jours ouvrés.
- **`/reservation-appel` = entrée tiède.** Inchangée : c'est le brief qui
  précède l'appel, pour quelqu'un qui a déjà décidé de parler.
- Tous les CTA principaux des pages froides (accueil, pages villes, portfolio,
  conseils, services, qui-suis-je) pointent vers `/diagnostic`. Le bouton
  « Réserver un appel » reste disponible partout en secondaire.
- `/merci-brief` annonce l'audit par e-mail, et présente la réservation comme
  **optionnelle**.

> **Engagement à tenir** : la page promet un retour sous 2 jours ouvrés. C'est
> la contrepartie du lead. Un mini-audit non livré coûte plus cher qu'un
> formulaire long.

---

## 3. Prix affichés

Le « Sur devis » généralisé était le deuxième frein. Tous les tarifs du
catalogue sont désormais publics (`showPrices` actif sur `/sites-web` et
`/design`, déjà actif sur `/community-management` et `/refonte-site-pme`), y
compris sur les 6 packs combinés et dans les métadonnées.

Ils sont aussi repris en **JSON-LD** (`PriceSpecification`), avec une règle
stricte : « à partir de » devient `minPrice`, jamais `price`, et un montant non
parsable (« à partir de 80 €/support ») n'est pas balisé du tout plutôt que
d'être approximé.

Seule exception conservée : l'accompagnement automatisation, réellement non
standardisable.

### Structure des offres (révisée le 26/08/2026)

Les six packs, chiffrés au jugé un par un, sont devenus **cinq parcours nommés
par la situation du client** — pas par leur contenu. Un prospect ne se demande
pas « quel pack contient un logo », il se demande « je pars de zéro » ou « j'ai
déjà quelque chose qui ne marche plus ».

| Parcours | Situation | Prix |
|---|---|---|
| Identité & réseaux | Activité lancée, pas encore d'image | 1 050 € |
| **Lancement** | Part de zéro | **2 700 €** / 3 150 € (WordPress) |
| Lancement e-commerce | Vend en ligne | 4 100 € |
| Relance | A déjà tout, ça ne travaille plus | 2 250 € |
| Délégation | Ne veut plus s'en occuper | 4 200 € / 5 650 € (e-commerce) |

Deux packs quasi identiques (Présence Web et Web + Social Starter) ont été
fusionnés dans Lancement : ils décrivaient le même client et se
cannibalisaient.

Le `highlight` visuel est passé de l'All-In-One — le plus cher — à Lancement.
Mettre en avant l'offre la plus chère fait lire « pas pour moi » ; on met en
avant celle que la majorité devrait acheter.

**Règle de calcul, à respecter pour tout nouveau pack** : prix = somme des
prestations incluses × (1 − remise), arrondi à 50 €, remise 15 % (20 % sur
Délégation). Un pack ne descend jamais sous le prix de sa prestation la plus
chère. Toute configuration qui change la base de calcul porte deux prix.

### Récurrent : deux familles distinctes

Le catalogue plafonnait à 900 €/mois de production de contenu, sans jamais
inclure le site ni le pilotage. Une entreprise avec une équipe n'avait donc
rien à acheter en récurrent.

- **Forfaits CM** (200 à 900 €/mois) — volume de publications. Le client
  compare au prix de la publication.
- **Accompagnement mensuel** (`retainers`, 1 200 et 1 750 €/mois) — périmètre
  de responsabilité incluant site, contenus, mesure et point stratégique.
  Affiché **uniquement sur `/refonte-site-pme`** : sur une page destinée à un
  indépendant, 1 750 €/mois ne qualifie pas, il fait fermer l'onglet.

Conditions non négociables du récurrent : engagement 3 mois minimum, périmètre
chiffré ligne par ligne (au-delà : 60 €/h), rapport mensuel systématique.

> **À valider commercialement** : aucun client n'est aujourd'hui en récurrent
> haut de gamme. Avant d'investir dans la promotion de ces deux niveaux, un
> appel à SETIC Fluides et au Laboratoire Sanchez Randon — les deux profils les
> plus proches — dira en vingt minutes si le produit trouve preneur.

---

## 4. Pages métier (le vrai manque SEO)

13 pages villes existaient, 0 page métier. Créées, chacune adossée à de vrais
clients du même métier — jamais d'exemple inventé :

| Page | Preuves citées |
|---|---|
| `/site-internet-artisan` | SP Services Rénovation, Jantes 73, SETIC Fluides |
| `/site-internet-therapeute` | Laboratoire Sanchez Randon, Ostéo Animal Care, Mordant Équin |
| `/site-internet-equitation` | LM Équitation Western, Mordant Équin, Natural Riders |
| `/site-internet-architecte-interieur` | C'mieux comme ça, Le Juste Plan, SETIC Fluides |
| `/site-internet-commercant` | Jantes 73, Natural Riders |
| `/site-internet-tourisme` | Adelante Voyages, Plumes Poils & Compagnie, Rock The Outdoor |
| `/site-internet-profession-liberale` | Cabinet Johanna Alfonso, Le Juste Plan, Cime Stratégie |

L'accueil ne décrit plus une cible unique : une rangée « Vous êtes… » y renvoie
vers ces sept pages plus la piste PME. C'est le rôle d'un accueil — un
aiguillage, pas un discours qui exclut. La niche reste entière là où elle sert
le référencement, sans rétrécir la porte d'entrée.

Chacune porte une limite honnête assumée (ce que PeakCL ne fait pas), un budget
affiché, une FAQ propre et son JSON-LD `Service` + `FAQPage`.

Maillage : registre unique dans `src/seo/metiers.ts`, d'où sont dérivés les
deux footers et `llms.txt`. Les pages villes pointent vers les pages métier
(bloc « Votre métier, en particulier »), et les pages métier vers les pages
villes. C'est ce croisement qui fait un maillage plutôt que deux listes
parallèles.

**Toute nouvelle page métier** doit être ajoutée dans `src/seo/metiers.ts`, sa
route créée, et son URL ajoutée à `public/sitemap.xml` (le générateur horodate
les URL existantes, il n'en ajoute pas).

---

## 5. Positionnement

- Liens Malt / Fiverr / ComeUp **retirés** des deux footers. Ils envoyaient le
  visiteur comparer les prix sur des places de marché low-cost au moment précis
  où il évaluait une prestation à 2 000 €. Les URL sont conservées en
  commentaire dans `src/lib/links.ts` pour que la décision reste lisible.
- E-mail public basculé de `peakcl73@gmail.com` vers `charlotte@peakcl.com`
  partout (site, JSON-LD, `llms.txt`).

---

## 6. Ce qui reste à faire, hors code

Rien de tout ça ne se fait depuis le dépôt.

### Immédiat
1. **GA4** : propriété `G-ZCYTT94MMH`, ID codé dans `src/lib/tracking.ts` depuis le
   26/08/2026 — il était absent du build et GA4 ne se chargeait pas du tout.
   Reste à marquer `generate_lead` comme **événement clé** (Admin → Événements).
2. **HubSpot** : `HUBSPOT_FORM_GUID` vérifié en production le 26/08/2026 — la
   sonde `/api/hubspot-lead` répond `skipped: no_email` et non
   `skipped: no_form_guid`, ce qui prouve que le GUID est bien lu.
3. **Test de bout en bout** : remplir `/diagnostic` avec sa propre adresse,
   vérifier l'arrivée dans Netlify Forms **et** dans HubSpot.
4. **Pipeline HubSpot** : renommer les étapes (voir
   `docs/hubspot-mise-en-place.md`, section 5). 0 transaction pour 60 contacts
   reste l'angle mort principal.

### Baseline à figer (état zéro au 26/08/2026)
À relever une fois, et à comparer chaque mois :

- Search Console : impressions, clics, CTR, position moyenne, **nombre de
  requêtes distinctes**, en séparant requêtes de marque (« peakcl »,
  « charlotte lacroix ») et requêtes commerciales (« création site internet
  savoie », « site internet thérapeute »…). C'est la seconde courbe qui compte.
- GA4 : utilisateurs, sources, pages d'entrée, `generate_lead`.
- Google Business Profile : vues, recherches, clics site, appels, itinéraires.
- HubSpot : contacts, RDV, devis, signatures, CA — par source.

### Structurel
- **Google Business Profile** : le levier local le plus sous-exploité. Photos,
  publications régulières, avis (5/5 sur 5 avis et 5/5 sur 50 avis ne racontent
  pas la même histoire), liens vers les pages villes, cohérence NAP.
- **UTM systématiques** sur tout lien sortant (bio Instagram, LinkedIn,
  prospection, newsletter). Sans marquage, le trafic finit en `(direct)` et
  aucune décision d'arbitrage n'est possible.
- **Études de cas** : `docs/gabarit-etude-de-cas.md` attend toujours des notes
  brutes. Priorité Ikami, Adelante Voyages, Laboratoire Sanchez Randon. Les
  pages métier citent déjà ces clients en preuve courte — une étude de cas
  complète leur donnerait une URL propre et un contenu citable par les moteurs
  génératifs.
