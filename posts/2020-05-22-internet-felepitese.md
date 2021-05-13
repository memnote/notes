---
title: Internet felépítése
subject: hau
description: "Hálózatok fajtái, réteges felépítés, TCP/IP, hálózati kommunikáció, kliens <-> szerver."
date: 2020-05-22
---

## Lokális hálózatok (Local Area Network, LAN)

Egymáshoz fizikailag közel álló vagy logikailag összetartozó hosztok. Szomszédosnak látják egymást,
ezért nem kell útvonalválasztás a másik eléréséhez.

## Nagyvárosi hálózat (Metropolitan Area Network, MAN)

Célja a nem túl távoli LAN-ok összekötése, valamint az internethez való csatlakoztatása.
Itt már nagyobb kapacitású összekötő linkekről beszélhetünk. (Hossza is néhány 10 kilométer)
Megjelennek az útvonalválasztók (router) (pl.: Ha máshonnan jön egy csomag, akkor azt melyik LAN
felé továbbítsuk)

## Nagytávolságú hálózat (Wide Area Network, WAN)

Célja, hogy távoli hálózatokat kössön össze.
Nincsenek benne hosztok (lehetnek, de nem jellemző)
Nagy link kapacitás (hossza logikailag több 100 kilométer is lehet)
Nagysebességű routerek
IP és Ethernet technológia.

## Hálózatok hálózata

Az Internet struktúrája nagyjából hierarchikus.
A legnagyobb a **Tier 1** internet szolgáltató (ISP) hálózatai.
Országos vagy nemzetközi lefedés.
Egyenlőként kezelik egymást, közvetlenül kapcsolódnak
egymáshoz, több link is lehet közöttük (AT&T, Telekom)

A **Tier 2** ISP kisebb, általában regionális.
Közvetlenül Tier 1-hez kapcsolódnak (akár
többhöz is) és esetleg más Tier 2 ISP-hez.
Fizet a Tier 1-nek, hogy az internethez
kapcsolja.

A **Tier 3** és **Helyi ISP** az utolsó réteg. Ezek a Tier 2-höz kapcsolódnak, és a végfehlasználókat
kapcsolják az internethez (szóval, mondjuk minket)

![isp-k kapcsolata, isp-k közti adatáramlás](https://i.ibb.co/9gVHq4b/isp-tiers.png)

# Réteges felépítés

A **könnyű fejleszthetőség** és a **modularitás** érdekében **a hálózat működését rétegek** segítségével
**valósítják meg**. Ezeket a rétegeket kb. így érdemes elképzelni:

Ha van egy webáruház, ahonnan Bélának csomagot kéne küldeni, akkor a webáruház csak elküldi a
csomagot. Fogalma sincs róla, hogy hogy jut el a csomag Bélához, csak azt tudja, hogy el fog jutni. Így
ha eddig vonattal vitték a csomagot, majd ezt lecserélik autó általi szállításra, az a webáruházat nem
nagyon fogja befolyásolni. Neki lényegtelen, hogy jut el a csomag A-ból B-be, csak jusson el. Na
valahogy így megy ez a hálózatoknál is.

# Az internet protokoll szerkezete

A **TCP/IP protokoll** rétegei:

- **alkalmazási (application)** réteg
  - hálózati alkalmazásokat támogatja, FTP, SMTP, HTTP
- **szállítási (transport** ) réteg
  - adatátvitel processztől processzig, TCP, UDP
  - **processz** : hoszton futó program, vagy annak része
- **hálózati** réteg
  - adatok (csomagok) mozgatása forrás és nyelő között
  - útvonalválasztó protokollok, IP
- **adatkapcsolati (link)** réteg
  - adatok (csomagok) továbbítása szomszédos hálózatelemek között
  - Ethernet
- **fizikai (physical)** réteg
  - bitek továbbítása a kábelen

![tcp/ip példa](https://i.ibb.co/ZT86LZs/tcp-ip-pelda.png)

Ezen az ábrán jól látszik, hogyan jut el a forrástól a nyelőig az üzenet. A rétegek az adatot
becsomagolják a protokolljuknak megfelelően (esetleg fel is darabolják az adatot), majd lejjebb adják,
és minden réteg ugyanezt a folyamatot elvégzi. Ezeket a becsomagolt adatokat nevezzük a réteg **PDU** -
jának (Protocol Data Unit). Az úton haladva, amennyire kell az egyes eszközök kicsomagolják, majd
vissza és továbbítják újra az üzenetet. Amikor megérkezik az üzenet, akkor teljesen kicsomagoljuk, és
az esetlegesen feldarabolt adatot fejlécek segítségével újra összeillesztjük.

# Hálózati alkalmazás

Olyan program, ami hosztokon fut, és kommunikál a hálózaton keresztül. Pl. a webszerver
kommunikál a böngészővel.

Az, hogy az alkalmazásokat hosztokon futtatjuk, az alkalmazás gyors fejlesztését, és elterjesztését
teszi lehetővé.

A hálózat belsejében (core) nem futtatnak felhasználói célú alkalmazásokat.

# Kommunikáció

**Processz** : egy hoszton futó program, vagy annak része.

Azonos hoszton futó programok között **inter-process** kommunikáció lehetséges, amit az operációs
rendszer biztosít.

Különböző hosztokon lévő processzek üzeneteket küldve kommunikálnak.

- **Kliens processz**: komm. kezdeményező program
- **Szerver processz** : várja, hogy a kliensek kapcsolatba lépjenek vele.

A Peer to peer kliens és szerver szerepet is ellát.

A processzek **SOCKET** - ek segítségével kommunikálnak. A processz üzeneteket küld a hozzákapcsolt
socketnek, és üzeneteket fogad tőle. Innentől kezdve a **szállítási réteg** viszi át az egyik sockettől, a
másikig az adatot. Socketeket az operációs rendszer kezeli.

Ahhoz, hogy egy processznek üzenetet lehessen küldeni, egyértelműen azonosítani kell azt. Ehhez
szükség van a **hoszt címére (IP)** és a processzhez rendelt **portszámra**. Például a http processzeket
(webszerver) a 80-as port azonosítja.

# Protokollok általában

A protokoll a következőket határozza meg:

- üzenetek típusa (kérés, válasz)
- üzenetek formátuma (milyen mezők vannak, hogy vannak elrendezve pl.: célcím, forrás cím
  stb)
- üzenet szemantikája (mit jelentenek a mezőkben lévő információk)
- üzenetek/válaszok küldésének sorrendje, módja

Vannak **nyilvános** és **szabadalommal védett** protokollok. Előbbi például a http és SMTP. Utóbbira példa a Skype.

Célszerű nyilvános protokollokat használni ha lehet, mivel ezek elég szép kiforrottak már az évek alatt, és mindenki célja, hogy mindig hibátlanul működjenek. Így a hibás működés lehetősége kicsi, és ha mégis felmerülne bármilyen probléma, akkor az a lehető leggyorsabban meg lesz oldva.

# Szállítási szolgáltatások

Alkalmazásonként eltérő (QoS) igény léphet fel. Ezeknek vannak kategóriái:

- adatvesztés
  - Amíg a videochat és a stream elvisel némi adatvesztést, addig például a fájlátvitel nem.
- Késleltetés / időzítés
  - Ha streamelünk, vagy telefonálunk, ugyan nem baj ha vesztünk némi adatot, viszont az nagyon baj ha mondjuk másodperceket késik pl amit a másik fél mond
  - A fájlátvitelnél viszont nem baj, ha nem azonnal megy át egy fájl, a lényeg, hogy sértetlenül megérkezzen.
- Sávszélesség
  - Néhány alkalmazásnak szüksége van minimális sávszélességre, hogy rendesen működjön. (jellemzően multimédiás alkalmazásoknak)

| Alkalmazás                          | Adatvesztés     | Sávszélesség                           | Időzítésérzékeny    |
| ----------------------------------- | --------------- | -------------------------------------- | ------------------- |
| Fájlátvitel                         | veszteségmentes | rugalmas                               | nem                 |
| E-mail                              | veszteségmentes | rugalmas                               | nem                 |
| Webes dokumentumok                  | veszteségmentes | rugalmas (néhány kbps)                 | nem                 |
| Internet telefon / videokonferencia | veszteségtűrő   | hang kevés-1Mbps, video: 10kbps-10Mbps | igen, néhány 100 ms |
| Azonnali üzenetküldés               | veszteségmentes | rugalmas                               | igen is, nem is     |

# TCP vs UDP, alapvető alkalmazások

| TCP                                                                                      | UDP                                                                                                                     |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Kapcsolatorientált**: fel kell építeni az összeköttetést a kliens és a szerver között. | **Megbízhatatlan szállítás**: nem biztos, hogy minden és hogy helyes sorrendben érkezik meg                             |
| **Megbízható szállítás**: a küldőtől minden megérkezik sorrendezve a fogadóhoz           | Nem biztosít összeköttetés felépítést, forgalomszabályozást, torlódáskezelést, időzítést, vagy garantált sávszélességet |
| **Forgalomszabályozás**: a küldő nem terheli túl a fogadót                               |                                                                                                                         |
| **Torlódáskezelés**: a küldő lefojtása ha a hálózat túlterhelt                           |                                                                                                                         |
| Nem biztosít sem időzítést, sem minimális garantált sávszélességet                       |                                                                                                                         |

| Alkalmazás             | Alkalmazás rétegbeli protokoll | szállítási protokoll |
| ---------------------- | ------------------------------ | -------------------- |
| Email                  | SMTP                           | TCP                  |
| Web                    | HTTP                           | TCP                  |
| Fájlátvitel            | FTP                            | TCP                  |
| Multimédia (streaming) | HTTP, RTP                      | TCP vagy UDP         |
| Internetes telefonálás | SIP, RTP, egyedi (skype)       | Tipikusan UDP        |

TCP-nél minden adat pontosan megérkezik, nincs veszteség, ezért pl fájlátvitelre nagyon jó. UDP-t real time alkalmazásoknál szokták használni. Mivel nem épít kapcsolatot, és úgy egyébként semmivel sem foglalkozik azon túl hogy elküldi az adatot, nagyon gyors tud lenni.
