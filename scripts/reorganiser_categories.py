#!/usr/bin/env python3
"""Script pour réorganiser les articles par catégories"""

import os
import re

# Mapping: fichier -> nouvelle catégorie
reorganisation = {
    # STRATÉGIE WEB
    '2025-02-10-nom-domaine.md': 'web-strategy',
    '2025-05-18-type-site.md': 'web-strategy',
    '2025-06-20-inspiration.md': 'web-strategy',
    '2026-01-08-pourquoi-site-web-2026.md': 'web-strategy',
    '2026-01-08-budget-site-web.md': 'web-strategy',
    '2026-01-08-choisir-prestataire-web.md': 'web-strategy',
    '2026-01-15-choisir-developpeur-web-savoie.md': 'web-strategy',
    '2026-02-01-creation-site-web-albertville-prix-delais.md': 'web-strategy',
    
    # CONSEILS PRATIQUES
    '2025-01-10-contenus.md': 'conseils',
    '2025-04-18-hebergement.md': 'conseils',
    '2025-08-22-SEO.md': 'conseils',
    '2025-09-10-github.md': 'conseils',
    '2026-01-04-outils-creation-site-france.md': 'conseils',
    '2026-01-08-analytics-mesurer-performance-site.md': 'conseils',
    '2026-01-08-delais-creation-site-web.md': 'conseils',
    '2026-01-08-email-professionnel.md': 'conseils',
    '2026-01-08-faq-creation-site-web.md': 'conseils',
    '2026-01-08-maintenance-site-web.md': 'conseils',
    '2026-01-08-rgpd-obligations-legales.md': 'conseils',
    '2026-01-20-wordpress-mal-optimise-seo.md': 'conseils',
    
    # DESIGN & UX
    '2025-01-12-polices.md': 'design-ux',
    '2025-02-16-couleurs.md': 'design-ux',
    '2025-03-17-visuels.md': 'design-ux',
    '2026-01-08-mobile-first-responsive.md': 'design-ux',
    
    # TECHNIQUE/DÉVELOPPEMENT
    '2025-07-16-jquery.md': 'developpement',
    '2025-10-12-css.md': 'developpement',
    '2025-11-13-react.md': 'developpement',
    '2025-12-14-javascript-vanilla.md': 'developpement',
}

print("🔄 RÉORGANISATION DES ARTICLES PAR CATÉGORIES")
print("="*60)

for filename, new_category in reorganisation.items():
    filepath = f'_posts/{filename}'
    
    if not os.path.exists(filepath):
        print(f"⚠️  {filename} - FICHIER NON TROUVÉ")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remplacer la catégorie dans le front matter
    # Chercher différents formats possibles
    patterns = [
        (r'categories:\s*blog', f'categories: [{new_category}]'),
        (r'categories:\s*\[.*?\]', f'categories: [{new_category}]'),
        (r'category:\s*\w+', f'categories: [{new_category}]'),
    ]
    
    modified = False
    for pattern, replacement in patterns:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            modified = True
            break
    
    # Si aucune catégorie trouvée, l'ajouter après la date
    if not modified and 'categories:' not in content:
        content = re.sub(
            r'(date: \d{4}-\d{2}-\d{2})',
            f'\\1\ncategories: [{new_category}]',
            content
        )
        modified = True
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {filename} → {new_category}")
    else:
        print(f"⚠️  {filename} - Déjà à jour")

print()
print("="*60)
print("✅ RÉORGANISATION TERMINÉE")
print()

# Afficher le résultat par catégorie
categories_count = {}
for cat in reorganisation.values():
    categories_count[cat] = categories_count.get(cat, 0) + 1

print("📊 RÉPARTITION PAR CATÉGORIE:")
for cat, count in sorted(categories_count.items()):
    print(f"  {cat}: {count} articles")
