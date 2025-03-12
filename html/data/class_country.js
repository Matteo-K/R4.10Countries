class Country {
  constructor(country) {
    this._name = country.name;
    this._alpha3Code = country.alpha3Code;
    this._capital = country.capital;
    this._region = country.region;
    this._population = country.population;
    this._borders = country.borders;
  }

  toString() {
    return this._alpha3Code + 
    ", " + this._capital + 
    ", " + this._name + 
    ", ";
  }

  static fill_countries(countries) {

  }
}