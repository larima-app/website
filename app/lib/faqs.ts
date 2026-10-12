export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "Stehen die gezeigten Grundstücke zum Verkauf?",
    a: "Nicht unbedingt. Standardmäßig läuft die Potenzialsuche: Sie bewertet alle Flächen im Suchraum nach Eignung, unabhängig vom Verkauf. Sobald eine Angebotsquelle angebunden ist, kannst du auf „Angebote“ umschalten. Jede Ergebniskarte trägt das Etikett „Angebot“ oder „Potenzialfläche“.",
  },
  {
    q: "Ersetzt larima eine Bauvoranfrage oder ein Gutachten?",
    a: "Nein. larima ist ein Werkzeug zur Standortvorauswahl. Baurechtliche und versorgungstechnische Aussagen sind als Vorprüfung gekennzeichnet. Verbindlich sind allein die Auskunft der Bauaufsichtsbehörde, ein Verkehrswertgutachten und die Anschlussbestätigung des Versorgers.",
  },
  {
    q: "Wie wird der Match-Score berechnet?",
    a: "Jeder Faktor bekommt einen Teilscore von 0 bis 100. Der Match-Score ist der gewichtete Durchschnitt aller Faktoren, für die Daten vorliegen: „Wichtig“ zählt dreifach, „Nützlich“ einfach, Muss-Kriterien filtern aus.",
  },
  {
    q: "Was passiert, wenn Daten fehlen?",
    a: "Fehlende Daten senken den Score nicht, werden aber als Lücke ausgewiesen. Deshalb zeigt jeder Treffer neben dem Match-Score auch die Datenabdeckung. Ein hoher Score bei niedriger Abdeckung wird optisch abgeschwächt.",
  },
  {
    q: "Welche Rolle spielt die KI?",
    a: "Die KI liest deine Beschreibung und schlägt Faktoren aus einem geschlossenen Katalog vor – jeweils mit Begründung und mit einem Klick verwerfbar. Sie rechnet keine Scores. Personenbezogene Daten erscheinen nie in der App.",
  },
  {
    q: "Woher kommen die Daten?",
    a: "Aus amtlichen und offenen Quellen in zehn Sektoren – etwa Bodenrichtwerte aus BORIS, Bebauungspläne im XPlanung-Format, Zensus-Daten, OpenStreetMap sowie Hochwasser- und Lärmkarten der Länder. Jeder Wert ist mit Quelle, Stand und räumlicher Auflösung verlinkt.",
  },
  {
    q: "Für welche Branchen eignet sich larima?",
    a: "Für alle Vorhaben, bei denen der Standort über den Erfolg entscheidet – etwa Bäckerei, Arztpraxis, Kita, Lager und Logistik, Büro oder Einfamilienhaus. Für jede Branche gibt es eine Startvorlage mit den typischen Standortfaktoren, die du im Faktor-Review anpasst.",
  },
];
