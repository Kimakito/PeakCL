# Guide Configuration Google Search Console & Analytics 4
## PeakCL.com - Janvier 2026

---

## ✅ ÉTAPE 1 : GOOGLE SEARCH CONSOLE

### Configuration initiale

**1. Accéder à Google Search Console**
- Aller sur : https://search.google.com/search-console
- Se connecter avec votre compte Google

**2. Ajouter la propriété**
- Cliquer sur "Ajouter une propriété"
- Choisir "Préfixe d'URL" : `https://peakcl.com`
- Cliquer sur "Continuer"

**3. Vérifier la propriété**

**Méthode 1 : Balise HTML (RECOMMANDÉ - déjà en place)**
- Google fournit une balise `<meta name="google-site-verification" content="...">
- Cette balise est déjà dans le header (google95bcbb54dea27959.html)
- Cliquer sur "Vérifier"

**Méthode 2 : Fichier HTML**
- Télécharger le fichier de vérification
- L'uploader à la racine du site
- Cliquer sur "Vérifier"

### Soumettre le sitemap

**Une fois la propriété vérifiée :**

1. Dans le menu de gauche, cliquer sur "Sitemaps"
2. Dans "Ajouter un nouveau sitemap", entrer : `sitemap.xml`
3. Cliquer sur "Envoyer"

**✅ Résultat attendu :**
- Status : "Réussite"
- Nombre d'URLs découvertes : ~35-40 pages

### Actions importantes dans GSC

**1. Inspecter l'URL**
- Menu : "Inspection de l'URL"
- Tester les pages clés :
  - https://peakcl.com/
  - https://peakcl.com/creation-site-vitrine.html
  - https://peakcl.com/creation-site-ecommerce.html
  - https://peakcl.com/maintenance-site-web.html
- Cliquer sur "Demander une indexation" pour chaque page

**2. Vérifier la couverture**
- Menu : "Couverture"
- Vérifier qu'il n'y a pas d'erreurs
- Pages exclues normales : chess.html (noindex)

**3. Performances**
- Menu : "Performances"
- Suivre l'évolution des positions
- Analyser les requêtes qui génèrent des clics

### Suivi régulier

**À faire chaque semaine :**
- [ ] Vérifier les nouvelles pages indexées
- [ ] Consulter les performances (requêtes, clics, positions)
- [ ] Vérifier les erreurs d'indexation

**À faire chaque mois :**
- [ ] Analyser les requêtes qui génèrent du trafic
- [ ] Identifier les opportunités de contenu
- [ ] Vérifier les Core Web Vitals

---

## 📊 ÉTAPE 2 : GOOGLE ANALYTICS 4

### Configuration dans Google Analytics

**1. Créer le compte (si pas déjà fait)**
- Aller sur : https://analytics.google.com
- Cliquer sur "Commencer à mesurer"
- Nom du compte : "PeakCL"
- Cocher "Partage de données recommandé"

**2. Créer la propriété**
- Nom de la propriété : "PeakCL.com"
- Fuseau horaire : "Europe/Paris"
- Devise : "Euro (EUR)"

**3. Renseigner les informations**
- Secteur d'activité : "Services professionnels"
- Taille de l'entreprise : "Petite (1-10 employés)"
- Utilisation prévue : "Mesurer l'engagement des utilisateurs"

**4. Créer un flux de données**
- Choisir "Web"
- URL du site web : `https://peakcl.com`
- Nom du flux : "PeakCL - Site principal"

**5. Récupérer l'ID de mesure**
- Format : `G-XXXXXXXXXX`
- Copier cet ID

### Intégration sur le site

**L'ID est déjà configuré dans `_config.yml` :**
```yaml
google_analytics: G-ZCYTT94MMH
```

**Vérification :**
- Le code GA4 est déjà inclus via `_includes/analytics.html`
- Il se charge automatiquement sur toutes les pages

### Configuration des événements de conversion

**1. Événement : Formulaire de contact**

Dans Google Analytics 4 :
- Aller dans "Configuration" > "Événements"
- Cliquer sur "Créer un événement"
- Nom : `form_submit_contact`
- Paramètres :
  - `event_name` = `form_submit`
  - `form_id` = `contact`

**Marquer comme conversion :**
- Aller dans "Configuration" > "Conversions"
- Cliquer sur "Nouvel événement de conversion"
- Sélectionner `form_submit_contact`

**2. Événement : Clic sur CTA devis**

Créer un événement personnalisé :
- Nom : `click_cta_devis`
- Condition : clic sur bouton avec texte "Demander mon devis"

**3. Événement : Visite page services**

Créer un événement :
- Nom : `view_service_page`
- Condition : URL contient `/creation-site-` ou `/maintenance-`

### Code de suivi des événements (optionnel - avancé)

Si vous voulez tracker manuellement :

```javascript
// Ajouter dans assets/js/main.js

// Track CTA clicks
document.querySelectorAll('a[href="#contact"]').forEach(link => {
  link.addEventListener('click', () => {
    gtag('event', 'click_cta_contact', {
      'event_category': 'engagement',
      'event_label': link.textContent.trim()
    });
  });
});

// Track service page views
if (window.location.pathname.includes('/creation-site-') || 
    window.location.pathname.includes('/maintenance-')) {
  gtag('event', 'view_service_page', {
    'page_path': window.location.pathname
  });
}
```

### Vérification en temps réel

**1. Tester immédiatement**
- Dans GA4, aller sur "Rapports" > "Temps réel"
- Ouvrir votre site dans un autre onglet
- Naviguer sur plusieurs pages
- Vérifier que les visites apparaissent dans "Temps réel"

**2. Vérifier les événements**
- Dans "Temps réel" > "Événement par nom d'événement"
- Cliquer sur un CTA ou soumettre le formulaire
- Vérifier que l'événement apparaît

---

## 🎯 ÉTAPE 3 : TABLEAUX DE BORD & RAPPORTS

### Rapport personnalisé : Performance SEO

**Créer dans GA4 :**
1. "Bibliothèque" > "Créer un rapport"
2. Nom : "Performance SEO Mensuel"
3. Dimensions :
   - Page de destination
   - Source/support
   - Requête de recherche (si lié à GSC)
4. Statistiques :
   - Utilisateurs
   - Sessions
   - Taux de rebond
   - Conversions (form_submit_contact)

### Rapport : Pages services les plus performantes

**Créer un segment :**
1. "Exploration" > "Créer une exploration"
2. Filtre : URL de page contient `/creation-site-` ou `/maintenance-`
3. Statistiques :
   - Vues
   - Durée moyenne
   - Taux de conversion
   - Clics sur CTA

### Objectifs mensuels à suivre

**Dashboard à créer (Excel ou Google Sheets) :**

| Métrique | Janvier | Février | Mars | Avril | Mai | Juin |
|----------|---------|---------|------|-------|-----|------|
| **Trafic** |
| Visites totales | 300-600 | 400-700 | 600-900 | 800-1200 | 1000-1500 | 1200-2000 |
| Trafic organique | 150-300 | 250-400 | 400-600 | 600-900 | 800-1200 | 1000-1500 |
| **Conversion** |
| Formulaires envoyés | 3-6 | 5-10 | 10-15 | 15-25 | 20-35 | 24-60 |
| Taux de conversion | 1% | 1.2% | 1.5% | 1.8% | 2% | 2-3% |
| **Engagement** |
| Pages/session | 2.5 | 2.8 | 3 | 3.2 | 3.5 | 3.5 |
| Durée moyenne | 1m30 | 1m45 | 2m | 2m15 | 2m30 | 2m30 |
| Taux de rebond | 60% | 55% | 50% | 45% | 40% | 35% |

---

## 🔗 ÉTAPE 4 : LIER GSC ET GA4

### Intégration Search Console dans Analytics

**Dans Google Analytics 4 :**
1. Aller dans "Admin" (roue crantée)
2. Colonne "Propriété" > "Liens Search Console"
3. Cliquer sur "Associer"
4. Sélectionner la propriété Search Console : `https://peakcl.com`
5. Confirmer

**Avantages :**
- Voir les requêtes de recherche dans GA4
- Analyser le parcours complet : recherche Google → navigation site → conversion
- Rapports croisés GSC + GA4

---

## 📋 CHECKLIST DE VÉRIFICATION

### Google Search Console
- [ ] Propriété vérifiée
- [ ] Sitemap.xml soumis et validé
- [ ] Pages clés indexées (inspecter l'URL)
- [ ] Aucune erreur de couverture
- [ ] Redirection /about → /qui-suis-je testée

### Google Analytics 4
- [ ] Propriété créée
- [ ] Flux de données configuré
- [ ] Code GA4 présent sur toutes les pages
- [ ] Test en temps réel validé
- [ ] Événement `form_submit_contact` configuré
- [ ] Conversions marquées

### Intégration
- [ ] GSC et GA4 liés
- [ ] Dashboard mensuel créé
- [ ] Objectifs définis

---

## 🚀 ACTIONS POST-DÉPLOIEMENT

### Semaine 1
- [ ] Vérifier indexation de toutes les nouvelles pages
- [ ] Soumettre les URLs importantes pour indexation
- [ ] Tester tous les formulaires de contact
- [ ] Vérifier que GA4 track correctement

### Semaine 2-4
- [ ] Analyser les premières requêtes dans GSC
- [ ] Identifier les pages qui génèrent du trafic
- [ ] Optimiser les pages avec le plus de potentiel
- [ ] Publier Article 2 (15 février)

### Mois 2-3
- [ ] Analyser performances mensuelles
- [ ] Ajuster stratégie selon résultats
- [ ] Identifier opportunités de contenu
- [ ] Publier Articles 3 et 4 (mars)

---

## 📞 BESOIN D'AIDE ?

Si vous avez des difficultés avec la configuration :
- Google Search Console Help : https://support.google.com/webmasters
- Google Analytics Help : https://support.google.com/analytics

**Je peux vous accompagner :**
- Configuration complète GSC + GA4
- Création des tableaux de bord
- Formation à l'utilisation
- Suivi mensuel des performances

---

**Date de création :** 20 janvier 2026  
**Prochaine mise à jour :** Après 1er mois de suivi  
**Responsable :** Charlotte Lacroix - PeakCL
