---
title: Tranzakciók
subject: adatkezeles
description: "Tranzakciókezelés, DML műveletek atomi egysége. COMMIT és ROLLBACK."
date: 2020-12-19
---

# Mi az a tranzakció?

Lépések olyan logikai sorrendje, amelyet egy atomi egységnek tekintünk és ez ennél kisebb részek önmagukban való visszavonását elfogadhatatlannak tartjuk.

Erről általában a fejlesztő dönt a programjában.

# Hogyan kezdődik egy tranzakció?

Nincs külön parancs a tranzakció kezdésére.

**A következő módokon kezdődik el egy tranzakció**:

- 1 [DDL](https://memnote.net/posts/2020-12-19-ddl-parancsok) parancs kiadása (ez le is zárul rögtön a parancs után, automata COMMIT)
- 1 DCL parancs kiadása (ez le is zárul rögtön a parancs után, automata COMMIT)
  - A DCL parancs jogosultásgok megadására és elvételére szolgál.
- Az első [DML](https://memnote.net/posts/2020-12-19-dml-parancsok) parancs kiadásakor is elkezdődik egy tranzakció, ez azonban nem zárul le magától!
  - Ki kell adnunk a `COMMIT;` parancsot miután minden DML utasítást végrehajtottunk amit akartunk.

## Tranzakció felépítése

Az előbiekből tehát egy tranzakció a következőkből épülhet fel:

- 1 db [DDL](https://memnote.net/posts/2020-12-19-ddl-parancsok) parancs
- 1 db DCL parancs
- [DML](https://memnote.net/posts/2020-12-19-dml-parancsok) parancsok sora, amik logikailag egy atomi műveletet alkotnak (tehát logikailag szorosan összefüggnek)

# COMMIT és ROLLBACK

A tranzakciót egy `COMMIT;` vagy `ROLLBACK;` paranccsal lehet véglegesíteni. A `COMMIT;` menti a változtatásokat, a `ROLLBACK;` pedig visszavonja azokat.

Ha ezeket elmulasztjuk, akkor egy [DDL](https://memnote.net/posts/2020-12-19-ddl-parancsok) vagy DCL parancs kiadásával egy automatikus `COMMIT`-ot idézünk elő. Ha valami hiba történik vagy esetleg kidob a rendszer, akkor automatikus `ROLLBACK` tehát visszavonás történik. Ha egy parancs során valahol hiba lép fel, de már X db sor módosítva lett, akkor az az egy parancs automata `ROLLBACK`-et kap.

`COMMIT` és `ROLLBACK` előtt mi ugyan már látjuk a változtatásokat, de más egy másik tranzakcióban még nem!

## Adatok COMMIT előtt

- régi értékek könnyen visszacsinálhatóak
- SELECT lekérdezések már az új adatból olvasnak (a mi tranzakciónkon belül!)
- más még az új/módosított adatokat nem látja
- ezek a sorok le vannak foglalva, más nem tudja őket módosítani

## Adatok COMMIT után

- változtatások mostmár véglegesek
- az előző (régi) adatok végleg törlődnek
- minden más munkamenet látja az új adatokat
- lefoglalások (lockok) felszabadulnak
