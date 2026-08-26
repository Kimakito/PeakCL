# HubSpot sur peakcl.com, mise en place

Etat au 18/08/2026. Portail HubSpot 149057275 (heberge UE).

---

## 1. Ce qui est fait, cote code

| Chantier | Fichiers | Etat |
|---|---|---|
| Banniere de consentement cookies | `src/lib/consent.ts`, `src/components/CookieConsent.tsx` | fait |
| GA4 + tracking HubSpot sous consentement | `src/lib/tracking.ts`, `src/components/Analytics.tsx` | fait |
| Vues de page SPA (HubSpot + GA4) | `src/components/Analytics.tsx` | fait, 25/08/2026 |
| Formulaires vers HubSpot | `netlify/edge-functions/hubspot-lead.ts`, `src/lib/funnel.ts` | fait, en attente du GUID |
| Bascule Calendly vers HubSpot Meetings | `src/lib/links.ts`, `src/components/BookingEmbed.tsx` | prete, en attente du lien |
| CSP ouverte a HubSpot et GA4 | `netlify/edge-functions/security-headers.ts` | fait |
| Politique de confidentialite a jour | `src/routes/politique-confidentialite.tsx` | fait |
| Pipeline deals | HubSpot (reglages) | a faire a la main, voir section 5 |

Les 15 occurrences en dur de l'URL Calendly sont remplacees par une constante unique, `BOOKING_URL` dans `src/lib/links.ts`. Le composant d'embed detecte tout seul le fournisseur d'apres l'URL : changer cette seule ligne fait basculer tout le site.

---

### Vues de page en navigation interne

Le site est une SPA : le loader HubSpot et `gtag('config')` ne comptent qu'une seule vue, celle du chargement initial. `Analytics.tsx` pousse donc manuellement `setPath` + `trackPageView` (HubSpot) et un evenement `page_view` (GA4) a chaque changement de route, la premiere vue exclue puisque les deux scripts la comptent deja eux-memes. Sans cela, un visiteur qui parcourt cinq pages n'en laisse qu'une dans les deux outils.

---

## 2. Ce que tu dois faire dans HubSpot

### Etape A, creer le formulaire qui recoit les leads

1. HubSpot > **Marketing** > **Formulaires** > **Creer un formulaire** > type **Integre**.
2. Nomme-le `Site PeakCL, leads`.
3. Ajoute **exactement ces 7 champs**, ni plus ni moins :
   `E-mail`, `Prenom`, `Nom`, `Numero de telephone`, `Nom de l'entreprise`, `Site web`, `Message`.
4. Publie-le. Tu n'as pas besoin de l'afficher nulle part, il sert uniquement de receptacle a l'API.
5. Recupere son **GUID** : il est dans l'URL de l'editeur, apres `/editor/`. Format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

> Pourquoi ces 7 champs precisement : l'API HubSpot rejette **toute** la soumission si un seul champ envoye n'existe pas sur le formulaire. Un champ oublie ici, et aucun lead n'arrive, sans le moindre message d'erreur cote site. Ce sont toutes des proprietes natives de contact, il n'y a aucune propriete personnalisee a creer.

Toutes les reponses de qualification (chiffre d'affaires, problematique, engagement, etc.) sont regroupees dans le champ `Message`, lisible directement sur la fiche contact.

### Etape B, creer le lien de rendez-vous

1. HubSpot > **Bibliotheque** > **Reunions** > **Creer un lien de reunion**.
2. Connecte ton agenda (Google, celui de charlotte@peakcl.com).
3. Regle la duree, les plages de disponibilite et le fuseau (Europe/Paris).
4. Copie le lien. Il ressemble a `https://meetings-eu1.hubspot.com/charlotte-lacroix`.

### Etape C, creer la propriete GA4

Si tu n'as pas encore de propriete Google Analytics 4 : analytics.google.com > Administration > Creer une propriete. Recupere l'identifiant de mesure, au format `G-XXXXXXXXXX`.

---

## 3. Variables d'environnement Netlify

Netlify > ton site > **Site configuration** > **Environment variables** > Add.

| Cle | Valeur | Si absente |
|---|---|---|
| `HUBSPOT_FORM_GUID` | le GUID de l'etape A | les formulaires n'envoient rien a HubSpot, le site fonctionne normalement |
| `HUBSPOT_PORTAL_ID` | `149057275` | valeur par defaut deja codee, facultatif |
| `VITE_GA4_ID` | facultatif, surcharge l'ID par defaut | l'ID `G-ZCYTT94MMH` code dans `src/lib/tracking.ts` s'applique |

Aucune de ces variables n'est bloquante : le site se deploie et fonctionne sans elles. C'est volontaire, pour que le deploiement ne depende pas de ton avancement cote HubSpot.

**Si tu changes `VITE_GA4_ID`, redeploie** : c'est une variable de build, figee dans le bundle. Les deux autres sont lues a l'execution par l'edge function et prennent effet immediatement. L'ID GA4 par defaut vit desormais dans `src/lib/tracking.ts` : la variable n'est plus necessaire au fonctionnement, seulement pour pointer une autre propriete.

---

## 4. Basculer de Calendly vers HubSpot Meetings

Une seule ligne, dans `src/lib/links.ts` :

```ts
export const BOOKING_URL = "https://calendly.com/peakcl73/faisons-connaissance";
```

Remplace par le lien de l'etape B :

```ts
export const BOOKING_URL = "https://meetings-eu1.hubspot.com/charlotte-lacroix";
```

Tout suit : boutons, embed sur `/merci-brief`, widget, liens de secours. Rien d'autre a toucher.

Une fois la bascule confirmee en production, retire `https://assets.calendly.com` et `https://calendly.com` de la CSP dans `netlify/edge-functions/security-headers.ts`, et supprime le dossier `_to_delete/` a la racine du projet (il contient l'ancien composant Calendly, que je n'ai pas pu supprimer moi-meme).

---

## 5. Pipeline deals, a faire a la main

Je n'ai pas pu l'automatiser : le connecteur HubSpot expose la lecture et l'ecriture des transactions, mais pas la configuration des pipelines, qui releve des reglages du portail.

HubSpot > **Reglages** > **Objets** > **Transactions** > onglet **Pipelines**.

Le plan gratuit n'autorise **qu'un seul pipeline**. Ne cherche pas a en creer un second : renomme les etapes du pipeline `Sales Pipeline` existant, qui sont encore en anglais et ne correspondent pas a ton echelle de valeur.

Correspondance proposee, alignee sur ta strategie de prospection :

| Etape actuelle | A renommer en | Probabilite |
|---|---|---|
| Appointment Scheduled | Mini-audit envoye | 10 % |
| Qualified To Buy | Appel R1 realise | 25 % |
| Presentation Scheduled | Audit 500 € vendu | 50 % |
| Decision Maker Bought-In | Devis refonte envoye | 70 % |
| Contract Sent | Devis accepte | 90 % |
| Closed Won | Signe | 100 % |
| Closed Lost | Perdu | 0 % |

Tu as **0 transaction** dans le CRM aujourd'hui pour 60 contacts. C'est le vrai angle mort : tu ne peux rien prevoir ni prioriser sans pipeline.

---

## 6. A tester apres deploiement

1. **Banniere** : navigation privee, la banniere s'affiche. Onglet Reseau des outils de developpement, avant tout clic : aucune requete vers `googletagmanager.com` ni `hs-scripts.com`. Si tu en vois une, quelque chose ne va pas.
2. **Refus** : clique sur « Tout refuser », recharge la page. Toujours aucune requete vers ces domaines, et la banniere ne revient pas.
3. **Acceptation** : « Gerer mes cookies » en pied de page, puis « Tout accepter ». Les deux scripts se chargent. Dans GA4, le rapport temps reel doit te voir.
4. **Formulaire** : remplis `/reservation-appel` avec ta propre adresse. Verifie que le contact apparait dans HubSpot sous une minute, avec le recapitulatif dans le champ Message. Verifie aussi qu'il est toujours dans Netlify Forms : les deux doivent recevoir.
5. **Doublon** : resoumets le meme formulaire avec le meme e-mail. HubSpot doit mettre a jour le contact existant, pas en creer un second.
6. **En-tetes** : `npm run headers:check`.

---

## 7. Limites et points en suspens

- **Je n'ai pas pu lancer `npm run build`.** Ton `node_modules` contient les binaires macOS d'esbuild, et l'environnement ou je travaille est sous Linux : le build echoue sur `scripts/generate-llms-txt.mjs` avant meme d'atteindre mon code. La verification de types (`npx tsc --noEmit`) et le lint passent tous les deux sans erreur, mais **lance un `npm run build` en local avant de deployer**, je ne peux pas te garantir le build a ta place.
- **La CSP reste en Report-Only.** Les nouveaux domaines HubSpot et Google y sont ajoutes, mais rien ne bloquera si j'en ai oublie un : tu verras seulement un avertissement en console. Regarde la console apres deploiement, c'est le moment ou jamais de completer la liste.
- **`src/content/peakcl/trame-prospection-markdown.ts`** mentionne encore « Calendly direct » dans le texte de ta trame de prospection. C'est de la prose, pas un lien : a mettre a jour quand tu auras bascule.
- **`CONTACT.email` vaut toujours `peakcl73@gmail.com`** dans `src/lib/links.ts`, alors que ta boite pro `charlotte@peakcl.com` est operationnelle depuis le 10/08. Sans rapport avec HubSpot, mais c'est l'adresse affichee publiquement sur tout le site.
- **Deux tunnels concurrents subsistent.** `/reservation-appel` et `/diagnostic` posent les memes questions et aboutissent tous deux a `/merci-brief`. Brancher HubSpot ne resout pas ca, et tant qu'ils coexistent tu ne pourras attribuer aucun resultat a l'un ou a l'autre.
