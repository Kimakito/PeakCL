# assets-source — fichiers sources (hors build)

Ce dossier regroupe les fichiers de travail bruts, NON utilisés directement
par l'application. L'app sert ses assets depuis `public/peakcl/` et `src/assets/`.

- `captures-sites/`   : captures d'écran brutes des sites clients
                        (les versions optimisées du portfolio sont dans
                        `public/peakcl/portfolio/*.webp`)
- `avatars-source/`   : poses brutes de la mascotte + planche `poses.png`
                        (les versions web détourées sont dans
                        `public/peakcl/avatar-*.webp`)
- `logos-clients/`    : logos créés pour les clients (sources)
- `documents/`        : documents internes (audit SEO, devis…)

Rien ici n'est importé par le code : on peut déplacer/archiver sans risque.
