# PeakCL : à coller, prêt à l'emploi

## Liens de la fiche (récupérés, vérifiés)

| Usage | Lien |
|---|---|
| Fiche (partage, signature, schema) | `https://maps.google.com/?cid=7966730877774683497` |
| Demande d'avis | `https://g.page/r/CWld5RaGg49uEBM/review` |

La forme `?cid=` est l'URL canonique de la fiche : elle ne bouge pas si le nom de la fiche change, contrairement à une URL `/maps/place/<nom>`. Testée, elle ouvre bien « PeakCL : Charlotte Lacroix ».

---

## 2. Signature e-mail

```
Charlotte Lacroix
PeakCL · Sites internet, identité visuelle et réseaux sociaux
Gilly-sur-Isère (Savoie) et partout en France en visio
07 43 51 76 27 · peakcl73@gmail.com
peakcl.com
Avis clients : https://maps.google.com/?cid=7966730877774683497
```

Le lien vers la fiche sous le site, pas au-dessus : le site reste l'appel à l'action principal.

---

## 3. Bio Instagram

Ligne à ajouter ou à remplacer dans les liens du profil, libellé :

```
Avis clients Google
```
pointant vers `https://maps.google.com/?cid=7966730877774683497`.

Si tu n'as qu'un seul lien disponible, ne remplace pas peakcl.com/brief. Mets la fiche en second lien dans ton Linktree ou ta page de liens.

---

## 4. Relance d'avis (à envoyer après chaque projet livré)

```
Bonjour {prénom},

Le site est en ligne et vous en êtes contente, c'est le plus important.

Si vous avez deux minutes, un avis Google m'aide beaucoup à être trouvée
par des personnes dans votre situation :
https://g.page/r/CWld5RaGg49uEBM/review

Merci d'avance, et bonne continuation.

Charlotte
```

---

## 5. JSON-LD : déjà fait dans le code

Modifié directement dans ton dépôt, non commité :

- `src/lib/links.ts` : nouvelle constante `GOOGLE_BUSINESS` (`profile` + `review`)
- `src/seo/jsonld.ts` : `GOOGLE_BUSINESS.profile` ajouté à `SAME_AS`, qui alimente les deux blocs `ProfessionalService` et `Person`

`tsc --noEmit` passe, Prettier ne réclame rien.

Après déploiement, vérifier sur https://search.google.com/test/rich-results avec l'URL `https://peakcl.com/qui-suis-je`.
