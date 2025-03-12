class Country {

  static _countries = countries;
  static all_countries = this.fill_countries();

  constructor(country) {
    this._name = country.name;
    this._alpha3Code = country.alpha3Code;
    this._capital = country.capital;
    this._region = country.region;
    this._population = country.population;
    this._borders = country.borders ?? [];
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

  static fill_countries() {
    let res = {};
    Country._countries.forEach(country => {
      let c = new Country(country);
      res[c._alpha3Code] = c;
    });
    return res;
  }

  /**
   * Retourne un tableau des pays frontaliers (les objets Country, pas les codes).
   * @returns Tableau des pays frontalies
   */
  get getPopDensity() {
    return this._borders.map((voisin) => Country.all_countries[voisin]);
  }

  /**
   * retourne un tableau des monnaies (objets Currency)
   * @returns Tableau des monnaies
   */
  get getCurrencies() {
    // Recherche de l'index
    const country = Country._countries.find(
      c => c.alpha3Code === this._alpha3Code
    );
    return country.currencies.map(
      (currency) => new Currency(currency)
    );
  }
}