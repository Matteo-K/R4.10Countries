/**
 * Q1 - outsideTheContinent() : Tableau JS des pays (objets Country) dont au moins un 
 * pays frontalier n’est pas dans le même continent.
 */
function outsideTheContinent() {
  let tab = []

  Object.values(Country.all_countries).forEach(country => {
    let borderCountry = country.getBorders.find(
      c => c._region !== country._region
    )
    if (borderCountry){
     tab.push(country);
    } 
  })
  console.log(tab);
  return tab
}

/**
 * Q2 - moreNeighbors() : Tableau  des  pays  ayant  le  plus  grand  nombre  de  voisins. 
 * Affichez aussi les voisins. 
 */
function moreNeighbors() {
  const lst_max = Object.values(Country.all_countries).map(
    (country) => country._borders.length
  );

  const moreNeighbors = Object.values(Country.all_countries).filter(
    (country) => country._borders.length === Math.max(...lst_max)
  );

  console.log(moreNeighbors);
  moreNeighbors.forEach(country => {
    console.log("Voisins de " + country._name);
    country.getBorders.forEach((voisin) => {
      console.log(voisin.toString());
    })
  });
}

/**
 * Q3 - neighborless() : Tableau des pays n’ayant aucun voisin. 
 */
function neighborless() {
  const res = Object.values(Country.all_countries).filter(
    (country) => country._borders.length === 0
  );

  console.log(res);
}

/**
 * Q4 - moreLanguages() : Tableau des pays parlant le plus de langues. Affichez aussi les 
 * langues (objets Language). 
 */
function moreLanguages() {
  const lst_max = Object.values(Country.all_countries).map(
    (country) => country.getLanguages.length
  );

  const moreLanguages = Object.values(Country.all_countries).filter(
    (country) => country.getLanguages.length === Math.max(...lst_max)
  );

  console.log(moreLanguages);
  moreLanguages.forEach(country => {
    console.log("Langues de " + country._name);
    country.getLanguages.forEach((langue) => {
      console.log(langue.toString());
    })
  });
}

/**
 * Q5 - withCommonLanguage() : Tableau des pays ayant au moins un voisin parlant l’une 
 * de  ses  langues.  Affichez  aussi  les pays  voisins  (objets  Country)  et  les  langues  en 
 * question (objets Language). 
 */
function withCommonLanguage() {
  let tab = [];
  Object.values(Country.all_countries).forEach((country) => {
    let voisins = country.getBorders;
    let langues = country.getLanguages;

    let hasCommonLanguage = voisins.every(voisin => 
      voisin.getLanguages.some(langue => {
        langues.includes(langue);
        })
    );

    if (!hasCommonLanguage) {
      tab.push(country);
    }
  });
  console.table(tab);
  return tab;
}


/**
 * Q6 - withoutCommonCurrency() : Tableau  des  pays  sans  aucun  voisin ayant au moins 
 * une de ses monnaies. 
 */
function withoutCommonCurrency() {
  const res = Object.values(Country.all_countries).filter((country) => {

    // Vérification pour chaque voisin
    return country.getBorders.every(voisin => {
      const voisinCurrencies = voisin.getCurrencies;

      // Vérification pour chaque monnaie du pays
      return country.getCurrencies.every(
        (currency) => {
          return !voisinCurrencies.some(
            (voisin_currency) => 
              currency._name === voisin_currency._name
          )
        }
      );
    });
  });

  console.log(res);
}


/**
 * Q7 - sortingDecreasingDensity() : Tableau  des  pays  triés  par  ordre  décroissant  de 
 * densité de population.
 */
function sortingDecreasingDensity() {
  const res = Object.values(Country.all_countries).sort(
    (country1, country2) => {
      const densite1 = country1.getPopDensity;
      const densite2 = country2.getPopDensity;

      const d1 = isNaN(densite1) ? 0 : densite1;
      const d2 = isNaN(densite2) ? 0 : densite2;
      return d1 < d2;
    }
  );

  console.log(res);
}

/**
 * Q8 - moreTopLevelDomains()  :  Tableau  des  pays  ayant  plusieurs Top Level Domains 
 * Internet.
 */
function moreTopLevelDomains() {
  let tab = [];
  Country._countries.forEach(country => {
    if (country["topLevelDomain"].length > 1){
      tab.push(country);
    }
  })
  console.table(tab)
  return tab;
}


/// Affichage dynamique du DOM

const part1_test = [
  {
    ennonce : "Q1 - outsideTheContinent()",
    consigne : "Tableau JS des pays (objets Country) dont au moins un pays frontalier n’est pas dans le même continent.",
    fonction : "outsideTheContinent"
  },
  {
    ennonce : "Q2 - moreNeighbors()",
    consigne : "Tableau  des  pays  ayant  le  plus  grand  nombre  de  voisins. Affichez aussi les voisins.",
    fonction : "moreNeighbors"
  },
  {
    ennonce : "Q3 - neighborless()",
    consigne : "Tableau des pays n’ayant aucun voisin.",
    fonction : "neighborless"
  },
  {
    ennonce : "Q4 - moreLanguages()",
    consigne : "Tableau des pays parlant le plus de langues. Affichez aussi les langues (objets Language).",
    fonction : "moreLanguages"
  },
  {
    ennonce : "Q5 - withCommonLanguage()",
    consigne : "Tableau des pays ayant au moins un voisin parlant l’une de  ses  langues.  Affichez  aussi  les  pays  voisins  (objets  Country)  et  les  langues  en question (objets Language).",
    fonction : "withCommonLanguage"
  },
  {
    ennonce : "Q6 - withoutCommonCurrency()",
    consigne : "Tableau  des  pays  sans  aucun  voisin ayant au moins une de ses monnaies",
    fonction : "withoutCommonCurrency"
  },
  {
    ennonce : "Q7 - sortingDecreasingDensity()",
    consigne : "Tableau  des  pays  triés  par  ordre  décroissant  de densité de population.",
    fonction : "sortingDecreasingDensity"
  },
  {
    ennonce : "Q8 - moreTopLevelDomains()",
    consigne : "Tableau  des  pays  ayant  plusieurs Top Level Domains Internet.",
    fonction : "moreTopLevelDomains"
  }
]

function affiche_question(partie, questions) {
  let html = `
    <form>
      <fieldset id="${partie}">
        <legend>Partie ${partie}</legend>
        ${questions.map(question => `
          <div>
            <label><span>${question.ennonce}&nbsp:</span>${question.consigne}</label>
            <button type="button" class="exec-btn" data-func="${question.fonction}">Exécuter</button>
          </div>
        `).join('')}
      </fieldset>
    </form>
  `;

  $("main").append(html);

  $(".exec-btn").on("click", function () {
    let func = $(this).data("func");
    if (typeof window[func] === "function") {
      window[func]();
    } else {
      console.error(`Fonction ${func} introuvable`);
    }
  });
}

$(document).ready(function () {
  affiche_question("1", part1_test);
});