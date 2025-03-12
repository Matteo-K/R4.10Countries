class Currency {

  static _countries = countries;

  /**
   * @param {Objet} currency - Objet: monnaie d'un pays.
   */
  constructor(currency) {
    this._code = currency.code;
    this._name = currency.name;
    this._symbol = currency.symbol;
  }

  /**
   * Méthode staticqui remplie 
   * @returns {Array} - Listes de toutes les monnaies de tout les pays
   */
  static fill_currencies() {
    let res = {};
    Currency._countries.forEach(country => {
      if (Array.isArray(country.currencies)) {

        // Construit une liste de monnaies par pays
        let currencies_tmp = country.currencies.map(
          (currency) => new Currency(currency)
        );
        
        // Vérification si la monnaie existe déjà
        currencies_tmp.forEach(currency_tmp => {
          if (!res.hasOwnProperty(currency_tmp._code)) {
            res[currency_tmp._code] = currency_tmp;
          }
        });

      } else {
        console.warn("La monnaie n'est pas une liste ou n'est pas définie");
      }
    });
    return res;
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

const all_currencies = Currency.fill_currencies(countries);