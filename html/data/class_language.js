class Language {

    static _countries = countries;

    constructor(language){
        this._iso639= language.iso639_2
        this._name= language.name;
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
    
    static fill_languages(){
        let res = {};
        Language._countries.forEach(country => {

        // Vérifie si la variable est un tableau
        if (Array.isArray(country.languages)) {

            // Construit une liste de language par pays
            let language_tmp = country.languages.map(
            (language) => new Language(language)
            );

            language_tmp.forEach(language_tmp => {
            if (!res.hasOwnProperty(language_tmp._iso639)) {
                res[language_tmp._iso639] = language_tmp;
            }
            });

        } else {
            console.warn("La Langue n'est pas une liste ou n'est pas définie");
        }
        });
        return res;
    }
    
}

