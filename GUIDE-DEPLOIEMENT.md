# 🚀 Guide de Déploiement - PeakCL.com
## Étapes finales avant mise en production

---

## ✅ PRÉ-DÉPLOIEMENT : TESTS LOCAUX

### 1. Vérifier que Jekyll tourne correctement

**Le site est actuellement accessible sur :** http://127.0.0.1:4000/

**Pages à tester :**
- [ ] Page d'accueil : http://127.0.0.1:4000/
- [ ] Qui suis-je : http://127.0.0.1:4000/qui-suis-je.html
- [ ] Redirection /about : http://127.0.0.1:4000/about/ (doit rediriger vers qui-suis-je)
- [ ] Site vitrine : http://127.0.0.1:4000/creation-site-vitrine.html
- [ ] E-commerce : http://127.0.0.1:4000/creation-site-ecommerce.html
- [ ] Maintenance : http://127.0.0.1:4000/maintenance-site-web.html
- [ ] Article 1 : http://127.0.0.1:4000/web%20strategy/2026/02/01/creation-site-web-albertville-prix-delais.html
- [ ] Chess (noindex) : http://127.0.0.1:4000/chess.html

### 2. Vérifier les CTAs

**Sur chaque page, vérifier que :**
- [ ] Les boutons "Demander un devis" fonctionnent (scroll vers #contact)
- [ ] Le formulaire de contact s'affiche
- [ ] Les liens internes fonctionnent
- [ ] Les zones tactiles sont suffisantes (min 44px)

### 3. Vérifier le responsive

**Ouvrir DevTools (F12) et tester :**
- [ ] Mobile (375px) : iPhone SE
- [ ] Mobile (390px) : iPhone 12/13/14
- [ ] Tablette (768px) : iPad
- [ ] Desktop (1920px)

**Points à vérifier :**
- [ ] Navigation mobile (hamburger)
- [ ] CTAs visibles et cliquables
- [ ] Images adaptées
- [ ] Textes lisibles

### 4. Vérifier les données structurées

**Outil de test Schema.org :**
https://validator.schema.org/

Tester les pages :
- [ ] Page d'accueil (Organization)
- [ ] Création site vitrine (LocalBusiness)
- [ ] Création site e-commerce (LocalBusiness)
- [ ] Maintenance (LocalBusiness)
- [ ] Développement web (FAQ)
- [ ] Qui suis-je (Person)

### 5. Vérifier le sitemap

**Accéder à :** http://127.0.0.1:4000/sitemap.xml

**Vérifier :**
- [ ] Toutes les pages services sont présentes
- [ ] /about n'est PAS dans le sitemap
- [ ] chess.html n'est PAS dans le sitemap
- [ ] Pas de balises `<priority>` ni `<changefreq>`
- [ ] Environ 35-40 URLs

---

## 🚀 DÉPLOIEMENT SUR NETLIFY

### Méthode 1 : Via Git (RECOMMANDÉ)

**1. Commit des changements**
```bash
cd /Users/charly/Desktop/Dev/PeakCL
git add .
git commit -m "feat: SEO optimization + new service pages + blog article 1

- Added jekyll-redirect-from plugin
- Created /creation-site-vitrine.html
- Created /creation-site-ecommerce.html  
- Created /maintenance-site-web.html
- Added first blog article (création site Albertville)
- Cleaned sitemap.xml (removed priority/changefreq)
- Added /about redirect to /qui-suis-je
- Set chess.html to noindex
- Added CTAs on homepage
- Improved internal linking
- Added Schema.org structured data"
```

**2. Push vers GitHub**
```bash
git push origin main
```

**3. Netlify déploie automatiquement**
- Netlify détecte le push
- Build Jekyll automatique
- Déploiement sur https://peakcl.com
- Durée : 2-3 minutes

### Méthode 2 : Via Netlify CLI

```bash
# Installer Netlify CLI si pas déjà fait
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod
```

---

## ✅ POST-DÉPLOIEMENT : VÉRIFICATIONS

### 1. Vérifier le site en production

**Accéder à :** https://peakcl.com

**Pages à vérifier :**
- [ ] https://peakcl.com/
- [ ] https://peakcl.com/qui-suis-je.html
- [ ] https://peakcl.com/about/ (doit rediriger)
- [ ] https://peakcl.com/creation-site-vitrine.html
- [ ] https://peakcl.com/creation-site-ecommerce.html
- [ ] https://peakcl.com/maintenance-site-web.html
- [ ] https://peakcl.com/blog.html (l'article doit apparaître)

### 2. Tester les formulaires

**Soumettre un test :**
- [ ] Formulaire de contact de la page d'accueil
- [ ] Vérifier réception email (Netlify Forms)

### 3. Vérifier Google Analytics

**En temps réel :**
- [ ] Ouvrir GA4 : https://analytics.google.com
- [ ] Aller dans "Rapports" > "Temps réel"
- [ ] Naviguer sur le site
- [ ] Vérifier que les visites s'affichent

### 4. Tester les performances

**PageSpeed Insights :**
https://pagespeed.web.dev/

Tester :
- [ ] Page d'accueil (mobile + desktop)
- [ ] Page création-site-vitrine (mobile + desktop)
- [ ] Article blog (mobile + desktop)

**Objectifs :**
- Performance mobile : 80+
- Performance desktop : 90+
- Accessibility : 90+
- Best Practices : 90+
- SEO : 90+

### 5. Vérifier le sitemap en production

**Accéder à :** https://peakcl.com/sitemap.xml

- [ ] Le sitemap est accessible
- [ ] Il contient toutes les nouvelles pages
- [ ] Aucune erreur XML

### 6. Tester le robots.txt

**Accéder à :** https://peakcl.com/robots.txt

- [ ] Fichier accessible
- [ ] Pointe vers le sitemap
- [ ] Aucun blocage indésirable

---

## 📊 GOOGLE SEARCH CONSOLE

### 1. Soumettre le sitemap

**Dans GSC :**
1. Aller sur https://search.google.com/search-console
2. Sélectionner la propriété `https://peakcl.com`
3. Menu "Sitemaps"
4. Ajouter `sitemap.xml`
5. Cliquer sur "Envoyer"

**Résultat attendu :**
- Status : Réussite
- URLs découvertes : 35-40

### 2. Demander l'indexation des nouvelles pages

**Pages prioritaires à indexer :**
1. /creation-site-vitrine.html
2. /creation-site-ecommerce.html
3. /maintenance-site-web.html
4. Article blog : /web%20strategy/2026/02/01/creation-site-web-albertville-prix-delais.html

**Pour chaque page :**
- Menu "Inspection de l'URL"
- Coller l'URL complète
- Attendre l'analyse
- Cliquer sur "Demander une indexation"

### 3. Vérifier la redirection /about

**Inspecter :** https://peakcl.com/about/

- [ ] Status : Redirigé (301)
- [ ] Destination : /qui-suis-je.html

---

## 📈 SUIVI POST-DÉPLOIEMENT

### Semaine 1

**Jour 1-2 :**
- [ ] Vérifier que toutes les pages sont accessibles
- [ ] Tester tous les formulaires
- [ ] Vérifier GA4 en temps réel
- [ ] Soumettre sitemap à GSC

**Jour 3-7 :**
- [ ] Demander indexation des pages clés
- [ ] Surveiller GSC (erreurs d'indexation)
- [ ] Analyser premières visites dans GA4
- [ ] Corriger éventuels bugs

### Semaine 2

- [ ] Analyser comportement utilisateurs (GA4)
- [ ] Vérifier taux de rebond par page
- [ ] Identifier pages à optimiser
- [ ] Planifier Article 2 (15 février)

### Mois 1

**Métriques à suivre :**
- Visites totales : objectif 400-700
- Trafic organique : objectif 250-400
- Formulaires envoyés : objectif 5-10
- Pages les plus visitées
- Requêtes Google qui génèrent du trafic

---

## 🛠️ COMMANDES UTILES

### Arrêter Jekyll local
```bash
# Ctrl + C dans le terminal où Jekyll tourne
# Ou :
lsof -ti:4000 | xargs kill -9
```

### Relancer Jekyll
```bash
cd /Users/charly/Desktop/Dev/PeakCL
bundle exec jekyll serve
```

### Build sans serveur
```bash
bundle exec jekyll build
```

### Clear le cache Jekyll
```bash
bundle exec jekyll clean
```

### Vérifier les liens brisés
```bash
# Installer htmlproofer si pas fait
gem install html-proofer

# Vérifier
htmlproofer ./_site --disable-external
```

---

## ⚠️ TROUBLESHOOTING

### Problème : Redirection /about ne fonctionne pas

**Solution :**
1. Vérifier que jekyll-redirect-from est dans Gemfile
2. Vérifier que le plugin est dans _config.yml
3. Relancer `bundle install`
4. Rebuild Jekyll

### Problème : Article blog n'apparaît pas

**Vérifier :**
1. Le fichier est dans `_posts/`
2. Le nom suit le format : `YYYY-MM-DD-titre.md`
3. Le front matter a `layout: article`
4. Le layout `article.html` existe dans `_layouts/`

### Problème : Sitemap n'a pas les nouvelles pages

**Solution :**
1. Rebuild Jekyll : `bundle exec jekyll build`
2. Vérifier que sitemap.xml existe dans `_site/`
3. Vérifier _config.yml a `jekyll-sitemap`

### Problème : GA4 ne track pas

**Vérifier :**
1. L'ID GA4 est correct dans _config.yml
2. Le fichier analytics.html existe
3. Il est inclus dans header.html
4. Désactiver les bloqueurs de pub/tracking

---

## ✅ CHECKLIST FINALE

### Avant déploiement
- [x] Tests locaux OK
- [x] Responsive OK
- [x] CTAs fonctionnels
- [x] Formulaires testés
- [x] Schema.org validé
- [x] Sitemap vérifié

### Après déploiement
- [ ] Site accessible en production
- [ ] Redirections OK
- [ ] Formulaires fonctionnels en prod
- [ ] GA4 track en temps réel
- [ ] Sitemap soumis à GSC
- [ ] Pages clés indexées

### Semaine 1
- [ ] Aucune erreur GSC
- [ ] Premières visites GA4
- [ ] Performance PageSpeed OK
- [ ] Aucun bug remonté

---

**Le site est prêt à être déployé ! 🚀**

**Prochaines étapes :**
1. Commit + push sur GitHub
2. Attendre déploiement Netlify (2-3 min)
3. Vérifier site en production
4. Soumettre à GSC
5. Suivre les métriques

**Date :** 20 janvier 2026  
**Responsable :** Charlotte Lacroix - PeakCL
