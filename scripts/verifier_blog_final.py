#!/usr/bin/env python3
"""
Vérification finale du Blog 2.0
"""

import os
from pathlib import Path
from datetime import datetime
import re

def main():
    print("🔍 VÉRIFICATION FINALE DU BLOG 2.0\n")
    print("=" * 60)
    
    # Compter les articles par catégorie
    posts_dir = Path("../_posts")
    articles = list(posts_dir.glob("*.md"))
    
    categories_count = {
        'web-strategy': 0,
        'conseils': 0,
        'design-ux': 0,
        'developpement': 0,
        'autres': 0
    }
    
    articles_avant_2025 = []
    articles_sans_categorie = []
    
    for article in articles:
        with open(article, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Vérifier la date
            date_match = re.search(r'date: (\d{4}-\d{2}-\d{2})', content)
            if date_match:
                date_str = date_match.group(1)
                year = int(date_str.split('-')[0])
                if year < 2025:
                    articles_avant_2025.append((article.name, date_str))
            
            # Vérifier la catégorie
            categories_match = re.search(r'categories: \[(.*?)\]', content)
            if categories_match:
                category = categories_match.group(1).strip()
                if category in categories_count:
                    categories_count[category] += 1
                else:
                    categories_count['autres'] += 1
            else:
                articles_sans_categorie.append(article.name)
    
    # Afficher les résultats
    print("\n📊 RÉPARTITION PAR CATÉGORIE:")
    print("-" * 60)
    total = 0
    for cat, count in categories_count.items():
        if count > 0:
            emoji = {
                'web-strategy': '🎯',
                'conseils': '💡',
                'design-ux': '🎨',
                'developpement': '⚙️',
                'autres': '❓'
            }[cat]
            print(f"  {emoji} {cat:20s}: {count:2d} articles")
            total += count
    print("-" * 60)
    print(f"  📚 TOTAL             : {total:2d} articles")
    
    # Vérifier les erreurs
    print("\n\n✅ VÉRIFICATIONS:")
    print("=" * 60)
    
    if articles_avant_2025:
        print(f"❌ Articles avant 2025: {len(articles_avant_2025)}")
        for nom, date in articles_avant_2025:
            print(f"   • {nom}: {date}")
    else:
        print("✅ Tous les articles sont datés 2025+")
    
    if articles_sans_categorie:
        print(f"\n❌ Articles sans catégorie: {len(articles_sans_categorie)}")
        for nom in articles_sans_categorie:
            print(f"   • {nom}")
    else:
        print("✅ Tous les articles ont une catégorie")
    
    # Vérifier que blog.html existe
    if Path("../blog.html").exists():
        print("✅ blog.html existe")
        
        # Vérifier le contenu
        with open("../blog.html", 'r', encoding='utf-8') as f:
            blog_content = f.read()
            
        if 'search-articles' in blog_content:
            print("✅ Barre de recherche présente")
        else:
            print("❌ Barre de recherche manquante")
        
        if 'category-filter' in blog_content:
            print("✅ Filtres par catégorie présents")
        else:
            print("❌ Filtres par catégorie manquants")
        
        if 'filterArticles()' in blog_content:
            print("✅ JavaScript de filtrage présent")
        else:
            print("❌ JavaScript de filtrage manquant")
    else:
        print("❌ blog.html n'existe pas!")
    
    print("\n" + "=" * 60)
    
    # Score final
    score = 0
    total_checks = 5
    
    if not articles_avant_2025:
        score += 1
    if not articles_sans_categorie:
        score += 1
    if Path("../blog.html").exists():
        score += 1
    if 'search-articles' in blog_content:
        score += 1
    if 'filterArticles()' in blog_content:
        score += 1
    
    print(f"\n🎯 SCORE FINAL: {score}/{total_checks}")
    
    if score == total_checks:
        print("🎉 PARFAIT! Le blog est prêt pour la production!")
    elif score >= 3:
        print("⚠️  Quelques problèmes mineurs à corriger")
    else:
        print("❌ Problèmes critiques détectés!")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
