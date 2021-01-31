---
title: SQL kényszerek
subject: adatkezeles
description: "SQL kényszerek (constraints) leírása, gyakorlati példán való bemutatása."
date: 2020-12-19
---

# Kényszerek (constraints)

Az adatok tartalmára vonatkozó üzleti szabályok. A táblák ezeket nem szeghetik meg. Meggátolnak abban, hogy téves adatokat vigyünk be vagy éppen töröljünk ki. Megadhatjuk őket a tábla létrehozásánál vagy utólag is.

Vannak **oszlop és** vannak **táblaszintű kényszerek**. A kettő között a különbség csak annyi, hogy máshova írjuk őket, valamint csak a táblaszintűnek adhatunk mi magunk nevet. Az oszlopszintűnek automatikusan generálva lesz valamilyen név, amit valószínűleg nem fogunk később érteni, ezért használata csak egyszerűbb esetekben érdemes (pl.: NOT NULL).

## NOT NULL

- Nem lehet NULL az adott oszlop értéke sor beszúrásánál, és úgy egyébként soha. Nem feltétlen szokás táblaszintű kényszerként definiálni, elég az oszlopszintű általában, mivel nem szokott külön elnevezést igényelni.
- Bármennyi oszlop rendelkezhet ezzel a kényszerrel.

```sql
-- létrehozásnál
CREATE TABLE vasarlo (
    nev: VARCHAR(50) NOT NULL
);

-- utólag
ALTER TABLE vasarlo MODIFY nev VARCHAR(50) CONSTRAINT nev_nn NOT NULL;
```

## UNIQUE

- Ez a kényszer biztosítja, hogy az oszlopban minden érték különböző (egyedi) legyen.
- Bármennyi oszlop rendelkezhet ezzel a kényszerrel.
- Alapvetően lehet NULL, ha ezt nem akarjuk, akkor használjuk mellé a NOT NULL kényszert is.

```sql
-- létrehozásnál
CREATE TABLE vasarlo (
    nev: VARCHAR(50) UNIQUE
);

CREATE TABLE vasarlo (
    nev: VARCHAR(50),
    CONSTRAINT uq_nev UNIQUE(nev)
);

-- utólag
ALTER TABLE vasarlo ADD CONSTRAINT uq_nev UNIQUE;
```

## PRIMARY KEY

- Elsődleges kulcs, egy egyedi azonosító minden sornak a táblában.
- Ez nem lehet NULL.
- Egy táblában csak egy oszlop lehet PRIMARY KEY.

```sql
-- létrehozásnál
CREATE TABLE vasarlo (
    email: VARCHAR(50) PRIMARY KEY
);

CREATE TABLE vasarlo (
    email: VARCHAR(50),
    CONSTRAINT pk_email PRIMARY KEY(email)
);

-- utólag
ALTER TABLE vasarlo ADD CONSTRAINT pk_email PRIMARY KEY(email);
```

## CHECK

- Ellenőriz valamit egy oszlopnál. Pl.: CHECK(kor > 18). Ha a feltétel nem teljesül akkor hibát fogunk kapni.
- Bármennyi oszlop rendelkezhet ezzel a kényszerrel.

```sql
-- létrehozásnál
CREATE TABLE vasarlo (
    kor: NUMBER CHECK(kor >=18)
);

CREATE TABLE vasarlo (
    kor: NUMBER,
    CONSTRAINT ck_kor_adult CHECK(kor >=18)
);

-- utólag
ALTER TABLE vasarlo ADD CONSTRAINT ck_kor_adult CHECK(kor >= 18);
```

## FOREIGN KEY

- Idegen kulcs, egy másik tábla elsődleges kulcsára (primary key-re) hivatkozik.
- Ebből is látszik, hogy valamilyen kapcsolatot definiál.
- Lehet NULL, ha ezt külön nem tiltjuk meg.
- Garantálja, hogy nem mutat nem létező értékre.
- Hivatkozhat önmagára is.
- Bármennyi oszlop rendelkezhet ezzel a kényszerrel.

```sql
-- létrehozásnál
CREATE TABLE rendeles (
    azonosito: NUMBER,
    megrendelo VARCHAR2(200) NOT NULL,
    CONSTRAINT pk_azonosito PRIMARY KEY(azonosito),
    CONSTRAINT fk_megrendelo_email FOREIGN KEY(megrendelo) REFERENCES vasarlo(email) ON DELETE CASCADE
);

--  utólag
ALTER TABLE rendeles ADD CONSTRAINT fk_megrendelo_email FOREIGN KEY(megrendelo) REFERENCES vasarlo(email);
```

Itt a rendelés tábla megrendelő oszlopa a vásárló tábla elsődleges kulcsára (email) mutat. Lényegében minden rendeléshez hozzárendelünk egy vásárlót (ebben a NOT NULL-nak is szerepe van). Ez ha belegondolunk így logikus. Az ON DELETE CASCADE annyit jelent, hogy, ha az adott vásárlót töröljük, akkor a hozzá tartozó rendelések is törlődnek. E helyett használhatnánk ON DELETE SET NULL-t is, de esetünkben ez nem túl logikus. Ez annyit csinálna, hogy ha töröljük a vásárlót, akkor a hozzá kapcsolódó rendelések megrendelő mezőjét NULL-ra állítjuk. Természetesen az idegen kulcsot nagyon jól fel tudjuk használni lekérdezéseknél, mikor táblákat összekapcsolunk (join), hogy kinyerjünk olyan információkat, mint például, hogy melyik vásárlóhóz melyik rendelések tartoznak és mennyi.

# Kényszerek törlése, engedélyezése, tiltása

```sql
-- Törlés
ALTER TABLE tablaneve DROP CONSTRAINT kenyszerneve;

-- Engedélyezés
ALTER TABLE tablaneve ENABLE CONSTRAINT kenyszerneve;

-- Tiltás
ALTER TABLE tablaneve DISABLE CONSTRAINT kenyszerneve;
```

# Zárás

A példa kódok oracle adatbázishoz vannak írva, más adatbáziskezelőben eltérhetnek, de nagyjából hasonlóak.
