import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

const BRAND = {
  name: "PeakCL",
  url: "peakcl.com",
  colors: {
    bg: "#0d0b14",
    paper: "#12101c",
    ink: "#F7F7FB",
    muted: "rgba(247,247,251,0.72)",
    border: "rgba(255,255,255,0.10)",
    violet: "#7B3FF2",
    turquoise: "#00E5D4",
    yellow: "#FFD500",
  },
  fonts: {
    display: `"Space Grotesk", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
    sans: `"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
    mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  },
};

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageChrome({ left, right, page }) {
  return `
    <div class="footer">
      <div class="footer__left">${esc(left)}</div>
      <div class="footer__right">${esc(right)} · ${page}</div>
    </div>
  `;
}

function layout({ titleTop, title, subtitle, chips = [], pages }) {
  const chipsHtml = chips
    .map((c) => `<span class="chip"><span class="chip__dot"></span>${esc(c)}</span>`)
    .join("");

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <style>
        :root{
          --bg:${BRAND.colors.bg};
          --paper:${BRAND.colors.paper};
          --ink:${BRAND.colors.ink};
          --muted:${BRAND.colors.muted};
          --border:${BRAND.colors.border};
          --violet:${BRAND.colors.violet};
          --turq:${BRAND.colors.turquoise};
          --yellow:${BRAND.colors.yellow};
          --display:${BRAND.fonts.display};
          --sans:${BRAND.fonts.sans};
          --mono:${BRAND.fonts.mono};
        }
        *{box-sizing:border-box}
        html,body{margin:0;padding:0;background:var(--bg);color:var(--ink);font-family:var(--sans)}
        .page{
          width: 210mm;
          height: 297mm;
          padding: 18mm 18mm 18mm 18mm;
          position: relative;
          background:
            radial-gradient(900px 420px at 50% -140px, color-mix(in oklab, var(--violet) 22%, transparent), transparent 60%),
            radial-gradient(700px 420px at 110% 20%, color-mix(in oklab, var(--turq) 14%, transparent), transparent 60%),
            radial-gradient(700px 420px at -10% 35%, color-mix(in oklab, var(--yellow) 10%, transparent), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
        }
        .frame{
          position:absolute; inset: 12mm;
          border: 1px solid var(--border);
          border-radius: 18px;
          pointer-events:none;
        }
        .header{
          display:flex; align-items:flex-start; justify-content:space-between; gap: 16px;
          margin-bottom: 16mm;
        }
        .brand{
          display:flex; flex-direction:column; gap: 6px;
        }
        .brand__kicker{
          font-size: 12px;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .brand__titleTop{
          font-family: var(--display);
          font-weight: 700;
          font-size: 28px;
          letter-spacing: -0.02em;
          line-height: 1.05;
        }
        .brand__title{
          font-family: var(--display);
          font-weight: 700;
          font-size: 44px;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-top: 6px;
        }
        .brand__subtitle{
          margin-top: 10px;
          max-width: 140mm;
          font-size: 14px;
          line-height: 1.55;
          color: var(--muted);
        }
        .chips{
          display:flex; flex-wrap:wrap; gap: 8px;
          margin-top: 12px;
        }
        .chip{
          display:inline-flex; align-items:center; gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.04);
          font-size: 12px;
          color: var(--ink);
          white-space: nowrap;
        }
        .chip__dot{
          width: 8px; height: 8px; border-radius: 999px;
          background: linear-gradient(135deg, var(--violet), color-mix(in oklab, var(--violet) 60%, var(--turq)));
          box-shadow: 0 10px 28px -18px color-mix(in oklab, var(--violet) 55%, transparent);
        }
        .content{
          display:grid;
          gap: 12px;
        }
        .h2{
          font-family: var(--display);
          font-weight: 700;
          font-size: 22px;
          letter-spacing: -0.02em;
          margin: 0 0 8px 0;
        }
        .p{
          margin: 0;
          font-size: 13px;
          line-height: 1.65;
          color: var(--muted);
        }
        .card{
          border: 1px solid var(--border);
          background: rgba(18,16,28,0.55);
          border-radius: 18px;
          padding: 16px 16px;
        }
        .list{
          margin: 10px 0 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
        }
        .li{
          display:flex;
          gap: 10px;
          align-items:flex-start;
          font-size: 13px;
          line-height: 1.55;
          color: var(--muted);
        }
        .bullet{
          width: 18px; height: 18px;
          border-radius: 999px;
          flex: 0 0 auto;
          margin-top: 2px;
          background: color-mix(in oklab, var(--violet) 18%, transparent);
          border: 1px solid var(--border);
          position: relative;
        }
        .bullet:after{
          content:"";
          position:absolute;
          width: 6px; height: 6px;
          border-radius: 999px;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          background: var(--turq);
        }
        .kpi{
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        .kpi__item{
          border-radius: 14px;
          border: 1px solid var(--border);
          padding: 10px 12px;
          background: rgba(255,255,255,0.03);
        }
        .kpi__label{
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .kpi__value{
          margin-top: 6px;
          font-family: var(--display);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .footer{
          position: absolute;
          left: 18mm;
          right: 18mm;
          bottom: 14mm;
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap: 10px;
          color: var(--muted);
          font-size: 10.5px;
          border-top: 1px solid var(--border);
          padding-top: 8px;
        }
        .footer__left{white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
        .footer__right{white-space:nowrap}
        .spacer{height: 10px}
        .titleBadge{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.03);
          color: var(--muted);
          font-size: 12px;
          white-space: nowrap;
        }
        .titleBadge strong{color: var(--ink); font-weight: 700}
      </style>
    </head>
    <body>
      ${pages
        .map(
          (p, idx) => `
          <div class="page">
            <div class="frame"></div>
            ${
              idx === 0
                ? `
              <div class="header">
                <div class="brand">
                  <div class="brand__kicker">${esc(titleTop)}</div>
                  <div class="brand__title">${esc(title)}</div>
                  ${subtitle ? `<div class="brand__subtitle">${esc(subtitle)}</div>` : ""}
                  ${chipsHtml ? `<div class="chips">${chipsHtml}</div>` : ""}
                </div>
                <div class="titleBadge"><strong>${esc(BRAND.name)}</strong> · ${esc(BRAND.url)}</div>
              </div>
              <div class="content">${p}</div>
            `
                : `
              <div class="content">${p}</div>
            `
            }
            ${pageChrome({ left: `${BRAND.url} · ${BRAND.name}`, right: "Tous droits réservés", page: idx + 1 })}
          </div>
        `,
        )
        .join("")}
    </body>
  </html>`;
}

function card(title, bodyHtml) {
  return `<div class="card">
    <div class="h2">${esc(title)}</div>
    ${bodyHtml}
  </div>`;
}

function para(text) {
  return `<p class="p">${esc(text)}</p>`;
}

function list(items) {
  return `<ul class="list">
    ${items
      .map(
        (t) => `<li class="li"><span class="bullet"></span><span>${esc(t)}</span></li>`,
      )
      .join("")}
  </ul>`;
}

function kpiTriplet(items) {
  return `<div class="kpi">
    ${items
      .map(
        ({ label, value }) => `<div class="kpi__item"><div class="kpi__label">${esc(label)}</div><div class="kpi__value">${esc(value)}</div></div>`,
      )
      .join("")}
  </div>`;
}

const docs = [
  {
    out: "public/peakcl/assets/ressources/peakcl_guide01_systeme.pdf",
    titleTop: "GUIDE 01",
    title: "Pourquoi tu n'as pas de clients",
    subtitle: "Même si tu fais tout « comme il faut ». La visibilité seule ne suffit pas — ce guide t’explique le système à mettre en place.",
    chips: ["Système en 3 étapes", "Exemples concrets", "Actions immédiates"],
    pages: [
      [
        card(
          "Le vrai problème",
          para(
            "Tu peux poster tous les jours, être actif sur les réseaux… et toujours ne pas avoir de clients. Ce n’est pas un hasard. Et ce n’est pas ta faute.",
          ) +
            `<div class="spacer"></div>` +
            para(
              "La majorité des indépendants pensent que leur problème, c’est la visibilité. Alors ils postent plus, boostent leurs publications, refont leur logo… mais rien ne change.",
            ) +
            `<div class="spacer"></div>` +
            para("Parce que le problème n’est pas là."),
        ),
        card(
          "Ce qui te manque réellement",
          list([
            "Pas de structure: aucun fil conducteur entre ce que tu montres et ce que tu vends. Le visiteur ne sait pas où aller.",
            "Pas de parcours client: il n’existe pas de chemin balisé entre la première découverte et la prise de contact.",
            "Pas de conversion: même si quelqu’un s’intéresse à toi, il n’y a pas de mécanisme clair pour passer à l’étape suivante.",
          ]) +
            `<div class="spacer"></div>` +
            para("Ce qui te manque, ce n’est pas plus de trafic. C’est un système."),
        ),
      ].join(""),
      [
        card(
          "Le système en 3 étapes",
          para("Un système simple et reproductible, qui fait le travail à ta place — même quand tu dors.") +
            kpiTriplet([
              { label: "01", value: "Attirer" },
              { label: "02", value: "Convaincre" },
              { label: "03", value: "Convertir" },
            ]) +
            `<div class="spacer"></div>` +
            list([
              "Attirer: toucher les bonnes personnes, pas tout le monde. Un message ciblé vaut 10× plus que du volume.",
              "Convaincre: montrer que tu comprends leur problème et que tu as la solution. La confiance se construit ici.",
              "Convertir: transformer l’intérêt en décision. Un CTA clair, un appel, une offre bien formulée.",
            ]),
        ),
        card(
          "À retenir",
          list([
            "La visibilité sans système, c’est du bruit.",
            "Un système sans clarté, c’est de l’énergie gaspillée.",
            "Trois étapes, dans l’ordre, sans en sauter une.",
          ]),
        ),
      ].join(""),
      [
        card(
          "3 actions à faire cette semaine",
          list([
            "Audite ton parcours client: trace le chemin d’un visiteur depuis la découverte jusqu’à la prise de contact. Est‑ce que ce chemin est clair ?",
            "Identifie ton maillon faible: Attirer / Convaincre / Convertir — sur lequel des trois tu bloques vraiment ? Concentre ton énergie là.",
            "Formule ton offre en une phrase: “J’aide [qui] à [résultat] grâce à [méthode].” Si tu n’y arrives pas en 30 secondes, c’est là que ça coince.",
          ]),
        ),
      ].join(""),
    ],
  },
  {
    out: "public/peakcl/assets/ressources/peakcl_guide02_site.pdf",
    titleTop: "GUIDE 02",
    title: "Pourquoi ton site ne convertit pas",
    subtitle: "Et comment le transformer en outil de vente. Un site web n’est pas une vitrine: c’est un commercial disponible 24h/24.",
    chips: ["Erreurs fréquentes", "Framework en 3 piliers", "Actions concrètes"],
    pages: [
      [
        card(
          "La majorité des sites sont inutiles",
          para("Pas moches. Pas mal faits. Juste… inutiles. Ils existent. Mais ils ne travaillent pas.") +
            `<div class="spacer"></div>` +
            para(
              "Si personne ne te contacte via ton site, c’est qu’il y a un problème structurel — pas esthétique.",
            ),
        ),
        card(
          "Les 3 erreurs les plus courantes",
          list([
            "Parler de soi: ton parcours, tes diplômes… Le visiteur veut surtout savoir si tu peux l’aider, lui.",
            "Pas de message clair: en 5 secondes, ton visiteur ne comprend pas ce que tu fais ni pour qui. Il repart.",
            "Pas de CTA visible: pas d’appel à l’action clair = pas de prochaine étape. Le visiteur lit, puis ferme l’onglet.",
          ]) +
            `<div class="spacer"></div>` +
            para("Un bon site ne présente pas ce que tu fais. Il prouve que tu peux résoudre un problème."),
        ),
      ].join(""),
      [
        card(
          "Les 3 piliers d’un site qui convertit",
          para("Un framework simple qui s’applique à n’importe quel site — vitrine, portfolio ou e‑commerce.") +
            kpiTriplet([
              { label: "01", value: "Clarté" },
              { label: "02", value: "Structure" },
              { label: "03", value: "Offre" },
            ]) +
            `<div class="spacer"></div>` +
            list([
              "Clarté: en 5 secondes, qui tu aides, sur quel problème, avec quel résultat. Pas de jargon. Pas de flou.",
              "Structure: chaque section guide vers la suivante (Hero → Problème → Solution → Preuve → CTA). Rien n’est laissé au hasard.",
              "Offre: ce que tu proposes doit être formulé comme une solution à un problème réel — pas comme une liste de prestations.",
            ]),
        ),
        card(
          "La promesse d’un site bien construit",
          para(
            "Un bon site travaille pour toi 24h/24. Il filtre, il rassure, il donne envie de te contacter — sans que tu aies à intervenir.",
          ) +
            `<div class="spacer"></div>` +
            para(
              "Le visiteur doit se dire: “c’est exactement ce que je cherche” — et non “c’est bien, mais je ne sais pas si c’est pour moi”.",
            ),
        ),
      ].join(""),
      [
        card(
          "Checklist rapide : ton site convertit‑il ?",
          list([
            "En 5 secondes, un inconnu comprend ce que tu fais et pour qui.",
            "Ton message parle du problème de ton client, pas de toi.",
            "Il y a au moins un bouton d’appel à l’action visible sans scroller.",
            "Ta page de services explique un résultat, pas une liste de tâches.",
            "Tu as au moins un élément de preuve (avis, témoignage, résultat).",
            "Ton site est lisible sur mobile sans effort.",
          ]),
        ),
      ].join(""),
    ],
  },
  {
    out: "public/peakcl/assets/ressources/peakcl_guide03_confiance.pdf",
    titleTop: "GUIDE 03",
    title: "Pourquoi tes prospects ne te font pas confiance",
    subtitle: "Et comment changer ça rapidement. Si tes prospects hésitent avant de te contacter, ce n’est pas un problème de prix — c’est un problème de confiance.",
    chips: ["Psychologie du client", "3 éléments clés", "Plan d’action"],
    pages: [
      [
        card(
          "Ce n’est pas un problème de prix",
          para(
            "Si tes prospects hésitent, demandent ton tarif puis disparaissent… ce n’est pas parce que tu es trop cher. C’est parce qu’ils ne te font pas encore assez confiance.",
          ) +
            `<div class="spacer"></div>` +
            para(
              "En ligne, la confiance se joue en quelques secondes. Si ces premières secondes ne déclenchent pas le bon signal, le prospect passe à autre chose — sans jamais te dire pourquoi.",
            ),
        ),
        card(
          "Ce qui crée le doute",
          list([
            "Image peu professionnelle: photo floue, site daté, identité incohérente… le cerveau enregistre immédiatement “pas sérieux”.",
            "Message flou: si on ne comprend pas ce que tu fais et pour qui, le doute s’installe. Le flou ne rassure jamais.",
            "Incohérence globale: ton site dit une chose, tes réseaux en montrent une autre, ton offre en propose une troisième.",
          ]) +
            `<div class="spacer"></div>` +
            para("Le prix n’est jamais la vraie objection. C’est l’argument qu’on donne quand on n’est pas convaincu."),
        ),
      ].join(""),
      [
        card(
          "Comment fonctionne le cerveau de ton client",
          para("Comprendre ce mécanisme, c’est comprendre pourquoi l’image et le message sont stratégiques — pas accessoires.") +
            kpiTriplet([
              { label: "Rapide", value: "Décision < 3 sec" },
              { label: "Émotionnel", value: "Ressenti > logique" },
              { label: "Visuel", value: "Image avant texte" },
            ]) +
            `<div class="spacer"></div>` +
            para(
              "Travailler ton image et ton message, ce n’est pas faire du cosmétique. C’est activer le mécanisme qui transforme un inconnu en prospect confiant.",
            ),
        ),
      ].join(""),
      [
        card(
          "Les 3 éléments qui installent la confiance",
          kpiTriplet([
            { label: "01", value: "Image pro" },
            { label: "02", value: "Message clair" },
            { label: "03", value: "Cohérence globale" },
          ]) +
            `<div class="spacer"></div>` +
            list([
              "Image professionnelle: cohérente, soignée, alignée avec ce que tu vends.",
              "Message clair: spécifique, concret, sans jargon, orienté problème client.",
              "Cohérence globale: site, réseaux, offre, communication — tout doit parler le même langage.",
            ]) +
            `<div class="spacer"></div>` +
            para("Quand ces trois éléments sont alignés, le doute disparaît. Et la décision devient évidente."),
        ),
      ].join(""),
    ],
  },
  {
    out: "public/peakcl/assets/peakcl_ressource_conversion.pdf",
    titleTop: "RESSOURCE",
    title: "Transformer ton site en machine à clients",
    subtitle:
      "Ce n’est pas un problème de design. C’est un problème de structure et de message. Voici les bases à vérifier.",
    chips: ["Clarté", "Structure", "Conversion"],
    pages: [
      [
        card(
          "Pourquoi la majorité des sites échouent",
          para("La plupart des sites sont pensés comme des vitrines: ils parlent de l’entreprise, listent des services, sont “jolis”…") +
            `<div class="spacer"></div>` +
            para("Mais ils oublient l’essentiel: convertir un visiteur en client."),
        ),
        card(
          "Ce que ton visiteur attend vraiment",
          para("Quand quelqu’un arrive sur ton site, il se pose une seule question:") +
            `<div class="spacer"></div>` +
            `<div class="card"><div class="p" style="font-family:var(--display); font-weight:700; color:var(--ink); font-size:18px; line-height:1.3;">“Est‑ce que cette personne peut résoudre mon problème ?”</div></div>` +
            `<div class="spacer"></div>` +
            para("Si la réponse n’est pas évidente en quelques secondes, il part."),
        ),
      ].join(""),
      [
        card(
          "Le système PeakCL (3 piliers)",
          kpiTriplet([
            { label: "01", value: "Clarté" },
            { label: "02", value: "Structure" },
            { label: "03", value: "Conversion" },
          ]) +
            `<div class="spacer"></div>` +
            list([
              "Clarté: ton message doit être instantanément compréhensible. En 3 secondes: ce que tu fais, pour qui, et le résultat.",
              "Structure: un site efficace guide le visiteur (problème → solution → preuve → passage à l’action).",
              "Conversion: chaque élément pousse à une action claire (prise de contact, appel, demande de devis).",
            ]),
        ),
        card(
          "Auto‑diagnostic rapide",
          list([
            "Comprend‑on ce que tu fais en 5 secondes ?",
            "Ton site parle‑t‑il du client ou de toi ?",
            "Y a‑t‑il un appel à l’action clair ?",
            "Ton site guide‑t‑il ou laisse‑t‑il le visiteur perdu ?",
          ]),
        ),
      ].join(""),
    ],
  },
];

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function run() {
  // On some macOS setups (especially with mixed arch binaries), Playwright's bundled
  // headless shell can crash. Prefer the locally installed Chrome when available.
  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome", headless: true });
  } catch {
    browser = await chromium.launch();
  }
  const page = await browser.newPage({
    viewport: { width: 794, height: 1123 }, // ~A4 at 96dpi
    deviceScaleFactor: 2,
  });

  for (const doc of docs) {
    const html = layout({
      titleTop: doc.titleTop,
      title: doc.title,
      subtitle: doc.subtitle,
      chips: doc.chips,
      pages: doc.pages,
    });

    await page.setContent(html, { waitUntil: "networkidle" });
    await ensureDir(path.join(ROOT, doc.out));

    await page.pdf({
      path: path.join(ROOT, doc.out),
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
      preferCSSPageSize: true,
    });
  }

  await browser.close();
}

await run();

