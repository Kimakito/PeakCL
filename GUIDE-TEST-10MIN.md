# 🔍 GUIDE DE TEST RAPIDE - 10 MINUTES

## 1️⃣ Tests Desktop (5 minutes)

### Barre sticky top
- [ ] Page chargée → barre jaune visible en haut
- [ ] Bouton "WhatsApp" → Vérif lien (doit ouvrir Whatsapp)
- [ ] Bouton "Appeler" → Vérif numéro (doit être cliquable)
- [ ] Bouton X → Cache la barre
- [ ] Refresh page → Barre reste cachée (localStorage fonctionne)

### Section 3 Services (juste après Hero)
- [ ] 3 cartes visibles : Jaune (Site), Rose (Réseaux), Cyan (Graphisme)
- [ ] Chaque carte a un prix et un CTA "Appeler pour un devis"
- [ ] CTA final "Appeler" et "WhatsApp" cliquables

### Section "Pourquoi expert"
- [ ] Comparaison DIY vs Expert lisible
- [ ] 4 garanties visibles
- [ ] CTA "Appeler maintenant" + "Être rappelé" cliquables

### Barre sticky bottom
- [ ] Scroll vers le bas (~1000px)
- [ ] Barre jaune/orange apparaît en bas
- [ ] Bouton "Appeler" cliquable
- [ ] X pour fermer → disparaît et reste cachée

### Formulaire contact
- [ ] 5 champs : Nom, Téléphone, Email, Service, Message
- [ ] Sélecteur "Service" fonctionne avec 4 options
- [ ] Bouton "Demander à être rappelé" en jaune
- [ ] Alternative "Appeler directement" avec numéro

### Footer
- [ ] Téléphone **cliquable** (pas du texte statique)
- [ ] WhatsApp cliquable
- [ ] Email cliquable

---

## 2️⃣ Tests Mobile (3 minutes)

### Responsive check
- [ ] Barres sticky ne couvrent pas plus de 15% de l'écran
- [ ] Boutons sont cliquables (min 44px en hauteur)
- [ ] Texte pas coupé horizontalement
- [ ] Formulaire : champs s'empilent bien

### Liens cliquables
- [ ] Appuyer "06 73..." → Lance FaceTime/AppelPhone
- [ ] Appuyer "WhatsApp" → Ouvre l'app WhatsApp
- [ ] Appuyer "Appeler" buttons → Même résultat

### Modal de rappel
- [ ] Clique sur "Être rappelé" → Modal s'ouvre avec animation
- [ ] Remplir le formulaire → pas de freeze
- [ ] Appuyer X → Modal se ferme

---

## 3️⃣ Tests Formulaires (2 minutes)

### Modal de Rappel
1. Clique "Être rappelé" (n'importe où)
2. Remplir : Nom, Email, Téléphone
3. Sélectionner contact : Email/SMS/Appel
4. Clique Submit
5. **Vérif** : Page "Merci" s'affiche

### Service Sélectionné
1. Clique "Appeler pour un devis" sur carte "Site Web"
2. Modal s'ouvre
3. **Vérif** : Banneau "Service sélectionné: Site Web" apparaît
4. **Vérif** : Champ caché `service` contient "Site Web"
5. Remplir et soumettre
6. Email reçu = contient "Service: Site Web"

### Formulaire Contact Principal
1. Scroll jusqu'à section Contact
2. Remplir tous les champs
3. Sélectionner un Service (ex: "Réseaux Sociaux")
4. Submit
5. **Vérif** : Page "Merci" s'affiche
6. Email Netlify reçu avec le service

---

## 🔗 LIENS À VÉRIFIER

### Numéros de téléphone (test sur mobile)
- [ ] `tel:+33673XXXXXX` → Fonctionne (tester avec votre vrai numéro)
- [ ] `https://wa.me/33673XXXXXX?text=Bonjour...` → Ouvre Whatsapp

### Pages critiques
- [ ] `/merci.html` → Page de remerciement existe
- [ ] `/devis-en-ligne.html` → Page devis existe
- [ ] `/portfolio.html` → Page portfolio existe

---

## 📊 ANALYTICS À CONFIGURER

Dans Google Analytics, créer des événements pour tracker :

1. **Click sur "Appeler"**
   - Créer événement : "appel_clic"
   - Lier à tous les boutons téléphone

2. **Click sur "WhatsApp"**
   - Créer événement : "whatsapp_clic"
   - Lier à tous les boutons Whatsapp

3. **Click sur "Être rappelé"**
   - Créer événement : "modal_ouverture"
   - Tracker si le formulaire est soumis

4. **Soumission formulaire**
   - Créer événement : "formulaire_soumis"
   - Ajouter paramètre : "service_selectionne"

---

## ✅ CHECKLIST FINALE - AVANT LANCEMENT

### Code & Configuration
- [ ] Tous les numéros de téléphone remplacés (7 occurrences)
- [ ] WhatsApp links testés (3 occurrences)
- [ ] Netlify deploy automatique fonctionne
- [ ] Pas d'erreurs console (F12)

### Contenu
- [ ] Texte "2 places ouvertes" = vrai et à jour
- [ ] Prix affichés = vrais ou fourchettes réalistes
- [ ] Garanties = faits réels (pas fausses promesses)

### Mobile
- [ ] Tested sur iPhone + Android
- [ ] Pas de layout breaks
- [ ] Boutons > 44px cliquables

### Emails
- [ ] Votre email professionnel reçoit les formulaires
- [ ] Vous pouvez voir : Nom + Téléphone + Service
- [ ] Pas de spam/phishing marqué

### Analytics
- [ ] GA4 installé et fonctionnel
- [ ] Événements custom créés
- [ ] Conversion tracking OK

---

## 🎯 KPI À SUIVRE LES 2 PREMIÈRES SEMAINES

| Métrique | Jour 1-3 | Semaine 1 | Semaine 2 | Cible |
|----------|----------|----------|----------|-------|
| Visiteurs | - | 100+ | 150+ | ↑ 50% |
| Appels reçus | 0-1 | 2-5 | 5-10 | ✅ |
| WhatsApp reçus | 0-1 | 1-3 | 3-5 | ✅ |
| Formulaires | 1-3 | 5-10 | 10-15 | ✅ |
| CTR boutons | 5-10% | 10-20% | 15-25% | ✅ |

---

## 🚀 PROCHAINES ÉTAPES

### Jour 1
- [ ] Remplacer tous les numéros
- [ ] Tester sur desktop + mobile
- [ ] Mettre en prod (deploy)

### Jour 2-3
- [ ] Attendre les premiers appels/formulaires
- [ ] Vérifier que les emails arrivent
- [ ] Répondre RAPIDEMENT aux demandes

### Semaine 1
- [ ] Analyser les données GA
- [ ] Voir quel service attire le plus
- [ ] Adapter les CTAs en conséquence

### Semaine 2
- [ ] Considérer Google Ads si peu de traffic
- [ ] Poster sur InstaG/LinkedIn avec lien
- [ ] Ajouter témoignages si vous en recevez

---

## 💡 ASTUCES POUR + D'APPELS

1. **Répondez en 30 secondes** (pas 30 minutes)
2. **Soyez gentil et enthousiaste** au téléphone
3. **Ayez vos tarifs prêts** pour ne pas perdre le client
4. **Schedulez rapidement** un devis, pas une relance
5. **Demandez d'où ils viennent** pour optimiser GTM

---

**Temps pour implémenter : 10 minutes max**
**Temps pour voir les résultats : 24-48h**
