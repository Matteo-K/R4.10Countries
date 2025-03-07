class Language {

    constructor(iso639_2, name){
        this._iso639= iso639_2
        this._name= name;
    }

    get getName(){
        return this._name;
    }

    get getIso639(){
        return this._iso639;
    }

    toString(){
       return this.getName + " (" + this.getIso639 + ")";
    }
    
    static fill_languages(countries){
        return countries.map(countrie => {
            let iso639 = countrie["languages"]["iso639_2"];
            let name = countrie["languages"]["name"];

            let l = new Language(iso639, name);
            return {[l._iso639]: l}
        })
    }
}

