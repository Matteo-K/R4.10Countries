class Country {

  static _countries = countries;

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
    ", " + this._capital +
    ", " + this._name +
    ", " + this._region +
    ", " + this._population + "hab";
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