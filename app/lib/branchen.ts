import type { IconName } from "../components/icons";
import type { Faq } from "./faqs";

// Inhalte der Branchenseiten. Relevanz je Sektor aus der Startvorlage (Konzeptpapier 4.1):
// H = hoch, M = mittel, G = gering, – = nicht relevant.

export type Relevance = "H" | "M" | "G" | "–";
export type Priority = "Muss" | "Wichtig" | "Nützlich";

export const sectorList: { key: SectorKey; label: string; icon: IconName }[] = [
  { key: "verkehr", label: "Verkehr", icon: "bus" },
  { key: "bildung", label: "Bildung & Soziales", icon: "graduation" },
  { key: "gesundheit", label: "Gesundheit", icon: "health" },
  { key: "infrastruktur", label: "Infrastruktur", icon: "plug" },
  { key: "foerderung", label: "Förderung & Steuern", icon: "coins" },
  { key: "baurecht", label: "Baurecht", icon: "landmark" },
  { key: "grundstueck", label: "Grundstücksdaten", icon: "mapPin" },
  { key: "demographie", label: "Demographie", icon: "users" },
  { key: "umwelt", label: "Umwelt", icon: "leaf" },
  { key: "einkommen", label: "Einkommen & Vermögen", icon: "wallet" },
];

export type SectorKey =
  | "verkehr"
  | "bildung"
  | "gesundheit"
  | "infrastruktur"
  | "foerderung"
  | "baurecht"
  | "grundstueck"
  | "demographie"
  | "umwelt"
  | "einkommen";

export type Branche = {
  slug: string;
  name: string;
  /** Mit Präposition und Artikel, z. B. „für eine Kita“ */
  forName: string;
  /** Kurzform für Linktexte, z. B. „Bäckerei“ */
  short: string;
  icon: IconName;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  example: string;
  relevance: Record<SectorKey, Relevance>;
  factors: { name: string; sector: string; priority: Priority; why: string }[];
  insight: { title: string; text: string };
  faqs: Faq[];
};

const r = (
  verkehr: Relevance,
  bildung: Relevance,
  gesundheit: Relevance,
  infrastruktur: Relevance,
  foerderung: Relevance,
  baurecht: Relevance,
  grundstueck: Relevance,
  demographie: Relevance,
  umwelt: Relevance,
  einkommen: Relevance,
): Record<SectorKey, Relevance> => ({
  verkehr,
  bildung,
  gesundheit,
  infrastruktur,
  foerderung,
  baurecht,
  grundstueck,
  demographie,
  umwelt,
  einkommen,
});

const genericFaq = (subject: string): Faq => ({
  q: `Ist das Ergebnis eine verbindliche Auskunft für ${subject}?`,
  a: "Nein. larima ist ein Werkzeug zur Standortvorauswahl. Baurechtliche und versorgungstechnische Aussagen sind als Vorprüfung gekennzeichnet – verbindlich sind die Auskunft der Bauaufsichtsbehörde und die Anschlussbestätigung des Versorgers.",
});

export const branchen: Branche[] = [
  {
    slug: "baeckerei",
    forName: "für eine Bäckerei-Filiale",
    name: "Bäckerei-Filiale",
    short: "Bäckerei",
    icon: "store",
    metaTitle: "Standortanalyse für Bäckereien: den besten Standort finden",
    metaDescription:
      "Welcher Standort passt zu deiner Bäckerei? larima bewertet Lagen nach Einwohnern, ÖPNV-Frühverkehr, Kaufkraft und Baurecht – mit erklärbarem Score.",
    h1: "Standortanalyse für Bäckereien",
    intro:
      "Eine Bäckerei-Filiale lebt von Stammkundschaft und Pendlern auf dem Weg zur Arbeit. larima prüft für jede Lage, ob die Nutzung als Laden zulässig ist, wie viele Menschen im Umkreis wohnen, ob morgens Busse und Bahnen fahren – und zeigt dir, warum ein Standort passt.",
    example: "Bäckerei mit kleinem Café, 100–150 m², Raum Mannheim",
    relevance: r("H", "M", "–", "M", "M", "H", "M", "H", "G", "H"),
    factors: [
      { name: "Zulässige Nutzungsart erlaubt Laden", sector: "Baurecht", priority: "Muss", why: "Ohne zulässige Nutzung (z. B. MI, MU, MK, WA) keine Genehmigung." },
      { name: "Fläche im Bedarfskorridor", sector: "Grundstück", priority: "Muss", why: "Deine Vorgabe, z. B. 80–200 m²." },
      { name: "Budget", sector: "Grundstück", priority: "Muss", why: "Bodenrichtwert × Fläche darf das Budget nicht übersteigen." },
      { name: "Einwohner im 500-m-Umkreis", sector: "Demographie", priority: "Wichtig", why: "Basis für Stammkundschaft." },
      { name: "ÖPNV-Haltestelle mit Frühverkehr", sector: "Verkehr", priority: "Wichtig", why: "Pendler kaufen morgens unterwegs – Haltestelle ≤ 300 m, Abfahrten 6–9 Uhr." },
      { name: "Kaufkraft je Einwohner", sector: "Einkommen", priority: "Wichtig", why: "Zahlungsbereitschaft für das Café-Angebot." },
      { name: "Kurzzeitparken", sector: "Verkehr", priority: "Nützlich", why: "„Kurz halten, Brötchen holen“ – Stellplätze im 200-m-Umkreis." },
      { name: "Schulen und Kitas im Umkreis", sector: "Bildung & Soziales", priority: "Nützlich", why: "Frequenz zu Bring- und Abholzeiten." },
      { name: "Gewerbesteuer-Hebesatz", sector: "Förderung & Steuern", priority: "Nützlich", why: "Laufende Belastung – weniger ist besser." },
      { name: "Hochwasser- und Starkregenrisiko", sector: "Umwelt", priority: "Nützlich", why: "Schutz für Waren- und Gerätelager." },
    ],
    insight: {
      title: "Filiale oder Produktion? Der Vorhabenstyp zählt.",
      text: "Eine Produktionsbäckerei kehrt viele Faktoren um: Sie braucht Gewerbe- oder Industriegebiet, Lkw-Zufahrt und hohe Netzkapazität, während Einwohnerdichte und Kaufkraft an Gewicht verlieren. larima unterscheidet beides automatisch.",
    },
    faqs: [
      {
        q: "Welche Standortfaktoren sind für eine Bäckerei am wichtigsten?",
        a: "Für eine Filiale vor allem die zulässige Nutzung als Laden, die Zahl der Einwohner im 500-m-Umkreis, eine ÖPNV-Haltestelle mit Frühverkehr und die Kaufkraft. Nützlich sind außerdem Kurzzeitparkplätze und Schulen oder Kitas in der Nähe.",
      },
      {
        q: "Berücksichtigt larima die Konkurrenz durch andere Bäckereien?",
        a: "Wettbewerbsdichte und Frequenzbringer wie Supermärkte lassen sich aus OpenStreetMap ableiten und sind als Ergänzung vorgesehen. Bis dahin erscheint „Laufkundschaft“ als Faktor ohne Datenquelle – sichtbar, aber nicht erfunden.",
      },
      genericFaq("meine Bäckerei"),
    ],
  },
  {
    slug: "produktionsbaeckerei",
    forName: "für eine Produktionsbäckerei",
    name: "Produktionsbäckerei",
    short: "Produktionsbäckerei",
    icon: "building",
    metaTitle: "Standortanalyse Produktionsbäckerei: Gewerbefläche finden",
    metaDescription:
      "Gewerbefläche für eine Produktionsbäckerei finden: Bewertung nach Baugebiet, Lkw-Zufahrt, Netzkapazität und Abstand zu Wohngebieten.",
    h1: "Standortanalyse für Produktionsbäckereien",
    intro:
      "Wer im Nachtbetrieb für viele Filialen backt, braucht andere Flächen als eine Filiale: Gewerbe- oder Industriegebiet, gute Lkw-Anbindung, ausreichend Stromkapazität und Abstand zu Wohngebieten. larima bewertet Grundstücke genau danach.",
    example: "Produktionsbäckerei, 2.000–3.000 m² Grundstück, Lkw-Zufahrt, Rhein-Neckar",
    relevance: r("H", "–", "–", "H", "M", "H", "H", "G", "M", "G"),
    factors: [
      { name: "Gewerbe- oder Industriegebiet", sector: "Baurecht", priority: "Muss", why: "Produktion mit Nachtbetrieb ist im Wohngebiet nicht zulässig." },
      { name: "Grundstücksfläche im Bedarfskorridor", sector: "Grundstück", priority: "Muss", why: "Deine Vorgabe für Halle, Lager und Hof." },
      { name: "Lkw-Erreichbarkeit", sector: "Verkehr", priority: "Wichtig", why: "Belieferung der Filialen in den frühen Morgenstunden." },
      { name: "Nähe zur Autobahnauffahrt", sector: "Verkehr", priority: "Wichtig", why: "Kurze Wege zu allen Filialen." },
      { name: "Stromanschluss-Kapazität", sector: "Infrastruktur", priority: "Wichtig", why: "Backöfen brauchen hohe Leistung – im UI als Prüfschritt beim Netzbetreiber." },
      { name: "Abstand zu Wohngebieten", sector: "Umwelt", priority: "Wichtig", why: "Nachtbetrieb und Lieferverkehr verursachen Lärm." },
      { name: "Gewerbesteuer-Hebesatz", sector: "Förderung & Steuern", priority: "Nützlich", why: "Laufende Belastung – weniger ist besser." },
      { name: "Hochwasserrisiko", sector: "Umwelt", priority: "Nützlich", why: "Maschinen und Lager schützen." },
    ],
    insight: {
      title: "Einwohnerdichte verliert, Infrastruktur gewinnt.",
      text: "Anders als bei einer Filiale spielen Kaufkraft und Einwohner im Umkreis kaum eine Rolle. Entscheidend sind Baurecht, Erreichbarkeit für Lkw und die Netzkapazität – larima gewichtet entsprechend.",
    },
    faqs: [
      {
        q: "Welches Baugebiet brauche ich für eine Produktionsbäckerei?",
        a: "In der Regel ein Gewerbe- (GE) oder Industriegebiet (GI), da Nachtbetrieb und Lieferverkehr in Wohn- oder Mischgebieten meist nicht zulässig sind. larima prüft die Festsetzungen veröffentlichter Bebauungspläne als Vorprüfung.",
      },
      {
        q: "Kann larima die Stromkapazität eines Grundstücks prüfen?",
        a: "Nur eingeschränkt: Eine Leitung in der Nähe bestätigt keinen Anschluss. larima zeigt den Faktor deshalb als Prüfschritt mit Hinweis, beim Netzbetreiber anzufragen.",
      },
      genericFaq("meine Produktionsbäckerei"),
    ],
  },
  {
    slug: "arztpraxis",
    forName: "für eine Arztpraxis",
    name: "Arztpraxis",
    short: "Arztpraxis",
    icon: "stethoscope",
    metaTitle: "Standortanalyse für Arztpraxen: Praxisstandort finden",
    metaDescription:
      "Den richtigen Praxisstandort finden: larima bewertet Lagen nach ÖPNV-Anbindung, Einwohnern, Altersstruktur, Versorgung und Baurecht.",
    h1: "Standortanalyse für Arztpraxen",
    intro:
      "Ob Hausarzt, Facharzt oder Physiotherapie: Eine Praxis braucht Patientinnen und Patienten in erreichbarer Nähe, gute Anbindung und eine zulässige Nutzung. larima zeigt dir, wo Nachfrage und Erreichbarkeit zusammenpassen.",
    example: "Hausarztpraxis, 150–250 m², barrierefrei erreichbar, Raum Heidelberg",
    relevance: r("H", "G", "M", "M", "G", "H", "M", "H", "G", "M"),
    factors: [
      { name: "Zulässige Nutzung für Praxisräume", sector: "Baurecht", priority: "Muss", why: "Praxen sind nicht in jedem Baugebiet allgemein zulässig." },
      { name: "Fläche im Bedarfskorridor", sector: "Grundstück", priority: "Muss", why: "Deine Vorgabe für Behandlungs- und Warteräume." },
      { name: "ÖPNV-Haltestelle in Laufnähe", sector: "Verkehr", priority: "Wichtig", why: "Viele Patientinnen und Patienten kommen ohne Auto." },
      { name: "Einwohner im Einzugsgebiet", sector: "Demographie", priority: "Wichtig", why: "Basis für den Patientenstamm." },
      { name: "Altersstruktur", sector: "Demographie", priority: "Wichtig", why: "Ältere Bevölkerung bedeutet höheren Versorgungsbedarf." },
      { name: "Bestehende Praxen im Umkreis", sector: "Gesundheit", priority: "Nützlich", why: "Versorgungslücken statt Überangebot." },
      { name: "Parkmöglichkeiten", sector: "Verkehr", priority: "Nützlich", why: "Für mobilitätseingeschränkte Patientinnen und Patienten." },
      { name: "Kaufkraft", sector: "Einkommen", priority: "Nützlich", why: "Relevant für Selbstzahlerleistungen." },
    ],
    insight: {
      title: "Erreichbarkeit vor Sichtbarkeit.",
      text: "Für eine Praxis zählt weniger die Laufkundschaft als die Frage, wie schnell Patientinnen und Patienten aus dem Einzugsgebiet sie erreichen. larima bewertet deshalb ÖPNV und Altersstruktur besonders stark.",
    },
    faqs: [
      {
        q: "Worauf sollte ich bei der Standortwahl für eine Arztpraxis achten?",
        a: "Auf eine zulässige Nutzung, gute ÖPNV-Anbindung, ausreichend Einwohner im Einzugsgebiet und eine passende Altersstruktur. Hilfreich ist außerdem ein Blick auf bestehende Praxen im Umkreis.",
      },
      {
        q: "Ersetzt larima die Bedarfsplanung der Kassenärztlichen Vereinigung?",
        a: "Nein. Ob ein Kassensitz verfügbar ist, entscheidet die Kassenärztliche Vereinigung. larima hilft bei der Frage, welcher Standort innerhalb der Möglichkeiten am besten passt.",
      },
      genericFaq("meine Arztpraxis"),
    ],
  },
  {
    slug: "kita",
    forName: "für eine Kita",
    name: "Kita",
    short: "Kita",
    icon: "smile",
    metaTitle: "Standortanalyse für Kitas: Grundstück für eine Kita finden",
    metaDescription:
      "Grundstück für eine Kita finden: Bewertung nach Kindern im Umkreis, fehlenden Plätzen, Außenfläche, Lärm, Förderung und Baurecht.",
    h1: "Standortanalyse für Kitas",
    intro:
      "Eine Kita braucht Familien in der Nähe, eine sichere Umgebung und genug Fläche für Gruppenräume und Außenspiel. larima kombiniert Demographie, Baurecht, Umweltdaten und Förderprogramme zu einem nachvollziehbaren Score.",
    example: "Kita für 40 Kinder mit Außenfläche, 800–1.200 m² Grundstück",
    relevance: r("M", "H", "G", "M", "H", "H", "H", "H", "H", "M"),
    factors: [
      { name: "Zulässige Nutzung für soziale Einrichtungen", sector: "Baurecht", priority: "Muss", why: "Anlagen für soziale Zwecke sind nicht überall zulässig." },
      { name: "Grundstücksfläche inkl. Außenfläche", sector: "Grundstück", priority: "Muss", why: "Gruppenräume plus Außenspielfläche." },
      { name: "Kinder unter 6 Jahren im Umkreis", sector: "Demographie", priority: "Wichtig", why: "Direkter Bedarf an Betreuungsplätzen." },
      { name: "Bestehende Kitas und Versorgungsquote", sector: "Bildung & Soziales", priority: "Wichtig", why: "Wo fehlen Plätze?" },
      { name: "Lärmbelastung", sector: "Umwelt", priority: "Wichtig", why: "Ruhige Umgebung für Kinder – weniger ist besser." },
      { name: "Förderprogramme für Kita-Ausbau", sector: "Förderung & Steuern", priority: "Wichtig", why: "Investitionsförderung kann die Finanzierung entscheiden." },
      { name: "Hochwasser- und Starkregenrisiko", sector: "Umwelt", priority: "Nützlich", why: "Sicherheit der Einrichtung." },
      { name: "Fußläufige Erreichbarkeit", sector: "Verkehr", priority: "Nützlich", why: "Bringen und Abholen ohne Auto." },
    ],
    insight: {
      title: "Umwelt zählt hier besonders.",
      text: "Bei kaum einer anderen Nutzung ist der Sektor Umwelt so relevant: Lärm, Luft und Hochwasser fließen mit hohem Gewicht ein – und Datenlücken werden offen ausgewiesen statt verschwiegen.",
    },
    faqs: [
      {
        q: "Wie finde ich einen guten Standort für eine Kita?",
        a: "Entscheidend sind Kinder unter sechs Jahren im Umkreis, fehlende Betreuungsplätze, ein Grundstück mit Außenfläche, geringe Lärmbelastung und eine zulässige Nutzung. larima bewertet alle Faktoren gemeinsam.",
      },
      {
        q: "Berücksichtigt larima Förderprogramme?",
        a: "Ja, der Sektor Förderung & Steuern ist für Kitas hoch gewichtet. Verfügbare Programme werden je nach Datenlage angezeigt – mit Quelle und Stand.",
      },
      genericFaq("meine Kita"),
    ],
  },
  {
    slug: "logistik-lager",
    forName: "für Logistik & Lager",
    name: "Logistik & Lager",
    short: "Lager",
    icon: "package",
    metaTitle: "Standortanalyse für Logistik & Lager: Fläche finden",
    metaDescription:
      "Lager- und Logistikfläche finden: Bewertung nach Autobahnanbindung, Lkw-Zufahrt, Baurecht, Bodenrichtwert und Gewerbesteuer.",
    h1: "Standortanalyse für Logistik & Lager",
    intro:
      "Für Lager und Logistik zählen Fläche, Zufahrt und Anbindung – und ein Baurecht, das 24/7-Betrieb erlaubt. larima filtert Gewerbe- und Industrieflächen nach deinen Muss-Kriterien und bewertet den Rest nachvollziehbar.",
    example: "Lager mit Lkw-Zufahrt, 1.000–2.000 m², max. 10 Minuten zur Autobahn",
    relevance: r("H", "–", "–", "H", "H", "H", "H", "G", "M", "G"),
    factors: [
      { name: "Gewerbe- oder Industriegebiet", sector: "Baurecht", priority: "Muss", why: "Logistik mit Lieferverkehr braucht passendes Baurecht." },
      { name: "Grundstücksfläche im Bedarfskorridor", sector: "Grundstück", priority: "Muss", why: "Halle, Rangierfläche und Stellplätze." },
      { name: "Fahrzeit zur Autobahnauffahrt", sector: "Verkehr", priority: "Wichtig", why: "Kurze Wege senken Kosten pro Tour." },
      { name: "Lkw-taugliche Zufahrt", sector: "Verkehr", priority: "Wichtig", why: "Ohne Ortsdurchfahrt und Gewichtsbeschränkung." },
      { name: "Bodenrichtwert", sector: "Grundstück", priority: "Wichtig", why: "Flächenintensive Nutzung reagiert stark auf den Bodenpreis." },
      { name: "Gewerbesteuer-Hebesatz", sector: "Förderung & Steuern", priority: "Wichtig", why: "Unterschiede zwischen Gemeinden sind erheblich." },
      { name: "Breitband und Stromkapazität", sector: "Infrastruktur", priority: "Nützlich", why: "Automatisierung, Kühlung, Ladeinfrastruktur." },
      { name: "Abstand zu Wohngebieten", sector: "Umwelt", priority: "Nützlich", why: "Konfliktarm im Nacht- und Wochenendbetrieb." },
    ],
    insight: {
      title: "Weiße Flecken statt Einzelangebote.",
      text: "Mit der Potenzialsuche bewertet larima alle Flächen einer Region – nicht nur aktuelle Angebote. So siehst du auf der Heatmap, wo sich die Suche überhaupt lohnt.",
    },
    faqs: [
      {
        q: "Welche Faktoren sind bei der Standortwahl für ein Lager entscheidend?",
        a: "Vor allem Baurecht (GE/GI), Grundstücksgröße, Fahrzeit zur Autobahn, eine Lkw-taugliche Zufahrt, Bodenrichtwert und Gewerbesteuer-Hebesatz. larima kombiniert sie zu einem Score mit Datenabdeckung.",
      },
      {
        q: "Zeigt larima nur Flächen, die zum Verkauf stehen?",
        a: "Standardmäßig nicht: Die Potenzialsuche bewertet alle Flächen nach Eignung. Sobald eine Angebotsquelle angebunden ist, kannst du auf tatsächliche Angebote umschalten.",
      },
      genericFaq("meine Logistikfläche"),
    ],
  },
  {
    slug: "buero",
    forName: "für ein Büro oder IT-Unternehmen",
    name: "Büro & IT-Unternehmen",
    short: "Büro",
    icon: "monitor",
    metaTitle: "Standortanalyse für Büros: den besten Bürostandort finden",
    metaDescription:
      "Bürostandort finden: larima bewertet Lagen nach ÖPNV-Anbindung, Glasfaser, Gewerbesteuer, Förderung und Baurecht – mit Quellen.",
    h1: "Standortanalyse für Büros & IT-Unternehmen",
    intro:
      "Ein Bürostandort entscheidet mit darüber, wen du einstellen kannst. larima bewertet Lagen nach Erreichbarkeit für dein Team, digitaler Infrastruktur, Steuern und Förderung – und zeigt jede Annahme offen.",
    example: "Büro für ein IT-Team mit 25 Personen, gute S-Bahn-Anbindung",
    relevance: r("H", "G", "G", "H", "H", "H", "M", "M", "G", "M"),
    factors: [
      { name: "Zulässige Büronutzung", sector: "Baurecht", priority: "Muss", why: "Büros sind in MI, MU, MK und GE in der Regel zulässig." },
      { name: "Fläche im Bedarfskorridor", sector: "Grundstück", priority: "Muss", why: "Arbeitsplätze, Meetingräume, Wachstum." },
      { name: "ÖPNV-Anbindung mit dichtem Takt", sector: "Verkehr", priority: "Wichtig", why: "Pendelzeit ist ein Recruiting-Faktor." },
      { name: "Glasfaser- und Breitbandverfügbarkeit", sector: "Infrastruktur", priority: "Wichtig", why: "Grundvoraussetzung für IT-Arbeit." },
      { name: "Gewerbesteuer-Hebesatz", sector: "Förderung & Steuern", priority: "Wichtig", why: "Laufende Belastung – weniger ist besser." },
      { name: "Förderprogramme und Gründerzentren", sector: "Förderung & Steuern", priority: "Nützlich", why: "Zuschüsse und Netzwerk." },
      { name: "Gastronomie und Nahversorgung", sector: "Infrastruktur", priority: "Nützlich", why: "Attraktivität für Mitarbeitende." },
    ],
    insight: {
      title: "Pendelzeit ist ein Standortfaktor.",
      text: "Gerade für Tech-Teams zählt, wie gut ein Büro mit ÖPNV erreichbar ist. larima gewichtet Verkehr und Breitband hoch – du passt die Gewichtung jederzeit an.",
    },
    faqs: [
      {
        q: "Wie finde ich einen guten Bürostandort für ein IT-Unternehmen?",
        a: "Achte auf ÖPNV-Anbindung, Glasfaserverfügbarkeit, Gewerbesteuer-Hebesatz und eine zulässige Büronutzung. larima bewertet diese Faktoren gemeinsam und zeigt Stärken und Schwächen je Lage.",
      },
      {
        q: "Sucht larima auch Büroflächen zur Miete?",
        a: "Die Suche nach Gewerbeeinheiten zur Miete ist als Erweiterung geplant. Aktuell bewertet larima die Eignung von Lagen und Grundstücken.",
      },
      genericFaq("mein Büro"),
    ],
  },
  {
    slug: "einfamilienhaus",
    forName: "für ein Einfamilienhaus",
    name: "Einfamilienhaus",
    short: "Einfamilienhaus",
    icon: "home",
    metaTitle: "Baugrundstück für ein Einfamilienhaus finden & bewerten",
    metaDescription:
      "Das passende Baugrundstück finden: Bewertung nach Schule und Kita, Pendelzeit, Hochwasserrisiko, Bebauungsplan und Bodenrichtwert.",
    h1: "Baugrundstück für ein Einfamilienhaus finden",
    intro:
      "Schule, Kita, Arbeitsweg, Hochwasser, Bebauungsplan: Beim Hauskauf hängen viele Fragen am Grundstück. larima beantwortet sie auf einer Karte – in Klartext statt Fachbegriffen und mit Quelle zu jedem Wert.",
    example: "Baugrundstück für ein Einfamilienhaus, 500–700 m², max. 30 Minuten nach Mannheim",
    relevance: r("H", "H", "M", "H", "H", "H", "H", "M", "H", "M"),
    factors: [
      { name: "Wohnbebauung zulässig", sector: "Baurecht", priority: "Muss", why: "Das Grundstück muss für ein Wohnhaus bebaubar sein." },
      { name: "Grundstücksgröße", sector: "Grundstück", priority: "Muss", why: "Deine Vorgabe, z. B. 500–700 m²." },
      { name: "Budget", sector: "Grundstück", priority: "Muss", why: "Bodenrichtwert × Fläche als Referenzwert – kein Kaufpreis." },
      { name: "Grundschule und Kita in der Nähe", sector: "Bildung & Soziales", priority: "Wichtig", why: "Kurze Wege für Kinder." },
      { name: "Pendelzeit zum Arbeitsort", sector: "Verkehr", priority: "Wichtig", why: "Mit Auto und ÖPNV." },
      { name: "Hochwasser- und Starkregenrisiko", sector: "Umwelt", priority: "Wichtig", why: "Sicherheit und Versicherbarkeit." },
      { name: "Wie viel bebaut werden darf (GRZ, GFZ)", sector: "Baurecht", priority: "Nützlich", why: "Bestimmt Hausgröße und Garten." },
      { name: "Lärmbelastung", sector: "Umwelt", priority: "Nützlich", why: "Ruhe im Alltag." },
      { name: "Ärzte und Nahversorgung", sector: "Gesundheit", priority: "Nützlich", why: "Alltag ohne lange Wege." },
    ],
    insight: {
      title: "Klartext zuerst, Fachbegriff daneben.",
      text: "Statt „GRZ 0,4“ steht bei larima „Wie viel Fläche darf bebaut werden“ – der Fachbegriff daneben. So verstehst du Bebauungspläne, ohne Experte zu sein.",
    },
    faqs: [
      {
        q: "Woran erkenne ich ein gutes Baugrundstück?",
        a: "An einer zulässigen Wohnbebauung, passender Größe, kurzen Wegen zu Schule und Kita, akzeptabler Pendelzeit und geringem Hochwasserrisiko. larima prüft diese Punkte gemeinsam und erklärt jeden einzeln.",
      },
      {
        q: "Ist der angezeigte Wert der Kaufpreis des Grundstücks?",
        a: "Nein. Der Referenzwert ist Fläche × Bodenrichtwert – kein Verkehrswert und kein Kaufpreis. Er hilft bei der Einordnung des Budgets.",
      },
      genericFaq("mein Baugrundstück"),
    ],
  },
];

export const getBranche = (slug: string) => branchen.find((b) => b.slug === slug);
