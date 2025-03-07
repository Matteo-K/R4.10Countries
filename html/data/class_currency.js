class Currency {

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
   * @param {Array} countries - Listes ded pays
   * @returns {Array} - Listes de toutes les monnaies de tout les pays
   */
  static fill_currencies(countries) {
    let res = {};
    countries.forEach(country => {

    // Vérifie si la variable est un tableau
    if (Array.isArray(country.currencies)) {

      // Construit une liste de monnaies par pays
      let currencies_tmp = country.currencies.map((currency) => {
        
        let c = new Currency(currency);
        return { [c._code]: c };
      });

      currencies_tmp.forEach(currency_tmp => {
        if (!currency_tmp in res) {
          res = Object.assign(res, currency_tmp);
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