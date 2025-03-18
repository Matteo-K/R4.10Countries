class Country {

  static _countries = countries;
  static all_countries = this.fill_countries();

  constructor(country) {
    this._name = country.translations.fr;
    this._alpha3Code = country.alpha3Code;
    this._capital = country.capital ?? "";
    this._region = country.region ?? "";
    this._population = country.population ?? 0;
    this._borders = country.borders ?? [];

    // Partie 2
    this._img = country.flags.png ?? "";
    this._area = country.area ?? 0
  }

  toString() {
    return this._alpha3Code +
    ", " + this._name +
    ", " + this._capital +
    ", " + this._region +
    ", " + this._population + " hab" +
    ", (" + this._borders.map(
        (voisin) => Country.all_countries[voisin]._name
      ).join(", ") + ")";
  }

  /**
   * Retourne la densité de population du pays (hab. / Km2)
   * @returns Densité de population (hab. / Km2)
   */
  get getPopDensity(){
    let countrie = Country._countries.find(
      c => c.alpha3Code === this._alpha3Code
    )
    return this._population / countrie.area;
  }

  /**
   * Retourne un tableau des pays frontaliers (les objets Country, pas les codes).
   * @returns Tableau des pays frontalies
   */
  get getBorders() {
    return this._borders.map((voisin) => Country.all_countries[voisin]);
  }

  /**
   * Retourne un tableau des monnaies (objets Currency)
   * @returns Tableau des monnaies
   */
  get getCurrencies() {
    // Recherche de l'index
    const country = Country._countries.find(
      c => c.alpha3Code === this._alpha3Code
    );
    if (country.currencies) {
      return country.currencies.map(
        (currency) => new Currency(currency)
      );
    }
    return [];
  }

  /**
   * Retourne un tableau des langues (objets Language)
   * @returns Tableau des langues
   */
  get getLanguages(){
    let countrie = Country._countries.find(
      c => c.alpha3Code === this._alpha3Code
    )
    return countrie.languages.map( language => {
      return new Language(language);
    })
  }

  static fill_countries() {
    let res = {};
    Country._countries.forEach(country => {
      let c = new Country(country);
      res[c._alpha3Code] = c;
    });
    return res;
  }
}