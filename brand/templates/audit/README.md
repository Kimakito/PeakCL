# Template d'audit PeakCL

`template-audit.html` — gabarit d'audit **tous types** (SEO, site web, réseaux sociaux, identité de marque), aux couleurs et polices de la charte : encre indigo `#13004D`, violet `#360099`, lavande `#875FD5`, bleu `#427CFF`, jaune `#F2D04B` · titres **Baloo 2**, corps **Nunito**.

Le HTML n'est pas un livrable : c'est la **source** destinée à être importée dans Google Docs.

## Le Google Doc

Template vivant dans le Drive → dossier **PeakCL** :
[PeakCL — Template d'audit (à dupliquer)](https://docs.google.com/document/d/1RIzzCA8qS8u3a8p04YK_jvgM2RQijta-toRIX2cvlUI/edit)

Usage : **Fichier → Créer une copie** pour chaque client. Ne jamais écrire dans le template lui-même.

## Structure

| # | Section | Rôle |
|---|---------|------|
| — | Couverture | Logo, type d'audit, client, périmètre, date, validité des constats |
| — | Mode d'emploi | Conventions de remplissage — **à supprimer avant envoi** |
| 1 | L'essentiel en une page | Note globale par axe (7 axes /5), 3 constats clés, ce qui va déjà bien |
| 2 | Contexte & objectifs | Activité, cible, objectif de l'audit, concurrents observés |
| 3 | Méthode & périmètre | Ce qui a été analysé, outils, **hors périmètre** |
| 4 | Constats détaillés | Un bloc par constat : constat / preuve / impact / reco / priorité-effort |
| 5 | Plan d'action priorisé | Tableau trié, plus 3 quick wins à 30 jours |
| 6 | Et maintenant ? | Faire seul vs déléguer, coordonnées |

## Conventions

- **Priorités** — P1 bloquant (< 30 j) · P2 important (< 3 mois) · P3 confort.
- **Effort** — S < ½ journée · M 1 à 3 jours · L > 1 semaine ou prestataire externe.
- **Un constat sans preuve n'existe pas.** Capture, chiffre, URL ou extrait d'outil, systématiquement.
- **Toujours une section « ce qui va bien ».** Un audit uniquement à charge n'est pas crédible et se fait rejeter.
- Les axes non concernés se suppriment en partie 4 : l'ossature tient sans eux.

## Polices dans Google Docs

Baloo 2 et Nunito ne sont pas dans la liste par défaut. Une fois par compte :
Docs → menu des polices → *Plus de polices* → chercher « Baloo 2 » puis « Nunito » → *OK*.
Elles restent disponibles ensuite dans tous les documents.

## Logo

Chargé depuis `https://peakcl.com/peakcl/logo-mark.png` (source : `public/peakcl/logo-mark.png`).
Google Docs télécharge et **incorpore** l'image au moment de l'import — un doc déjà créé ne casse donc pas si l'URL bouge, mais tout nouvel import échouerait.

## Régénérer le Google Doc après modification du HTML

L'API Drive ne sait pas écraser un Doc existant : il faut en créer un nouveau puis supprimer l'ancien.
Alternative manuelle : ouvrir le HTML dans Chrome, tout copier, coller dans un Doc vierge — la mise en forme suit.

## Aperçu local

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --window-size=850,1400 --screenshot=apercu.png \
  "file://$PWD/template-audit.html"
```
