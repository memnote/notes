---
title: Hálózatok alapjai
subject: hau
description: "Internet és jellemzői, protokoll alapjai. Hálózat szerkezete és felépítése. Ármkör- és csomagkapcsolás. Csomagvesztés, késleltetés, átbocsájtó képesség."
date: 2020-05-22
---

# Mi az internet?

Összekapcsolt intelligens eszközök milliói, vagyis **hosztok** (végponti rendszerek), amik hálózati alkalmazásokat futtatnak.

Az interneten belüli összeköttetések (adatkapcsolatok, linkek), **fényvezető/réz kábellel vagy rádiós/műholdas** technológiákkal vannak megoldva.

Adatátviteli sebesség elterjedt neve a **sávszélesség**.

**Hoszt** lehet például számítógép, mobil, IoT eszközök. (De akár egy okos hűtő is, és bármi ami kapcsolódni tud az internethez)

Az internet továbbá egy **kommunikációs infrastruktúra**, ami lehetővé teszi elosztott alkalmazások futtatását (pl.: web, email, játékok, fájlmegosztás). Ezt, **forrás** (kiinduló eszköz) és **nyelő** (cél eszköz) közötti adatszállítás biztosításával oldja meg.

## Internet jellemzői

- **lazán hierarchikus** (pl.: WAN -> MAN -> LAN)
- **Protokollokat használ** az üzenetek küldéséhez és fogadásához. (pl.: TCP, UDP)
- **Szabványokban van megfogalmazva** (RFC: Request for comments, IETF)

## Mi az a protokoll?

Interneten használt üzenet küldési és fogadási forma. Hasonlít az emberi kommunikációra, csak sokkal specifikusabb, mivel gépekről beszélünk. Menete:

- **kapcsolatfelvétel** (nem minden protokollnál)
- **információcsere**
- **Elköszönés** (nem minden protokollnál)

Fontos az üzenetek **sorrendje**, **formátuma**, és az, hogy miképp fogunk **reagálni** egy üzenetre.

# Kliens, szerver architektúra

Ugye vannak a hosztok, amik futtatnak hálózati alkalmazásokat. Ezek a hosztok betölthetik a kliens és a szerver szerepét is.

- **kliens**, ha adatot igényel (pl.: böngésző, bármilyen multiplayer játék)
- **szerver**, ha adatot szolgáltat (pl.: webszerver, vagy bármilyen játék multiplayer szervere)

**Peer to peer** esetről beszélünk, ha a hoszt mindkettő szerepet betöltheti. Ilyen a torrent, a skype, De sok játék is van ahol nincs szerver, hanem a hoszt játékosra kapcsolódnak a többiek. Így ő kliens is és szerver is, mert adatot kap, és küld a rákapcsolódott többi játékosnak.

# Hálózat szerkezete, felépítése

- A hálózat **szélén/peremén (edge)** találhatóak a hosztok/alkalmazások.
- Az összeköttetést végző fizikai közeg (linkek) (vezetékes, vezeték nélküli) neve a **hozzáférési hálózat (access).**
- **Hálózat magjának (core)** nevezzük a hálózatba kötött útvonalválasztókat (routereket).

**Hozzáférési hálózatba** tartoznak:

- hálózati eszközök (pl.: switch, esetleg egy torony ami internetet szór, ap-k)
- A hosztoknak azon elemei (alkatrészei inkább) amiknek hálózati funkciója van. (pl.: hálókártya, amibe az otthoni routerből bedugod a kis netkábeled.)
- Ezek össze vannak kapcsolva egymással és a hálózat magjával.

Hálózathoz csatlakozni lehet DSL-el, kábellel (Coax), optikai kábellel, vagy ethernettel. Esetleg vezeték nélkül. DSL és optikai kábel, dedikált és aszimmetrikus. Kábel lehet osztott is. Az ethernet csatlakozást vállalati környezetben használják, ez osztott és szimmetrikus.

- **dedikált**: Csak neked biztosított sávszélesség.
- **osztott**: Többen osztoznak a sávszélességen, megosztják a költségeket is.
- **szimmetrikus**: A le és feltöltési sebesség megegyezik
- **aszimmetrikus**: A le és feltöltési sebesség nem egyezik meg. Általában magasabb le és alacsony feltöltési sebesség.

Vezeték nélküli csatlakozás, **bázisállomások** és **hozzáférési pontok (access point)** segítségévellehetséges. Ezek osztott vezeték nélküli/rádiós hálózatok.

Vezeték nélküli csatlakozás fajtái például a Wireless LAN (legelterjedtebb a **WiFi**) és a nagytávolságú rádiós link, amit általában mobilszolgáltató biztosít. Ilyen a **3G, 4G, 5G**.

**A hálózat magja (core)** sok-sok összekapcsolt útvonalválasztóból (router) áll. Itt az adatot kétféleképpen lehet továbbítani: <u>**Áramkörkapcsolással**</u> és <u>**Csomagkapcsolással**</u>.

# Áramkörkapcsolás

Lényege, hogy **dedikált** sávszélességet kapnak a felhasználók. Ez a sávszélesség garantált. Ez a sávszélesség csak azé az egyetlen felhasználóé, ha nem használja, akkor is csak az övé, más nem használhatja (szóval nem osztott). Hívásfelépítés és lebontás szükséges hozzá.

Ezt a dedikált sávszélesség felosztást leginkább kétféleképpen tehetjük meg:

- **Frekvenciaosztás** (FDM)
  - Legyen 1 Gbps-os hálózatunk. Legyen 10 felhasználónk.Mindenki 100 Mbps-t kap. Csak ennyit kapnak akkor is, ha csak egy ember használja éppen a hálózatot, de ez az idő bármelyik pillanatában garantálva van nekik. Így működik például a rádió.
- **Időosztás** (TDM)
  - Legyen 1 Gbps-os hálózatunk. Legyen 10 felhasználónk. Ebben az esetben egy felhasználó a teljes sávszélességet tudja használni, viszont csak adott ideig. Bizonyos időközönként mindig másik felhasználó kap jogot.

# Csomagkapcsolás

Minden adatfolyam csomagokra van bontva. (pl.: Ha elakarunk küldeni valakinek egy 50 gigás filmet, azt egyszerre elég nehéz lenne, na de ha 1 MB-os csomagokra van bontva máris könnyebb nem?)

Ha van 1 Gbps sávszélességünk, akkor minden felhasználó **osztozik** ezen az erőforráson. Ha van 10 felhasználó, de csak 1 használja a hálózatot, nos akkor, övé az egész sávszélesség. Ha már 4-en használják, akkor elkezdenek osztozni (nem feltétlen igazságosan). Tehát az erőforrás **igény szerint** lesz felhasználva.

Ha túl sok csomag van, és nem bírja a link (kicsi a sávszélesség a csomagokhoz képest) akkor torlódás alakul ki. A csomagok sorban fognak állni.

**Tárol és továbbít elv**: egy csomópont megkapja az egész/teljes csomagot mielőtt elkezdi továbbítani. Hogyan kivitelezzük ezt? **Statisztikus multiplexálás** Csomagok sorrendje nem fix, ahogy a méretük sem valószínű, hogy fix. Az adatfolyamok igény szerint osztoznak a sávszélességen.

![statisztikus multiplexálás](https://i.ibb.co/2tL48J5/statisztikus-multiplexalas.png)

Egyszerű működés, nincs hívásfelépítés. Nagy torlódás esetén késleltetés vagy akár csomagvesztés léphet fel. Erre megoldást majd a protokollok fognak jelenteni. Az audio és video szolgáltatásoknak garantált sávszélességet kell biztosítani. Fejlécek szükségesek.

# Csomag vagy áramkörkapcsolás?

Melyik a jobb? Röviden: igényektől függ.

Ha stabil, fix sávszélességet szeretnénk mindig biztosítani a felhasználóknak ami csak nekik van fenntartva mindig, akkor áramkörkapcsolás (rádió).

Ha viszont a lehető legtöbb felhasználót szeretnénk egyidejűleg kiszolgálni, úgy hogy maximalizáljuk a sávszélesség kihasználását, akkor csomagkapcsolás. (Kb. minden otthoni és általános hálózat)

# Csomagvesztés

A csomagok sorban állnak az útvonalválasztók átmentei tárolóiban (puffer/buffer).

- ha több csomag érkezik, és túl nagyok, akkor a kimeneti link sávszélessége nem biztos, hogy bírni fogja. Ekkora elkezdődik a sorban állás és a várakozás.
- Ezeknek a pufferek mérete véges. Ha megtelnek és új csomag érkezik, ott csomagvesztés lép fel. Lehet, hogy ez újraküldésre kerül, de nem biztos.
- Bithibák miatt is elveszhetnek csomagok.

![csomagvesztes](https://i.ibb.co/XJZfvj1/csomagvesztes.png)

# Késleltetés

### Fajtái:

- csomóponti feldolgozás (bithibák ellenőrzése, kimenő link meghatározása (útvonalválasztás))
- sorbanállás (átvitelre várakozás a kimenő linknél, függ a torlódás mértékétől)
  - csomagméret \* átlagos csomagérkezési intenzitás (1/sec) / sávszélesség
  - Ha az eredmény 0 körüli, akkor a késleltetés kicsi, ha 1-hez tart, akkor növekszik, ha nagyobb mint 1 akkor végtelen nagy lesz, mert több csomag érkezik mint amit
    kezelni lehet.
- átviteli késleltetés (= csomagméret/link sávszél, A csomag bitjeinek linkre kiküldéséhez szükséges idő)
- jelterjedési késleltetés
  - d = fizika link hossza (méter)
  - s = a jel terjedési sebessége a közegben (~2x108 m/sec)
  - tehát: d/s
  - Néhány mili/mikro szekundum.

![kesleltetes](https://i.ibb.co/vsQjT5j/kesleltetes.png)
![kesleltetes pelda](https://i.ibb.co/XyHm1Nc/kesleltetes-pelda.png)

Valóságban ezt a késleltetést például a traceroute programmal lehet mérni. Minden routerhez az úton küldünk egy csomagot, és mindegyik visszaküldi azt. Így minden routerhez társíthatunk egy időt, ami megmutatja mennyi idő szükséges, ahhoz, hogy a csomag oda és visszaérjen. Ezt RTT-nek vagyis körülfordulási időnek (round trip time) nevezzük.

# Átbocsátóképesség

Röviden: sávszélesség. bit/sec. Inkább Rátának nevezik.

Tényleges bittovábbítás sebesség forrás (küldő) és nyelő (cél) között.

- **Pillanatnyi**: egy adott helyen és időpontban
- **Átlagos**: egy hosszabb időtartamra vonatkoztatva

![atbocsajtokepesseg pelda 1](https://i.ibb.co/Bzmh1dm/atbocsajtas-1.png)

Rs link átbocsájtó képessége a végpontok közötti átbocsájtó képesség, mivel az a kisebb. Hiába lenne utána nagyobb, ha addig csak lassan tud eljutni.

![atbocsajtokepesseg pelda 2](https://i.ibb.co/Ycxv9Kz/atbocsajtas-2.png)

Rc link átbocsájtó képessége a végpontok közötti átbocsájtó képesség. Hiába nagy Rs, attól még Rc kicsi, így ugyanúgy többet kell várni.

Azt a linket ami például a fenti példában korlátozta az átbocsátóképességet, szűk keresztmetszetű linknek nevezzük.

# Szolgáltatásminőség (QoS)

Ezzel, azt határozhatjuk meg, hogy az eddigi jellemzők (késleltetés, csomagvesztés, átbocsátás) minősége milyen legyen. Adatátvitelnél használjuk.

Ezeknek a követelményeknek a biztosítása nem kézenfekvő a csomagkapcsolásnál, mivel így borul a rendszer. Most akkor mi kapja az erőforrásokat? Ismét van olyan csomag ami fontosabb mint a másik? (prioritás)

Viszont ha belegondolunk, szükség van erre. Elég kellemetlen ha mondjuk egy videóhívás nem folyamatos, és mondjuk egy csomót késik a hang és a kép.
