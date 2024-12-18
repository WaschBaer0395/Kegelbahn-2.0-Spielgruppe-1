# Kegelbahn-2.0-Spielgruppe-1
Kegelbahn 2.0 Spielgruppe 1 das Spiel der Gruppe 1, basierend auf einer React app mit Typescript, realisiert durch das Vite frontent

Finale Präsentation: [Finale Präsentation](Kegelbahn2.0.pdf)

##Installation
Node installieren (min version 20.9.0)
das projekt Clonen und in das root verzeichnis wechseln und dann mit `npm i` installieren
anschließend mit `npm run start` den server und damit die app starten

## Json der Sensordaten
```json
{
  "sensors": [true, true, true, false, false, false, false, false, false],
  "rounds_played": 7,
  "total_pins_downed": 0,
  "pins_downed": 6
}
```
| sensors.0 | sensors.1 | sensors.2 | sensors.3 | sensors.4 | sensors.5 | sensors.6 | sensors.7 | sensors.8 | rounds_played | total_pins_downed | pins_downed |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | ------------- | ----------------- | ----------- |
| true      | true      | true      | false     | false     | false     | false     | false     | false     | 7             | 0                 | 6           |

## Json der Spielerinfo von dem Management
```json
[
  {"name": "Hans", "gender": "m", "color": "blue", "hair": "blond"},
  {"name": "Sabrine", "gender": "f", "color": "green", "hair": "black"},
  {"name": "Franziska", "gender": "f", "color": "yellow", "hair": "brown"},
  {"name": "Jörg", "gender": "m", "color": "green", "hair": "brown"},
  {"name": "Philipp", "gender": "m", "color": "orange", "hair": "black"},
  {"name": "Olaf", "gender": "m", "color": "red", "hair": "brown"},
  {"name": "Manuel", "gender": "m", "color": "yellow", "hair": "black"},
  {"name": "Lea", "gender": "f", "color": "green", "hair": "brown"}
]
```
| name      | gender | color  | hair  |
| --------- | ------ | ------ | ----- |
| Hans      | m      | blue   | blond |
| Sabrine   | f      | green  | black |
| Franziska | f      | yellow | brown |
| Jörg      | m      | green  | brown |
| Philipp   | m      | orange | black |
| Olaf      | m      | red    | brown |
| Manuel    | m      | yellow | black |
| Lea       | f      | green  | brown |
