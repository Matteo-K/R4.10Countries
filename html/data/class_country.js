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

  get getPopDensity(){
    return this._population / this._countries.area
  }

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