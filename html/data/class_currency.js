class Currency {

  /**
   * @param {Objet} currency - Objet: monnaie d'un pays.
   */
  constructor(currency) {
    this._code = currency.code;
    this._name = currency.name;
    this._symbol = currency.symbol;
  }

  toString() {
    return this._code + ", " + this._name + ", " + this._symbol;
  }

  get code() {
    return this._code;
  }

  get name() {
    return this._name;
  }

  get symbol() {
    return this._symbol;
  }

  set code(code) {
    this._code = code;
  }

  set name(name) {
    this._name = name;
  }

  set symbol(symbol) {
    this._symbol = symbol;
  }
}

function fill_currencies (currencies) {
  return currencies.map((currency) => {
    return new Currency(currency);
  });
}

const all_currencies = countries.map((country) => {
  return fill_currencies(country.currencies);
});

console.log(all_currencies);