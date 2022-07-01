//Fun stuff Starts here
class lesAnimaux{

    constructor(german, french, english){
        document.write("LES ANIMAUX EST...: " + german + " " + french + " " + english + "." + "<br>");
        this.german = german;
        this.french = french;
        this.english = english;


    };

    nameLength(){
        return this.german.length
    }


}


class dieTiere extends lesAnimaux{

    constructor(german, french, english, gewicht, groß, farbe, wasserOderLandoderLuft){
        super(german, french, english);

        this.german = german
    }

    germanDef(){
        return this.german
    }
}


lesAnimaux.category = "Languages";

var bien = new lesAnimaux("Ein Hund", "Un Bien", "A dog");
var possion = new lesAnimaux("Eine Katze", "Une Chat", "A cat");
console.log(possion.nameLength())

console.log(bien.constructor.category)