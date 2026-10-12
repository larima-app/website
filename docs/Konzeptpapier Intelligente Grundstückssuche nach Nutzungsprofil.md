# Konzeptpapier: Intelligente Grundstückssuche nach Nutzungsprofil

Oct 2, 2026 · @Jannis Treiber

## 1. Zusammenfassung und Produktvision

Die App übersetzt ein Nutzungsvorhaben (z. B. „Bäckerei-Filiale“) automatisch in gewichtete Standortfaktoren und schlägt in Deutschland passende Grundstücke mit einem erklärbaren Match-Score vor. Grundlage sind die zehn Datensektoren des Datenarchitektur-Dokuments (Verkehr, Bildung & Soziales, Gesundheit, Infrastruktur, Förderung & Steuern, Baurecht, Grundstücksdaten, Demographie, Umwelt, Einkommen & Vermögen).

**Arbeitstitel:** Standort-Scout (Platzhalter, frei änderbar).

**Produktversprechen in einem Satz:** „Beschreibe, was du vorhast – wir zeigen dir, wo es passt, und warum.“

**Drei Leitideen, die das UI tragen müssen:**

1. **Profil vor Filter.** Nutzer beschreiben ihr Vorhaben, nicht 150 Einzelfilter. Die App leitet die relevanten Faktoren ab und legt sie offen zur Korrektur vor.
2. **Erklärbarkeit vor Blackbox.** Jeder Score lässt sich bis auf den einzelnen Datenpunkt, seine Quelle, Aktualität und räumliche Auflösung zurückverfolgen.
3. **Ehrlichkeit über Datenlücken.** „Nicht verfügbar“ wird nie als „schlecht“ oder „nicht vorhanden“ dargestellt. Baurechtliche und versorgungstechnische Aussagen sind als Vorprüfung gekennzeichnet, nicht als verbindliche Auskunft.

**Abgrenzung:** Die App ist ein Werkzeug zur Standortvorauswahl. Sie ersetzt weder Bauvoranfrage, Verkehrswertgutachten noch Anschlussbestätigung durch Versorger.

## 2. Problem, Zielgruppen und Personas

Standortsuche ist heute fragmentiert: Bodenrichtwerte in BORIS, Bebauungspläne im Kommunalportal, Lärm beim Land, Kaufkraft beim kommerziellen Anbieter. Wer gründet oder expandiert, kennt meist sein Geschäft, aber nicht die Standortfaktoren, die dafür entscheidend sind, noch wo diese Daten liegen.

| Persona | Ziel | Fachwissen | Kernbedürfnis im UI |
| --- | --- | --- | --- |
| **Gründerin Lena**, 34, plant eine Bäckerei-Filiale | Ersten Standort finden | Gering bei Baurecht und Geodaten | Geführter Einstieg, Klartext statt Fachbegriffe, klare Ampel |
| **Expansionsmanager Tobias**, Filialkette mit 40 Standorten | Weiße Flecken in einer Region finden | Hoch bei Kennzahlen, mittel bei Baurecht | Massenvergleich, Heatmap, Export, eigene Gewichtungen speichern |
| **Projektentwicklerin Aylin** | Grundstücke mit Nachverdichtungspotenzial | Hoch bei Baurecht und Bewertung | GRZ/GFZ, Baufenster, Bodenrichtwert, Rohdaten und Quellen |
| **Privatkäufer Familie Weber** | Baugrundstück fürs Einfamilienhaus | Gering | Schulen, Kita, Pendelzeit, Hochwasser; einfache Sprache |
| **Wirtschaftsförderer Herr Kaya** (Kommune) | Eigene Gewerbeflächen passenden Branchen zeigen | Hoch lokal | Umkehrsicht: „Für welche Profile passt diese Fläche?“ (spätere Ausbaustufe) |

**Annahme für das Design:** Das MVP optimiert für Lena und Tobias (gewerbliche Nutzungsprofile), ohne die Struktur für Wohnprofile zu verbauen. Diese Annahme ist zu bestätigen (siehe Abschnitt 11).

## 3. Kernkonzept: vom Nutzungsprofil zum Match-Score

Die Suche läuft in sechs Stufen; jede Stufe hat eine sichtbare Entsprechung im UI, damit Nutzer die Logik nachvollziehen und eingreifen können.

| Stufe | Was passiert | Was der Nutzer sieht / tut |
| --- | --- | --- |
| 1. Profil erfassen | Branche (WZ-2008-Code), Vorhabenstyp, Flächenbedarf, Suchraum, Budget, Freitext | Wizard, Schritte 1–3 |
| 2. Faktoren ableiten | Kuratierte Branchenvorlage + KI-Interpretation des Freitexts ergeben eine Faktorliste mit Begründung | Faktor-Review: Liste mit „Warum relevant?“ |
| 3. Gewichten | Jeder Faktor erhält Priorität, Richtung und ggf. Schwellenwert | Prioritäts-Chips, Schieberegler, Schwellenfelder |
| 4. Vorfiltern | Muss-Kriterien schließen Grundstücke aus | Zähler „X von Y Grundstücken erfüllen alle Muss-Kriterien“ |
| 5. Bewerten | Teilscores je Faktor, Sektor- und Gesamtscore, Datenabdeckung | Ergebnisliste, Karte, Heatmap |
| 6. Erklären | Top-Stärken, Top-Schwächen, Datenlücken je Treffer | Score-Aufschlüsselung im Detail |

### 3.1 Zwei Suchmodi: Was ist ein „Treffer“?

Die Datenquellen des Architekturdokuments beschreiben Lagequalität, nicht Verfügbarkeit. Kein dort genannter Datensatz zeigt, ob ein Grundstück zum Kauf oder zur Pacht steht. Das UI muss deshalb zwei Modi klar trennen:

- **Modus A – Angebote:** Nur tatsächlich angebotene Objekte (Immobilienportale, kommunale Gewerbeflächenbörsen, Grundstücksbörsen). Benötigt Lizenz- bzw. API-Verträge.
- **Modus B – Potenzialsuche:** Bewertet alle Flurstücke oder Rasterzellen im Suchraum nach Eignung, unabhängig vom Verkauf. Ausgabe: Heatmap und „Top-Lagen“. Mit Open Data umsetzbar.

**Empfehlung fürs UI:** Modus B als Standard im MVP, Modus A als Umschalter, sobald eine Angebotsquelle angebunden ist. Ergebniskarten tragen immer ein Etikett „Angebot“ oder „Potenzialfläche“.

### 3.2 Gewichtungsmodell

Jeder Faktor erhält eine von vier Prioritäten:

| Priorität | Gewicht | Wirkung |
| --- | --- | --- |
| Muss-Kriterium | Filter | Nichterfüllung schließt aus |
| Wichtig | 3 | Geht dreifach in den Score ein |
| Nützlich | 1 | Geht einfach in den Score ein |
| Nicht relevant | 0 | Ausgeblendet |

Zusätzlich pro Faktor: **Richtung** (mehr ist besser · weniger ist besser · Zielkorridor) und optional ein **Schwellenwert** (z. B. „Haltestelle ≤ 300 m“). Die Gewichte 3/1 sind ein Startvorschlag und im Prototyp zu testen.

### 3.3 Scoring und Datenlücken

Jeder Faktor wird auf einen Teilscore von 0–100 normiert (über Schwellenwert oder Perzentil im Suchraum). Der Gesamtscore ist das gewichtete Mittel über alle Faktoren **mit verfügbaren Daten**:

```latex
S = \frac{\sum_{i \in V} w_i \, s_i}{\sum_{i \in V} w_i}, \qquad A = \frac{\sum_{i \in V} w_i}{\sum_{i \in F} w_i}
```

Dabei ist F die Menge aller gewichteten Faktoren, V die Teilmenge mit Daten, s der Teilscore, w das Gewicht und A die gewichtete Datenabdeckung.

**Konsequenzen fürs UI:**

- Jeder Treffer zeigt immer zwei Zahlen: **Match-Score** und **Datenabdeckung** (z. B. „82 · Abdeckung 71 %“). Ein hoher Score bei niedriger Abdeckung ist weniger belastbar und wird optisch abgeschwächt.
- Fehlende Daten senken den Score nicht, werden aber als Lücke ausgewiesen.
- Ein Muss-Kriterium ohne Daten führt nicht zum Ausschluss, sondern in eine eigene Gruppe „Muss-Kriterium ungeprüft“.

## 4. Faktorkatalog, Relevanzmatrix und Beispiel Bäckerei

Die App erkennt relevante Faktoren über drei Quellen, die im UI jeweils als Herkunfts-Badge sichtbar sind:

| Herkunft | Mechanismus | Badge |
| --- | --- | --- |
| Branchenvorlage | Kuratierte, versionierte Faktorliste je WZ-Code und Vorhabenstyp | „Vorlage“ |
| KI-Interpretation | LLM liest den Freitext und wählt **nur aus dem geschlossenen Faktorkatalog**; jede Auswahl mit Begründungssatz | „KI-Vorschlag“ |
| Nutzer | Manuell hinzugefügt oder umgewichtet | „Eigene Angabe“ |

Nennt der Nutzer einen Bedarf, für den es keinen Katalogfaktor gibt (z. B. „Laufkundschaft“), zeigt die App ihn als „Faktor ohne Datenquelle“ an, statt ihn stillschweigend zu verwerfen oder zu erfinden.

### 4.1 Relevanzmatrix (Startvorlage)

Die Matrix ist ein Entwurf zur fachlichen Validierung, keine empirisch abgeleitete Gewichtung. H = hoch, M = mittel, G = gering, – = nicht relevant.

| Profil | Verkehr | Bildung & Soziales | Gesundheit | Infrastruktur | Förderung & Steuern | Baurecht | Grundstück | Demographie | Umwelt | Einkommen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Bäckerei-Filiale | H | M | – | M | M | H | M | H | G | H |
| Produktionsbäckerei | H | – | – | H | M | H | H | G | M | G |
| Arztpraxis | H | G | M | M | G | H | M | H | G | M |
| Kita | M | H | G | M | H | H | H | H | H | M |
| Logistik/Lager | H | – | – | H | H | H | H | G | M | G |
| Büro/IT-Unternehmen | H | G | G | H | H | H | M | M | G | M |
| Einfamilienhaus | H | H | M | H | H | H | H | M | H | M |

### 4.2 Beispiel: Bäckerei-Filiale mit Café-Bereich

| Faktor | Sektor | Priorität | Richtung / Schwelle | Begründung (im UI sichtbar) |
| --- | --- | --- | --- | --- |
| Zulässige Nutzungsart erlaubt Laden | Baurecht | Muss | z. B. MI, MU, MK, WA (gebietsversorgend) | Ohne zulässige Nutzung keine Genehmigung |
| Fläche im Bedarfskorridor | Grundstück | Muss | Nutzereingabe, z. B. 80–200 m² | Vom Nutzer vorgegeben |
| Budget | Grundstück / Einkommen | Muss | Bodenrichtwert × Fläche ≤ Budget | Vom Nutzer vorgegeben |
| Einwohner im 500-m-Umkreis | Demographie | Wichtig | mehr ist besser | Basis für Stammkundschaft |
| ÖPNV-Haltestelle mit Frühverkehr | Verkehr | Wichtig | ≤ 300 m, Abfahrten 6–9 Uhr | Pendler kaufen morgens unterwegs |
| Kaufkraft je Einwohner | Einkommen | Wichtig | mehr ist besser | Zahlungsbereitschaft für Café-Angebot |
| Kurzzeitparken | Verkehr | Nützlich | Anzahl im 200-m-Umkreis | „Kurz halten, Brötchen holen“ |
| Schulen und Kitas im Umkreis | Bildung & Soziales | Nützlich | mehr ist besser | Frequenz zu Bring- und Abholzeiten |
| Kfz-Verkehr vor dem Grundstück | Verkehr | Nützlich | Zielkorridor | Sichtbarkeit; zu viel Verkehr stört Außengastronomie |
| Gewerbesteuer-Hebesatz | Förderung & Steuern | Nützlich | weniger ist besser | Laufende Belastung |
| Stromanschluss-Kapazität | Infrastruktur | Nützlich | ≥ Bedarf Backöfen | Meist nur auf Anfrage beim Netzbetreiber; im UI als „Prüfschritt“ |
| Hochwasser- und Starkregenrisiko | Umwelt | Nützlich | weniger ist besser | Waren- und Gerätelager |

**Lücken im Architekturdokument, die für Einzelhandelsprofile wichtig sind (Ergänzungsvorschlag):**

- **Wettbewerbsdichte:** Anzahl Bäckereien im Umkreis, ableitbar aus OpenStreetMap-POIs.
- **Frequenzbringer:** Supermärkte, Drogerien, Bahnhöfe im Umkreis, ebenfalls aus POIs.
- **Passantenfrequenz:** Nur punktuell (Zählstellen in Innenstädten) oder kommerziell verfügbar.
- **Ladenlokal statt Grundstück:** Eine Filiale wird meist als Mieteinheit gesucht, nicht als Grundstück. Das Profil braucht daher die Frage „Suchst du ein Grundstück oder eine Gewerbeeinheit?“ (siehe Abschnitt 11).

**Warum der Vorhabenstyp zählt:** Eine Produktionsbäckerei kehrt mehrere Faktoren um. Sie braucht Gewerbe- oder Industriegebiet, Lkw-Erreichbarkeit und hohe Netzkapazität; Einwohnerdichte und Kaufkraft verlieren an Gewicht; wegen Nachtbetriebs wird der Abstand zu Wohngebieten zum Faktor.

## 5. Informationsarchitektur und Navigation

Die Hauptnavigation hat vier Bereiche; der Suchbereich ist ein geführter, linearer Pfad, der im Standortprofil (S5) mündet.

&#91;embedded content: Sitemap · 4 Navigationsbereiche, 10 Screens\]

Von S5 und S7 aus führt der Export zum Report (S9); ein gespeichertes Profil aus S8 startet direkt in S3.

**Navigationsregeln:**

- **Globale Leiste:** Logo · Neue Suche · Projekte · Profile · Methodik · Konto.
- **Profil-Chip:** Ab S3 ist das aktive Profil oben sichtbar („Bäckerei-Filiale · Raum Mannheim“); Klick öffnet die Faktorgewichtung.
- **Breadcrumb im Suchpfad:** Profil › Faktoren › Ergebnisse › Grundstück.
- **Vergleichsleiste:** Bis zu vier vorgemerkte Grundstücke als Dock am unteren Rand, von S4 und S5 aus befüllbar.
- **Deep Links:** Jede Ergebnisliste und jedes Standortprofil hat eine teilbare URL inklusive Profil und Gewichtung.

## 6. Zentrale User Flows

Der Haupt-Flow führt in vier Schritten vom Freitext zum ersten Treffer; jede automatische Entscheidung hat einen sichtbaren Ausweg.

&#91;embedded content: Haupt-Flow „Neue Suche“ · 7 Schritte, 2 Entscheidungen\]

Wird die Branche nicht erkannt, wählt der Nutzer sie aus einer Liste; gibt es keine Treffer, schlägt der Leerzustand vor, welches Muss-Kriterium gelockert werden kann, und führt zurück in die Faktorprüfung.

### 6.1 Weitere Flows

1. **Gewichtung live anpassen (S4):** Faktor-Chip anklicken → Drawer öffnet → Priorität oder Schwelle ändern → Liste und Karte sortieren sich neu, geänderte Ränge kurz markiert → „Als Profil speichern“ optional.
2. **Treffer verstehen (S4 → S5):** Card öffnen → Score-Aufschlüsselung → Faktor anklicken → springt zur Datenzeile im Sektor-Akkordeon → Quelle öffnen.
3. **Vergleichen (S4/S5 → S6):** „Vergleichen“ an 2–4 Grundstücken → Dock am unteren Rand füllt sich → „Vergleich öffnen“.
4. **Wiederkehrender Nutzer (S7):** Projekt öffnen → Badge „Daten geändert“ an einem Grundstück → S5 mit hervorgehobener Änderung (alter und neuer Wert).
5. **Gespeichertes Profil wiederverwenden (S8 → S3):** Profil wählen → neuen Suchraum setzen → direkt in die Faktorprüfung.
6. **Muss-Kriterium ungeprüft (S4):** Sektion aufklappen → Grundstücke mit fehlenden Daten für ein Muss-Kriterium → Hinweis, bei welcher Stelle der Wert erfragt werden kann.

## 7. Screen-Spezifikationen

Zehn Screens decken das MVP ab; die Desktop-Ansicht ist führend, Mobile wird für Ergebnisse und Detail mitgedacht.

| ID | Screen | Hauptzweck | Persona-Fokus |
| --- | --- | --- | --- |
| S1 | Startseite | Vorhaben eingeben, Einstieg | alle |
| S2 | Profil-Wizard | Vorhaben strukturiert erfassen | Lena, Familie Weber |
| S3 | Faktor-Review | Abgeleitete Faktoren prüfen und gewichten | alle |
| S4 | Ergebnisansicht | Treffer in Liste und Karte | alle |
| S5 | Standortprofil | Ein Grundstück im Detail, Score erklärt | alle |
| S6 | Vergleich | 2–4 Grundstücke nebeneinander | Tobias, Aylin |
| S7 | Projekte & Merkliste | Suchen und Favoriten verwalten | Tobias |
| S8 | Profilverwaltung | Gespeicherte Nutzungsprofile | Tobias |
| S9 | Report-Export | PDF-Standortreport | Lena, Tobias |
| S10 | Datenquellen & Methodik | Transparenz über Quellen und Scoring | Aylin |

### S1 – Startseite

- **Hero:** Ein großes Eingabefeld „Was hast du vor?“ mit Platzhalter „z. B. Bäckerei mit kleinem Café, 100–150 m², Raum Mannheim“.
- **Schnellstart-Kacheln:** 6–8 häufige Profile (Bäckerei, Arztpraxis, Kita, Lager, Büro, Einfamilienhaus).
- **Vertrauenszeile:** „Basierend auf amtlichen Daten von …“ mit Link zu S10.
- **Interaktion:** Absenden des Freitexts öffnet S2 mit vorausgefüllten Feldern.

### S2 – Profil-Wizard (4 Schritte)

Fortschrittsanzeige oben, „Zurück“ jederzeit möglich, Zwischenstand automatisch gespeichert.

1. **Vorhaben:** Branche (Autocomplete auf WZ-Bezeichnungen in Alltagssprache), Freitext, erkannte Branche als bestätigbarer Chip.
2. **Art und Größe:** Vorhabenstyp (Ladenlokal, Produktion, Büro, Lager, Wohnen), Grundstück oder Gewerbeeinheit, Flächenkorridor in m², optional Kauf oder Miete.
3. **Suchraum:** Kartenauswahl (Gemeinde, Landkreis, Radius um Adresse, frei gezeichnetes Polygon) plus Textsuche.
4. **Rahmen:** Budget, Zeithorizont, optional „Was ist dir besonders wichtig?“ als Freitext.

**Zustände:** KI-Erkennung läuft (Skeleton am Branchen-Chip) · Branche nicht erkannt (Auswahl aus Liste anbieten) · Suchraum außerhalb der Datenabdeckung (Hinweis mit Karte der verfügbaren Regionen).

### S3 – Faktor-Review

Der wichtigste Screen für Vertrauen: Hier sieht der Nutzer, was die App „verstanden“ hat.

- **Kopf:** „Für eine Bäckerei-Filiale haben wir 12 relevante Faktoren erkannt.“
- **Faktorliste, gruppiert nach Priorität** (Muss · Wichtig · Nützlich), je Zeile: Faktorname, Sektor-Icon, Herkunfts-Badge, Prioritäts-Chip (änderbar), Schwellenwert-Feld, aufklappbare Begründung, Datenverfügbarkeit im Suchraum (z. B. „Daten für 94 % der Fläche“).
- **Drag & Drop** zwischen Prioritätsgruppen.
- **„Faktor hinzufügen“:** Suchbarer Katalog, nach den zehn Sektoren gegliedert.
- **Live-Zähler rechts:** „Muss-Kriterien erfüllen ca. 340 Grundstücke im Suchraum.“
- **Primäraktion:** „Grundstücke finden“.

### S4 – Ergebnisansicht

- **Layout Desktop:** Liste links (ca. 40 %), Karte rechts (ca. 60 %), beide synchron (Hover hebt den Marker hervor).
- **Kopfzeile:** Profilname, Modus-Umschalter „Angebote / Potenzialflächen“, Trefferzahl, Sortierung (Score, Preis, Fläche, Abdeckung).
- **Filterleiste:** Aktive Faktoren als Chips; Klick öffnet einen Gewichtungs-Drawer mit Live-Neusortierung.
- **Ergebniskarte (Card):** Score-Badge mit Abdeckungsring, Etikett „Angebot“ oder „Potenzialfläche“, Ort und Fläche, Bodenrichtwert, drei Stärken-Chips, eine Schwäche-Chip, Aktionen „Merken“ und „Vergleichen“.
- **Karte:** Marker in Score-Farbe, Cluster bei Zoom-out, Heatmap-Layer der Eignung, Layer-Menü (Bebauungspläne, Hochwasser, Lärm, ÖPNV).
- **Sondergruppe:** „Muss-Kriterium ungeprüft“ als einklappbare Sektion unterhalb der Treffer.
- **Zustände:** Keine Treffer (Vorschlag: „Welches Muss-Kriterium lockern?“ mit Trefferzahl je Lockerung) · Laden · Teilweise geladene Sektoren.
- **Mobile:** Umschalter Liste/Karte, Card als Bottom Sheet.

### S5 – Standortprofil (Detail)

- **Header:** Adresse bzw. Gemarkung/Flur/Flurstück, Fläche, Bodenrichtwert mit Stichtag, Referenzwert (Fläche × Bodenrichtwert, klar als „kein Kaufpreis“ beschriftet), Match-Score und Datenabdeckung.
- **Score-Aufschlüsselung:** Horizontales Balkendiagramm aller Faktoren nach Beitrag zum Score; Lücken als graue, gestrichelte Balken.
- **Kartenmodul:** Flurstücksgrenze, Isochronen (5/10/15 min zu Fuß), POIs im Umkreis, zuschaltbare Layer.
- **Sektor-Abschnitte:** Zehn Akkordeons, relevante Sektoren oben und aufgeklappt. Jede Datenzeile: Wert · Einheit · Teilscore · Qualitäts-Badge · Raumebene · Stand · Quelle (Link).
- **Baurecht-Box:** B-Plan-ID mit Link zum Original, extrahierte Festsetzungen (GRZ, GFZ, Geschosse, Nutzung) mit Status-Badge, fester Hinweis „Vorprüfung, keine verbindliche Auskunft“.
- **Nächste Schritte:** Checkliste (Bauvoranfrage, Grundbuchauszug, Anfrage beim Netzbetreiber, Baulastenauskunft) mit Links zu den zuständigen Stellen.
- **Aktionen:** Merken, Vergleichen, Report exportieren, Notiz.

### S6 – Vergleich

- **Spalten:** 2–4 Grundstücke; **Zeilen:** Faktoren, gruppiert nach Sektor.
- Bester Wert je Zeile hervorgehoben; Datenlücken explizit als „keine Daten“.
- Oben ein gruppiertes Balkendiagramm der Sektorscores je Grundstück.
- Umschalter „Nur Unterschiede zeigen“.

### S7 – Projekte & Merkliste

- Projekt = gespeichertes Profil + Suchraum + Merkliste + Notizen.
- Tabelle der gemerkten Grundstücke mit Status (Neu · In Prüfung · Kontaktiert · Verworfen) und Datum der letzten Datenänderung.
- Hinweis-Badge, wenn sich Daten eines gemerkten Grundstücks geändert haben (z. B. neuer Bodenrichtwert).

### S8 – Profilverwaltung

- Liste eigener Profile mit Branche, Faktoranzahl, letzter Nutzung; Duplizieren, Umbenennen, Löschen.
- Diff-Ansicht „Abweichung von der Branchenvorlage“.

### S9 – Report-Export

- Vorschau des PDF-Reports: Profil, Score-Aufschlüsselung, Sektordaten, Quellenverzeichnis, Haftungshinweis.
- Optionen: Sektoren auswählen, Logo hinzufügen (für Tobias), Sprache.

### S10 – Datenquellen & Methodik

- Tabelle aller Quellen mit Abdeckung, Aktualisierungsrhythmus, Lizenz und letztem Import.
- Verständliche Erklärung des Scorings inklusive der Formel aus Abschnitt 3.3.
- Karte der Datenabdeckung je Bundesland für länderabhängige Quellen (BORIS, B-Pläne).

## 8. Datenqualität, Transparenz und Vertrauen im UI

Jeder angezeigte Wert trägt drei Metadaten sichtbar mit: Qualitätsstatus, räumliche Auflösung und Stand. Diese stammen direkt aus den Feldern `quality_status`, `spatial_level` und `source_updated_at` des Datenmodells.

### 8.1 Qualitäts-Badges

| Status (Datenmodell) | Badge-Text | Visuelle Kodierung | Tooltip |
| --- | --- | --- | --- |
| `verified` | Bestätigt | Gefülltes Häkchen | Fachlich geprüfte Information |
| `machine_extracted` | Automatisch ermittelt | Halb gefüllter Kreis | Aus Plan oder Geodaten extrahiert; Original prüfen |
| `document_only` | Nur im Dokument | Dokument-Icon | Nur im Originalplan verfügbar; Link öffnet PDF |
| `not_available` | Keine Daten | Leerer, gestrichelter Kreis | Für diesen Ort nicht veröffentlicht oder nicht angebunden |
| `not_applicable` | Trifft nicht zu | Grauer Strich | Datenpunkt ist hier ohne Bedeutung |

Farbe allein trägt nie die Bedeutung; jedes Badge hat Icon und Text (Barrierefreiheit).

### 8.2 Räumliche Auflösung

Ein kleines Präfix-Label zeigt, worauf sich ein Wert bezieht: **Flurstück · Adresse · Raster · Stadtteil · Gemeinde · Kreis**. Beispiel: „Kaufkraft 26.400 € · Gemeinde“. So erkennt der Nutzer, dass zwei Grundstücke in derselben Gemeinde denselben Wert haben müssen.

### 8.3 Aktualität

- Stand als Datum hinter jedem Wert; älter als ein definierter Schwellenwert je Quelle → Hinweis „Daten älter als X Jahre“.
- Bodenrichtwert immer mit Stichtag.

### 8.4 Feste Hinweise an kritischen Stellen

| Ort | Hinweistext (Entwurf) |
| --- | --- |
| Baurecht-Box | „Vorprüfung auf Basis veröffentlichter Pläne. Verbindlich ist allein die Auskunft der Bauaufsichtsbehörde.“ |
| Referenzwert | „Fläche × Bodenrichtwert. Kein Verkehrswert und kein Kaufpreis.“ |
| Infrastruktur | „Eine Leitung in der Nähe bestätigt keinen Anschluss. Bitte beim Versorger anfragen.“ |
| Angebotsmieten | „Angebotswerte, keine vereinbarten Mieten.“ |
| Potenzialfläche | „Dieses Grundstück steht nicht notwendigerweise zum Verkauf.“ |

### 8.5 Erklärbarkeit der KI

- Jeder KI-Vorschlag in S3 zeigt einen Begründungssatz und lässt sich mit einem Klick verwerfen.
- Die KI rechnet keine Scores; sie wählt und gewichtet nur Faktoren. Die Bewertung selbst ist deterministisch und reproduzierbar.
- Personenbezogene Daten (z. B. Eigentümer aus dem Grundbuch) erscheinen nie im UI.

## 9. Designprinzipien und Komponentenbibliothek

Das UI soll wie ein seriöses Analysewerkzeug wirken, nicht wie ein Immobilienportal: ruhig, kartenzentriert, mit klarer Hierarchie von Score über Sektor bis Datenpunkt.

### 9.1 Prinzipien

1. **Progressive Offenlegung:** Score → Sektoren → Faktoren → Rohdaten und Quelle. Jede Ebene ist einen Klick tiefer.
2. **Klartext zuerst, Fachbegriff daneben:** „Wie viel Fläche darf bebaut werden (GRZ 0,4)“.
3. **Die Karte ist Arbeitsfläche, nicht Dekoration:** Jede Liste hat eine räumliche Entsprechung.
4. **Unsicherheit ist sichtbar:** Datenabdeckung und Qualitäts-Badges sind gleichrangig mit dem Score.
5. **Nutzer behält Kontrolle:** Jede automatische Entscheidung (Branche, Faktor, Gewicht) ist änderbar und umkehrbar.

### 9.2 Farbsemantik

- **Score-Skala:** Fünfstufige sequenzielle Skala (z. B. von hellem Grau-Blau zu kräftigem Blau-Grün), nicht Rot–Grün, wegen Farbsehschwäche.
- **Warnungen:** Ein eigener Akzent (z. B. Bernstein) ausschließlich für Risiken wie Hochwasser oder ungeprüfte Muss-Kriterien.
- **Datenlücken:** Neutrales Grau mit Schraffur oder gestrichelter Kontur.
- **Zehn Sektoren:** Je ein Icon; Farben für Sektoren sparsam, da die Karte bereits farbintensiv ist.

### 9.3 Komponenten

| Komponente | Einsatz | Varianten / Zustände |
| --- | --- | --- |
| Score-Badge mit Abdeckungsring | S4, S5, S6 | groß, klein; abgeschwächt bei Abdeckung < 60 % |
| Faktorzeile | S3, S5 | lesend, editierbar; mit/ohne Schwellenwert |
| Prioritäts-Chip | S3, Drawer in S4 | Muss · Wichtig · Nützlich · Nicht relevant |
| Herkunfts-Badge | S3 | Vorlage · KI-Vorschlag · Eigene Angabe |
| Qualitäts-Badge | S5, S6 | fünf Status aus Abschnitt 8.1 |
| Raumebenen-Label | S5, S6 | Flurstück bis Kreis |
| Ergebniskarte | S4, S7 | Angebot, Potenzialfläche; gemerkt; im Vergleich |
| Sektor-Akkordeon | S5 | relevant (offen), nicht relevant (zu) |
| Score-Aufschlüsselung | S5 | Balken je Faktor, Lücken gestrichelt |
| Kartenmodul | S2, S4, S5 | Auswahl, Ergebnis, Detail; Layer-Menü; Heatmap |
| Gewichtungs-Drawer | S4 | Live-Neusortierung, Zurücksetzen auf Vorlage |
| Hinweisbox | S5, S9 | Info, Warnung, rechtlicher Hinweis |
| Leerzustand mit Lockerungsvorschlag | S4 | Liste der Muss-Kriterien mit Trefferzahl bei Lockerung |
| Wizard-Schritt | S2 | aktiv, erledigt, fehlerhaft |

### 9.4 Barrierefreiheit und Responsiveness

- Zielniveau WCAG 2.2 AA; alle Kartenfunktionen haben eine Listenalternative.
- Breakpoints: Desktop (Split-View), Tablet (Karte oben, Liste unten), Mobile (Umschalter, Bottom Sheet).

## 10. MVP-Umfang und Ausbaustufen

Das MVP beweist den Kern „Profil → Faktoren → erklärbarer Score“ in einer Pilotregion mit Open Data; alles andere folgt in Stufen.

| Funktion | MVP | Stufe 2 | Stufe 3 |
| --- | --- | --- | --- |
| Profil-Wizard mit Freitext und KI-Faktorableitung | ✓ |  |  |
| Branchenvorlagen | 5–8 Gewerbeprofile | 20+ inkl. Wohnen | Nutzerdefinierte Vorlagen teilen |
| Suchraum | Eine Pilotregion | Ein Bundesland | Deutschland |
| Suchmodus | Potenzialsuche | + Angebote (eine Quelle) | Mehrere Angebotsquellen |
| Sektoren mit Daten | Grundstück, Baurecht (soweit XPlanung), Verkehr, Demographie, Umwelt (Hochwasser, Lärm), Steuern | + Bildung, Gesundheit, Infrastruktur (Breitband) | + kommerzielle Kaufkraft- und Preisdaten |
| Ergebnisansicht mit Karte und Heatmap | ✓ |  |  |
| Standortprofil mit Score-Aufschlüsselung | ✓ |  |  |
| Vergleich | 2 Grundstücke | 4 Grundstücke |  |
| Projekte und Merkliste | einfache Merkliste | Projekte, Status, Änderungsalarme | Team-Freigabe |
| PDF-Report |  | ✓ | Eigenes Branding |
| Umkehrsicht „Welche Profile passen zu dieser Fläche?“ |  |  | ✓ |

Für das UI-Design heißt das: Alle Screens aus Abschnitt 7 werden gestaltet, im MVP-Prototyp aber S6 reduziert und S8, S9 nur als Platzhalter umgesetzt.

## 11. Offene Annahmen und Entscheidungen

Diese Punkte sind vor dem UI-Design zu klären, weil sie Screens strukturell verändern:

- [ ] **Grundstück oder auch Gewerbeeinheit?** Für Einzelhandel (Bäckerei-Filiale) wird meist eine Mieteinheit gesucht. Falls ja: Datenquelle für Ladenlokale nötig, Datenmodell um „Einheit im Gebäude“ erweitern.
- [ ] **Angebotsquelle:** Welche Quelle für tatsächlich verfügbare Grundstücke ist lizenzrechtlich nutzbar? Ohne sie bleibt nur die Potenzialsuche.
- [ ] **Pilotregion:** Welche Region hat gute XPlanung- und BORIS-Abdeckung? Entscheidet über den ersten Kartenausschnitt im Prototyp.
- [ ] **Primäre Zielgruppe:** Gewerbe (Lena, Tobias) oder auch Privatkäufer ab MVP? Beeinflusst Tonalität und Fachtiefe.
- [ ] **Gewichtungsschema:** Sind 3/1 als Gewichte verständlich, oder besser ein fünfstufiger Regler? Im Usability-Test prüfen.
- [ ] **Validierung der Relevanzmatrix:** Mit wem werden die Branchenvorlagen fachlich geprüft (z. B. IHK, Wirtschaftsförderung, Branchenverbände)?
- [ ] **Ergänzende Faktoren:** Wettbewerbsdichte und Frequenzbringer aus POI-Daten aufnehmen?
- [ ] **Geschäftsmodell:** Freemium mit Report als Bezahlfunktion oder Abo für Profis? Bestimmt, welche Elemente im UI hinter einer Bezahlschranke liegen.
- [ ] **Rechtliche Prüfung:** Haftungshinweise und Lizenzbedingungen der Quellen für kommerzielle Nutzung.
