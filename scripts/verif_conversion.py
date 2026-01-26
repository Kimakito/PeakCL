#!/usr/bin/env python3
"""Vérification complète des CTAs et formulaires"""

import os
from bs4 import BeautifulSoup

# Pages principales à vérifier
pages_principales = [
    '_site/index.html',
    '_site/contact.html',
    '_site/creation-site-vitrine.html',
    '_site/creation-site-ecommerce.html',
    '_site/developpement-web.html',
    '_site/agence-web-albertville.html',
    '_site/agence-web-chambery.html'
]

print('🎯 VÉRIFICATION DES CTAs ET FORMULAIRES\n')
print('='*70)

total_ctas = 0
total_forms = 0
pages_with_email = 0

for page in pages_principales:
    if os.path.exists(page):
        with open(page, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        
        # Nom de la page
        page_name = page.replace('_site/', '').replace('.html', '')
        print(f'\n📄 {page_name}')
        
        # Vérifier CTAs
        ctas = soup.find_all('a', string=lambda t: t and (
            'devis' in t.lower() or 
            'contact' in t.lower() or 
            'demander' in t.lower() or 
            'rappel' in t.lower()
        ))
        print(f'  ✅ CTAs trouvés: {len(ctas)}')
        total_ctas += len(ctas)
        
        if ctas:
            for cta in ctas[:2]:
                text = cta.get_text().strip()
                print(f'     → "{text[:45]}..."' if len(text) > 45 else f'     → "{text}"')
        
        # Vérifier formulaires
        forms = soup.find_all('form')
        print(f'  📝 Formulaires: {len(forms)}')
        total_forms += len(forms)
        
        for form in forms:
            if 'data-netlify' in str(form):
                print(f'     ✅ Netlify Forms ACTIVÉ')
            else:
                print(f'     ⚠️  Netlify Forms NON détecté')
        
        # Vérifier email visible
        email_links = soup.find_all('a', href=lambda h: h and 'mailto:' in h)
        if email_links:
            print(f'  📧 Email visible: {len(email_links)} lien(s)')
            pages_with_email += 1
            for email in email_links[:1]:
                print(f'     → {email.get("href").replace("mailto:", "")}')

print('\n' + '='*70)
print(f'\n📊 RÉSUMÉ GLOBAL:')
print(f'  - Pages vérifiées: {len([p for p in pages_principales if os.path.exists(p)])}')
print(f'  - Total CTAs: {total_ctas}')
print(f'  - Total formulaires: {total_forms}')
print(f'  - Pages avec email visible: {pages_with_email}')

if total_ctas > 10 and total_forms >= 5:
    print(f'\n✅ EXCELLENT ! Le site est bien optimisé pour la conversion.')
else:
    print(f'\n⚠️  Des CTAs supplémentaires pourraient améliorer la conversion.')

print('\n' + '='*70)
