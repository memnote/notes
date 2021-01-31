---
title: DML parancsok
subject: adatkezeles
description: "Adatok beszúrása (INSERT), frissítése (UPDATE), törlése (DELETE). "
date: 2020-12-19
---

# Adatok manipulálására szolgáló (DML) parancsok

Ide tartozik minden parancs, ami adatot módosít a táblákban, legyen az beszúrás, módosítás vagy törlés. Ezeket egész jól lehet majd kombinálni a query language-el, hogy dinamikusan tudjunk például egyik táblából a másikba adatokat átvinni, esetleg valamilyen feltétel alapján.

Ezek nem atomi műveletek!

[**Tranzakció**](https://memnote.net/posts/2020-12-19-sql-tranzakciok): Olyan DML utasítások sorozata, amik egy logikai egységbe tartoznak (összesen alkotnak egy logikai műveletet).

## Beszúrás

```sql
-- Itt külön kiválasztjuk az oszlopokat amikbe az értékeket szeretnénk rakni.
-- Számít a sorrend!
INSERT INTO tablaneve(oszlop1, oszlop2, oszlop3)
VALUES(ertek1, ertek2, ertek3);

-- Itt nem adunk meg külön oszlopokat, de az oszlopok régi létrehozási sorrendje számít!
-- Az alapján lesznek feltöltve az értékek sorban.
INSERT INTO tablaneve VALUES(ertek1, ertek2);

INSERT INTO varos(nev)
SELECT DISTINCT allomas.varos FROM allomas WHERE allomas.varos IS NOT NULL;
```

Az utolsó beszúrásnál allekérdezést (subquery) használtunk. Annyit csinál, hogy a város tábla név oszlopába beszúrja az állomás tábla összes város oszlopában található várost, ahol annak persze nem NULL az értéke. A DISTINCT kulcsszó azt jelenti, hogy a SELECT csak a különbözőeket válogatja ki.

## Módosítás

```sql
UPDATE tablaneve SET oszlopneve = ertek
WHERE feltetel;

UPDATE rendeles SET megjegyzes = 'A termék hamarosan kiszállításra kerül'
WHERE futar_elindult = 1;

UPDATE allomas SET varos_id = (SELECT v_id FROM varos WHERE allomas.varos = varos.nev);
```

A WHERE feltétel természetesen elhagyható, ám ekkor az összes sorban módosulni fog az oszlop értéke. Módosítani a SET után allekérdezéssel (SELECT subquery) is lehet, ha az egy értéket ad vissza. Az utolsóban az állomás táblában először város nevek szerepeltek az állomásokhoz, most azonban a városokat kiszerveztük egy külön táblába (v_id és neve van egy városnak), így mostmár az állomás táblában, csak a város elsődleges kulcsára (v_id) akarunk hivatkozni. Tehát minden állomás varos_id-ját beállítjuk annak a város v_id-jára, ahol az állomás régi városneve megegyezik az új várostáblában talált város nevével.

## Törlés

```sql
DELETE FROM tablaneve WHERE feltetel;
DELETE FROM vasarlo WHERE kor < 18 AND nev = 'Béla';
```

Master recordot (sort) nem lehet kitörölni, ha van hozzá detail record (sor). A master-detail kapcsolatot például az [idegen kulcs (foreign key) kényszer](https://memnote.net/posts/2020-12-19-sql-kenyszerek) ír le. Detail az akinek van idegen kulcsa, és master az, akire mutat az idegen kulcs.

# Sorok lefoglalása

Le tudunk foglalni táblákban sorokat a saját [tranzakciónkhoz](https://memnote.net/posts/2020-12-19-sql-tranzakciok). Ez annyit tesz, hogy lelockoljuk ezeket a sorokat, lefoglaljuk magunknak és ameddig nem végeztünk, addig más nem hajthat végre rajtuk módosításokat.

```sql
SELECT oszlop1, oszlop2 FROM tablaneve WHERE feltetel FOR UPDATE NOWAIT;
```

A WHERE feltétel és a NOWAIT elhagyható. A NOWAIT annyit tesz, hogy senkire nem akarunk várni, azonnal le akarjuk foglalni a kiválasztott oszlopokat. Ha valaki épp dolgozik rajta, akkor itt hibát fogunk kapni a NOWAIT-tel.
