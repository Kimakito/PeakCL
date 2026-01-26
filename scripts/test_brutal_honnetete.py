#!/usr/bin/env python3
"""VÉRIFICATION BRUTALEMENT HONNÊTE DU SITE"""

import os
from bs4 import BeautifulSoup

print("="*70)
print("VÉRIFICATION HONNÊTE - AUCUNE COMPLAISANCE")
print("="*70)
print()

# Pages critiques
pages_critiques = {
    'index.html': 'Homepage (LA PLUS IMPORTANTE)',
    'contact.html': 'Contact',
    'creation-site-vitrine.html': 'Site vitrine (VENTE)',
    'creation-site-ecommerce.html': 'E-commerce (VENTE)',
    'developpement-web.html': 'Services',
}

problemes_graves = []
problemes_mineurs = []
pages_ok = []

for filename, description in pages_critiques.items():
    path = f'_site/{filename}'
    
    if not os.path.exists(path):
        problemes_graves.append(f"❌ GRAVE : {description} - FICHIER MANQUANT !!!")
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    issues = []
    warnings = []
    
    # 1. TITLE (CRITIQUE)
    title = soup.find('title')
    if not title:
        issues.append("Pas de <title>")
    elif len(title.get_text().strip()) < 20:
        issues.append(f"Title trop court ({len(title.get_text())} car.)")
    elif len(title.get_text().strip()) > 70:
        warnings.append(f"Title un peu long ({len(title.get_text())} car.)")
    
    # 2. META DESCRIPTION (CRITIQUE)
    desc = soup.find('meta', attrs={'name': 'description'})
    if not desc or not desc.get('content'):
        issues.append("Pas de meta description")
    elif len(desc.get('content', '')) < 100:
        issues.append("Description trop courte")
    elif len(desc.get('content', '')) > 200:
        warnings.append(f"Description un peu longue ({len(desc.get('content'))} car.)")
    
    # 3. FORMULAIRE NETLIFY (CRITIQUE pour conversion)
    forms = soup.find_all('form')
    has_netlify = any('data-netlify="true"' in str(f) for f in forms)
    if not has_netlify:
        issues.append("AUCUN formulaire Netlify configuré")
    
    # 4. EMAIL VISIBLE (CRITIQUE)
    emails = soup.find_all('a', href=lambda h: h and 'mailto:' in h)
    if not emails:
        issues.append("Email PAS visible")
    
    # 5. CTAs (IMPORTANT pour conversion)
    ctas = soup.find_all('a', string=lambda t: t and (
        'devis' in t.lower() or 
        'contact' in t.lower() or 
        'rappel' in t.lower()
    ))
    if len(ctas) < 2:
        warnings.append(f"Peu de CTAs ({len(ctas)})")
    
    # 6. PRIX (pour pages de vente)
    if 'vitrine' in filename or 'ecommerce' in filename:
        has_price = '€' in soup.get_text() and ('1' in soup.get_text() or '3' in soup.get_text())
        if not has_price:
            warnings.append("Prix pas clairement visible")
    
    # VERDICT
    if issues:
        problemes_graves.append(f"❌ {description}\n   PROBLÈMES: {', '.join(issues)}")
    elif warnings:
        problemes_mineurs.append(f"⚠️  {description}\n   Améliorer: {', '.join(warnings)}")
    else:
        pages_ok.append(f"✅ {description} - PARFAIT")

# RAPPORT
print("✅ PAGES PARFAITES:")
if pages_ok:
    for p in pages_ok:
        print(f"  {p}")
else:
    print("  AUCUNE !!!")
print()

if problemes_mineurs:
    print("⚠️  PROBLÈMES MINEURS (pas bloquants):")
    for p in problemes_mineurs:
        print(f"  {p}")
    print()

if problemes_graves:
    print("❌ PROBLÈMES GRAVES (BLOQUANTS):")
    for p in problemes_graves:
        print(f"  {p}")
    print()
    print("⚠️  LE SITE N'EST PAS PRÊT À VENDRE")
else:
    print("✅ AUCUN PROBLÈME GRAVE DÉTECTÉ")
    print("✅ LE SITE PEUT ÊTRE DÉPLOYÉ")

print()
print("="*70)

# Score final
score = (len(pages_ok) / len(pages_critiques)) * 100
print(f"SCORE HONNÊTE: {score:.0f}% des pages critiques sont parfaites")
print("="*70)
