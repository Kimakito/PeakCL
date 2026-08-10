/**
 * Régénère flyer-peakcl-dorure.html à partir de flyer-peakcl.html.
 *
 * Pourquoi un script : la forme de dorure doit se superposer au PDF quadri au
 * dixième de millimètre. Tant que les deux fichiers étaient maintenus à la
 * main, toute retouche de mise en page dans l'un décalait silencieusement
 * l'autre — et le décalage ne se voit qu'une fois la feuille d'or posée, donc
 * après facturation. Ici la géométrie n'est écrite qu'UNE fois, dans le quadri.
 *
 * Ce script ne touche QUE les couleurs et le décor :
 *   - décors SVG remplacés par les seuls filets, en aplat noir ;
 *   - bloc de surcharge CSS ajouté en fin de <style> : tout ce qui n'est pas
 *     doré passe en `transparent` (le texte garde sa place) ou en
 *     `visibility:hidden` (blocs entiers).
 *
 * ⚠ Attention aux SPÉCIFICITÉS CSS quand on ajoute une règle ici : une règle
 * du quadri plus spécifique l'emporte sur la surcharge. C'est ce qui a laissé
 * passer `.sep i:first-child` et `.ligne.sec` au premier essai — les deux
 * ressortaient en couleur dans la forme. Toujours revérifier le rendu : la
 * forme doit être du NOIR PUR sur BLANC, rien d'autre.
 *
 * Usage (depuis n'importe où) :
 *   node brand/print/flyer/build-dorure.mjs
 * Puis ré-exporter les deux PDF (voir README).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "flyer-peakcl.html");
const DST = join(HERE, "flyer-peakcl-dorure.html");
let h = readFileSync(SRC, "utf8");

h = h.replace(
  "<title>Flyer A5 — PeakCL · Charlotte Lacroix</title>",
  "<title>Flyer A5 PeakCL — forme de dorure</title>",
);

// En-tête de fichier
h = h.replace(/<!--\n  Flyer PeakCL[\s\S]*?-->/, `<!--
  FICHIER DE FORME — DORURE À CHAUD OR
  Flyer A5 PeakCL, 148 x 210 mm + 3 mm de fond perdu (page 154 x 216 mm).
  Page 1 = recto · Page 2 = verso, MÊME géométrie que flyer-peakcl.html
  ⚠ FICHIER GÉNÉRÉ — NE PAS ÉDITER À LA MAIN.
  Produit par build-dorure.mjs à partir de flyer-peakcl.html. Toute retouche
  manuelle sera écrasée au prochain \`node brand/print/flyer/build-dorure.mjs\`.
  Pour changer la mise en page : éditer le quadri, puis relancer le script.

  Ne contient QUE les zones à dorer, en NOIR 100 % sur BLANC. Le noir n'est pas
  une encre ici : il dit à l'imprimeur où poser la feuille d'or. Se superpose au
  PDF quadri au repérage.

  Dorés : logotype, « simplifiée. », les deux filets, le titre du CTA,
  le sur-titre « Notre approche… », les titres d'étapes, les 5 étoiles,
  « Charlotte Lacroix » au pied.
  NON dorés (absents) : fonds, arcs or, motif gaufré, trame de points, billes,
  logo carré du recto, textes courants, pastilles, cartes services, QR codes,
  pictos, pointillés de liaison, mentions légales.

  ⚠ Toute modification de flyer-peakcl.html doit être reportée ici :
  les deux PDF doivent se superposer au dixième de millimètre près.

  Export : Chrome > Imprimer > PDF, marges "aucune", arrière-plans cochés, 100 %.
-->`);

// Décors : on ne garde que les filets sous en-tête, en aplat noir plus court
// (la quadri les fait mourir en dégradé, la dorure ne sait faire que de l'aplat).
const decos = h.match(/  <svg class="deco"[\s\S]*?\n  <\/svg>/g);
if (decos?.length !== 2) throw new Error(`attendu 2 <svg class="deco">, trouvé ${decos?.length}`);
h = h.replace(decos[0], `  <svg class="deco" viewBox="0 0 154 216" aria-hidden="true">
    <!-- filet sous l'en-tête (quadri : x14 w126 en dégradé mourant) -->
    <rect x="14" y="28.5" width="70" height=".3" fill="#000000"/>
  </svg>`);
h = h.replace(decos[1], `  <svg class="deco" viewBox="0 0 154 216" aria-hidden="true">
    <!-- filet sous l'en-tête (quadri : x14 w100 en dégradé mourant) -->
    <rect x="14" y="31" width="55" height=".3" fill="#000000"/>
  </svg>`);

h = h.replace("logotype-horizontal-or.svg", "logotype-horizontal-noir.svg");

const OVERRIDE = `
  /* ══════════ SURCHARGE FORME DE DORURE ══════════
     Les éléments non dorés passent en \`transparent\` (le texte garde sa place,
     donc les mots dorés restent exactement aux mêmes coordonnées) ou en
     \`visibility:hidden\` pour les blocs entiers. Ne rien repositionner ici. */
  html,body{ background:#B9B9B9; }
  body{ color:transparent; }
  .page{ background:#FFFFFF; box-shadow:none; }
  .trim{ border-color:rgba(0,0,0,.35); }
  .safe{ border-color:rgba(0,0,0,.2); }

  /* RECTO */
  .entete-lieu, .chapo{ color:transparent; }
  .h1{ color:transparent; }
  .h1 em{ color:#000; }
  .logo-ornement{ visibility:hidden; }   /* imprimé en quadri, jamais doré */
  .atouts{ visibility:hidden; }
  .cta{ background:none; border-color:transparent; }
  .cta-qr{ visibility:hidden; }
  .cta-txt .kicker, .cta-sous, .cta-sous b{ color:transparent; }
  .cta-titre{ color:#000; }
  /* Mentions légales : quadri uniquement. Corps 5 pt — trop fin pour la feuille
     d'or, et une mention légale doit rester lisible en toute lumière, ce que
     l'or ne garantit pas. */
  .mentions{ color:transparent; border-top-color:transparent; }

  /* VERSO */
  .v-entete .kicker, .h2{ color:transparent; }
  .services{ visibility:hidden; }
  /* Sur-titre doré, filets latéraux NON dorés : ce sont deux dégradés mourants
     de 0,3 mm, que la dorure ne sait pas reproduire et qui multiplieraient les
     zones de repérage pour un gain nul. */
  .sep .kicker{ color:#000; }
  /* Sélecteur répété sur :first-child/:last-child — sinon la règle du quadri,
     plus spécifique, l'emporte et les filets ressortent en or dans la forme. */
  .sep i, .sep i:first-child, .sep i:last-child{ background:none; }
  .etape figure{ visibility:hidden; }
  .etape b{ color:#000; }
  .etape span{ color:transparent; }
  /* Pointillé de liaison : 0,35 mm en pointillé, sous le seuil de toutes les
     dorures. Reste en quadri. */
  .etape:not(:last-child)::after{ border-top-color:transparent; }
  .avis{ background:none; border-color:transparent; border-left-color:transparent; }
  .avis q, .avis footer{ color:transparent; }
  .etoiles svg{ color:#000; }
  .pied-nom{ color:#000; }
  /* \`.ligne.sec\` (colonne réseaux) est plus spécifique que \`.ligne\` : sans le
     rappeler ici, les libellés de réseaux restaient visibles dans la forme. */
  .pied-role, .ligne, .ligne.sec{ color:transparent; }
  .puce{ border-color:transparent; background:none; }
  .puce svg{ color:transparent; }
  .qr-bloc{ visibility:hidden; }

  /* Décommenter si l'imprimeur refuse les petits corps (< 8 pt) :
  .etape b{ color:transparent; }
  */
`;
h = h.replace(/\n<\/style>/, OVERRIDE + "</style>");

writeFileSync(DST, h, "utf8");
console.log("dorure régénérée :", h.split("\n").length, "lignes");
