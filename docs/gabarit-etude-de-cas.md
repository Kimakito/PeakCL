# Gabarit d'étude de cas — à remplir en notes brutes

À quoi ça sert : les 19 projets du portfolio ont 200 à 400 caractères de
description. C'est bon pour une carte, pas pour une étude de cas. Ce qui manque
n'est pas de la mise en forme, c'est de l'information que toi seule as.

Comment le remplir : en vrac, sans rédiger. Des phrases coupées, des bouts de
souvenirs, des chiffres approximatifs annotés « à peu près » — tout ça se
travaille. Ce qui ne se travaille pas, c'est le vide.

Ne remplis pas un champ dont tu n'as pas la réponse : laisse-le vide et écris
« je ne sais pas ». Une case vide se contourne à la rédaction, une case
inventée rend l'étude invérifiable — donc sans valeur ni pour Google ni pour
une IA qui cherche une source à citer.

---

## Pourquoi ces questions-là

Une IA connaît déjà « un site responsive améliore l'expérience utilisateur ».
Elle ne connaît pas « le WordPress de la cliente chargeait en 8 secondes à
cause de 40 plugins, j'ai tout repris en statique ». La deuxième phrase
n'existe que chez toi : c'est elle qui est citable.

Le format `problème → contexte → décision → méthode → résultat → limite`
n'est pas un carcan marketing. C'est la structure d'un raisonnement, et c'est
exactement ce qu'un moteur génératif sait récupérer et restituer.

---

## Fiche projet

Duplique ce bloc pour chaque projet. Priorité : **Ikami**, **Adelante
Voyages**, **Laboratoire Sanchez Randon**.

### Projet : ...........................

**1. L'état avant.**
Qu'est-ce qui existait ? Rien du tout, un site fait par quelqu'un d'autre, une
page Facebook seule ? Qu'est-ce qui coinçait concrètement — lenteur, pas de
mobile, introuvable sur Google, image qui ne ressemblait pas au métier,
impossible à mettre à jour sans t'appeler ?

>

**2. Ce que le client voulait.**
En une phrase, dans ses mots à lui si tu t'en souviens. Pas « améliorer sa
présence digitale » : « qu'on arrête de l'appeler pour des questions dont la
réponse devrait être sur le site ».

>

**3. Une décision que tu as prise, et pourquoi celle-là.**
Le cœur de l'étude de cas. Un arbitrage technique ou éditorial : WordPress
plutôt que sur-mesure (ou l'inverse) et sur quel critère ; avoir viré une
fonctionnalité que le client demandait ; avoir structuré les pages d'une
certaine façon ; un choix de couleurs contre-intuitif. Ce qui compte, c'est le
**pourquoi** — c'est ce que personne d'autre ne peut écrire.

>

**4. Ce qui a changé après.**
Un chiffre si tu en as un (position Google, délai de chargement, nombre de
demandes par mois, temps que le client y passe). **Si tu n'as pas de chiffre,
ne l'invente pas** : un fait observable suffit et vaut mieux. « Elle publie
seule depuis deux ans », « les demandes arrivent par le formulaire au lieu du
téléphone », « le client a arrêté de me rappeler pour des modifs » sont des
résultats réels et vérifiables.

>

**5. Une limite honnête.**
Ce que le projet ne fait pas, ce que tu ferais autrement aujourd'hui, ou une
partie qui n'est pas de toi. Contre-intuitif mais c'est ce qui rend le reste
crédible — et c'est déjà ta pratique dans `scopeNote`.

>

**6. Autorisation.**
Le client accepte-t-il d'être cité nommément, avec un lien vers son site ?
Oui / Non / À demander. Si non, l'étude peut être anonymisée par secteur
(« un cabinet d'architecture en Savoie »), c'est moins fort mais utilisable.

>

---

## Ce que j'en fais ensuite

1. Rédaction de l'étude à partir de tes notes, dans ta voix — relecture par
   toi avant toute mise en ligne.
2. Route dédiée `/etudes-de-cas/<projet>`, une URL par projet.
3. Page index `/etudes-de-cas` reliée depuis le portfolio et les pages
   services concernées.
4. JSON-LD : `Article` avec `author` pointant vers l'@id Charlotte Lacroix et
   `about` vers le client, rattaché au graphe d'entités existant.
5. Ajout au `sitemap.xml` et reprise automatique dans `llms.txt` (le
   générateur lit les modules de contenu, donc rien à maintenir en double).

Trois projets suffisent pour commencer. Mieux vaut trois études denses et
vraies que dix pages creuses : c'est exactement le contenu générique que la
stratégie GEO cherche à éviter.
