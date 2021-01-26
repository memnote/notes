---
title: Reláció algebra
subject: adatkezeles
description: "A reláció algebra alap és származtatott műveletei példákkal."
date: 2020-12-18
---

## Előzetes olvasmány

- [Relációs adamodell](https://memnote.net/posts/2020-12-18-relacios-adatmodell)

# Alapműveletek

## Decart szorzat

2 vagy több reláció minden elemét (sorát) össszepárosítja egymással (mintha egymás mellé rakná őket), a végeredményben így az összes tábla (reláció) oszlopa szerepel(, ha ezt SQL-re vetítjük ki). Erről részletesebben a [Relációs adamodell](https://memnote.net/posts/2020-12-18-relacios-adatmodell) jegyzet elején olvashatsz. (Erősen ajánlott érteni a decart szorzatot mielőtt ebbe belekezdesz.)

## Unio

**Jele: U**

Veszünk 2 vagy több relációt, majd unio művelettel összekapcsolva őket, az eredmény relációban, mindegyik reláció elemei benne lesznek, de természetesen ismétlődés nélkül, hiszen még mindig halmazokról beszélünk. Ezt tovább gondolva, ez pont olyan mintha halmazok unióját vennénk. **Fontos, hogy az oszlopszámnak (vagyis a reláció aritásának) egyeznie kell, különben a művelet nem lehetséges**.

| A   | <u>személyi szám</u> | lakcím |
| --- | -------------------- | ------ |
|     | 123456               | xyz    |
|     | 456789               | abc    |

| B   | <u>személyi szám</u> | lakcím |
| --- | -------------------- | ------ |
|     | 987654               | tzu    |
|     | 654321               | qwe    |

| A **U** B | <u>személyi szám</u> | lakcím |
| --------- | -------------------- | ------ |
|           | 123456               | xyz    |
|           | 456789               | abc    |
|           | 987654               | tzu    |
|           | 654321               | qwe    |

## Különbség

**Jele: \\**

Teljesen ugyanaz az értelme, mint amit a halmazoknál is csinálunk. A\B = A minden eleme, ami B-ben nincs benne. **Fontos, hogy az oszlopszámnak (vagyis a reláció aritásának) egyeznie kell, különben a művelet nem lehetséges**.

| A   | <u>személyi szám</u> | lakcím |
| --- | -------------------- | ------ |
|     | 123456               | xyz    |
|     | 456789               | abc    |

| B   | <u>személyi szám</u> | lakcím |
| --- | -------------------- | ------ |
|     | 123456               | xyz    |
|     | 654321               | qwe    |
|     | 999999               | qwe    |

| A **\\** B | <u>személyi szám</u> | lakcím |
| ---------- | -------------------- | ------ |
|            | 456789               | abc    |

## Szelekció

**Jele: [σ](https://s3.amazonaws.com/static.graphemica.com/glyphs/i500s/000/011/055/original/03C3-500x500.png?1275329355) (sigma)**

Ez a művelet igazából egy szűrés, ahogy azt a neve is sugallja.
A sigma alsó indexében megadhatunk valamilyen logikai szűrést, és az eredményben, csak azok az elemek lesznek amikre a feltétel(ek) teljesül(nek). Használható logikai operátorok: **és, vagy, <, >, <=, >=, nem egyenlő, tagadás(nem/inverz)**

| A   | <u>személyi szám</u> | kor |
| --- | -------------------- | --- |
|     | 123456               | 16  |
|     | 456789               | 18  |

| σ<sub>kor >= 18</sub>A | <u>személyi szám</u> | kor |
| ---------------------- | -------------------- | --- |
|                        | 456789               | 18  |

## Projekció (vagy vetítés)

**Jele: [π](<https://hu.wikipedia.org/wiki/Pi_(film)#/media/F%C3%A1jl:Pi-symbol.svg>) (pi)**

Lényege, hogy sokszor a relációból csak bizonyos oszlopokat szeretnénk. Mondjuk egy 1000 oszlopos relációból csak 3-at. Ekkor π (pi) majd alsó indexben a kívánt oszlopok nevei, ezután a reláció amiből ki szeretnénk válogatni őket.

| A   | <u>személyi szám</u> | kor |
| --- | -------------------- | --- |
|     | 123456               | 16  |
|     | 456789               | 18  |

| π<sub>kor</sub>A | kor |
| ---------------- | --- |
|                  | 16  |
|                  | 18  |

# Származtatott műveletek

Ezek olyan műveletek, amik a fenti alapműveletekből állnak össze, csak éppen kaptak egy egyszerűbb jelölést/megfogalmazást, ahelyett, hogy ki kéne írnunk az alapműveletek teljes kombinációját.

## Természetes illesztés

**Jele: ⋈ (theta)**

Azonos nevű oszlopok alapján illeszti egymáshoz a 2 relációt (az összes azonos nevű mentén!) Ez valamiféle metszet, ahol csak azok a sorok szerepelnek, amiknél minden relációban az azonos nevű oszlopoknál egyező érték van. Pl.: a ⋈ b

| video | <u>video_id</u> | cím            |
| ----- | --------------- | -------------- |
|       | 1               | Legjobb film 1 |
|       | 2               | Legjobb film 2 |

| vásárló | <u>személyi szám</u> | video_id |
| ------- | -------------------- | -------- |
|         | 123456               | 1        |
|         | 654321               | null     |

Keressük azt a vásárlót aki már kölcsönzött ki videót. A vásárlót mostantól **v**-vel a videót pedig **v2**-vel jelöljük.

| v⋈v2 | személyi szám | v.video_id | v2.video_id | cím            |
| ---- | ------------- | ---------- | ----------- | -------------- |
|      | 123456        | 1          | 1           | Legjobb film 1 |

Alapműveletekkel felírva ez a természetes illesztés így nézne ki:

**σ<sub>v.video_id = v2.video_id</sub>(v x v2)**

Itt az **x** a decart szorzatot jelöli.

## Theta join

**Jele ⋈~ (theta)**

A **~** heylére megy egy feltétel, mint a szelekciónál, egyébként ugyanúgy kell írni mint a természetes illesztést.

| ember | kor | <u>név</u> |
| ----- | --- | ---------- |
|       | 16  | Béla       |
|       | 18  | Józsi      |

| video | <u>cím</u>     | korhatár |
| ----- | -------------- | -------- |
|       | Legjobb film 1 | 18       |
|       | Legjobb film 2 | 12       |

Azt keressük, hogy melyik ember, melyik filmet nézheti meg a kora alapján. Az ember relációt ezentúl **e**-nek, a video relációt pedig **v**-nek hívjuk.

Ezt így írhatjuk fel: **e ⋈<sub>e.kor >= v.korhatár</sub> v**

Az **e** és a **v** relációt összekapcsoljuk a megadott feltétel mentén. Ez a felírás kifejtve alapműveletekre a következő képpen néz ki:

**σ<sub>e.kor >= v.korhatár</sub>(e x v)**

Itt az **x** a decart szorzatot jelöli.

| e ⋈<sub>e.kor >= v.korhatár</sub> v | név   | kor | cím            | korhatár |
| ----------------------------------- | ----- | --- | -------------- | -------- |
|                                     | Józsi | 18  | Legjobb film 1 | 18       |
|                                     | Józsi | 18  | Legjobb film 2 | 12       |
|                                     | Béla  | 16  | Legjobb film 2 | 12       |

Látjuk, hogy Józsi mindkét filmet megnézheti mivel elég idős, Béla azonban a 18-as korhatárú filmet nem nézheti meg. Érdemes ezt a feladatot decart szorzatként felírni először, aztán szelekcióval kiválogatni melyik sorok a jók (spoiler, ezek amik itt vannak fent, de gyakorlásnak jó lesz).
