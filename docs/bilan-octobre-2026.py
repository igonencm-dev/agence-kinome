"""Bilan d'octobre 2026 d'agence-kinome.ch : HTML aux couleurs de Kinome, imprimé en PDF
par Chrome sans interface. Une <section> = une page A4. Chiffres relevés le 03/11/2026 :
Search Console (/u/2/), tableau de bord /admin/ (copie de la base), Causerie (MCP),
journal hPanel du 28-29/10, boîte de Mathias (objets des messages seulement)."""
import os, re, subprocess

ICI = os.environ.get("BILAN_TMP", "/tmp")
SITE = "/Users/mathi/Sites/agence-kinome"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HTML = os.path.join(ICI, "bilan-octobre-2026.html")
PDF = os.path.join(SITE, "docs", "bilan-octobre-2026.pdf")

LOGO = open(f"{SITE}/public/assets/logo-kinome.svg", encoding="utf-8").read()
LOGO = LOGO.replace("<svg ", '<svg class="logo" ', 1)


def typo_texte(t):
    t = re.sub(r"(?<=\S) ([?!:;%])", lambda m: "&nbsp;" + m.group(1), t)
    t = t.replace("« ", "«&nbsp;").replace(" »", "&nbsp;»")
    t = re.sub(r"(\d) (\d{3})(?!\d)", lambda m: m.group(1) + "&nbsp;" + m.group(2), t)
    t = re.sub(r"(\d) (CHF|USD|EUR|€|h|min|s)\b", lambda m: m.group(1) + "&nbsp;" + m.group(2), t)
    return t


def typo(html):
    """Typographie française sur les seuls nœuds de texte : jamais dans les balises."""
    morceaux = re.split(r"(<[^>]+>)", html)
    return "".join(m if m.startswith("<") else typo_texte(m) for m in morceaux)


CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; color: #111111; background: #f9f7f2; font-size: 9.6pt; line-height: 1.45;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }
section { width: 210mm; height: 297mm; padding: 15mm 15mm 18mm; position: relative; overflow: hidden; page-break-after: always; background: #f9f7f2; }
section:last-child { page-break-after: auto; }
h1, h2, h3 { font-family: 'Krub', sans-serif; margin: 0; text-wrap: balance; }
h1 { font-size: 46pt; font-weight: 600; line-height: 1.02; letter-spacing: -0.5pt; }
h2 { font-size: 21pt; font-weight: 600; line-height: 1.15; margin-bottom: 4mm; }
h3 { font-size: 12pt; font-weight: 600; margin: 5mm 0 2mm; }
p, li { text-wrap: pretty; }
p { margin: 0 0 2.6mm; }
.sur { font-size: 7.6pt; font-weight: 600; letter-spacing: 1.6pt; text-transform: uppercase; color: #e04034; margin-bottom: 2.5mm; }
.chapo { font-size: 10.6pt; color: #333; margin-bottom: 5mm; max-width: 165mm; }
.gris { color: #6b6a66; }
.petit { font-size: 8pt; color: #6b6a66; }
.logo { width: 34mm; height: auto; --fill-0: #111111; display: block; }
.pied { position: absolute; left: 15mm; right: 15mm; bottom: 8mm; display: flex; justify-content: space-between; font-size: 7pt; color: #8a877f; border-top: 0.6pt solid #e2ded3; padding-top: 2mm; }
.grille { display: grid; gap: 3mm; }
.g4 { grid-template-columns: repeat(4, 1fr); }
.g3 { grid-template-columns: repeat(3, 1fr); }
.g2 { grid-template-columns: 1fr 1fr; }
.carte { background: #ffffff; border-radius: 14px; padding: 4.2mm 3.5mm; text-align: center; }
.carte .n { font-family: 'Krub', sans-serif; font-size: 25pt; font-weight: 600; line-height: 1; }
.carte .l { font-size: 8.4pt; margin-top: 1.6mm; line-height: 1.3; }
.carte .c { font-size: 7.6pt; color: #6b6a66; margin-top: 1.4mm; }
.carte .c b { color: #1f7a4d; font-weight: 600; }
.sombre { background: #222222; color: #ffffff; border-radius: 16px; padding: 6mm 7mm; }
.sombre .sur { color: #f2a59f; }
.sombre p { margin: 0; font-size: 11pt; line-height: 1.5; }
.bloc { background: #ffffff; border-radius: 14px; padding: 4.5mm 5mm; }
ul.points { list-style: none; padding: 0; margin: 0; }
ul.points li { position: relative; padding-left: 5.5mm; margin-bottom: 2.4mm; }
ul.points li::before { content: ""; position: absolute; left: 0.5mm; top: 1.9mm; width: 2.2mm; height: 2.2mm; border-radius: 50%; background: #e04034; }
ol.retenir { list-style: none; padding: 0; margin: 0; counter-reset: r; }
ol.retenir li { counter-increment: r; position: relative; padding: 0 0 2.5mm 10mm; }
.nw { white-space: nowrap; }
ol.retenir li::before { content: counter(r); position: absolute; left: 0; top: -0.4mm; font-family: 'Krub', sans-serif; font-weight: 600; font-size: 13pt; color: #e04034; }
table { width: 100%; border-collapse: collapse; font-size: 8.4pt; }
th { text-align: left; font-size: 6.9pt; font-weight: 600; letter-spacing: 0.7pt; text-transform: uppercase; color: #6b6a66; padding: 1.6mm 1.8mm; border-bottom: 0.8pt solid #cfc9bb; }
td { padding: 1.55mm 1.8mm; border-bottom: 0.5pt solid #e6e2d8; vertical-align: top; }
td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
tr.total td { font-weight: 600; border-top: 0.8pt solid #cfc9bb; }
.statut { font-weight: 600; white-space: nowrap; }
.ok { color: #1f7a4d; } .part { color: #b7791f; } .afaire { color: #6b6a66; } .non { color: #e04034; }
.deux { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
.note { font-size: 7.8pt; color: #6b6a66; margin-top: 2mm; }
.cle { font-family: 'Krub', sans-serif; font-weight: 600; }
svg text { font-family: 'Inter', sans-serif; }
"""

PIED = "Kinome · Bilan d'octobre 2026 · Sources : Search Console, tableau de bord /admin/, Causerie, journal du serveur"


def page(n, contenu):
    return f'<section>{contenu}<div class="pied"><span>{PIED}</span><span>Page {n}</span></div></section>'


def carte(n, l, c=""):
    return f'<div class="carte"><div class="n">{n}</div><div class="l">{l}</div>' + (f'<div class="c">{c}</div>' if c else "") + "</div>"


def tableau(entetes, lignes, nums=(), total=None):
    th = "".join(f'<th class="num">{e}</th>' if i in nums else f"<th>{e}</th>" for i, e in enumerate(entetes))
    corps = ""
    for l in lignes:
        corps += "<tr>" + "".join(f'<td class="num">{v}</td>' if i in nums else f"<td>{v}</td>" for i, v in enumerate(l)) + "</tr>"
    if total:
        corps += '<tr class="total">' + "".join(f'<td class="num">{v}</td>' if i in nums else f"<td>{v}</td>" for i, v in enumerate(total)) + "</tr>"
    return f"<table><thead><tr>{th}</tr></thead><tbody>{corps}</tbody></table>"


# ---------------------------------------------------------------- graphiques
def graphe_semaines():
    """Clics Google par semaine (lundi au dimanche), septembre en gris, octobre en rouge."""
    sem = [("1-6 sept.", 5, 819, "s"), ("7-13 sept.", 9, 1049, "s"), ("14-20 sept.", 8, 1039, "s"),
           ("21-27 sept.", 10, 1065, "s"), ("28 sept.-4 oct.", 6, 1178, "m"), ("5-11 oct.", 14, 1365, "o"),
           ("12-18 oct.", 13, 1194, "o"), ("19-25 oct.", 15, 1044, "o"), ("26-31 oct.", 20, 1441, "o")]
    L, H, bas, haut = 600, 128, 98, 16
    pas = L / len(sem)
    larg = pas * 0.52
    maxi = 22
    out = [f'<svg viewBox="0 0 {L} {H}" width="100%" xmlns="http://www.w3.org/2000/svg">']
    out.append(f'<line x1="0" y1="{bas}" x2="{L}" y2="{bas}" stroke="#cfc9bb" stroke-width="1"/>')
    for i, (lab, c, imp, m) in enumerate(sem):
        x = i * pas + (pas - larg) / 2
        h = (bas - haut) * c / maxi
        coul = {"s": "#cfc9bb", "m": "#9fcfb3", "o": "#1f7a4d"}[m]
        out.append(f'<rect x="{x:.1f}" y="{bas - h:.1f}" width="{larg:.1f}" height="{h:.1f}" rx="3" fill="{coul}"/>')
        out.append(f'<text x="{x + larg / 2:.1f}" y="{bas - h - 4:.1f}" text-anchor="middle" font-size="11" font-weight="600" fill="#111">{c}</text>')
        out.append(f'<text x="{x + larg / 2:.1f}" y="{bas + 13:.1f}" text-anchor="middle" font-size="8.2" fill="#555">{lab}</text>')
        out.append(f'<text x="{x + larg / 2:.1f}" y="{bas + 25:.1f}" text-anchor="middle" font-size="7.6" fill="#8a877f">{imp} affich.</text>')
    out.append("</svg>")
    return "".join(out)


def graphe_ia():
    """Affichages dans les réponses IA de Google, par page : octobre (rouge) et septembre (gris)."""
    pages = [("Création de logo à Genève", 203, 65), ("Tarifs d'une agence de communication", 170, 72),
             ("Créer une boutique en ligne en Suisse", 105, 119), ("Textes de vœux professionnels", 54, 0),
             ("Prix d'un site internet en Suisse", 26, 19), ("Accueil", 22, 11),
             ("Identité visuelle d'entreprise", 22, 31), ("Service référencement naturel", 17, 17)]
    L, lab_w, ligne = 600, 205, 27
    H = ligne * len(pages) + 6
    maxi = 210
    zone = L - lab_w - 40
    out = [f'<svg viewBox="0 0 {L} {H}" width="100%" xmlns="http://www.w3.org/2000/svg">']
    for i, (p, o, s) in enumerate(pages):
        y = i * ligne + 4
        out.append(f'<text x="0" y="{y + 12:.1f}" font-size="9.4" fill="#111">{p}</text>')
        wo = zone * o / maxi
        ws = zone * s / maxi
        out.append(f'<rect x="{lab_w}" y="{y + 2:.1f}" width="{max(wo, 1):.1f}" height="10" rx="2.5" fill="#1f7a4d"/>')
        out.append(f'<text x="{lab_w + wo + 5:.1f}" y="{y + 11:.1f}" font-size="9" font-weight="600" fill="#111">{o}</text>')
        out.append(f'<rect x="{lab_w}" y="{y + 14:.1f}" width="{max(ws, 1):.1f}" height="6" rx="2" fill="#cfc9bb"/>')
        out.append(f'<text x="{lab_w + ws + 5:.1f}" y="{y + 20.5:.1f}" font-size="7.6" fill="#6b6a66">{s}</text>')
    out.append("</svg>")
    return "".join(out)


# ---------------------------------------------------------------- pages
P = []

P.append(page(1, f"""
<div style="display:flex;justify-content:space-between;align-items:flex-start">{LOGO}<div class="petit" style="text-align:right">Préparé pour Tanguy et Mathias<br>le 3 novembre 2026</div></div>
<div style="margin-top:20mm" class="sur">Bilan mensuel · agence-kinome.ch</div>
<h1>Octobre 2026</h1>
<p class="chapo" style="margin-top:5mm">Visites, demandes, référencement Google et présence dans les réponses des IA, comparés à septembre. Période : du 1er au 31 octobre 2026, heure de Genève.</p>
<div class="grille g4" style="margin-top:9mm">
{carte("63", "clics depuis Google", "septembre : 37 · <b>+70 %</b>")}
{carte("5 685", "affichages dans Google", "septembre : 4 509 · <b>+26 %</b>")}
{carte("744", "affichages dans les réponses IA de Google", "septembre : 416 · <b>+79 %</b>")}
{carte("13,7", "position moyenne dans Google", "septembre : 15,3")}
{carte("129", "visites utiles sur le site", "premier mois complet mesuré")}
{carte("2 min", "de lecture par visite, en moyenne", "médiane : 49 secondes")}
{carte("15", "visites avec un geste de contact", "dont 6 contacts directs")}
{carte("0", "demande par formulaire ou chatbot", "les demandes viennent du réseau")}
</div>
<div class="sombre" style="margin-top:10mm"><div class="sur">En une phrase</div>
<p>Le site est nettement plus vu, plus cliqué et de plus en plus repris par les IA ; il ne transforme pas encore ces visites en demandes écrites, qui sont venues en octobre du réseau et des clients.</p></div>
<p class="petit" style="margin-top:8mm">Sources : Search Console de agence-kinome.ch (relevé du 3 novembre 2026, octobre comparé au 1er au 30 septembre), tableau de bord /admin/ du site (copie de la base du 3 novembre), statistiques du chatbot Causerie, journal du serveur du 28 au 29 octobre, objets des messages reçus par Mathias. Le bilan de septembre couvrait le 1er septembre au 1er octobre : ses chiffres diffèrent donc d'une journée.</p>
"""))

P.append(page(2, f"""
<div class="sur">01 · L'essentiel</div>
<h2>Ce qu'il faut retenir</h2>
<ol class="retenir">
<li><span class="cle">Google : le meilleur mois du site.</span> 63 clics (+70 %) pour 5 685 affichages (+26 %), un taux de clic de 1,1 % contre 0,8 % et une position moyenne de 13,7 contre 15,3. 166 requêtes en première page, contre 113.</li>
<li><span class="cle">Un article saisonnier en tête.</span> Les 50 textes de vœux professionnels, publiés le 7 octobre, font 16 clics, autant que la page d'accueil. L'article des tarifs passe de 4 à 14 clics.</li>
<li><span class="cle">Les IA lisent de plus en plus le site.</span> Les réponses IA de Google l'affichent 744 fois (+79 %), surtout pour le guide du logo (203) et les tarifs (170). Le robot de recherche de ChatGPT est passé 134 fois en 24 heures, et 5 visites sont venues de ChatGPT.</li>
<li><span class="cle">« Agence de communication genève » progresse sans percer.</span> Position 28,9 contre 40, et 2,4 fois plus d'affichages sur les variantes de la requête. Deux variantes entrent dans le top 20 (16,1 et 17,9), pas la requête principale.</li>
<li><span class="cle">Les demandes ne passent pas par le site.</span> Aucun formulaire envoyé, aucune conversation de visiteur avec le chatbot. 15 visites ont eu un geste de contact, mais les demandes d'octobre sont venues de la CCI France Suisse, d'Avenir Rénovations et des clients en cours.</li>
<li><span class="cle">Un premier mois complet de mesure.</span> 129 visites utiles, 2,9 pages et 2 minutes de lecture par visite. L'accès direct (55) et Google (52) font jeu égal.</li>
</ol>
<h3>Clics Google semaine par semaine</h3>
<div class="bloc" style="padding:3mm 5mm 1mm">{graphe_semaines()}</div>
<p class="note">Septembre en gris, octobre en vert ; la semaine du 28 septembre au 4 octobre est à cheval. Sous chaque barre : les affichages de la semaine.</p>
<h3>Ce qui s'est passé chaque semaine</h3>
{tableau(["Semaine", "Clics", "Affichages", "Visites utiles", "Sur le site"], [
 ["1-4 oct.", "1", "641", "10", "Page Grand Genève et Haute-Savoie, home anglaise, grille de prix en PDF (1er oct.)"],
 ["5-11 oct.", "14", "1 365", "31", "Deux articles (5 oct.), textes de vœux (7 oct.), 7 visites venues du flyer CCIFS"],
 ["12-18 oct.", "13", "1 194", "27", "Aucune mise en ligne cette semaine"],
 ["19-25 oct.", "15", "1 044", "32", "Chatbot refait et boutons de questions (20 oct.), article stratégie éditoriale (22 oct.)"],
 ["26-31 oct.", "20", "1 441", "29", "Meilleure semaine ; robots écartés du tableau de bord (29 oct.)"],
], nums=(1, 2, 3), total=["Octobre", "63", "5 685", "129", ""])}
"""))

P.append(page(3, f"""
<div class="sur">02 · Les demandes</div>
<h2>Ce que le site capte, ce qui vient d'ailleurs</h2>
<p class="chapo">Une demande, c'est une personne qui nous écrit ou nous appelle pour un projet. Le tableau de bord mesure ce qui se passe sur le site ; ce qui arrive par e-mail, par téléphone ou en rendez-vous n'y apparaît pas.</p>
<h3>Sur le site</h3>
{tableau(["Signal", "Octobre", "Lecture"], [
 ["Formulaire de contact envoyé", "0", "Un formulaire commencé le 18 octobre, jamais envoyé"],
 ["Conversation d'un visiteur avec le chatbot", "0", "4 ouvertures sans message ; les deux conversations du 20 octobre sont nos propres tests"],
 ["Coordonnées laissées dans le chatbot", "0", ""],
 ["Clic sur « Nous contacter » ou « Vous avez un projet ? »", "9 visites", "Depuis À propos (3), l'accueil (2), les services, le processus et le portfolio"],
 ["E-mail ou numéro copié", "4 visites", "14 copies, dont 9 de l'e-mail sur la page Services"],
 ["Lien WhatsApp ou e-mail cliqué", "2 visites", "Un WhatsApp le 12 octobre, un e-mail le 19"],
], nums=(1,), total=["Visites avec au moins un geste", "15", "9 en accès direct, 5 depuis Google, 1 depuis l'annuaire search.ch"])}
<p class="note">Les copies et les clics sont des contacts probables, impossibles à relier à un message reçu. Le tableau de bord n'exclut pas encore les visites de l'équipe : une partie de ces gestes peut être la nôtre.</p>
<h3>Hors du site, en octobre et début novembre</h3>
<ul class="points">
<li><span class="cle">CCI France Suisse.</span> Réunion Kinome et CCIFS, invitation à intervenir au LeBooster Breakfast du 27 octobre. Le flyer CCIFS a amené 7 visites sur la page Implantation en Suisse, du 6 au 10 octobre, toutes sur mobile.</li>
<li><span class="cle">Avenir Rénovations.</span> Le franchisé de Genève, rencontré par Tanguy à la CCIFS, demandait si nous étions « spécialisés en SEO Suisse ». Café le 7 octobre, puis présentation d'un projet SEO et AEO pour son agence.</li>
<li><span class="cle">Mesfin.</span> Projets en cours : intention créative pour des illustrations, briefing et maquettes pour le devis Innosessions et Algarades.</li>
<li><span class="cle">Un cabinet d'avocate.</span> Proposition de site envoyée par Tanguy.</li>
<li><span class="cle">Swiss Risk & Care.</span> Message au sujet d'une séance CCIFS.</li>
<li><span class="cle">Partenariats proposés.</span> Correction et inclusion (Ceylan Correction), rédaction et traduction (une indépendante).</li>
<li><span class="cle">Six sollicitations commerciales</span> (liens payants, visibilité IA, outils marketing), sans suite à donner.</li>
</ul>
<div class="sombre" style="margin-top:5mm"><div class="sur">Ce que ça veut dire</div>
<p>Le réseau apporte les demandes, le site les rassure : le flyer CCIFS renvoyait vers la page Implantation en Suisse, et les visiteurs passent le plus de temps sur « À propos » et « Contact ». Il manque un endroit unique où suivre ces contacts, qui en est responsable et où ils en sont : c'est le hub de prospection proposé en dernière page.</p></div>
"""))

P.append(page(4, f"""
<div class="sur">03 · Les visites</div>
<h2>Premier mois complet mesuré</h2>
<p class="chapo">Le tableau de bord /admin/ compte les visites sans outil tiers ni cookie publicitaire. Il est en service depuis le 29 septembre : octobre est son premier mois complet, sans comparaison possible avec septembre.</p>
<div class="grille g4">
{carte("214", "visites enregistrées", "dont 85 visites éclair")}
{carte("129", "visites utiles", "3 secondes, 2 pages ou une action")}
{carte("369", "pages vues", "2,9 par visite utile")}
{carte("4 h 21", "de lecture au total", "2 min par visite en moyenne")}
</div>
<div class="deux" style="margin-top:5mm">
<div>
<h3 style="margin-top:0">D'où viennent les visites utiles</h3>
{tableau(["Source", "Visites", "Part"], [
 ["Accès direct", "55", "43 %"],
 ["Google", "52", "40 %"],
 ["Réseaux sociaux (Instagram 7, LinkedIn 2, Facebook 2)", "11", "9 %"],
 ["Sites référents (dont mathiasigonenc.com 3)", "5", "4 %"],
 ["ChatGPT", "3", "2 %"],
 ["Flyer CCIFS", "2", "2 %"],
 ["Annuaire search.ch", "1", "1 %"],
], nums=(1, 2), total=["Total", "129", "100 %"])}
<h3>Sur quoi</h3>
{tableau(["Appareil ou langue", "Visites"], [
 ["Ordinateur", "101"], ["Mobile", "27"], ["Tablette", "1"],
 ["Navigateur en français", "89"], ["En anglais", "30"], ["En allemand", "6"], ["Autres langues", "4"],
], nums=(1,))}
</div>
<div>
<h3 style="margin-top:0">Les pages les plus vues</h3>
{tableau(["Page", "Vues", "Visites"], [
 ["Accueil", "70", "56"], ["Portfolio", "31", "23"], ["À propos", "22", "18"], ["Services", "19", "14"],
 ["Textes de vœux professionnels", "18", "17"], ["Contact", "16", "15"], ["Tarifs d'une agence de communication", "16", "13"],
 ["Partenaires", "12", "10"], ["Processus", "11", "6"], ["Blog", "9", "7"],
], nums=(1, 2))}
<h3>Où l'on lit vraiment</h3>
{tableau(["Page", "Lecture cumulée"], [
 ["À propos", "45 min"], ["Accueil", "39 min"], ["Textes de vœux professionnels", "32 min"],
 ["Contact", "30 min"], ["Communication de fin d'année", "19 min"], ["Tarifs d'une agence de communication", "18 min"],
], nums=(1,))}
</div>
</div>
<p class="note">Visite utile : au moins 3 secondes, plusieurs pages ou une action ; les visites éclair sont surtout des robots et des onglets fermés aussitôt. La lecture compte le temps où l'onglet de la page est visible (affichée dans le tableau de bord depuis le 29 octobre, plafonnée à 30 minutes par visite). Les pages d'entrée les plus fréquentes : l'accueil (56), les textes de vœux (16), les tarifs (12) et le contact (7).</p>
"""))

P.append(page(5, f"""
<div class="sur">04 · Google, 1 sur 2</div>
<h2>Plus vus, plus cliqués</h2>
<div class="grille g3">
{carte("63", "clics", "septembre : 37")}
{carte("5 685", "affichages", "septembre : 4 509")}
{carte("1,1 %", "taux de clic", "septembre : 0,8 %")}
{carte("13,7", "position moyenne", "septembre : 15,3")}
{carte("443", "requêtes différentes", "septembre : 349")}
{carte("166", "requêtes en première page", "septembre : 113")}
</div>
<div class="deux" style="margin-top:4mm">
<div>{tableau(["Pays", "Clics", "Affichages"], [
 ["Suisse", "33 (20)", "3 863 (2 742)"], ["France", "19 (13)", "1 013 (958)"], ["Autres pays", "11 (4)", "809 (809)"],
], nums=(1, 2))}</div>
<div>{tableau(["Appareil", "Clics", "Affichages"], [
 ["Ordinateur", "46 (29)", "4 573 (3 592)"], ["Mobile", "17 (8)", "1 099 (902)"], ["Tablette", "0 (0)", "13 (15)"],
], nums=(1, 2))}</div>
</div>
<p class="note">Entre parenthèses : septembre. La France pèse 30 % des clics, le mobile 27 % (22 % en septembre).</p>
<h3>Les pages : qui est vu, qui est cliqué</h3>
{tableau(["Page", "Clics", "Affichages", "Position", "Lecture"], [
 ["Textes de vœux professionnels (7 oct.)", "16", "467", "6,5", "Page la plus cliquée, saisonnière"],
 ["Accueil", "16 (10)", "288 (494)", "32,5 (26,8)", "Plus de clics avec moins d'affichages"],
 ["Tarifs d'une agence de communication", "14 (4)", "454 (296)", "6,4 (6,1)", "Clics multipliés par 3,5"],
 ["Communication de fin d'année", "4 (2)", "39 (36)", "5,2 (8,3)", "Saison des cartes de vœux"],
 ["Créer un site internet à Genève", "3 (2)", "407 (284)", "14,8 (15,0)", ""],
 ["Création de logo à Genève", "2 (1)", "584 (297)", "6,4 (5,2)", "Affichages doublés"],
 ["Accueil anglaise", "2 (4)", "132 (84)", "10,7 (9,8)", ""],
 ["Service référencement naturel", "1 (0)", "489 (308)", "20,9 (15,7)", ""],
 ["Créer une boutique en ligne en Suisse", "0 (4)", "718 (787)", "22,2 (20,3)", "La plus affichée, plus aucun clic"],
 ["Identité visuelle d'entreprise à Genève", "0 (1)", "570 (492)", "11,4 (11,8)", ""],
 ["Choisir son agence de communication", "0 (1)", "454 (14)", "16,1 (15,6)", "Affichages multipliés par 32"],
 ["Refonte d'identité visuelle", "0 (1)", "246 (394)", "15,1 (24,1)", "Rafraîchie le 1er oct. : 9 places gagnées"],
], nums=(1, 2, 3))}
<p class="note">Pages nouvelles en octobre : identité visuelle décalée (27 affichages, position 3,2), Grand Genève et Haute-Savoie (17, position 6,4), vendre en ligne en Suisse (6), stratégie éditoriale B2B (publiée le 22, pas encore affichée en octobre).</p>
"""))

P.append(page(6, f"""
<div class="sur">05 · Google, 2 sur 2</div>
<h2>Les requêtes</h2>
<h3 style="margin-top:0">La cible : « agence de communication genève »</h3>
{tableau(["Requête", "Affichages", "Position"], [
 ["agence de communication genève", "117 (80)", "28,9 (40,0)"],
 ["agence de communication geneve", "110 (8)", "26,1 (39,6)"],
 ["agence communication genève", "53 (30)", "28,2 (38,2)"],
 ["agence communication geneve", "46 (22)", "17,9 (34,7)"],
 ["agences de communication genève", "31 (11)", "16,1 (39,4)"],
], nums=(1, 2), total=["Toutes les variantes", "358 (151)", ""])}
<p class="note">Une dizaine de places gagnées depuis la home ancrée à Genève (23 septembre), mais encore aucun clic. Pour la première page, les leviers restants sont hors du site : avis Google, fiche d'établissement et liens d'autres sites genevois.</p>
<div class="deux" style="margin-top:2mm">
<div>
<h3>Les plus fortes hausses</h3>
{tableau(["Requête", "Affich.", "Position"], [
 ["communication agency geneva", "2 → 47", "13,5 → 7,2"],
 ["prix logo suisse", "46 → 117", "4,0 → 3,0"],
 ["agence identité visuelle", "16 → 77", "10,6 → 11,0"],
 ["agence création logo", "0 → 43", "6,9"],
 ["prix communication événementielle genève", "0 → 33", "2,6"],
 ["tarif agence marketing suisse", "3 → 30", "16,7 → 9,2"],
], nums=(1, 2))}
<p class="note">« communication agency geneva » progresse avec la home anglaise du 1er octobre ; « agence création logo » apparaît après la réorientation de l'article logo vers « agence », le même jour. En baisse : « refonte identité visuelle », 198 → 66 affichages, mais position 30,7 → 20,2.</p>
</div>
<div>
<h3>En première page, sans clic</h3>
{tableau(["Requête", "Affich.", "Pos."], [
 ["prix logo suisse", "117", "3,0"],
 ["communication agency geneva", "47", "7,2"],
 ["agence création logo", "43", "6,9"],
 ["tarif référencement naturel seo suisse", "39", "5,6"],
 ["création de logo suisse", "39", "8,5"],
 ["combien coûte une agence de communication", "33", "1,9"],
 ["prix communication événementielle genève", "33", "2,6"],
 ["agence création de logo genève", "31", "1,9"],
 ["à qui confier la refonte de son site web à genève ?", "31", "2,2"],
], nums=(1, 2))}
</div>
</div>
<p class="note">Sur les requêtes de prix, Google affiche un aperçu IA qui répond avant le clic (constaté le 1er octobre) : nos pages servent de source. Seuls 10 des 63 clics sont rattachés à une requête visible ; Google masque les requêtes trop rares.</p>
<div class="deux" style="margin-top:3mm">
<div class="bloc"><div class="cle" style="margin-bottom:1.5mm">La marque</div><p style="margin:0">« kinome » : 70 affichages (54), 3 clics (3), position 9,7 (3,5). « kinomé » : 11 affichages (9). La recherche du nom progresse ; sa position moyenne recule, à surveiller.</p></div>
<div class="bloc"><div class="cle" style="margin-bottom:1.5mm">Les phrases entières</div><p style="margin:0">43 requêtes rédigées comme une question ou une demande complète (24 en septembre), pour 223 affichages (106). Exemple : « mon commerce a une boutique en ligne qui ne vend pas, quels leviers activer en suisse romande ? », position 1,5.</p></div>
</div>
"""))

P.append(page(7, f"""
<div class="sur">06 · Les IA</div>
<h2>Les réponses des IA : AEO et GEO</h2>
<p class="chapo">L'AEO et le GEO, c'est être cité quand quelqu'un pose sa question à une IA plutôt qu'à un moteur de recherche. Trois mesures : les réponses IA de Google, les visites venues des assistants, les passages de leurs robots sur le site.</p>
<h3>Dans les réponses IA de Google : 744 affichages, contre 416 (+79 %)</h3>
<div class="bloc" style="padding:4mm 5mm 3mm">{graphe_ia()}</div>
<p class="note">Vert : octobre ; gris : septembre. 81 % des affichages viennent de Suisse (602) et 11 % de France (83) ; 89 % sur ordinateur. Google ne donne pas les clics liés à ces affichages.</p>
<div class="deux" style="margin-top:3mm">
<div>
<h3 style="margin-top:0">Les visites venues des assistants</h3>
<p>5 visites venues de ChatGPT en octobre, dont 3 utiles : la page identité visuelle le 1er, le guide du logo le 18 (11 minutes sur le site), la page « about » anglaise le 27 (5 pages).</p>
<p>Signalé le 3 novembre : une prospecte, qui veut refaire son site Elementor, a trouvé Kinome sur ChatGPT, probablement en lui demandant quelle agence contacter.</p>
<p class="note">Les deux articles publiés le 3 novembre visent ces recherches : refaire son site avec ChatGPT ou Claude, et un chatbot IA sur son site.</p>
</div>
<div>
<h3 style="margin-top:0">Les robots des IA, sur 24 heures</h3>
{tableau(["Robot", "Passages", "Rôle"], [
 ['<span class="nw">OAI-SearchBot</span>', "134", "Indexe le site pour la recherche de ChatGPT"],
 ['<span class="nw">ChatGPT-User</span>', "5", "Lit une page pour répondre : accueil (3), tarifs, stratégie éditoriale"],
 ['<span class="nw">Claude-User</span>', "5", "Même rôle chez Claude : la page des tarifs (4)"],
 ["ClaudeBot", "20", "Lit le plan du site"],
 ["PerplexityBot", "3", "Index de Perplexity"],
 ["GPTBot", "2", "Entraînement d'OpenAI : refusé par l'hébergeur"],
], nums=(1,))}
<p class="note">Journal du serveur du 28 octobre (10 h 44) au 29 octobre (10 h 36), heure de Genève : un seul jour disponible. Le refus de GPTBot n'empêche pas d'être cité par ChatGPT, qui passe par OAI-SearchBot. Dans le même temps : Googlebot 21 passages, Bingbot 9.</p>
</div>
</div>
"""))

P.append(page(8, f"""
<div class="sur">07 · Le plan d'octobre</div>
<h2>Où on en est</h2>
<h3 style="margin-top:0">Les trois objectifs fixés le 1er octobre</h3>
{tableau(["Objectif", "Résultat", "Statut"], [
 ["50 clics Google", "63", '<span class="statut ok">Atteint</span>'],
 ["5 demandes ou contacts directs mesurés", "6 contacts directs mesurés (e-mail ou numéro copié, WhatsApp ou e-mail cliqué), aucune demande écrite par le site", '<span class="statut part">En partie</span>'],
 ["La home dans les 20 premiers sur « agence de communication genève »", "Position 28,9 (40 en septembre)", '<span class="statut non">Pas atteint</span>'],
])}
<h3>Les dix actions</h3>
{tableau(["", "Action", "Qui", "Statut", "Résultat"], [
 ["1", "Avis Google et fiche Google Business Profile", "Mathias", '<span class="statut afaire">À faire le point</span>', "Non mesuré dans ce bilan"],
 ["2", "Lire les vraies pages Google des requêtes sans clic, adapter titres et appels à l'action", "Claude", '<span class="statut ok">Fait le 1er oct.</span>', "Titres, réponses directes, grille des prix en PDF"],
 ["3", "Relier le chatbot au tableau de bord", "Claude et Mathias", '<span class="statut part">En partie</span>', "Chatbot refait le 20 oct. (consignes, boutons de questions) ; liaison avec /admin/ à faire"],
 ["4", "Campagne cartes de vœux 2027", "Claude et Mathias", '<span class="statut part">En partie</span>', "Article du 7 oct. : 16 clics, 3 visites venues de LinkedIn ; envoi aux clients à confirmer"],
 ["5", "Version anglaise renforcée", "Claude", '<span class="statut ok">Fait le 1er oct.</span>', "« communication agency geneva » : position 7,2 ; article tarifs en anglais pas fait"],
 ["6", "Rafraîchir « Refonte d'identité visuelle »", "Claude", '<span class="statut ok">Fait le 1er oct.</span>', "Position 24,1 → 15,1"],
 ["7", "Décision Grand Genève", "Mathias, puis Claude", '<span class="statut ok">Fait le 1er oct.</span>', "Page Grand Genève et Haute-Savoie : position 6,4"],
 ["8", "Liens depuis les sites clients et partenaires", "Mathias", '<span class="statut afaire">À faire le point</span>', "Non mesuré dans ce bilan"],
 ["9", "Article « Stratégie éditoriale B2B à Genève »", "Claude", '<span class="statut ok">Fait le 22 oct.</span>', "Pas encore affiché en octobre"],
 ["10", "Bilan d'octobre", "Claude", '<span class="statut ok">Fait le 3 nov.</span>', "Ce document"],
])}
<h3>Fait aussi en octobre</h3>
<ul class="points">
<li>Quatre articles : identité visuelle décalée et vendre en ligne en Suisse (5 oct.), 50 textes de vœux (7 oct.), stratégie éditoriale B2B (22 oct.). Le blog passe de 29 à 33 articles.</li>
<li>Chatbot refait le 20 octobre : nouvelles consignes, source de vérité, boutons de questions et invitation après lecture sur la page identité visuelle.</li>
<li>Tableau de bord : exports complets et mesure de tous les clics (1er oct.), robots déguisés écartés et vrai temps de lecture (29 oct.).</li>
<li>Anciennes adresses anglaises des services redirigées (5 oct.) ; contrôle de sécurité du site le 29 octobre, sans faille hors du collecteur de visites, corrigé le jour même.</li>
</ul>
"""))

P.append(page(9, f"""
<div class="sur">08 · Novembre</div>
<h2>Transformer la visibilité en demandes</h2>
<div class="bloc"><div class="cle" style="margin-bottom:1.5mm">Déjà fait le 3 novembre</div><p style="margin:0">Deux articles pour les réponses des IA (refaire son site avec ChatGPT ou Claude ; un chatbot IA sur votre site), chatbot complété (il dit sur quelle technologie il tourne et présente les assistants IA de Kinome), réglage « Données 100 % en Europe » activé, politique de confidentialité mise à jour. Le blog compte 35 articles.</p></div>
<h3>Plan proposé</h3>
{tableau(["", "Action", "Qui", "Quand"], [
 ["1", "Hub de prospection dans /admin/ : toutes les demandes au même endroit, avec un responsable (Tanguy ou Mathias), un statut et une prochaine action", "Claude construit, Tanguy et Mathias remplissent", "Semaines 1 et 2"],
 ["2", "Avis Google : en demander aux clients récents, avec un lien direct", "Tanguy et Mathias", "Semaine 1"],
 ["3", "Chatbot : boutons de questions sur toutes les pages service et l'article des tarifs, conversations remontées dans /admin/", "Claude", "Semaine 2"],
 ["4", "Requêtes en première page sans clic (« prix logo suisse », « agence création logo », « communication agency geneva ») : titres, descriptions et appels à l'action à tester", "Claude", "Semaine 2"],
 ["5", "Saison des vœux : relayer les 50 textes de vœux et l'offre de cartes sur LinkedIn et auprès des clients ; le pic de recherche est en novembre et décembre", "Tanguy et Mathias", "Semaines 1 à 3"],
 ["6", "Liens locaux : CCI France Suisse, partenaires et clients", "Tanguy et Mathias", "Semaine 3"],
 ["7", "Exclure les visites de l'équipe du tableau de bord", "Claude", "Semaine 1"],
 ["8", "Bilan de novembre, avec les demandes suivies dans le hub", "Claude", "1er décembre"],
])}
<p class="note">Objectifs proposés pour novembre : 75 clics Google, 900 affichages dans les réponses IA, toutes les demandes suivies dans le hub et une première demande écrite venue du site.</p>
<div class="sombre" style="margin-top:5mm"><div class="sur">Le hub de prospection</div>
<p>Une page de /admin/ où chaque contact a sa fiche : l'entreprise, la personne, d'où il vient (réseau, site, ChatGPT, recommandation), le projet, le responsable, le statut (nouveau, rendez-vous, devis envoyé, gagné, perdu) et la prochaine action datée. Les demandes du site et du chatbot s'y ajouteraient seules ; le reste se saisirait en une minute, ou se dicterait à Claude.</p></div>
"""))

html = f"""<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Bilan d'octobre 2026, agence-kinome.ch</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Krub:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>{''.join(P)}</body></html>"""
html = typo(html)
assert "—" not in html and "–" not in html, "tiret interdit"
for vb in re.findall(r'viewBox="([^"]+)"', html):
    assert "&nbsp;" not in vb and "\xa0" not in vb, vb
open(HTML, "w", encoding="utf-8").write(html)
subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=15000",
                f"--print-to-pdf={PDF}", f"file://{HTML}"], check=True, capture_output=True)
from pypdf import PdfReader
n = len(PdfReader(PDF).pages)
print("pages", n, "sections", len(P), PDF)
