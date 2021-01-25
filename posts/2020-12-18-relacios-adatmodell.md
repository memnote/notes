---
title: Relációs adatmodell
subject: adatkezeles
description: "A relációs adatmodell ismertetése és ER modellek leképezése relációs sémákra."
date: 2020-12-18
---

## Előzetes olvasmány

- [Nézz utána, hogy mik azok a halmazok és halmazműveletek](https://hu.wikipedia.org/wiki/Halmaz)
- [ER-EER modellezés](https://memnote.net/posts/2020-12-18-er-eer-modellezes) (az ER nem adatmodell!)

## Bevezető - Decart szorzat

**Decart szorzat (x)**: Az így összeszorzott halmazok minden elemét összepárosítja minden lehetséges kombinációban. (SQL táblákra vetítve, minden tábla összes sorát összekombinálja. Az eredményben benne lesz minden tábla oszlopa, és a soraik minden lehetséges módon összekombinálva)

Vegyük az alábbi halmazokat:

A = {1, 2}

B = {x, y}

C = {a, b, c}

A decart szorzatuk eredménye pedig:

**AxBxC** = {(1,x,a), (1,x,b), (1,x,c), (1,y,a), (1,y,b), (1,y,c), (2,x,a), (2,x,b), (2,x,c), (2,y,a), (2,y,b), (2,y,c)}

Jegyezzük meg ezt az eredményt, hamarosan fel fogjuk használni.

# Alapfogalmak, példa reláció

**Reláció**: Halmazok _decart_ szorzatának részhalmaza.

**Adatmodell**: Olyan modell, ami műveleteket és jelölésrendszert biztosít.

### Példa

Vegyük az elező példa eredményét, vagyis inkább annak azt a részhalmazát, ami az **(1,y,a)** és **(2,y,b)** elemekből áll. Nevezzük ezt a részhalmazt **r**-nek.

Tehát **r** részhalmaza **AxBxC**-nek. Az ebből alakuló relációt pedig a következőképpen jelöljük:

| r   | <u>személyi szám</u> | lakcím | név |
| :-- | :------------------: | :----: | :-: |
|     |          1           |   y    |  a  |
|     |          2           |   y    |  b  |

Az oszlopokat igazából tetszés szerint neveztem el, sokat nem számít még itt. A személyi szám lesz az elsődleges kulcs. Ezt itt is aláhúzással jelöljük, mint az [ER modellnél](https://memnote.net/posts/2020-12-18-er-eer-modellezes).

**Fontos**, hogy itt **az oszlop neveket**, már nem attribútum típusnak nevezzük (mint régen az [ER modellnél](https://memnote.net/posts/2020-12-18-er-eer-modellezes)), hanem simán **attribútumnak**!

**Reláció aritása**: oszlopok száma (példában 3)

**Reláció kardinalitása**: elemek/sorok száma (példában 2)

**Attribútum kardinalitás**: az adott oszlopban megjelenő _különböző_ értékek száma (példában 2, 1, 2) (még mindig halmazokról beszélünk, ezért ne számoljunk duplán ugyan olyan értékeket!)

**Relációs séma**: reláció attribútumainak halmaza

- R(r) => az **R** relációs séma illeszkedik az **r** relációra. Példában: **R(név, <u>személyi szám</u>, kor)**

# ER leképezése relációs sémákra

### Több-több kapcsolattípus

![több-több kapcsolattípus ábra](https://i.ibb.co/VBtVDBd/tobb-tobb.jpg)

A(<u>a</u>, c)

B(<u>b</u>, d)

K(<u data-double-underline>a</u>, <u data-double-underline>b</u>)

**összetett elsődleges kulcs: (a, b)**

Az elsődleges kulcsot az **a** és **b** attribútumok alkotják közösen. Tehát nem lehet két olyan egyed amiknek az **a** és **b** attribútmaik megyegyeznek (vagyis a1 = a2 és b1 = b2, ezt nem szabad, és nem is lehet)

Ebben az esetben a **K** kapcsolattípust is le kellett képeznünk relációs sémára. Azért vannak az attribútumai **duplán aláhúzva**, mivel ezek **idegen kulcsok**.

**Idegen kulcs**: a reláció olyan attribútuma, amit egy másik relációból vesz át.

### Több-egy kapcsolattípus

![több-egy kapcsolattípus ábra](https://i.ibb.co/hcgx7RD/tobb-egy.jpg)

A(<u>a</u>, c, <u data-double-underline>b</u>)

B(<u>b</u>, d)

Ezzel elérjük, hogy minden **a**-hoz csak 1 **b**-t tudunk hozzárendelni, viszont 1 **b**-t több **a**-hoz is hozzá lehet rendelni.

Például

- a1, b1
- a2, b2
- a3, b1

Mindegyik **a**-hoz csak 1 **b** van, de a **b1**-et több **a**-hoz hozzá tudtuk rendelni.

### Egy-egy kapcsolattípus

![egy-egy kapcsolattípus ábra](https://i.ibb.co/FHmbhxQ/egy-egy.jpg)

A(<u>a</u>, c, <u data-double-underline>b</u>) elsődleges kulcsok: a, b

B(<u>b</u>, d)

Itt nagyon fontos, hogy az **A** relációnál, a **b** attribútum nem csak idegen kulcs, hanem elsődleges kulcs is, mivel ez biztosítja, hogy minden értékre egyedi legyen, így a több-egy-el ellentétben itt már tényleg csak egy-egy összerendelést tudunk alkalmazni. Azt is kiemelném, hogy ez 2 külön kulcs, és nem összetett kulcs.

### Ternális kapcsolattípus

Teljesen ugyanaz a leképzése mint a több-több kapcsolatnak, azzal a különbséggel, hogy itt a **K**-ba belekerül minden egyedhalmaz elsődleges kulcsa mint idegen kulcs, és ezek fognak egy darab összetett elsődleges kulcsot alkotni. (Lényeg, itt nem csak 2 egyedhalmaz kulcsát rakjuk a K-ba, hanem az összesét, amit a K összekapcsol)

### Gyenge egyedhalmaz

![gyenge egyedhalmaz ábra](https://i.ibb.co/VQqmf7J/gyenge-egyedhalmaz.jpg)

H(<u>c</u>, e)

S(sz, t, <u data-double-underline>c</u>) elsődleges összetett kulcs: (sz, c)

Mivel a gyenge egyedhalmaz (S) nem azonosítható egyértelműen a **H** nélkül, ezért **S**-be be kell kerüljön **H** kulcsa mint idegen kulcs. Így tehát (sz, c) lesz az összetett kulcsa **S**-nek.

Ez az összetett kulcs ilyen formában biztosítja, hogy egy hotelhez bármennyi szobát rendelhetünk (de kétszer ugyanazt nem), és egy szobához szintén bármennyi hotelt rendelhetünk (de kétszer ugyanazt nem).

### Specializálás (isa)

![](https://i.ibb.co/YfKjvMY/er-isa.jpg)

**Bal oldal**

- J(<u>r</u>, t)
- B(w, <u data-double-underline>r</u>) az **r** egyben elsődleges kulcs is
- Itt igazából minden B hivatkozik ponsotsan 1 db A-ra, valamint bekerülnek még a saját attribútumai is.

**Jobb oldal**

- A(<u>a</u>, c)
- B(<u data-double-underline>a</u>, <u data-double-underline>a'</u>) elsődleges kulcs: **a**
- Itt az **a'** jelzi a kapcsolatot
