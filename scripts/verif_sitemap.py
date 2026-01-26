#!/usr/bin/env python3
"""
Script de vérification du sitemap.xml
Vérifie que toutes les pages HTML importantes sont dans le sitemap
et que toutes les URLs du sitemap correspondent à des pages existantes
"""
import os
import xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime

# Dossier à analyser
BASE_DIR = Path(__file__).parent.parent

print("🗺️  Vérification du sitemap.xml...\n")

# Lire le sitemap
sitemap_path = BASE_DIR / 'sitemap.xml'
if not sitemap_path.exists():
    print("❌ Fichier sitemap.xml introuvable!")
    exit(1)

# Parser le sitemap
try:
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    
    # Namespace pour sitemap
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    
    # Extraire toutes les URLs
    sitemap_urls = []
    for url in root.findall('sm:url', ns):
        loc = url.find('sm:loc', ns)
        if loc is not None:
            sitemap_urls.append(loc.text)
    
    print(f"📊 {len(sitemap_urls)} URL(s) dans le sitemap\n")
    
except Exception as e:
    print(f"❌ Erreur lors de la lecture du sitemap: {e}")
    exit(1)

# Lister tous les fichiers HTML du site
html_files = []
excluded_files = ['404.html', 'google95bcbb54dea27959.html']
excluded_dirs = ['_includes', '_layouts', '_data', '_site', 'node_modules', '.git', 'assets', 'scripts']

for root_dir, dirs, files in os.walk(BASE_DIR):
    # Filtrer les dossiers à exclure
    dirs[:] = [d for d in dirs if d not in excluded_dirs]
    
    for file in files:
        if file.endswith('.html') and file not in excluded_files:
            filepath = Path(root_dir) / file
            rel_path = filepath.relative_to(BASE_DIR)
            
            # Construire l'URL correspondante
            url_path = str(rel_path).replace('\\', '/')
            if url_path == 'index.html':
                url = 'https://peakcl.com/'
            else:
                url = f'https://peakcl.com/{url_path}'
            
            html_files.append({
                'file': str(rel_path),
                'url': url
            })

print(f"📊 {len(html_files)} page(s) HTML dans le site\n")

# Vérifier les pages manquantes dans le sitemap
missing_in_sitemap = []
for page in html_files:
    if page['url'] not in sitemap_urls:
        # Vérifier aussi la version sans index.html
        alt_url = page['url'].replace('/index.html', '/')
        if alt_url not in sitemap_urls:
            missing_in_sitemap.append(page)

# Vérifier les URLs du sitemap qui ne correspondent à aucune page
missing_files = []
for url in sitemap_urls:
    found = False
    for page in html_files:
        if page['url'] == url or page['url'].replace('/index.html', '/') == url:
            found = True
            break
    if not found:
        missing_files.append(url)

# Afficher les résultats
print("=" * 80)
print("📊 RÉSULTATS DE LA VÉRIFICATION")
print("=" * 80)

if missing_in_sitemap:
    print(f"\n⚠️  {len(missing_in_sitemap)} page(s) HTML non référencée(s) dans le sitemap:\n")
    for page in missing_in_sitemap:
        print(f"  - {page['file']}")
        print(f"    URL suggérée: {page['url']}")
    print("\n💡 Ajoutez ces pages au sitemap.xml pour améliorer l'indexation.")
else:
    print("\n✅ Toutes les pages HTML importantes sont dans le sitemap.")

if missing_files:
    print(f"\n⚠️  {len(missing_files)} URL(s) du sitemap sans fichier correspondant:\n")
    for url in missing_files:
        print(f"  - {url}")
    print("\n💡 Supprimez ces URLs du sitemap ou créez les pages correspondantes.")
else:
    print("\n✅ Toutes les URLs du sitemap correspondent à des fichiers existants.")

# Vérifier les dates de modification
print("\n" + "=" * 80)
print("📅 VÉRIFICATION DES DATES DE MODIFICATION")
print("=" * 80)

outdated_dates = []
for url in root.findall('sm:url', ns):
    loc = url.find('sm:loc', ns)
    lastmod = url.find('sm:lastmod', ns)
    
    if loc is not None and lastmod is not None:
        url_text = loc.text
        date_text = lastmod.text
        
        try:
            date_obj = datetime.strptime(date_text, '%Y-%m-%d')
            days_old = (datetime.now() - date_obj).days
            
            if days_old > 30:
                outdated_dates.append({
                    'url': url_text,
                    'lastmod': date_text,
                    'days_old': days_old
                })
        except:
            pass

if outdated_dates:
    print(f"\n⚠️  {len(outdated_dates)} URL(s) avec une date de modification ancienne (>30 jours):\n")
    for item in sorted(outdated_dates, key=lambda x: x['days_old'], reverse=True)[:10]:
        print(f"  - {item['url']}")
        print(f"    Dernière modification: {item['lastmod']} (il y a {item['days_old']} jours)")
    print("\n💡 Pensez à mettre à jour les dates si le contenu a changé.")
else:
    print("\n✅ Toutes les dates de modification sont récentes.")

print("\n" + "=" * 80)
print("✅ Vérification terminée!")
print("=" * 80)
