---
title: ER-EER modellezés
subject: adatkezeles
description: "ER és Extended ER modellezés, attribútum, attribútum típus, kapcsolattípus, kardinalitás, egyedhalmaz."
date: 2020-12-18
---

# Egyed-Kapcsolat (ER) modellezés

> E mint Entity: Egyed

> R mint Relationship: Kapcsolat

## Alapfogalmak

**Egyedhalmaz**: Sok egyed halmaza. (pl.: _emberek egyedhalmaz_, amiben minden egyes ember egy egyed, általában az egyedhalmaz neve egyes számban szokott lenni, csak a megértés kedvéért hívjuk most embereknek simán ember helyett)

**Attribútum típus**: Egy egyedhalmaznak, valamilyen közös jellemzője / tulajdonsága (pl.: az ember egyedhalmaznak a név, személyi szám, életkor)

**Attribútum**: Egy adott egyednek valamilyen tulajdonsága. (előző példa alapján: Fütty Imre (név) 18 (kor))

**Elsődleges kulcs**: Az elsődleges kulcs, egy egyedet az egyedhalmazban **egyértelműen azonosít**. (erre az emberek egyedhalmaznál jó példa pl. a személyi szám, mivel az minden embernek más, tehát egyértelműen azonosít egy ember egyedet)

Az **ER** modellezésnél az **Egyedhalmazok** között csak **kapcsolattípus**ról beszélhetünk, **ne keverjük ezt a sima kapcsolattal!** A sima kapcsolat (vagy másnéven kapcsolatpéldány) sima egyedek között van, és nem egyedhalmazok között! Ebben a modellezésben azonban egyedhalmazokat rajzolunk.

# Példa

![egyszerű er diagram](https://i.ibb.co/qdPshW5/er.jpg)

Itt egy **Ember** és egy **Jármű** **egyedhalmaz** szerepel. Minden emberről tudjuk a _személyi számát_, _nevét_ és _születési dátumát_ (attribútum típusok), valamint minden Járműről tudjuk a _rendszámát_, _márkáját_ és _gyártási évét_. **Az aláhúzott attribútum típusok az elsődleges kulcsok** (ezt így jelöljük). Az egyedhalmazok között két **kapcsolattípus** van, a **Birtokol** és a **Vezette**. 1 járművet csak egy ember birtokolhat (nyíl jelölés vonal helyett), de 1 ember több járművet is birtokolhat. 1 ember több autót is vezethetett már, és egy autót több ember is vezethetett már. Ezek a kapcsolattípusok **binárisak** (mivel két águk van, két egyedhalmazt kapcsolnak össze).

## Kardinalitás

A kapcsolattípus jellemzője.
Fajtái:

- **1 - több** (1 a többhöz) (egy ember több járművet is birtokolhat)
- **több - 1** (több az egyhez) (igazából az előzővel párba van)
- **több - több** (több a többhöz) (ilyen a vezette kapcsolattípus a példán)
  - Itt fontos hogy a több a többhöz nem azt jelenti, hogy feltétlenül lennie kell itt bárminek. Lehet, hogy egy kocsit senki nem vezetett. Tehát itt a darabszámot úgy kell felfogni hogy 0-tól n-ig.
- **1 - 1** (egy az egyhez) (ilyenkor mindkét irányba nyíl van és nem sima vonal)
  - Szintén fontos, hogy ez azt jelenti, hogy 1 valamihez _legfeljebb_ egy másik valami tartozik, de tartozhat 0 is. Vagyis a darabszám itt 0-tól 1-ig terjed.

# E(xtended)ER modellezés

Ez lényegében az ER modelezzés egy-két extra elemmel kiegészítve.

## Ternális kapcsolattípus

A bináris kapcsolattípussal ellentétben, ennek már 3 ága van, és 3 egyedhalmazt tud összekapcsolni. Fontos megjegyezni, hogy létezik 4, 5, 6, ...., n ágú kapcsolattípus is. Ezeknek már nincsen kardinalitása. Ugyanúgy a rombusz jelölést akalmazzuk, mint a fenti példán, és a rombuszt csak sima vonalakkal kötjük össze az egyedhalmazokkal!

## Specializálás, leszármazás

Ez nagyon hasonló az objektumorientált programozásban használt örökléshez. Lényegében a betonkeverő egy jármű, ami ugyan úgy rendelkezik a jármű minden attribútum típusával, azonban még extra gyanánt, ki is egészíti azt a _tartály térfogattal_. Ami itt fontos, hogy egy sima járműről nem tároljuk a tartály térfogatot, viszont egy betonkeverőről tárolunk mindent amit a járműről is, valamint a tartály térfogatát is. Kettő fajta jelölés létezik erre, de a bal oldali az ajánlott. A betonkeverő származik le a járműből. Mindig a szülő felé áll a háromszög, vagy mutat a nyíl. Az isa szó az angol **is a**-ból jön. Betonkeverő is a jármű, tehát a betonkeverő egy jármű. Szokás ezt "_is a kapcsolat_"-nak is hívni.

![eer isa diagram](https://i.ibb.co/HVHQpMW/er-isa.jpg)

## Gyenge egyedhalmaz

Olyan egyedhalmaz, melynek saját kulcsa nem elég az egyed egyértelmű azonosításához. Egy másik egyedhalmaz elsődleges kulcsát kell még az azonosításhoz használni. (Ehhez össze kell, hogy legyen kapcsolva a kettő)

Itt a példán a **Szobán** láthatjuk a gyenge egyedhalmaz jelölését, mivel ő lenne itt a gyenge egyedhalmazunk. Neki van egy _száma_, mint elsődleges kulcs, azonban ha belegondolunk, mit mond önmagában egy szobaszám? Leginkább semmit, amíg nem tudjuk, hogy melyik hotelben vagyunk. Pontosan ezért fogja a szoba a hotel kulcsát használni, ahhoz, hogy egyértelműen azonosítsa magát. Az **Ott** egy **determináló kapcsolattípus**. Minden szobához tartoznia kell egy és csak egy darab hotelnek, azonban egy hotelhez több szoba is tartozhat. A gyenge egyedhalmaz és az őt az azonosításban segítő rendes egyedhalmaz között mindig determináló kapcsolattípus van, ahol a nyíl a rendes egyedhalmaz felé mutat. Itt nagyon fontos, hogy nem 0-tól 1 darabig tartozhat szobához hotel, hanem mindenféleképpen kell, hogy tartozzon minden szobához pontosan egy darab hotel.

![eer weak diagram](https://i.ibb.co/g3pKgZz/er-weak.jpg)
