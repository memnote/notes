# Mi ez?

Ez a repo szolgál adattal, egy serverless weboldalnak, aminek egyetlen célja, hogy innen kiolvasva a jegyzeteket / posztokat, mások tanulmányait segítse az **Üzemmérnök informatikus** (BME) szakon.

# Jegyzetek (posztok) készítése

Bárki hozzájárulhat az oldal tartalmának bővítéséhez. Ha van valamilyen jó jegyzeted amit szívesen átírnál markdown formátumra, akkor ne habozz, sok más tanuló társadnak segíthetsz ezzel. Az elnevezési konvenciókról lejjebb olvashatsz, ezeket betartani kötelező, és a példákat is érdemes megnézni!
`Hozzájárulás menete:`

- leforkolod ezt a repot
- a konvenciók szerint megcsinálod a posztot / jegyzetet amit szeretnél, és minden mást ami szükséges hozzá
- csinálsz githubon egy pull requestet
- vársz az elfogadásra, esetleges javítási kérelemre

Természetesen ha valamelyik posztban mondjuk helyesírási hibát, vagy csak úgy unblock hibát találnál, azt is nyugodtan lehet javítani.

# Elnevezési konvenciók

Ha a poszt fájlneve: **2021-01-18-tesztposzt123**, akkor a metadata json neve ami hozzá tartozik legyen: **2021-01-18-tesztposzt123-metadata.json**. Ha thumbnail-t szeretnél a poszthoz, akkor azt az assets/thumbnails mappába kell rakni a következő névvel: **2021-01-18-tesztposzt123-thumbnail.jpg**. Erre a képre a markdown-on belül tudsz **hivatkozni relatív elérésí úttal (../assets/2021-01-18-tesztposzt123-képneve.jpg)**.
A poszt neve mindenképpen a feltöltési dátummal kell, hogy kezdődjön!
Subjectet (tantárgyat) a subjects.json-ben megfogalmazott rövidítésekkel adhatsz meg!
Képeket beilleszteni a markdown-ba jelenleg csak külső linkről lehet.

# Példák

Mielőtt bármivel is próbálkozol, érdemes megnézni a 2 example fájlt. Ha megnézted, utána már szerintem teljesen egyértelmű lesz mit kell csinálnod :)
