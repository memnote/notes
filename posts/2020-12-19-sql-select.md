---
title: Query language - SELECT
subject: adatkezeles
description: "Táblákból való lekérdezés művészete."
date: 2020-12-19
---

# Alapok (oracle)

## Fontosabb sztring műveletek

| függvény                      | eredmény |
| ----------------------------- | -------- |
| CONCAT('Buda', 'pest')        | Budapest |
| SUBSTR('San Francisco', 5, 7) | Francis  |
| LENGTH('SQL')                 | 3        |
| UPPER('Buda')                 | BUDA     |
| LOWER('Buda')                 | buda     |

## Fontosabb szám műveletek

| függvény                                            | eredmény |
| --------------------------------------------------- | -------- |
| POWER(10, 2)                                        | 100      |
| SQRT(16)                                            | 4        |
| ROUND(45.926, 2)                                    | 45.93    |
| TRUNC(45.926, 2) (csonkolás, nem lefele kerekítés!) | 45.92    |
| MOD(16, 3)                                          | 1        |
| CEIL(10.8232)                                       | 11       |
| FLOOR(10.8234)                                      | 10       |

## Fontosabb dátum műveletek

| függvény                        | leírás                                                 |
| ------------------------------- | ------------------------------------------------------ |
| MONTHS_BETWEEN(datum1,datum2)   | Visszaadja, hogy hány hónap van 2 dátum között.        |
| ADD_MONTHS(datum,hónapok_szama) | Dátumhoz hozzáad X hónapot és visszadja az új dátumot. |

# Lekérdezések - SELECT

## Mindenek előtt csináljunk 2 példa táblát.

**vasarlo tábla**

Elsődleges kulcs : v_id

| <u>v_id</u> | nev   | email     |
| ----------- | ----- | --------- |
| 1           | Béla  | bela@igen |
| 2           | Pista | pista@nem |
| 3           | Józsi | jozsi@nem |
| 4           | Elek  | elek@igen |

**rendeles tábla**

Elsődleges kulcs : r_id

| <u>r_id</u> | v_id | termek   | mennyiseg |
| ----------- | ---- | -------- | --------- |
| 1           | 2    | telefon  | 2         |
| 2           | 2    | tanyer   | 5         |
| 3           | 4    | porszivo | 1         |

A v_id ebben a táblában egy [idegen kulcs (foreign key)](https://memnote.net/posts/2020-12-19-sql-kenyszerek), ami a a vásárló tábla elsődleges kulcsára (szintén v_id) mutat.

## Egyszerű feladatok

### Kérdezzünk le minden oszlopot a vasarlo táblából, majd a rendeles táblából is.

```sql
SELECT * FROM vasarlo;
SELECT * FROM rendeles;
```

Ezek ugyanazokat a táblákat fogják adni, mint amik fent vannak, hiszen minden oszlopot lekérdeztünk mindegyikből.

### Kérdezzünk le csak a vásárlók nevét és email címét.

```sql
SELECT nev, email FROM vasarlo;
```

| nev   | email     |
| ----- | --------- |
| Béla  | bela@igen |
| Pista | pista@nem |
| Józsi | jozsi@nem |
| Elek  | elek@igen |

### Kérdezzük le azon vásárlók nevét és email címét, akiknek a neve Béla és az email címük bela@igen

```sql
SELECT nev FROM vasarlo
WHERE nev = 'Béla' AND email = "bela@igen";
```

| nev  | email     |
| ---- | --------- |
| Béla | bela@igen |

### Kérdezzük le azon vásárlók nevét, akiknek a v_id-juk 1 és 3 között van (beleértve az 1-et és a 3-at is).

```sql
SELECT nev FROM vasarlo
WHERE v_id BETWEEN 1 AND 3;
```

| nev   |
| ----- |
| Béla  |
| Pista |
| Józsi |

A BETWEEN operátor megnézi, hogy a v_id >= 1 és v_id <= 3.

### Kérdezzük le a vásárlók neveit nagybetűsítve.

```sql
SELECT UPPER(nev) FROM vasarlo;
```

| UPPER(nev) |
| ---------- |
| BÉLA       |
| PISTA      |
| JÓZSI      |
| ELEK       |

## Csináljuk meg ugyan ezt alisasokkal.

```sql
SELECT UPPER(nev) AS nnev FROM vasarlo v;
```

Itt az UPPER(nev) oszlopot átneveztük nnev-re, valamint a vasarlo tablara mostmar v-ként is tudnánk hivatkozni ha ez indokolt lenne (több táblából való lekérdezésnél fontos). Írhatnánk pl.: v.nev

| nnev  |
| ----- |
| BÉLA  |
| PISTA |
| JÓZSI |
| ELEK  |

### Kérdezzük le a vásárlók neveit és email címüket, de csak azokat, ahol a az email cím @igen-el végződik.

```sql
SELECT nev,email FROM vasarlo
WHERE email LIKE '%@igen';
```

| nev  | email     |
| ---- | --------- |
| BÉLA | bela@igen |
| ELEK | elek@igen |

A like operátorral megadhatunk wildcardokat a **%** jellel. Ez itt most épp azt jelenti, hogy a @igen előtt bármilyen és bármennyi karakter lehet. Ezt a jelet több helyre is rakhatjuk.

## Kicsit nehezebb feladatok

Ezek megértéséhez érdemes hosszasan tanulmányozni ezt az ábrát.

![sql joins](https://cdn.discordapp.com/attachments/747830547920715947/783608737000325120/unknown.png)

### Kérdezzük le csak azon vásárlók neveit és a rendelt termékeik neveit, akikhez tartozik rendelés.

```sql
SELECT v.nev, r.termek FROM vasarlo v
INNER JOIN rendeles r ON v.v_id = r.v_id;
```

| nev   | termek   |
| ----- | -------- |
| Pista | telefon  |
| Pista | tanyer   |
| Elek  | porszivo |

### Kérdezzük le azon vásárlók neveit és a rendelt termékeik neveit, akikhez tartozik rendelés. Akihez nem tartozik rendelés, ott a név mellett NULL szerepeljen. Rendezzünk név szerint ABC sorrendben.

```sql
SELECT v.nev, r.termek FROM vasarlo v
LEFT JOIN rendeles r ON v.v_id = r.v_id
ORDER BY v.nev;
```

| nev   | termek   |
| ----- | -------- |
| Béla  | NULL     |
| Elek  | porszivo |
| Józsi | NULL     |
| Pista | telefon  |
| Pista | tanyer   |

# A WHERE-ben használható operátorok

A where-ben már láttuk az AND, BETWEEN, LIKE kulcsszavakat, azonban ez nem minden.

**Az AND mellett használhatjuk az OR és NOT kulcsszavakat is hasonlóan**

**Megnézhetjük, hogy valami NULL-e vagy éppen nem az.**

```sql
SELECT * FROM tabla WHERE oszlop IS NULL;
SELECT * FROM tabla WHERE oszlop IS NOT NULL;
```

**Megnézhetjük, hogy valami benne van-e egy listában, vagy éppen nincsen benne.**

```sql
SELECT * FROM tabla WHERE oszlop IN ('ertek', 'ertek2');
SELECT * FROM tabla WHERE oszlop NOT IN ('ertek', 'ertek2');
```

**A <=, >= jelek is használhatóak természetesen.**

# Lekérdezések csoport függvényekkel

## Csoport/aggregált függvények

Egy halmazt (csoportot) kapnak értéknek, és egy eredményt adnak értéknek.

- **COUNT(oszlop)**: megszámolja, hogy hány sor van, ahol az oszlop értéke nem NULL
- **COUNT(\*)**: megszámolja hány sor van a táblában
- **COUNT(DISTINCT \*)**: megszámolja hány különböző sor van a táblában (oszloppal is működik)
- **AVG(oszlop)**: összes (nem null) érték átlaga
- **MIN(oszlop)**: összes (nem null) érték minimuma
- **MAX(oszlop)**: összes (nem null) érték maximuma

Ezekhez a csoportfüggvényekhez gyakran tartozik egy **GROUP BY** is a WHERE után. Például meg akarom tudni, hogy egy részlegen, mennyi az átlagfizetés. Na most ehhez, részlegenként kell csoportosítanom. Ezeket a függvényeket csak a SELECT utáni oszlop kiválasztó részhez tehetjük és a a GROUP BY utáni **HAVING**-be. A HAVING lényegében egy WHERE a GROUP BY után, viszont amig WHERE-be nem használhatjuk ezeket a csoportfüggvényeket, addig a HAVING-be igen. **Általánosan igaz, hogy csak azt írjuk a HAVING-be amit a WHERE-be nem lehet, ezzel növelve a teljesítményt.**

## Táblák gyakorláshoz

**reszleg tábla**

Elsődleges kulcs : r_id

| <u>r_id</u> | nev          |
| ----------- | ------------ |
| 1           | Marketing    |
| 2           | Fejlesztő IT |
| 2           | HR           |

**dolgozo tábla**

Elsődleges kulcs : d_id

Idegen kulcs: r_id, arra a részlegre mutat, ahol dolgoznak.

| <u>d_id</u> | nev   | fizetes | r_id |
| ----------- | ----- | ------- | ---- |
| 1           | Béla  | 1000    | 1    |
| 2           | Józsi | 3000    | 2    |
| 3           | Pista | 4000    | 1    |
| 4           | Bence | 2000    | 2    |
| 5           | Zsolt | 5000    | 1    |

## Csoportfüggvény feladatok

### Kérdezzük le a dolgozók átlag fizetését.

```sql
SELECT AVG(fizetes) AS atlag_fizetes FROM dolgozo;
```

| atlag_fizetes |
| ------------- |
| 3000          |

A maximum és minimum fizetést, ugyanígy tudnánk lekérdezni, csak az AVG-t át kell írni MIN-re vagy MAX-ra. A dolgozók számát a COUNT(\*)-al számolhatnánk meg.

### Kérdezzük le a maximum fizetést minden részleghez (amihez nincs dolgozó ott szerepeljen null).

```sql
SELECT r.nev, MAX(d.fizetes) AS max_fizetes FROM reszleg r
LEFT JOIN dolgozo d ON d.r_id = r.r_id
GROUP BY r.nev;
```

| nev          | max_fizetes |
| ------------ | ----------- |
| Marketing    | 5000        |
| Fejlesztő IT | 3000        |
| HR           | NULL        |

A GROUP BY-al értük el, hogy név szerint csoportosítva kapjuk meg a max fizetéseket. Ha átlagot, vagy minimum fizetést szeretnénk, akkor a MAX szót kell lecserélni az AVG vagy MIN szóra. Ha azt szeretnénk hány dolgozó van egy részlegen, akkor használhatjuk a COUNT(\*)-ot.

### Kérdezzük le azokat a részlegeket és max fizetésüket, ahol az átlag fizetés nagyobb mint 2000.

```sql
SELECT r.nev, MAX(d.fizetes) AS max_fizetes FROM reszleg r
LEFT JOIN dolgozo d ON d.r_id = r.r_id
GROUP BY r.nev
HAVING AVG(d.fizetes) > 2000;
```

| nev          | max_fizetes |
| ------------ | ----------- |
| Marketing    | 5000        |
| Fejlesztő IT | 3000        |
