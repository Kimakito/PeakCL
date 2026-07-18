Contexte : Page /portfolio de mon site PeakCL (thème sombre, néons violet #a855f7 et cyan #22d3ee, dégradés). Elle affiche actuellement une grille responsive de cartes projets. Chaque carte contient : un screenshot du site réalisé, un titre, un métier et une ville (ex : « Adelante Voyages · Agence de voyage · France ») et une icône lien externe ↗. Des boutons de filtre par métier en haut (Tous, Thérapeutes, Artisans, etc.) filtrent les projets.
Objectif : Remplacer la grille par une expérience de motion design de type pellicule de film / bobine de cinéma défilant horizontalement. Chaque projet est un photogramme de la pellicule. L'utilisateur fait défiler la bobine (au scroll, au swipe tactile, ou aux flèches clavier) et passe les projets en revue. Le photogramme au centre est mis en avant (net, légèrement agrandi, éclairé par un effet « projecteur » / glow néon violet→cyan) ; les photogrammes voisins sont un peu plus petits, estompés et assombris. Rendu moderne, cinématographique, interactif et intrigant.
Détails visuels de la pellicule :

Une bande horizontale continue avec, en haut et en bas, les perforations caractéristiques de la pellicule 35mm (petits rectangles réguliers), qui défilent avec la bande.
Chaque photogramme = un screenshot de projet cadré comme une image de film, avec le titre/métier/ville en légende sous l'image.
Léger grain de film et vignettage subtil sur l'ensemble ; effet « projecteur » (halo lumineux) centré sur le photogramme actif, dans tes couleurs néon.
Touche de profondeur discrète : le photogramme central scale ~1.05 et net, les voisins scale ~0.9 avec opacité réduite et léger blur.

Exigences fonctionnelles :

Défilement horizontal lié au scroll vertical de la souris (scroll down = la bobine avance), + support natif du swipe tactile + navigation flèches gauche/droite au clavier. Ne bloque pas indéfiniment le scroll de la page : quand on arrive au bout de la bobine, le scroll reprend normalement (ou rends la pellicule dans une section délimitée « sticky » qu'on traverse).
Snap doux sur chaque photogramme (scroll-snap) pour que l'image active soit toujours bien cadrée.
Les photogrammes restent cliquables (ouvrent le projet) et l'icône ↗ reste visible sur le photogramme actif.
Les filtres par métier continuent de fonctionner : changer de filtre recompose la bobine en douceur (animation) avec seulement les projets concernés, et repositionne au début.
Indicateur de progression discret (ex : « 3 / 22 » ou une barre style compteur de pellicule).

Contraintes :

Respecte prefers-reduced-motion: reduce : désactive grain/animations et affiche une grille ou un carrousel statique.
Mobile : carrousel horizontal tactile (swipe) avec scroll-snap, perforations et grain simplifiés pour la perf.
Performance 60fps : anime uniquement transform, opacity, filter ; will-change avec parcimonie ; pas de reflow. Le grain de préférence via overlay CSS/SVG léger, pas une grosse image.
Accessibilité/SEO : titres et liens restent dans le DOM, navigables au clavier, avec aria-label sur les contrôles.
Charte : fond sombre, néons violet/cyan cohérents avec l'existant.
Pas de lib lourde si évitable. Si une lib d'animation est utile, propose GSAP (ScrollTrigger, idéal pour ce type d'effet horizontal scroll-driven) ou Framer Motion selon la stack, et demande-moi confirmation avant de l'ajouter.

Livrables :

D'abord inspecte le code existant (composant grille, données des projets, système de filtres) et indique-moi la stack (React/Next, Vue, HTML statique… ?) avant de coder.
Propose une maquette/variante de la pellicule avant l'implémentation complète.
Implémente de façon progressive et testable, avec un fallback propre (grille classique).