#!/usr/bin/env python3
"""
Génère automatiquement sitemap.xml à partir du site généré
"""
from pathlib import Path
from datetime import datetime
import xml.etree.ElementTree as ET

BASE_URL = "https://peakcl.com"
SITE_DIR = Path(__file__).parent.parent / "_site"

# Pages à exclure
EXCLUDE = ['404.html', 'google95bcbb54dea27959.html', 'about/index.html']

# Priorités par type de page
PRIORITIES = {
    'index.html': '1.0',
    'contact.html': '0.9',
    'blog.html': '0.9',
    'creation-site-vitrine.html': '0.8',
    'creation-site-ecommerce.html': '0.8',
    'agence-web-': '0.8',
    '/blog/': '0.7',
    '/conseils/': '0.7',
    '/web-': '0.7',
    '/ux-': '0.7',
    'default': '0.5'
}

def get_priority(url):
    for key, priority in PRIORITIES.items():
        if key in url:
            return priority
    return PRIORITIES['default']

def get_changefreq(url):
    if 'index.html' in url or 'blog.html' in url:
        return 'weekly'
    elif '/blog/' in url or '/conseils/' in url:
        return 'monthly'
    return 'monthly'

# Créer le sitemap
urlset = ET.Element('urlset')
urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

# Collecter toutes les pages HTML
pages = []
for html_file in SITE_DIR.rglob('*.html'):
    rel_path = html_file.relative_to(SITE_DIR)
    rel_path_str = str(rel_path).replace('\\', '/')
    
    # Exclure certaines pages
    if any(excl in rel_path_str for excl in EXCLUDE):
        continue
    
    # Convertir index.html en /
    if rel_path_str == 'index.html':
        url = f"{BASE_URL}/"
    elif rel_path_str.endswith('/index.html'):
        url = f"{BASE_URL}/{rel_path_str.replace('/index.html', '/')}"
    else:
        url = f"{BASE_URL}/{rel_path_str}"
    
    # Obtenir la date de modification
    try:
        mtime = html_file.stat().st_mtime
        lastmod = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
    except:
        lastmod = datetime.now().strftime('%Y-%m-%d')
    
    pages.append({
        'url': url,
        'lastmod': lastmod,
        'priority': get_priority(url),
        'changefreq': get_changefreq(url)
    })

# Trier par priorité (décroissant)
pages.sort(key=lambda x: float(x['priority']), reverse=True)

# Ajouter au XML
for page in pages:
    url_elem = ET.SubElement(urlset, 'url')
    
    loc = ET.SubElement(url_elem, 'loc')
    loc.text = page['url']
    
    lastmod = ET.SubElement(url_elem, 'lastmod')
    lastmod.text = page['lastmod']
    
    changefreq = ET.SubElement(url_elem, 'changefreq')
    changefreq.text = page['changefreq']
    
    priority = ET.SubElement(url_elem, 'priority')
    priority.text = page['priority']

# Sauvegarder
tree = ET.ElementTree(urlset)
ET.indent(tree, space="  ")

output_path = Path(__file__).parent.parent / 'sitemap.xml'
with open(output_path, 'wb') as f:
    f.write(b'<?xml version="1.0" encoding="UTF-8"?>\n')
    tree.write(f, encoding='utf-8', xml_declaration=False)

print(f"✅ Sitemap généré avec {len(pages)} URLs")
print(f"💾 Sauvegardé dans: {output_path}")

# Afficher quelques exemples
print("\n📊 Exemples d'URLs ajoutées:")
for page in pages[:5]:
    print(f"  - {page['url']} (priorité: {page['priority']})")
