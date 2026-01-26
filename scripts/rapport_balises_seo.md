# Rapport de présence des balises SEO (title, description, h1, données structurées)

- Ce rapport doit être généré automatiquement par un script Python ou manuellement en vérifiant chaque page HTML.
- Pour chaque page, vérifier la présence des balises suivantes :
  - `<title>`
  - `<meta name="description">`
  - `<h1>`
  - Données structurées (schema.org ou json-ld)

## Exemple de structure de rapport

| Page | Title | Description | H1 | Données structurées |
|------|-------|-------------|----|---------------------|
| index.html | ✅ | ✅ | ✅ | ✅ |
| ... | ... | ... | ... | ... |

- Pour automatiser, utiliser BeautifulSoup en Python.
