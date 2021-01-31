---
title: SQL bevezetés
subject: adatkezeles
description: "A nyelv 4 csoportja és alapszabályai összefoglalva."
date: 2020-12-19
---

## Előzetes olvasmány

- [Relációs adatmodell](https://memnote.net/posts/2020-12-18-relacios-adatmodell)
- [Reláció algebra](https://memnote.net/posts/2020-12-18-relacio-algebra)

# Az SQL és csoportjai

Az SQL egy **nem procedurális** nyelv, vagyis azt írjuk le, hogy **mit**, szeretnénk látni és nem azt, hogy _hogyan_ kapjuk meg azt az eredményt. Ezt a nyelvet **relációs** adatbázisoknál alkalmazzuk, ezért erősen ajánlott megnézni az előzetes olvasmányokat, mivel anélkül elég nehezen lesz érthető, hogy például mi az a tábla.

## DDL (Data Definition Language)

Ezt használjuk az adatmodell kialakításásra, vagyis táblák létrehozására, törlésére, módosítására, átnevezésére vagy akár a táblák attribútumainak nevének/típusának megváltoztatására. Ide tartozik még a [kényszerek](https://memnote.net/posts/2020-12-19-sql-kenyszerek) megadása a táblákhoz. Ilyen kényszer például a már jól ismert **elsődleges kulcs** is. (A tábla itt nagyjából a relációnak felel meg, az attribútum pedig ugye az oszlopok nevei egyszerűen szólva. Ezekre példát, a [relációs adatmodell](https://memnote.net/posts/2020-12-18-relacios-adatmodell) jegyzetben találhatsz)

A DDL parancsokról bővebben [itt olvashatsz](https://memnote.net/posts/2020-12-19-ddl-parancsok).

## DML (Data Manipulation Language)

Ide tartozik minden parancs, ami adatot módosít a táblákban, legyen az beszúrás, módosítás vagy törlés. Ezeket egész jól lehet majd kombinálni a query language-el, hogy dinamikusan tudjunk például egyik táblából a másikba adatokat átvinni, esetleg valamilyen feltétel alapján.

A DML parancsokról bővebben [itt olvashatsz](https://memnote.net/posts/2020-12-19-dml-parancsok).

## Query language

Ez lenne a **SELECT** parancs. Jól hangzik, hogy csak egy parancs, de ez az egy parancs olyan sokszínű, hogy az összes csoport közül, ezt tanítják a legtovább, hiszen szinte végtelen lehetőséget és opciót biztosít az adatok táblákból való lekérdezésére.

A SELECT utasítás csodáiról [itt olvashatsz](https://memnote.net/posts/2020-12-19-sql-select).

## Egyéb (tranzakciók, munkamenetek)

Erről a témáról [itt olvashatsz](https://memnote.net/posts/2020-12-19-sql-tranzakciok).

# Sémák (schema)

A sémák olyanok, mint mondjuk a névterek. Lényege ennek a dolognak, hogy a táblákat nem csak úgy létrehozzuk és vannak, vagy legalábbis nem feltétlenül. Tegyük fel oktatni akarjuk az sql-t. Ehhez minden tanúlónak lesz egy sémája, annak érdekében, hogy más ne tudjun az ő tábláival, vagy bármi másával szórakozni (jogosultságokat be lehet állítani a sémákra). Ez a parancsoknál semmit nem tesz, ha a saját sémádon belül dolgozol, de ha mondjuk máséból akarsz lekérdezni (és tegyük fel ehhez jogod is van), **akkor a táblák neve elé majd például ki kell írni, hogy: sémaneve.tábleneve**, ahelyett, hogy csak a táblát adnánk meg. Ugyan ez érvényes tábla létrehozására is, és minden másra is, ahol táblaneveket használsz az SQL parancsban.

# Alapszabályok

### Tábla és oszlop (attribútum) nevekre vonatkozó szabályok

Ezek itt az oracle-től eltérő adatbázisban lehet változhatnak.

- betűvel kell kezdődniük
- 1-30 karakter hosszúságúak lehetnek
- használható karakterek: a-z, A-Z, 0-9, \_, $, #
- nem érzékenyek kis és nagybetűkre, vagyis: AuTO = auto
- a táblák nevei nem lehetnek ugyan azok
- a táblák nevei nem lehetnek például az utasítások nevei (ezeket reserved keywords-nek hívjuk)

### SQL parancsokra vonatkozó szabályok

- nem érzékenyek kis és nagybetűkre, vagyis: SeLeCt = select
- több sorba is írhatjuk őket, de kulcsszavakat megtörni/félbevágni nem lehet
- hosszú vagy bonyolult lekérdezés esetén érdemes azt több sorba tördelni, és megfelelően indentálni
- ; (pontosvessző)-vel zárjuk le az utasítást
- aritmetikai kifejezések használhatóak (összeadás +, kivonás -, szorzás \*, osztás /)
  - a táblában lehet _null_ érték (nem megadott, nem értelmezhető érték) és az aritmetikában a null-al való művelet eredménye mindig null!
