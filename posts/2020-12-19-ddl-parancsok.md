---
title: DDL parancsok
subject: adatkezeles
description: "Fontosabb adattípusok. Adatmodell kialakítása, táblák létrehozása, módosítása, törlése. Attribútumok átnevezése módosítása."
date: 2020-12-19
---

## Előzetes olvasmány

- [SQL bevezető](https://memnote.net/posts/2020-12-19-sql-bevezetes)
- [SQL kényszerek](https://memnote.net/posts/2020-12-19-sql-kenyszerek)

# Adatmodell kialakítására szolgáló (DDL) parancsok

DDL: Data Definition Language

Ezt használjuk az adatmodell kialakításásra, vagyis táblák létrehozására, törlésére, módosítására, átnevezésére vagy akár a táblák attribútumainak nevének/típusának megváltoztatására. Ide tartozik még a kényszerek megadása a táblákhoz. Ilyen kényszer például a már jól ismert **elsődleges kulcs** is. (A tábla itt nagyjából a relációnak felel meg, az attribútum pedig ugye az oszlopok nevei egyszerűen szólva. Ezekre példát, a [relációs adatmodell](https://memnote.net/posts/2020-12-18-relacios-adatmodell) jegyzetben találhatsz)

# Fontosabb adattípusok

| típus        | leírás                                                                                                                                                                                                                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHAR(n)      | Fix méretű karakterlánc (string). A méretét bájtokban adhatjuk meg az **n** helyén. 1 bájt általában egyenlő 1 karakterrel. Ha olyan szöveget adunk meg ami nincs ilyen hosszú, akkor az automatikusan szóközökkel lesz kiegészítve.                                                                                  |
| VARCHAR2(n)  | Változú hosszúságú karakterlánc. Itt nem lesz megtoldva a rövidebb szöveg extra szóközökkel, így helyet spórolhatunk.                                                                                                                                                                                                 |
| CLOB         | Nagyméretű szövegek tárolására alkalmas. Nem kell méretet megadni neki.                                                                                                                                                                                                                                               |
| NUMBER(p, s) | Számok tárolására alkalmas. A **p**-vel megadhatjuk, hogy az egész rész (tehát a tizedes vessző előtti rész) hány számjegy lehet, az **s**-el pedig azt, hogy a tizedes vessző utáni rész hány számjegy lehet. Ettől függetlenül egyiket se muszáj megadni, ekkor csak egy sima szám adattípus mint mondjuk a double. |
| DATE         | Ezzel az adattípussal tároljuk a dátumokat.                                                                                                                                                                                                                                                                           |

**Ezek az adattípusok az oracle adatbázishoz vannak. Más adatbázisoknál a nevek akár erősen eltérőek is lehetnek.**

# Tábla létrehozása

### Könnyű példa

```sql
CREATE TABLE vasarlo (
    nev VARCHAR2(200),
    email: VARCHAR2(200),
    kor: NUMBER,
    regisztralt: DATE
);
```

Létrehozzuk a táblát az alábbi oszlopokkal: **nev, email, kor, regisztralt**. A név és az email egy max 200 karakteres szöveg, a kor pedig egy szám. A regisztralt pedig egy dátum ami azt jelzi mikor regisztrált a vásárló.

### Közepes példa

```sql
CREATE TABLE vasarlo (
    nev VARCHAR2(200) NOT NULL,
    email: VARCHAR2(200),
    kor: NUMBER,
    regisztralt: DATE,
    CONSTRAINT pk_email PRIMARY KEY(email)
);
```

Itt annyi a változás, hogy a **nev** mostmár nem lehet NULL érték, vagyis a táblába való beillesztéskor mindenképpen meg kell adnunk a vásárló nevét. Ezen kívül a legalsó sorban láthatunk egy constraint-et vagy magyarul kényszert. Mindössze annyit ír le, hogy jöjjön létre egy _pk_email_ nevű kényszer, ami kimondja, hogy az _email_ oszlop legyen az elsődleges kulcs (primary key). A _nev_ melletti NOT NULL az egy oszlop szintű kényszer, az elsődleges kulcsot viszont már táblaszintű kényszerként állítottuk be. A kettő között a különbség, hogy máshova kell írni őket, ahogy az látszik is. A kényszert csak táblaszintű kényszer esetén tudjuk elnevezni. Ha nem akartam volna elnevezni és kihangsúlyozni, akkor az email mellé odaírhattam volna simán, hogy PRIMARY KEY. Egy oszlopra bármennyi kényszert megadhatunk.

### Nehezebb példa

```sql
CREATE TABLE vasarlo (
    nev VARCHAR2(200) NOT NULL,
    email: VARCHAR2(200),
    kor: NUMBER,
    regisztralt: DATE,
    CONSTRAINT pk_email PRIMARY KEY(email)
);

CREATE TABLE rendeles (
    azonosito: NUMBER,
    megrendelo VARCHAR2(200) NOT NULL,
    termek: VARCHAR2(200) NOT NULL,
    mennyiseg: NUMBER DEFAULT = 1,
    mikor: DATE,
    CONSTRAINT pk_azonosito PRIMARY KEY(azonosito),
    CONSTRAINT fk_megrendelo_email FOREIGN KEY(megrendelo) REFERENCES vasarlo(email) ON DELETE CASCADE
);
```

Az új táblán sok újdonság ugyan nincs, viszont vegyük észre, hogy ott egy FOREIGN KEY vagyis idegen kulcs kényszer. A _rendeles_ tábla _megrendelo_ oszlopa minden rendelésnél egy létező(!) vásárló email címére fog mutatni. Ez majd a lekérdezéseknél lesz nagyon hasznos, mikor arra leszünk kíváncsiak, hogy melyik vásárlóhoz milyen vagy mennyi rendelés tartozik. Az ON DELETE CASCADE, annyit jelent, hogyha töröljük a megrendeléshez kapcsolódó vásárlót, akkor az adott megrendelés is törlődik automatikusan. Ezt a viselkedést nem kötelező beállítani. Ezen kívül a mennyiségnek van egy alapértelmezett értéke, méghozzá 1. Ennek a lényege, hogyha nem adnánk meg mennyit rendel a vásárló, akkor az alapértelmezetten 1 lesz.

Lehetne ezt még tovább bonyolítani, de igazából csak a kényszerek azok amik bonyolítják a táblák létrehozását. Azt azért jegyezzük meg, hogy amíg az elsődleges kulcs (primary key) nem lehet NULL, addig az idegen kulcs (foreign key) lehet, ha ezt nem tiltjuk meg külön!

# Tábla törlése

```sql
DROP TABLE tablaneve;
```

Ekkor a tábla és minden hozzákapcsolódó kényszer és index is törlődik. Ezt visszavonni nem lehet ha a PURGE kulcsszó is szerepel az utasítás végén, hiszen ekkor nem kerül a tábla lomtárba, hanem rögtön felszabadul a hely, amit foglalt.

# Tábla módosítása

Új oszlop hozzáadása:

```sql
ALTER TABLE tablaneve ADD ujoszlopneve ujoszloptipusa;
ALTER TABLE vasarlo ADD jelszo VARCHAR2(100);
```

Oszlop törlése:

```sql
ALTER TABLE tablaneve DROP oszlopneve;
ALTER TABLE vasarlo DROP kor;
```

Oszlop átnevezése:

```sql
ALTER TABLE tablaneve RENAME COLUMN regioszlopneve TO ujnev;
ALTER TABLE vasaro RENAME COLUMN nev TO felhasznalonev;
```

Meglévő oszlop típusának módosítása:

```sql
ALTER TABLE tablaneve MODIFY oszlopneve újtípus;
ALTER TABLE vasarlo MODIFY email VARCHAR2(100);
-- Ha a méret kisebb lesz, vagy a típus nem kombatipbilis
-- a régivel, akkor, ha már vannak adatok a táblában, ez hibát fog dobni.
```

# Tábla létrehozása másik táblából

Létrehozhatunk úgy is táblát, hogy mondjuk egy másik táblából vesszük át az adatokat, de csak bizonyos oszlopok kellenek és mondjuk csak valamilyen feltétel alapján vesszük át az értékeket.

Tehát ha van egy _vasarlo_ táblám _nev, email, kor_ oszlopokkal és létre akarok hozni egy _nagykoru_ táblát, amiben viszont a kor már nincs benne, hiszen már tudjuk, hogy 18 év felett vannak, akkor azt a következő képpen tehetem meg.

```sql
CREATE TABLE nagykoru AS
SELECT nev, email FROM vasarlo
WHERE kor >= 18;
```

Ebbe belekerült egy SELECT lekérdezés is, azonban egy meglehetősen egyszerű. Csak annyit csinál, hogy kiválasztja a _nev_ és _email_ oszlopokat a _vasarlo_ táblából, de csak azokat a sorokat tartjuk meg (where), ahol a a _kor_ nagyobb vagy egyenlő, mint 18.

A létrejövő táblánk neve tehát _nagykoru_ lesz, és 2 oszloppal fog rendelkezni: _nev_ és _email_. Ezen felül fel lesz töltve azonnal adattal a _vasarlo_ táblából (ezeket az adatokat kérdezzük le a SELECT-el)

# Zárás

Fontos kiemelni, hogy a típusok és a parancsok is csak az oracle adatbázisban működnek biztosan. Más adatbázis kezelőkben a szintaktika vagy a típusok nevei eltérhetnek. Például PostgreSQL-ben a VARCHAR2 csak simán VARCHAR, a CLOB pedig TEXT. Ettől függetlenül nem lehetetlen, hogy ezeket a típusokat is elfogadja, azért igyekeznek kombatibilisek lenni egymással. Nem lenne valami jó, ha minden adatbázis kezelőben minden típust máshogy neveznének. Ezek az alap parancsok egyébként nagyjából mindegyikben megegyeznek.
