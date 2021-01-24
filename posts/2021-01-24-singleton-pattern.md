---
title: Singleton minta
subject: szoftech
description: "A singleton tervezési minta leírása és gyakorlati alkalmazása."
date: 2021-01-24
---

# Definíció

**Biztosítja, hogy egy osztályból csak egy példányt lehessen létrehozni, viszont ehhez az egy példányhoz globális hozzáférést nyújt az egész programban.**

A globális hozzáférés annyit jelent, hogy az az egy példány a kódban bárhol elérhető, így bármilyen metóduson belül használhatjuk, anélkül hogy paraméterként át kellene adni a metódusnak.

A singleton egy **létrehozási tervezési minta**.

Példák, ahol találkozni lehet vele akár élesben is

- központi ablakkezelő (grafikus alkalmazásnál, tárolhatja mondjuk az ablak éppen aktuális szélességét/magasságát)
- Application objektum (általános információkat tárol az alkalmazásról)

# Példakód

Érthetőbb java kód (nem szálbiztos, vagyis ha különböző szálak (thread-ek), próbálnak hozzáférni egyszerre, amikor még nincs létrehozva a példány, akkor a getInstance() metódus könnyen lehet, hogy többször hozza létre az egyetlen példányunkat).

```java
// A this kulcsszó mindenhol elhagyható.
class WindowManager {
    // magának a példánynak a tagváltozói
    private int height;
    private int width;
    // statikus egyetlen példány
    private static WindowManager instance;

    // Ezzel kérjük le az egyetlen példányunkat, ha még nem létezik, létrehozzuk előbb.
    public static WindowManager getInstance() {
        if(this.instance == null)
            this.instance = new WindowManager();
        return this.instance;
    }

    // Védett konstruktor, hogy se kívűlről, se leszármazottakból ne lehessen további példányokat létrehozni.
    private WindowManager() { }

    public int getWidth() {
        return this.width;
    }

    public int getHeight() {
        return this.height;
    }
}

// Hozzáférés a példányhoz és metódusaihoz a kódban valahol máshol
WindowManager.getInstance().getWidth()
WindowManager.getInstance().getHeight()
```

Bonyolultabb, de szálbiztos C# megoldás. (A nyelv adottságai miatt lesz ez ilyen könnyen szálbiztos)

```csharp
class WindowManager {
    // Magának a példánynak a tagváltozói (property)
    private int Height { get; set; }
    private int Width { get; set; }

    // Statikus egyetlen példány, valamint ezzel a property-vel lehet végrehajtni a lekérdezést is.
    // Ez a szintaktika C#-ban biztosítja, hogy az objektum csak és kizárólag egyszer lesz létrehozva.
    public static WindowManager Instance { get; } = new WindowManager()

    // Védett konstruktor, hogy se kívűlről, se leszármazottakból ne lehessen további példányokat létrehozni.
    private WindowManager() { }
}

// Hozzáférés a példányhoz és metódusaihoz a kódban valahol máshol (property-k miatt néz ki ilyen szépen)
WindowManager.Instance.Width
WindowManager.Instance.Height
```

Hivatalosan a singleton mintában a konstruktornak privátnak kéne lennie, azonban ez teljesen ellehetetleníti a unit tesztelhetőségét az osztálynak. Ebből az okból kifolyólag sokszor protected-re állítják a konstruktort, hogy készíthető legyen a tesztelésnél egy mockolt (vagy dummy, sablon mindegy, hogy hívjuk) implementáció.

## Antipattern

A singleton mintát antipattern-nek is hívják, pontosan azért mert nem lehet tesztelni.

# Jellemzők összeszedve

- Kell egy **statikus példány** az osztályba (tipikusan instance-nek hívjuk).
- Kell egy **statikus getInstance() metódus**, vagy egy jól irányzott property ha C#-ról van szó, természetesen setter nélkül.
- Az egyetlen (statikus) példány **globálisan hozzáférhető** az alkalmazásban.
- Csak egyetlen példányt lehet létrehozni (ehhez kell a privát vagy tesztelés szempontjából protected konstruktor).
