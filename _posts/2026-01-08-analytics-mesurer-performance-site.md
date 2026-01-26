---
layout: article
title: "Google Analytics / Mesurer performance site : comprendre si votre site fonctionne (sans être data analyst)"
description: "Google Analytics expliqué simplement : installer, comprendre les chiffres qui comptent VRAIMENT, prendre des décisions. Guide pratique pour entrepreneurs."
date: 2026-01-08
author: Charlotte Lacroix
categories: [conseils]
tags:
  - analytics
  - statistiques
  - performance
  - Google Analytics
  - développeur web Savoie
image: /assets/images/analytics.webp
canonical: https://peakcl.com/conseils/2026/01/08/analytics-mesurer-performance-site.html
reading_time: 11
excerpt: "Combien de visiteurs ? D'où viennent-ils ? Que font-ils ? Google Analytics répond à ces questions. Je vous explique comment l'installer et comprendre les chiffres qui comptent (sans devenir data analyst)."
toc: true
featured: true
---

# Analytics / Mesurer la performance de votre site : le guide entrepreneur

**La question qu'on me pose SOUVENT :**  
*"Mon site fonctionne bien ?"*

**Ma réponse :**  
*"Combien de visiteurs avez-vous eu ce mois-ci ?"*

**Leur réponse (90% du temps) :**  
*"Aucune idée..."*

**→ C'est un problème.**

## Pourquoi mesurer la performance de votre site ?

**Analogie simple :**

```
┌──────────────────────────────────────────────┐
│ COMMERCE PHYSIQUE vs SITE WEB                │
├──────────────────────────────────────────────┤
│ 🏪 MAGASIN PHYSIQUE                          │
│ Vous savez EXACTEMENT :                      │
│ • Combien de clients entrent                 │
│ • Combien achètent                           │
│ • Quel rayon marche le mieux                 │
│ • Les heures de pointe                       │
│                                              │
│ 🌐 SITE WEB (sans analytics)                 │
│ Vous NE savez PAS :                          │
│ • Combien de visiteurs                       │
│ • D'où ils viennent                          │
│ • Ce qu'ils font sur le site                 │
│ • Pourquoi ils partent                       │
│                                              │
│ → Vous pilotez à l'aveugle ❌                │
└──────────────────────────────────────────────┘
```

**Mesurer = Comprendre = Améliorer.**

---

## Google Analytics, c'est quoi ?

**Définition simple :**  
Un outil **gratuit** de Google qui vous dit **tout** sur vos visiteurs.

**Ce que Analytics vous dit :**
- Combien de visiteurs (par jour/semaine/mois)
- D'où ils viennent (Google, Facebook, lien direct)
- Quelles pages ils visitent
- Combien de temps ils restent
- Quel appareil (mobile, ordinateur, tablette)
- Leur localisation (ville, pays)
- Nouveaux visiteurs vs visiteurs récurrents

**Le TOUT gratuitement.**

---

## Les 7 chiffres qui comptent VRAIMENT

**Google Analytics affiche 200+ métriques.**  
**90% sont inutiles pour un petit site.**

**Voici les 7 chiffres à surveiller :**

### 1️⃣ Nombre de visiteurs

**Métrique :** "Utilisateurs"

**C'est quoi ?**  
Combien de **personnes différentes** ont visité votre site.

**Exemple :**
- Janvier : 250 visiteurs
- Février : 320 visiteurs
- Mars : 410 visiteurs

**📊 Bon signe :**  
Augmentation régulière → Votre site gagne en visibilité.

**📉 Mauvais signe :**  
Stagnation ou baisse → Il faut agir (SEO, pub, contenu).

---

### 2️⃣ Nouvelles visites vs Visiteurs récurrents

**Métriques :**  
"Nouveaux utilisateurs" vs "Utilisateurs connus"

**C'est quoi ?**
- **Nouveaux :** 1ère visite sur votre site
- **Récurrents :** Déjà venus avant

**📊 Ratio idéal :**  
**70% nouveaux / 30% récurrents**

**Pourquoi c'est important ?**

**Beaucoup de nouveaux (90%+) :**  
→ Bon pour l'acquisition  
→ Mais les gens ne reviennent pas (contenu pas assez intéressant ?)

**Beaucoup de récurrents (70%+) :**  
→ Gens fidèles  
→ Mais pas assez de nouveaux clients

---

### 3️⃣ Taux de rebond (bounce rate)

**Métrique :** "Taux de rebond"

**C'est quoi ?**  
Le % de visiteurs qui quittent **immédiatement** sans visiter d'autre page.

**Exemple :**
- 100 visiteurs arrivent sur votre page d'accueil
- 60 partent sans cliquer nulle part
- **Taux de rebond = 60%**

**📊 Bon taux de rebond :**
- Site vitrine : **40-60%** = Correct
- Blog : **70-90%** = Normal (les gens lisent l'article et partent)
- E-commerce : **20-40%** = Bon

**📉 Mauvais taux de rebond (80%+) :**  
→ Les gens ne trouvent pas ce qu'ils cherchent  
→ Site lent  
→ Mauvaise première impression

**Solutions :**
- Améliorer le design
- Accélérer le site
- Clarifier votre message
- Ajouter des appels à l'action

---

### 4️⃣ Durée moyenne de la session

**Métrique :** "Durée moyenne de session"

**C'est quoi ?**  
Combien de temps (en moyenne) un visiteur reste sur votre site.

**📊 Durées moyennes :**
- Site vitrine : **1-3 minutes** = Bon
- Blog : **3-6 minutes** = Bon (ils lisent)
- E-commerce : **4-8 minutes** = Bon (ils explorent)

**⏱️ Moins de 30 secondes :**  
→ Problème grave (site pas intéressant, trop lent, mal ciblé)

**⏱️ Plus de 5 minutes (site vitrine) :**  
→ Très bon signe (engagement élevé)

---

### 5️⃣ Pages vues par session

**Métrique :** "Pages/session"

**C'est quoi ?**  
Combien de pages un visiteur regarde en moyenne.

**📊 Pages idéales :**
- Site vitrine : **2-4 pages** = Bon
- Blog : **1,5-2 pages** = Normal
- E-commerce : **4-8 pages** = Bon

**📉 Moins de 1,5 page :**  
→ Taux de rebond élevé (les gens ne naviguent pas)

**📈 Plus de 5 pages (site vitrine) :**  
→ Excellent ! Les gens explorent votre site.

---

### 6️⃣ Sources de trafic

**Métrique :** "Acquisition → Tout le trafic → Canaux"

**C'est quoi ?**  
D'OÙ viennent vos visiteurs.

**Les 5 sources principales :**

```
┌──────────────────────────────────────────────┐
│ SOURCES DE TRAFIC                            │
├──────────────────────────────────────────────┤
│ 🔍 ORGANIC SEARCH (Google, Bing)             │
│    → Recherche gratuite (SEO)                │
│    → OBJECTIF : 40-60% du trafic             │
│                                              │
│ 💰 PAID SEARCH (Google Ads)                  │
│    → Publicité payante                       │
│    → Si vous faites des campagnes            │
│                                              │
│ 🔗 DIRECT                                    │
│    → Tapent l'URL directement                │
│    → Ont votre carte de visite               │
│    → Visiteurs fidèles                       │
│    → OBJECTIF : 20-30%                       │
│                                              │
│ 📱 SOCIAL (Facebook, Instagram, LinkedIn)    │
│    → Réseaux sociaux                         │
│    → OBJECTIF : 10-20%                       │
│                                              │
│ 🔗 REFERRAL (autres sites)                   │
│    → Liens depuis d'autres sites             │
│    → Annuaires, partenaires, articles        │
│    → OBJECTIF : 5-15%                        │
└──────────────────────────────────────────────┘
```

**💡 Pourquoi c'est important ?**

**Trop dépendant d'1 source = risque.**

**Exemple :**  
90% de votre trafic vient de Google Ads  
→ Vous arrêtez de payer → Plus de visiteurs.

**Mieux :**  
Diversification (50% Google, 30% direct, 20% social).

---

### 7️⃣ Taux de conversion (le plus important)

**Métrique :** "Conversions" (à configurer)

**C'est quoi ?**  
Le % de visiteurs qui font l'ACTION que vous voulez.

**Actions possibles :**
- Remplir le formulaire de contact
- Appeler le numéro de téléphone
- Acheter un produit (e-commerce)
- S'inscrire à la newsletter
- Télécharger un PDF

**📊 Taux de conversion moyens :**
- Formulaire contact : **2-5%** = Bon
- Achat e-commerce : **1-3%** = Bon
- Appel téléphone : **5-10%** = Très bon

**Calcul :**

**Exemple :**  
1000 visiteurs/mois  
30 remplissent le formulaire  
**Taux de conversion = 3%**

**💡 C'est LE chiffre qui compte.**

**Mieux vaut :**  
100 visiteurs + 5% conversion = **5 clients**

**Que :**  
1000 visiteurs + 0,5% conversion = **5 clients**

**→ Qualité > Quantité.**

---

## Installer Google Analytics (en 3 étapes)

### Étape 1 : Créer un compte Google Analytics

**Prérequis :**  
Compte Google (Gmail).

**Marche à suivre :**
1. Allez sur https://analytics.google.com
2. Cliquez "Commencer gratuitement"
3. Connectez-vous avec votre compte Google
4. Suivez l'assistant de configuration

**Infos à remplir :**
- Nom du compte (votre entreprise)
- Nom de la propriété (nom de votre site)
- Fuseau horaire (Europe/Paris)
- Devise (EUR)

---

### Étape 2 : Obtenir le code de suivi

**Google vous donne un CODE.**

**Ça ressemble à ça :**

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**À faire :**  
Copier ce code.

---

### Étape 3 : Installer le code sur votre site

**Où mettre le code ?**  
Dans le `<head>` de TOUTES les pages de votre site.

**Comment ? (selon votre site)**

#### 🔧 Site WordPress :

**Méthode 1 : Plugin (facile)**
- Installez "Site Kit by Google" (plugin officiel)
- Connectez votre compte Google
- C'est fait ✅

**Méthode 2 : Thème**
- Beaucoup de thèmes ont une option "Google Analytics ID"
- Collez juste le G-XXXXXXXXXX

---

#### 🔧 Site sur mesure (HTML/Jekyll/etc.) :

**Insérez le code dans le fichier header.**

**Exemple Jekyll (mon cas) :**  
Fichier `_includes/analytics.html`

---

**💡 Ce que JE fais pour mes clients :**

✅ **Installation complète Google Analytics**  
Configuration compte + code installé

✅ **Configuration événements**  
Tracking formulaires, clics téléphone, téléchargements

✅ **Dashboards personnalisés**  
Vue simplifiée avec les 7 chiffres qui comptent

✅ **Formation 30 min**  
Comment lire vos statistiques

---

## Utiliser Google Analytics (guide pratique)

### Où regarder les statistiques ?

**1. Tableau de bord principal**

Après connexion : https://analytics.google.com

**Vue d'ensemble :**
- Visiteurs en temps réel
- Visiteurs du jour
- Visiteurs de la semaine
- Pages les plus vues

---

### Les 3 rapports essentiels

#### 📊 Rapport 1 : Vue d'ensemble

**Menu :** Accueil

**Ce que vous voyez :**
- Graphique visiteurs (30 derniers jours)
- Sources principales
- Pages populaires
- Pays des visiteurs

**💡 À regarder :**  
1x/semaine, 5 minutes.

---

#### 📊 Rapport 2 : Acquisition (d'où viennent-ils ?)

**Menu :** Acquisition → Vue d'ensemble

**Ce que vous voyez :**
- Organic Search : X visiteurs (Google)
- Direct : X visiteurs (URL tapée)
- Social : X visiteurs (Facebook, etc.)
- Paid Search : X visiteurs (Google Ads)

**💡 Action :**  
Si Organic Search faible → Améliorer le SEO.  
Si Social faible → Poster plus sur les réseaux.

---

#### 📊 Rapport 3 : Comportement (que font-ils ?)

**Menu :** Engagement → Pages et écrans

**Ce que vous voyez :**  
Liste des pages + nombre de vues.

**Exemple :**
- /accueil : 1250 vues
- /services : 380 vues
- /contact : 210 vues
- /blog/article-1 : 95 vues

**💡 Action :**  
Pages peu vues → Améliorer le contenu ou le lien vers ces pages.  
Pages très vues → Optimiser encore plus (c'est votre atout).

---

## Comprendre les chiffres : Exemples concrets

### Scénario 1 : Site vitrine plombier

**Statistiques mensuelles :**
- Visiteurs : **150**
- Taux de rebond : **55%**
- Durée moyenne : **2 min 30**
- Sources : 60% Google, 30% direct, 10% social
- Conversions (formulaire) : **8** (5,3%)

**📊 Analyse :**

✅ **Taux de conversion excellent** (5,3%)  
✅ **Durée moyenne bonne** (2 min 30)  
✅ **Diversification sources** (pas dépendant d'une seule)

📈 **Action recommandée :**  
Augmenter le trafic (plus de visiteurs = plus de conversions).  
Stratégie : SEO local + Google Ads.

**Projection :**  
150 visiteurs → 300 visiteurs = **16 conversions/mois** au lieu de 8.

---

### Scénario 2 : Site e-commerce

**Statistiques mensuelles :**
- Visiteurs : **2500**
- Taux de rebond : **75%**
- Durée moyenne : **1 min 10**
- Pages/session : **1,8**
- Conversions (achats) : **18** (0,72%)

**📊 Analyse :**

❌ **Taux de rebond TRÈS élevé** (75%)  
❌ **Durée moyenne faible** (1 min 10)  
❌ **Taux de conversion faible** (0,72% vs 1-3% idéal)

📈 **Actions recommandées :**

1. **Améliorer page d'accueil** (réduire rebond)
2. **Faciliter la navigation** (augmenter pages/session)
3. **Optimiser tunnel d'achat** (augmenter conversion)

**Projection :**  
Passer de 0,72% → 2% conversion = **50 ventes/mois** au lieu de 18.  
**+177% de ventes** avec le MÊME trafic.

---

### Scénario 3 : Blog

**Statistiques mensuelles :**
- Visiteurs : **800**
- Taux de rebond : **82%**
- Durée moyenne : **4 min 20**
- Sources : 85% Google, 10% social, 5% direct
- Pages/session : **1,4**

**📊 Analyse :**

✅ **Durée moyenne excellente** (4 min 20 = ils lisent)  
⚠️ **Taux de rebond élevé** (normal pour un blog)  
❌ **Trop dépendant de Google** (85%)

📈 **Actions recommandées :**

1. **Diversifier trafic** (newsletter, réseaux sociaux)
2. **Ajouter liens internes** (articles liés → + pages/session)
3. **Call-to-action** en fin d'article (newsletter, contact)

---

## Erreurs fréquentes à éviter

### ❌ Erreur 1 : Ne JAMAIS regarder les stats

**Problème :**  
Vous ne savez pas si votre site fonctionne.

**Solution :**  
Regardez 1x/semaine, 5-10 minutes.  
Calendrier récurrent (tous les lundis matin).

---

### ❌ Erreur 2 : Se concentrer sur les mauvais chiffres

**Exemple :**  
"J'ai 10 000 pages vues ce mois-ci !"

**Moi :**  
"Super ! Combien de conversions ?"

**Réponse :**  
"Euh... 2."

**→ Beaucoup de trafic, mais aucun résultat.**

**💡 Focus sur CONVERSIONS, pas juste visiteurs.**

---

### ❌ Erreur 3 : Comparer à d'autres secteurs

**Erreur :**  
"Mon concurrent a 5000 visiteurs, moi 500, je suis nul."

**Réalité :**  
Son taux de conversion = 0,5% = 25 clients  
Votre taux de conversion = 5% = 25 clients

**→ MÊME résultat.**

**💡 Comparez-vous à VOUS-MÊME (mois précédent).**

---

### ❌ Erreur 4 : Paniquer après 1 mauvaise semaine

**Exemple :**  
"J'ai eu 30 visiteurs cette semaine au lieu de 50, c'est la catastrophe !"

**Réalité :**  
Variations normales (vacances, météo, saison, etc.).

**💡 Regardez les TENDANCES (3-6 mois), pas les variations hebdomadaires.**

---

## Alternatives à Google Analytics

### 📊 Matomo (ex-Piwik)

**C'est quoi ?**  
Alternative à Google Analytics, open-source.

**Avantages :**
- ✅ Données hébergées chez VOUS (RGPD-friendly)
- ✅ Pas de partage avec Google
- ✅ Fonctionnalités similaires à GA

**Inconvénients :**
- ❌ Installation plus technique
- ❌ Version gratuite limitée

**Prix :**  
Gratuit (auto-hébergé) ou 19€/mois (cloud).

**Pour qui ?**  
Entreprises très sensibles RGPD, hôpitaux, avocats.

---

### 📊 Plausible Analytics

**C'est quoi ?**  
Analytics ultra-simple, respectueux vie privée.

**Avantages :**
- ✅ Interface TRÈS simple
- ✅ Pas de cookies (pas de bandeau RGPD)
- ✅ Rapide, léger

**Inconvénients :**
- ❌ Moins de détails que GA
- ❌ Payant

**Prix :**  
9€/mois (10 000 pages vues/mois).

**Pour qui ?**  
Sites simples, blogueurs, entrepreneurs solo.

---

### 📊 Simple Analytics

**Similaire à Plausible.**

**Prix :**  
9€/mois.

---

**💡 Ma recommandation :**

**Pour 90% des sites → Google Analytics (gratuit, complet).**  
**Si très sensible RGPD → Matomo ou Plausible.**

---

## Ce que JE fais pour mes clients (PeakCL)

**Tous mes sites incluent :**

✅ **Installation Google Analytics**  
Compte créé + code installé + configuré

✅ **Tracking des conversions**  
Formulaires, clics téléphone, téléchargements PDF

✅ **Dashboard simplifié**  
Vue avec les 7 chiffres essentiels (pas 200 métriques inutiles)

✅ **Formation 30 minutes**  
Comment lire vos stats, quoi regarder, comment agir

✅ **Rapport mensuel** (option)  
Je vous envoie un résumé chaque mois (50€/mois)

**Résultat :**  
Vous savez EXACTEMENT si votre site fonctionne.

---

## Pour résumer

### ✅ Pourquoi mesurer la performance ?

1️⃣ **Savoir si votre site fonctionne**  
2️⃣ **Comprendre d'où viennent vos visiteurs**  
3️⃣ **Identifier ce qui marche (et ce qui ne marche pas)**  
4️⃣ **Prendre des décisions basées sur des données**

---

### 📊 Les 7 chiffres à surveiller

1️⃣ Nombre de visiteurs  
2️⃣ Nouveaux vs Récurrents  
3️⃣ Taux de rebond  
4️⃣ Durée moyenne session  
5️⃣ Pages/session  
6️⃣ Sources de trafic  
7️⃣ **Taux de conversion** (le plus important)

---

### 🎯 Action simple

**Regardez vos stats 1x/semaine, 10 minutes.**  
Posez-vous 3 questions :
1. Ai-je plus ou moins de visiteurs que le mois dernier ?
2. D'où viennent-ils ?
3. Combien de conversions (formulaires, appels, ventes) ?

**Ajustez selon les réponses.**

---

## Besoin d'aide avec Google Analytics ?

Vous n'avez pas Google Analytics sur votre site ?  
Vous l'avez mais ne comprenez rien aux chiffres ?

**Je vous offre :**
- Installation Google Analytics complète
- Configuration tracking conversions
- Formation personnalisée (30 min)
- Dashboard simplifié

**[📞 Demander l'installation de Google Analytics](/contact.html)**

---

*Développeur web basée à Albertville en Savoie, j'installe et configure Google Analytics sur tous mes sites. Formation incluse pour comprendre vos statistiques et prendre les bonnes décisions !*

**Besoin d'Analytics sur votre site ? [Contactez-moi](/contact.html), installation en 24h !**
