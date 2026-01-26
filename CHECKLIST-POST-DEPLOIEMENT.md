# ✅ CHECKLIST POST-DÉPLOIEMENT

**À faire VOUS-MÊME après avoir déployé sur Netlify**

---

## 1. VÉRIFICATIONS IMMÉDIATES (5 minutes)

### ✅ Le site est en ligne
- [ ] Ouvrir https://peakcl.com dans un navigateur
- [ ] La page s'affiche correctement (pas d'erreur 404 ou 500)
- [ ] Les images se chargent

### ✅ Navigation fonctionne
- [ ] Cliquer sur "Services" → La page s'ouvre
- [ ] Cliquer sur "Contact" → La page s'ouvre
- [ ] Cliquer sur "Blog" → La page s'ouvre
- [ ] Cliquer sur un article de blog → L'article s'ouvre

---

## 2. TEST DES FORMULAIRES (10 minutes) ⚠️ CRITIQUE

### ✅ Formulaire de contact
1. [ ] Aller sur https://peakcl.com/contact.html
2. [ ] Remplir le formulaire avec vos vraies coordonnées
3. [ ] Cliquer sur "Envoyer"
4. [ ] Message de confirmation affiché ?
5. [ ] Email reçu dans votre boîte (vérifier spam aussi) ?

**Si le formulaire NE FONCTIONNE PAS** :
- Vérifier dans Netlify → Site settings → Forms
- Activer les notifications par email si nécessaire

### ✅ Formulaire de rappel (homepage)
1. [ ] Aller sur https://peakcl.com
2. [ ] Scroller jusqu'au formulaire "Demander à être rappelé"
3. [ ] Remplir et envoyer
4. [ ] Vérifier réception email

---

## 3. TEST MOBILE (5 minutes) ⚠️ IMPORTANT

### ✅ Ouvrir le site sur votre smartphone
- [ ] Le site s'affiche correctement ?
- [ ] Le texte est lisible (pas trop petit) ?
- [ ] Les boutons sont cliquables facilement ?
- [ ] Le menu hamburger fonctionne ?
- [ ] Les images s'affichent bien ?

**Tester au minimum** :
- Homepage
- Contact
- Une page de service (vitrine ou e-commerce)

---

## 4. GOOGLE SEARCH CONSOLE (15 minutes)

### ✅ Soumettre le sitemap
1. [ ] Aller sur https://search.google.com/search-console
2. [ ] Ajouter la propriété : https://peakcl.com
3. [ ] Vérifier la propriété (fichier google95bcbb54dea27959.html déjà en place)
4. [ ] Sitemaps → Ajouter : https://peakcl.com/sitemap.xml
5. [ ] Attendre 5 minutes et rafraîchir → Statut "Réussite" ?

### ✅ Demander l'indexation des pages principales
Dans Google Search Console → Inspection d'URL, tester ces 10 pages :

1. [ ] https://peakcl.com/
2. [ ] https://peakcl.com/contact.html
3. [ ] https://peakcl.com/creation-site-vitrine.html
4. [ ] https://peakcl.com/creation-site-ecommerce.html
5. [ ] https://peakcl.com/agence-web-albertville.html
6. [ ] https://peakcl.com/agence-web-chambery.html
7. [ ] https://peakcl.com/developpement-web.html
8. [ ] https://peakcl.com/blog.html
9. [ ] https://peakcl.com/qui-suis-je.html
10. [ ] https://peakcl.com/combien-coute-site-web.html

Pour chaque page : Cliquer sur "Demander une indexation"

---

## 5. TEST DE VITESSE (5 minutes)

### ✅ PageSpeed Insights
1. [ ] Aller sur https://pagespeed.web.dev/
2. [ ] Tester https://peakcl.com
3. [ ] Score mobile > 70 ? ✅
4. [ ] Score desktop > 80 ? ✅

**Si score < 70** : Contacter support Netlify ou optimiser images

---

## 6. GOOGLE ANALYTICS (5 minutes)

### ✅ Vérifier que les données arrivent
1. [ ] Aller sur https://analytics.google.com/
2. [ ] Sélectionner la propriété PeakCL
3. [ ] Rapports → Temps réel
4. [ ] Ouvrir votre site dans un autre onglet
5. [ ] Voir votre visite apparaître dans "Temps réel" ? ✅

---

## 7. VÉRIFICATIONS FINALES (5 minutes)

### ✅ Email cliquable
- [ ] https://peakcl.com → Email peakcl73@gmail.com est cliquable ?
- [ ] Cliquer dessus ouvre bien votre logiciel email ?

### ✅ Prix visibles
- [ ] https://peakcl.com/creation-site-vitrine.html → "À partir de 1 500€" visible ?
- [ ] https://peakcl.com/creation-site-ecommerce.html → "À partir de 3 000€" visible ?

### ✅ Schema.org (bonus)
1. [ ] Aller sur https://search.google.com/test/rich-results
2. [ ] Tester https://peakcl.com
3. [ ] Des données structurées détectées ? ✅

---

## 📊 RÉSULTATS ATTENDUS

### Semaine 1-2
- ✅ Site indexé par Google (chercher "site:peakcl.com" sur Google)
- ✅ Premières impressions dans Google Search Console

### Mois 1
- 🎯 Positionnement sur "agence web Albertville"
- 🎯 Premiers visiteurs organiques (50-100/mois)
- 🎯 1-3 demandes de devis

### Mois 2-3
- 🚀 Top 10 sur mots-clés locaux
- 🚀 5-10 demandes de devis par mois
- 🚀 1-2 clients signés

---

## ❌ PROBLÈMES FRÉQUENTS ET SOLUTIONS

### Le formulaire ne fonctionne pas
**Cause** : Netlify Forms pas activé  
**Solution** : Netlify → Site settings → Forms → Enable form detection

### Le site est lent
**Cause** : Images trop lourdes  
**Solution** : Compresser avec TinyPNG.com

### Pas indexé par Google après 2 semaines
**Cause** : Sitemap pas soumis ou site trop récent  
**Solution** : Soumettre sitemap + demander indexation manuelle + attendre 1 mois

### Email du formulaire arrive en spam
**Cause** : Normal pour Netlify Forms  
**Solution** : Marquer comme "Non spam" + ajouter à vos contacts

---

## 🆘 EN CAS DE PROBLÈME

**Si quelque chose ne fonctionne PAS après le déploiement** :

1. ✅ Vérifier que le déploiement Netlify a réussi (pas d'erreur)
2. ✅ Vider le cache du navigateur (Cmd+Shift+R sur Mac)
3. ✅ Tester en navigation privée
4. ✅ Attendre 5-10 minutes (propagation DNS)

**Si le problème persiste** : Noter exactement ce qui ne fonctionne pas (avec captures d'écran)

---

**Dernière mise à jour** : 26 janvier 2026  
**Temps total de vérification** : ~50 minutes

✅ Cocher les cases au fur et à mesure
