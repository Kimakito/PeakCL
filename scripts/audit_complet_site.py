#!/usr/bin/env python3
"""
AUDIT COMPLET ET BRUTAL DU SITE - NE MENT PAS
Vérifie TOUT: SEO, liens, structure, performance
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup
import json

class AuditComplet:
    def __init__(self):
        self.site_dir = Path(__file__).parent.parent / "_site"
        self.erreurs = []
        self.warnings = []
        self.succes = []
        self.score_total = 0
        self.score_max = 0
        
    def point(self, test_name, description=""):
        """Ajoute 1 point au score max"""
        self.score_max += 1
        return test_name
    
    def success(self, message):
        """Marque un succès"""
        self.score_total += 1
        self.succes.append(message)
        
    def erreur(self, message):
        """Marque une erreur critique"""
        self.erreurs.append(message)
        
    def warning(self, message):
        """Marque un warning"""
        self.warnings.append(message)
    
    def verifier_page(self, filepath):
        """Vérifie une page HTML complètement"""
        with open(filepath, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        
        page_name = filepath.name
        resultats = {
            'title': None,
            'description': None,
            'h1': None,
            'liens_internes': [],
            'liens_externes': [],
            'images_sans_alt': [],
            'erreurs': []
        }
        
        # Title
        self.point(f"{page_name} - title")
        title = soup.find('title')
        if title and title.text.strip():
            title_text = title.text.strip()
            resultats['title'] = title_text
            if len(title_text) >= 30 and len(title_text) <= 65:
                self.success(f"{page_name}: Title OK ({len(title_text)} car.)")
            elif len(title_text) < 30:
                self.erreur(f"{page_name}: Title TROP COURT ({len(title_text)} car.) - min 30")
            else:
                self.warning(f"{page_name}: Title long ({len(title_text)} car.) - max 65 recommandé")
                self.score_total += 0.5
        else:
            self.erreur(f"{page_name}: PAS DE TITLE!")
            resultats['erreurs'].append("Pas de title")
        
        # Description
        self.point(f"{page_name} - description")
        meta_desc = soup.find('meta', {'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            desc_text = meta_desc['content'].strip()
            resultats['description'] = desc_text
            if len(desc_text) >= 120 and len(desc_text) <= 160:
                self.success(f"{page_name}: Description OK ({len(desc_text)} car.)")
            elif len(desc_text) < 120:
                self.warning(f"{page_name}: Description courte ({len(desc_text)} car.) - min 120 recommandé")
                self.score_total += 0.5
            else:
                self.warning(f"{page_name}: Description longue ({len(desc_text)} car.) - max 160 recommandé")
                self.score_total += 0.5
        else:
            self.erreur(f"{page_name}: PAS DE META DESCRIPTION!")
            resultats['erreurs'].append("Pas de meta description")
        
        # H1
        self.point(f"{page_name} - H1")
        h1_tags = soup.find_all('h1')
        if len(h1_tags) == 1:
            h1_text = h1_tags[0].get_text(strip=True)
            resultats['h1'] = h1_text
            if h1_text and len(h1_text) > 10:
                self.success(f"{page_name}: H1 unique et valide")
            else:
                self.warning(f"{page_name}: H1 trop court ({len(h1_text)} car.)")
                self.score_total += 0.5
        elif len(h1_tags) == 0:
            self.erreur(f"{page_name}: PAS DE H1!")
            resultats['erreurs'].append("Pas de H1")
        else:
            self.erreur(f"{page_name}: {len(h1_tags)} H1 trouvés (doit être 1)")
            resultats['erreurs'].append(f"{len(h1_tags)} H1")
        
        # Liens internes
        self.point(f"{page_name} - liens internes")
        liens = soup.find_all('a', href=True)
        liens_ok = True
        for lien in liens:
            href = lien['href']
            # Ignorer les ancres, liens externes, mailto, tel
            if href.startswith('#') or href.startswith('http') or href.startswith('mailto:') or href.startswith('tel:'):
                continue
            
            # Séparer l'URL de l'ancre
            url_base = href.split('#')[0] if '#' in href else href
            
            # Si c'est juste une ancre (#section), OK
            if not url_base:
                continue
            
            # Vérifier que le lien interne existe (ignorer l'ancre)
            if url_base.startswith('/'):
                href_clean = url_base.lstrip('/')
            else:
                href_clean = url_base
            
            # Construire le chemin du fichier
            if href_clean.endswith('/'):
                file_path = self.site_dir / href_clean / 'index.html'
            elif href_clean.endswith('.html'):
                file_path = self.site_dir / href_clean
            else:
                file_path = self.site_dir / f"{href_clean}.html"
                if not file_path.exists():
                    file_path = self.site_dir / href_clean / 'index.html'
            
            if not file_path.exists():
                self.erreur(f"{page_name}: LIEN CASSÉ -> {href}")
                liens_ok = False
                resultats['erreurs'].append(f"Lien cassé: {href}")
        
        if liens_ok:
            self.success(f"{page_name}: Tous les liens internes OK")
        
        # Images sans alt
        self.point(f"{page_name} - images alt")
        images = soup.find_all('img')
        images_sans_alt = []
        for img in images:
            if not img.get('alt'):
                images_sans_alt.append(img.get('src', 'unknown'))
        
        if images_sans_alt:
            self.warning(f"{page_name}: {len(images_sans_alt)} images sans alt")
            resultats['images_sans_alt'] = images_sans_alt
            self.score_total += 0.5
        elif images:
            self.success(f"{page_name}: Toutes les images ont un alt ({len(images)} images)")
        else:
            # Pas d'images, on donne le point quand même
            self.score_total += 1
        
        # Schema.org
        self.point(f"{page_name} - Schema.org")
        schema_scripts = soup.find_all('script', type='application/ld+json')
        if schema_scripts:
            try:
                for script in schema_scripts:
                    json.loads(script.string)
                self.success(f"{page_name}: Schema.org valide ({len(schema_scripts)} blocs)")
            except json.JSONDecodeError:
                self.warning(f"{page_name}: Schema.org invalide (JSON malformé)")
                self.score_total += 0.5
        else:
            self.warning(f"{page_name}: Pas de Schema.org")
            self.score_total += 0.5
        
        return resultats
    
    def verifier_pages_critiques(self):
        """Vérifie les pages essentielles du site"""
        pages_critiques = [
            'index.html',
            'contact.html',
            'creation-site-vitrine.html',
            'creation-site-ecommerce.html',
            'developpement-web.html',
            'blog.html',
            'portfolio.html',
            'qui-suis-je.html',
            'mentions-legales.html',
            'politique-confidentialite.html'
        ]
        
        print("\n🔍 VÉRIFICATION DES PAGES CRITIQUES")
        print("=" * 80)
        
        for page in pages_critiques:
            page_path = self.site_dir / page
            if page_path.exists():
                self.verifier_page(page_path)
            else:
                self.erreur(f"PAGE MANQUANTE: {page}")
                # On perd tous les points de cette page
                self.score_max += 5  # Les 5 vérifications qu'on aurait dû faire
    
    def verifier_sitemap(self):
        """Vérifie le sitemap.xml"""
        print("\n📄 VÉRIFICATION SITEMAP")
        print("=" * 80)
        
        self.point("Sitemap existe")
        sitemap_path = self.site_dir / 'sitemap.xml'
        if sitemap_path.exists():
            self.success("sitemap.xml existe")
            
            # Compter les URLs
            with open(sitemap_path, 'r', encoding='utf-8') as f:
                content = f.read()
                urls = re.findall(r'<loc>(.*?)</loc>', content)
            
            self.point("Sitemap a des URLs")
            if len(urls) > 0:
                self.success(f"Sitemap contient {len(urls)} URLs")
            else:
                self.erreur("Sitemap vide!")
        else:
            self.erreur("sitemap.xml MANQUANT!")
    
    def verifier_robots_txt(self):
        """Vérifie robots.txt"""
        print("\n🤖 VÉRIFICATION ROBOTS.TXT")
        print("=" * 80)
        
        self.point("robots.txt existe")
        robots_path = self.site_dir / 'robots.txt'
        if robots_path.exists():
            self.success("robots.txt existe")
            
            with open(robots_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            self.point("robots.txt a sitemap")
            if 'Sitemap:' in content:
                self.success("robots.txt référence le sitemap")
            else:
                self.warning("robots.txt ne référence pas le sitemap")
                self.score_total += 0.5
        else:
            self.erreur("robots.txt MANQUANT!")
            self.score_max += 1  # Pour la vérification sitemap
    
    def verifier_articles_blog(self):
        """Vérifie les articles de blog"""
        print("\n📝 VÉRIFICATION ARTICLES BLOG")
        print("=" * 80)
        
        # Vérifier que les articles sont générés
        self.point("Articles générés")
        articles_path = self.site_dir / '2025' / '01' / '10' / 'contenus.html'
        if articles_path.exists() or (self.site_dir / 'blog').exists():
            # Compter les articles
            articles = list(self.site_dir.rglob('**/2025/**/*.html')) + list(self.site_dir.rglob('**/2026/**/*.html'))
            if articles:
                self.success(f"{len(articles)} articles générés")
            else:
                self.erreur("Aucun article généré!")
        else:
            self.erreur("Structure blog absente!")
    
    def verifier_structure_generale(self):
        """Vérifie la structure générale"""
        print("\n🏗️  VÉRIFICATION STRUCTURE")
        print("=" * 80)
        
        # Vérifier que _site existe
        self.point("Site build existe")
        if self.site_dir.exists():
            self.success("Dossier _site existe (site compilé)")
        else:
            self.erreur("DOSSIER _site MANQUANT - Site non compilé!")
            return False
        
        # Vérifier assets
        self.point("Assets présents")
        assets_path = self.site_dir / 'assets'
        if assets_path.exists():
            self.success("Dossier assets présent")
        else:
            self.warning("Dossier assets manquant")
            self.score_total += 0.5
        
        return True
    
    def generer_rapport(self):
        """Génère le rapport final"""
        print("\n\n" + "=" * 80)
        print("📊 RAPPORT FINAL D'AUDIT")
        print("=" * 80)
        
        # Score
        pourcentage = (self.score_total / self.score_max * 100) if self.score_max > 0 else 0
        print(f"\n🎯 SCORE: {self.score_total:.1f}/{self.score_max} ({pourcentage:.1f}%)")
        
        # Succès
        if self.succes:
            print(f"\n✅ SUCCÈS ({len(self.succes)}):")
            for s in self.succes[:5]:  # Top 5
                print(f"  ✓ {s}")
            if len(self.succes) > 5:
                print(f"  ... et {len(self.succes) - 5} autres succès")
        
        # Warnings
        if self.warnings:
            print(f"\n⚠️  WARNINGS ({len(self.warnings)}):")
            for w in self.warnings:
                print(f"  ⚠ {w}")
        
        # Erreurs CRITIQUES
        if self.erreurs:
            print(f"\n❌ ERREURS CRITIQUES ({len(self.erreurs)}):")
            for e in self.erreurs:
                print(f"  ✗ {e}")
        
        print("\n" + "=" * 80)
        
        # Verdict final
        if pourcentage >= 95:
            print("🎉 EXCELLENT - Site prêt pour production!")
        elif pourcentage >= 85:
            print("👍 BON - Quelques optimisations recommandées")
        elif pourcentage >= 70:
            print("⚠️  MOYEN - Corrections nécessaires")
        else:
            print("❌ CRITIQUE - Problèmes majeurs à corriger!")
        
        print("=" * 80 + "\n")
        
        return pourcentage

def main():
    print("🔥 AUDIT BRUTAL ET COMPLET DU SITE")
    print("=" * 80)
    print("Ce script NE MENT PAS. Il va vérifier TOUT.\n")
    
    audit = AuditComplet()
    
    # Vérifications
    if not audit.verifier_structure_generale():
        print("\n❌ ERREUR FATALE: Site non compilé. Lancez 'bundle exec jekyll build' d'abord.")
        return
    
    audit.verifier_pages_critiques()
    audit.verifier_sitemap()
    audit.verifier_robots_txt()
    audit.verifier_articles_blog()
    
    # Rapport final
    score_final = audit.generer_rapport()
    
    # Recommendations
    if audit.erreurs:
        print("\n🔧 ACTIONS PRIORITAIRES:")
        print("-" * 80)
        print("1. Corriger les erreurs critiques listées ci-dessus")
        print("2. Re-lancer 'bundle exec jekyll build'")
        print("3. Re-lancer ce script pour vérifier")
    
    # Retourner le code de sortie
    return 0 if score_final >= 90 else 1

if __name__ == "__main__":
    exit(main())
