#!/usr/bin/env python3
"""
Script d'audit SEO complet
Analyse toutes les pages HTML générées par Jekyll (_site) et génère un rapport détaillé des optimisations SEO
"""
import os
import re
from pathlib import Path
from datetime import datetime
try:
    from bs4 import BeautifulSoup
except ImportError:
    print("⚠️  BeautifulSoup4 n'est pas installé. Installation...")
    os.system("pip3 install beautifulsoup4")
    from bs4 import BeautifulSoup

# Dossier à analyser (site généré par Jekyll)
BASE_DIR = Path(__file__).parent.parent / '_site'

if not BASE_DIR.exists():
    print("❌ Le dossier _site n'existe pas. Veuillez d'abord générer le site avec 'bundle exec jekyll build'")
    exit(1)

print("🔍 Audit SEO en cours (analyse du site généré)...\n")

# Résultats de l'audit
results = []

# Parcourir tous les fichiers HTML
for root, dirs, files in os.walk(BASE_DIR):
    # Ignorer certains dossiers
    dirs[:] = [d for d in dirs if d not in ['node_modules', '_site', '.git', 'assets', 'scripts']]
    
    for file in files:
        if file.endswith('.html') and not file.startswith('_'):
            filepath = Path(root) / file
            rel_path = filepath.relative_to(BASE_DIR)
            
            # Ignorer certains fichiers
            if any(x in str(rel_path) for x in ['_includes', '_layouts', '_data']):
                continue
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    soup = BeautifulSoup(content, 'html.parser')
                    
                    # Extraction des balises SEO
                    title = soup.find('title')
                    title_text = title.get_text().strip() if title else None
                    title_length = len(title_text) if title_text else 0
                    
                    # Meta description
                    meta_desc = soup.find('meta', attrs={'name': 'description'})
                    desc_text = meta_desc.get('content', '').strip() if meta_desc else None
                    desc_length = len(desc_text) if desc_text else 0
                    
                    # Balise H1
                    h1_tags = soup.find_all('h1')
                    h1_count = len(h1_tags)
                    h1_text = h1_tags[0].get_text().strip() if h1_tags else None
                    
                    # Meta robots
                    meta_robots = soup.find('meta', attrs={'name': 'robots'})
                    robots_content = meta_robots.get('content', 'index, follow') if meta_robots else 'index, follow'
                    
                    # Données structurées (JSON-LD)
                    json_ld = soup.find_all('script', type='application/ld+json')
                    has_schema = len(json_ld) > 0
                    
                    # Images sans alt
                    images = soup.find_all('img')
                    images_without_alt = [img for img in images if not img.get('alt')]
                    
                    # Liens
                    links = soup.find_all('a', href=True)
                    external_links = [a for a in links if a['href'].startswith('http') and 'peakcl.com' not in a['href']]
                    
                    # Analyse et recommandations
                    issues = []
                    warnings = []
                    
                    if not title_text:
                        issues.append("❌ Pas de balise <title>")
                    elif title_length < 30:
                        warnings.append(f"⚠️  Title trop court ({title_length} caractères, recommandé: 50-60)")
                    elif title_length > 60:
                        warnings.append(f"⚠️  Title trop long ({title_length} caractères, recommandé: 50-60)")
                    
                    if not desc_text:
                        issues.append("❌ Pas de meta description")
                    elif desc_length < 120:
                        warnings.append(f"⚠️  Description trop courte ({desc_length} caractères, recommandé: 150-160)")
                    elif desc_length > 160:
                        warnings.append(f"⚠️  Description trop longue ({desc_length} caractères, recommandé: 150-160)")
                    
                    if h1_count == 0:
                        issues.append("❌ Pas de balise <h1>")
                    elif h1_count > 1:
                        warnings.append(f"⚠️  Plusieurs balises H1 ({h1_count})")
                    
                    if 'noindex' in robots_content:
                        warnings.append("⚠️  Page en noindex (non indexable)")
                    
                    if not has_schema:
                        warnings.append("⚠️  Pas de données structurées (Schema.org)")
                    
                    if images_without_alt:
                        warnings.append(f"⚠️  {len(images_without_alt)} image(s) sans attribut alt")
                    
                    # Status global
                    if issues:
                        status = "❌ Erreurs critiques"
                    elif warnings:
                        status = "⚠️  À améliorer"
                    else:
                        status = "✅ Optimal"
                    
                    results.append({
                        'file': str(rel_path),
                        'status': status,
                        'title': title_text,
                        'title_length': title_length,
                        'desc': desc_text,
                        'desc_length': desc_length,
                        'h1': h1_text,
                        'h1_count': h1_count,
                        'robots': robots_content,
                        'schema': has_schema,
                        'images_total': len(images),
                        'images_no_alt': len(images_without_alt),
                        'issues': issues,
                        'warnings': warnings
                    })
                    
            except Exception as e:
                print(f"⚠️  Erreur lors de l'analyse de {rel_path}: {e}")

# Génération du rapport
print("=" * 80)
print("📊 RAPPORT D'AUDIT SEO")
print("=" * 80)
print(f"Date: {datetime.now().strftime('%d/%m/%Y %H:%M')}")
print(f"Pages analysées: {len(results)}\n")

# Statistiques globales
total_ok = sum(1 for r in results if r['status'] == "✅ Optimal")
total_warnings = sum(1 for r in results if r['status'] == "⚠️  À améliorer")
total_errors = sum(1 for r in results if r['status'] == "❌ Erreurs critiques")

print(f"✅ Pages optimales: {total_ok}")
print(f"⚠️  Pages à améliorer: {total_warnings}")
print(f"❌ Pages avec erreurs critiques: {total_errors}\n")

print("=" * 80)
print("DÉTAIL PAR PAGE")
print("=" * 80)

# Trier par status (erreurs en premier)
results_sorted = sorted(results, key=lambda x: (0 if '❌' in x['status'] else 1 if '⚠️' in x['status'] else 2, x['file']))

for result in results_sorted:
    print(f"\n📄 {result['file']}")
    print(f"   Status: {result['status']}")
    
    if result['title']:
        print(f"   Title: {result['title'][:80]}{'...' if len(result['title']) > 80 else ''} ({result['title_length']} car.)")
    
    if result['desc']:
        print(f"   Description: {result['desc'][:80]}{'...' if len(result['desc']) > 80 else ''} ({result['desc_length']} car.)")
    
    if result['h1']:
        print(f"   H1: {result['h1'][:80]}{'...' if len(result['h1']) > 80 else ''}")
    
    print(f"   Robots: {result['robots']}")
    print(f"   Schema.org: {'✅ Oui' if result['schema'] else '❌ Non'}")
    
    if result['images_no_alt'] > 0:
        print(f"   Images: {result['images_total']} total, {result['images_no_alt']} sans alt")
    
    if result['issues']:
        print("\n   🚨 ERREURS CRITIQUES:")
        for issue in result['issues']:
            print(f"      {issue}")
    
    if result['warnings']:
        print("\n   ⚠️  AVERTISSEMENTS:")
        for warning in result['warnings']:
            print(f"      {warning}")

print("\n" + "=" * 80)
print("RECOMMANDATIONS GLOBALES")
print("=" * 80)

recommendations = []

if total_errors > 0:
    recommendations.append(f"🔴 URGENT: Corriger les {total_errors} page(s) avec des erreurs critiques (title, description, H1 manquants)")

if total_warnings > 0:
    recommendations.append(f"🟡 Améliorer les {total_warnings} page(s) avec des avertissements (longueur des balises, images sans alt, schema.org)")

pages_no_schema = sum(1 for r in results if not r['schema'])
if pages_no_schema > 0:
    recommendations.append(f"📊 Ajouter des données structurées (Schema.org) sur {pages_no_schema} page(s)")

total_images_no_alt = sum(r['images_no_alt'] for r in results)
if total_images_no_alt > 0:
    recommendations.append(f"🖼️  Ajouter l'attribut alt sur {total_images_no_alt} image(s)")

if recommendations:
    for i, rec in enumerate(recommendations, 1):
        print(f"\n{i}. {rec}")
else:
    print("\n✅ Aucune recommandation. Votre site est bien optimisé pour le SEO!")

print("\n" + "=" * 80)
print("✅ Audit terminé!")
print("=" * 80)

# Sauvegarder le rapport
report_path = BASE_DIR / 'scripts' / 'rapport_audit_seo.txt'
with open(report_path, 'w', encoding='utf-8') as f:
    f.write("=" * 80 + "\n")
    f.write("RAPPORT D'AUDIT SEO\n")
    f.write("=" * 80 + "\n")
    f.write(f"Date: {datetime.now().strftime('%d/%m/%Y %H:%M')}\n")
    f.write(f"Pages analysées: {len(results)}\n\n")
    
    for result in results_sorted:
        f.write(f"\n{'=' * 80}\n")
        f.write(f"Page: {result['file']}\n")
        f.write(f"Status: {result['status']}\n")
        f.write(f"Title: {result['title']} ({result['title_length']} car.)\n")
        f.write(f"Description: {result['desc']} ({result['desc_length']} car.)\n")
        f.write(f"H1: {result['h1']}\n")
        f.write(f"Robots: {result['robots']}\n")
        f.write(f"Schema.org: {'Oui' if result['schema'] else 'Non'}\n")
        
        if result['issues']:
            f.write("\nERREURS:\n")
            for issue in result['issues']:
                f.write(f"  {issue}\n")
        
        if result['warnings']:
            f.write("\nAVERTISSEMENTS:\n")
            for warning in result['warnings']:
                f.write(f"  {warning}\n")

print(f"\n💾 Rapport sauvegardé dans: {report_path}")
