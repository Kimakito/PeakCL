#!/usr/bin/env python3
"""
Correction automatique de TOUS les liens cassés
"""

import re
from pathlib import Path

# Mapping des anciennes URLs vers les nouvelles
CORRECTIONS = {
    # Articles déplacés de /conseils/ vers /web-strategy/
    '/conseils/2026/01/08/budget-site-web.html': '/web-strategy/2026/01/08/budget-site-web.html',
    '/conseils/2026/01/08/pourquoi-site-web-2026.html': '/web-strategy/2026/01/08/pourquoi-site-web-2026.html',
    '/conseils/2026/01/08/choisir-prestataire-web.html': '/web-strategy/2026/01/08/choisir-prestataire-web.html',
    '/conseils/2026/01/08/delais-creation-site-web.html': '/web-strategy/2026/01/08/delais-creation-site-web.html',
    '/conseils/2026/01/08/faq-creation-site-web.html': '/web-strategy/2026/01/08/faq-creation-site-web.html',
    '/conseils/2026/01/08/rgpd-obligations-legales.html': '/web-strategy/2026/01/08/rgpd-obligations-legales.html',
    
    # Articles déplacés de /blog/ vers /web-strategy/
    '/blog/2025/05/18/type-site.html': '/web-strategy/2025/05/18/type-site.html',
    '/blog/2025/06/20/inspiration.html': '/web-strategy/2025/06/20/inspiration.html',
    
    # Articles déplacés de /conseils/ vers /conseils/ avec nouvelles dates
    '/conseils/2024/11/15/contenus.html': '/conseils/2025/01/10/contenus.html',
    
    # Articles déplacés de /web-strategy/ avec anciennes dates
    '/web-strategy/2024/12/18/nom-domaine.html': '/web-strategy/2025/02/10/nom-domaine.html',
    
    # Articles déplacés de /blog/ ou autres vers /conseils/
    '/blog/2025/04/18/hebergement.html': '/conseils/2025/04/18/hebergement.html',
    '/conseils/2026/01/08/mobile-first-responsive.html': '/conseils/2026/01/08/mobile-first-responsive.html',
    '/conseils/2026/01/08/maintenance-site-web.html': '/conseils/2026/01/08/maintenance-site-web.html',
    '/conseils/2026/01/08/email-professionnel.html': '/conseils/2026/01/08/email-professionnel.html',
    '/conseils/2026/01/08/analytics-mesurer-performance-site.html': '/conseils/2026/01/08/analytics-mesurer-performance-site.html',
    '/conseils/2026/01/04/outils-creation-site-france.html': '/conseils/2026/01/04/outils-creation-site-france.html',
    '/conseils/2025/08/22/SEO.html': '/conseils/2025/08/22/SEO.html',
    '/conseils/2025/09/10/github.html': '/conseils/2025/09/10/github.html',
    '/conseils/2025/10/12/css.html': '/conseils/2025/10/12/css.html',
    '/conseils/2025/12/14/javascript-vanilla.html': '/conseils/2025/12/14/javascript-vanilla.html',
    
    # Articles déplacés vers /design-ux/
    '/ux-design/2025/02/16/couleurs.html': '/design-ux/2025/02/16/couleurs.html',
    '/web-design/2025/01/12/polices.html': '/design-ux/2025/01/12/polices.html',
    '/ux-design/2025/03/17/visuels.html': '/design-ux/2025/03/17/visuels.html',
    
    # Articles déplacés vers /developpement/
    '/blog/2025/07/16/jquery.html': '/developpement/2025/07/16/jquery.html',
    '/blog/2025/11/13/react.html': '/developpement/2025/11/13/react.html',
}

def corriger_fichier(filepath):
    """Corrige tous les liens dans un fichier"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    corrections_effectuees = []
    
    for ancien, nouveau in CORRECTIONS.items():
        # Corriger les liens avec et sans ancres
        if ancien in content:
            content = content.replace(ancien, nouveau)
            corrections_effectuees.append(f"{ancien} → {nouveau}")
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return corrections_effectuees
    
    return []

def main():
    print("🔧 CORRECTION AUTOMATIQUE DES LIENS CASSÉS")
    print("=" * 80)
    
    # Trouver tous les fichiers HTML
    fichiers_a_corriger = [
        'index.html',
        'contact.html',
        'creation-site-vitrine.html',
        'creation-site-ecommerce.html',
        'developpement-web.html',
        'graphisme.html',
        'maintenance-site-web.html',
        'blog.html',
        'portfolio.html',
        'qui-suis-je.html',
        'mentions-legales.html',
        'politique-confidentialite.html',
        'combien-coute-site-web.html',
        'agence-web-albertville.html',
        'agence-web-annecy.html',
        'agence-web-chambery.html',
        'agence-web-aix-les-bains.html'
    ]
    
    total_corrections = 0
    fichiers_modifies = 0
    
    for fichier in fichiers_a_corriger:
        filepath = Path(fichier)
        if filepath.exists():
            corrections = corriger_fichier(filepath)
            if corrections:
                fichiers_modifies += 1
                total_corrections += len(corrections)
                print(f"\n✅ {fichier}:")
                for corr in corrections:
                    print(f"  • {corr}")
        else:
            print(f"⚠️  {fichier} n'existe pas")
    
    print("\n" + "=" * 80)
    print(f"✅ {total_corrections} corrections effectuées dans {fichiers_modifies} fichiers")
    print("=" * 80)

if __name__ == "__main__":
    main()
