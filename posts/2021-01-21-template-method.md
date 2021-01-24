---
title: Template method
subject: szoftech
description: "A template method tervezési minta elméletben és gyakorlatban."
date: 2021-01-21
---

## Alapötlet

A változatlan kódrészeket tegyük egy ősosztályba, a változó/kiterjeszthető részeket pedig ne drótozzuk bele az ősosztály műveleteibe, hanem virtuális és/vagy absztrakt metódusokat használjunk.
A leszármazott osztályban ezeket a metódusokat fogjuk felüldefiniálni specifikus viselkedéssel.

**Definíció**: Egy műveleten belül algoritmus vázat definiál, és az algoritmus bizonyos lépéseinek implementálását a leszármazott osztályra bízza.

_Na akkor ezt most mégegyszer magyarul, egy kis kódpéldával, hogy érhető legyen._

## Példa

Szeretnénk csinálni egy fájlbeolvasó osztályt, de nem akarjuk előre beledrótozni, hogy hogyan csináljuk a beolvasást és a fájl feldolgozást. Ki tudja, hogy mi alapján olvasunk be, vagy honnan. Ezen tovább haladva, azt sem tudhatjuk biztosan, hogy a kimeneti formátumot (típust), amit visszaad a metódus, hogy fogjuk előállítani.

```csharp
// C# példa
abstract class FileReader {
    private string _path;

    // elérési útvonal beállítása, ahonnan olvasni fogunk
    public FileReader(string path) {
        this._path = path;
    }

    // Ez lenne maga a template method.
    // Ez definiálja a vázat.
    public string ReadData() {
        var data = Read();
        var formattedData = Format(data);
        return formattedData;
    }

    // A beolvasást, és a formázást a leszármazotakra hagyjuk.
    // Megadhatnánk itt egy alap implementációt is, akkor abstract
    // helyett virtual kulcsszót kellett volna használni
    protected abstract byte[] Read();
    protected abstract string Format(byte[] data);
}
```

Na ez lett volna az absztrakt ősosztály. Látjuk, hogy a **ReadData()** a template method, és az osztály kiterjeszthető a beolvasás és a formázás mentén.

Konkrét megvalósítás:

```csharp
class SuperFastFileReader : FileReader {
    public SuperFastFileReader(string path) : base(path) { }

    // Felülírjuk az abstract metódust, és implementáljuk.
    protected override byte[] Read() {
        // Ide jöhet az implementáció
    }

    protected override string Format(byte[] data) {
        // ide jöhet az implementáció
    }
}
```

Na és ilyen konkrét megvalósításból bármennyit csinálhatunk. Vegyük észre, hogy ahhoz, hogy beolvassuk a fájlokat, nem kell tudnunk a fájlbeolvasó pontos típusát. Könnyedén tárolhatjuk bármelyik megvalósítást sima **FileReader típussal** (heterogén kollekció és egyéb hasznos felhasználhatóság), mivel a **ReadData()** mindegyik FileReader-en meghívható.

## Általánosságban az osztálydiagram

![nem tölt be a kép :()](https://i.ibb.co/Wg60PZ9/template-method.png)

### Előnyök

- DRY - Don't Repeat Yourself
- új viselkedés bevezetéséhez nem kell meglévő kódot módosítani

### Hátrányok

- Minél több metódus mentén lehet kiterjeszteni az absztrakt őst, annál több keresztkombináció születhet, ami rengeteg áttekinthetetlen osztályt eredményez.
- A program futása közben nem lehet egyszerűen cserélni a viselkedést, ezért rugalmatlan (pontosan a fentebbi hátrány miatt következik is).

## Következmények

Mivel a nem változó részeket egy helyen definiáljuk (a template method-ban), és csak a változó részeket adjuk meg a leszármazottakban, ezért nem ismételjük magunkat.

Keretrendszereknél egész gyakori megoldás, de **egyébként csak egyszerű esetekben érdemes inkább használni**.
