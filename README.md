# FONTOS

Jelenleg ez a repo, és a weboldal is fejlesztés alatt áll. Még a példák sem feltétlen naprakészek mindig. **Az igazság egyetlen igaz forrása jelenleg ez a a README**.

# Mi ez?

Ez a repo szolgál adattal, egy serverless weboldalnak, aminek egyetlen célja, hogy innen kiolvasva a jegyzeteket / posztokat, mások tanulmányait segítse az **Üzemmérnök informatikus** (BME) szakon.

# Jegyzetek (posztok) készítése

Bárki hozzájárulhat az oldal tartalmának bővítéséhez. Ha van valamilyen jó jegyzeted amit szívesen átírnál markdown formátumra, akkor ne habozz, sok más tanuló társadnak segíthetsz ezzel. Az elnevezési konvenciókról lejjebb olvashatsz, ezeket betartani kötelező, és a példákat is érdemes megnézni!
`Hozzájárulás menete:`

- leforkolod ezt a repot
- a konvenciók szerint megcsinálod a posztot / jegyzetet amit szeretnél, és minden mást ami szükséges hozzá
- érdemes új branchet is létrehozni a forkodon
- csinálsz githubon egy pull requestet
- vársz az elfogadásra, esetleges javítási kérelemre

Természetesen ha valamelyik posztban mondjuk helyesírási hibát, vagy csak úgy unblock hibát találnál, azt is nyugodtan lehet javítani.

# Elnevezési konvenciók

Az új github workflow-k miatt, jelenleg csak egy helyesen megírt markdown fájlt kell készíteni a posts mappába. Név formátum: **2021-01-18-jegyzetneve.md**.

Minden ilyen jegyzet valahogy így kell kezdődjön (különben elutasításra kerül már az automata rendszer által is):
```yml
---
title: Címe / neve a jegyzetnek
subject: Válassz egy tantárgyat a subjects.json-ból (pl.: szoftech)
description: "Rövid leírás a posztról, nagyjából hasonló hosszúságban mint ez itt."
date: 2021-01-18
---
```

# Példák

Mielőtt bármivel is próbálkozol, érdemes megnézni a 2 example fájlt. Ha megnézted, utána már szerintem teljesen egyértelmű lesz mit kell csinálnod. **Az új frissitésnek köszönhetően metadata json-t, valamint thumbnailt már már nem kell csinálni (sőt tilos!), csak magát a jegyzetet markdown-ba a posts mappában.**
