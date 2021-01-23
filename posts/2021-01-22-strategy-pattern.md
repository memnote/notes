---
title: Strategy minta
subject: szoftech
description: "A strategy (vagy behavior) tervezési minta leírása, osztálydiagramja és példák felhasználásra."
date: 2021-01-22
---

## Előzetes olvasmány

- [Template method tervezési minta](https://memnote.net/posts/2021-01-21-template-method)

# Osztálydiagram

Kezdjük az osztálydiagrammal, hogy könnyebb legyen a megértés.

![strategy osztálydiagram](https://i.ibb.co/cwC1xX7/strategy.png)

Itt a Context-et tekinthetjük a kliensnek. Neki lesz egy hivatkozása (tagváltozó az osztályban) a stratégiára (Strategy). De úgy tároljuk mint **Strategy** (ez az interface!) és nem úgy mint konkrét strategy (ConcreteStrategy). Ennek az lesz az előnye, hogy bármikor lecserélhetjük a kliensben (Context) a stratégiát, mivel interface típust tárolunk, így a StrategyOpertaion() garantáltan meghívható minden leszármazotton.

# Mi is az a Strategy minta?

Célja az algoritmusok/viselkedések egy csoportján belül az egyes algoritmusok/viselkedések egységbe zárása és kicserélhetővé tétele.

**A strategy mintát akkor használjuk, ha egy problémára több megoldásunk is van (vagy más szavakkal több megoldást kínálunk) és azt, hogy melyiket használjuk, a kliens dönti el, futási időben.**

**Tehát**: Ahogy az osztály diagrammon is láthattuk, van egy Strategy interface, aminek a neve lehetne akár _CompressionStrategy_ (TömörítőStrategy) is, a lényeg, hogy a neve utaljon rá, hogy mit csinál ez a stratégia. Az interfészen definiálunk metódusokat aminek köze van a stratégiánkhoz. A példánál maradva ezek a metódusok lehetnek például: _InitCompression(), CompressData(data: byte[]), CloseCompression()_. Most ezzel azt mondtuk el, hogy van egy tömörítő stratégiánk, ami az előbbi 3 metódust foglalja magába. Akik megvalósítják az interfészt azok pedig implementálják ezeket a metódusokat, attól függően, hogy mondjuk ZIP-be, RAR-ba, vagy bármi másba szeretnénk tömöríteni. Mivel az interfész típusát tároljuk, nagyon könnyen tudunk majd váltani **bármikor** mondjuk a ZIP és RAR tömörítő között.

# Magyarázat példán

![strategy példa](https://i.ibb.co/k4RZ9VP/strategy-p-lda.png)

Na ez itt egy elég komoly ábra az eddigiekhez képest. Röviden van egy **DataProcessor**-unk, ami felhasználja a képen látható stratágiákat, amiből már 2 is van. Az **ICompressionStrategy** interfész és az azt megvalósító osztályok pontosan ugyanazok amik a fenti leírásban megtalálhatóak.

A különbség, hogy itt van egy **ICancellationStrategy** is. Ez csak a példa kedvéért van itt, a lényeg, hogy az _isCancelled()_ metódust meghívva megtudhatjuk, hogy meg akarjuk-e szakítani a tömörítést. A megvalósításokat tekintve láthatjuk, hogy van megszakíthatatlan stratégia, de van olyan is, amit egy gomb megnyomással szakíthatunk meg, vagy akár egy billentyű leütéssel.

A **DataProcessor** _Run()_ metódusa elindítja a tömörítést, viszont ha a _CancellationStrategy isCancelled()_ metódusa azt jelzi, hogy megszakítás történt, akkor leáll a tömörítés.

```csharp
// C# példa
class DataProcessor {
    ICompressionStrategy compressionStrategy;
    ICancellationStrategy cancellationStrategy;

    public DataProcessor(ICompressionStrategy compressionStrategy, ICancellationStrategy cancellationStrategy)
    {
        // Eltároljuk a paraméterként kapott stratégiákat
        this.compressionStrategy = compressionStrategy;
        this.cancellationStrategy = cancellationStrategy;
    }

    public void Run()
    {
        byte[] inputData;
        // Tömörítés inicializás, implementáció függő
        compressionStrategy.InitCompression();
        try
        {
            while((inputData = readData()) != null)
            {
                // Tömörítés, implementáció függő
                byte[] compressedData = compressionStrategy.CompressData(inputData);
                processCompressedData(compressedData);
                // Cancel vizsgálat, implementáció függő
                if (cancellationStrategy.IsCancelled())
                    return;
            }
        }
        finally
        {
            // Tömörítés lezárás, impl. függő
            compressionStrategy.CloseCompression();
        }

    }
}
```

## Miért jó mindez nekünk?

Ha megfigyeljük, ezt a példát a [template method](https://memnote.net/posts/2021-01-21-template-method) mintával is meg lehetne valósítani, DE gondoljunk bele, 4 metódus mentén a kiterjesztés mégis hány kombinációt fog szülni? Igen, akár rengeteget is, ami nem is átlátható, és egyéb korlátai is vannak. Ha így, stratégiák mentén csoportosítunk, sokkal könnyebben áttekinthető osztály struktúrát kapunk. Ráadásul ezzel megoldással futás közben is cserélhetünk megvalósítást **egyszerűen**.

### Előnyök

- A kliens (példában DataProcessor) szemszögéből ezek a strategy-k szabadon cserélhetőek bármilyen más megvalósításra (mivel az interfész típusát tároljuk, nem egy konkrét megvalósítást).
- Sokkal egyszerűbb ezeket a stratégiákat kombinálni, nem fognak nagy számú osztály struktúrát eredményezni.
- Futás időben is cserélhető!
- Unit tesztelést elősegíti, hiszen bármilyen megvalósítást mockolhatunk. (Mock: egy ideiglenes sablon implementáció annak érdekében, hogy a tesztelést segítse)
- Új viselkedés (strategy) könnyen bevezethető, nem kell meglévő kódot módosítani.
