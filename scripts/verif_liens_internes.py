#!/usr/bin/env python3
"""
Script de vérification des liens internes cassés
Analyse tous les fichiers HTML générés par Jekyll (_site) et détecte les liens internes qui pointent vers des pages inexistantes
"""
import os
import re
from pathlib import Path
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

# Extensions de fichiers à analyser
HTML_EXT = ['.html']

print("🔍 Analyse des liens internes (site généré)...\n")

# Collecte toutes les urls internes trouvées
internal_links = {}  # {url: [fichiers qui la référencent]}
# Collecte toutes les urls de fichiers existants
existing_files = set()

# Parcourir tous les fichiers HTML
for root, dirs, files in os.walk(BASE_DIR):
    # Ignorer certains dossiers
    dirs[:] = [d for d in dirs if d not in ['node_modules', '_site', '.git', 'assets']]
    
    for file in files:
        if any(file.endswith(ext) for ext in HTML_EXT):
            filepath = Path(root) / file
            rel_path = filepath.relative_to(BASE_DIR)
            existing_files.add(str(rel_path))
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    soup = BeautifulSoup(f, 'html.parser')
                    for a in soup.find_all('a', href=True):
                        href = a['href']
                        # Lien interne uniquement
                        if href.startswith('/') and not href.startswith('//'):
                            # Nettoyer l'URL (enlever le / initial et les ancres)
                            clean_url = href.lstrip('/').split('#')[0]
                            if clean_url:  # Ignorer les liens vides ou juste des ancres
                                if clean_url not in internal_links:
                                    internal_links[clean_url] = []
                                internal_links[clean_url].append(str(rel_path))
            except Exception as e:
                print(f"⚠️  Erreur lors de la lecture de {rel_path}: {e}")

# Vérifier les liens cassés
broken_links = {}
for link, sources in internal_links.items():
    # Vérifier si le fichier existe
    target_exists = False
    for existing in existing_files:
        if existing == link or existing.endswith('/' + link):
            target_exists = True
            break
    
    if not target_exists:
        broken_links[link] = sources

# Afficher les résultats
if broken_links:
    print("❌ Liens internes cassés détectés:\n")
    for link, sources in sorted(broken_links.items()):
        print(f"  /{link}")
        print(f"    Référencé dans:")
        for source in set(sources):
            print(f"      - {source}")
        print()
    print(f"📊 Total: {len(broken_links)} lien(s) cassé(s)\n")
else:
    print("✅ Aucun lien interne cassé détecté.\n")

print("✅ Analyse terminée!")
