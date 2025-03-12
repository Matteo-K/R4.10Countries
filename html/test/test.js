/**
 * Q1 - outsideTheContinent() : Tableau JS des pays (objets Country) dont au moins un 
 * pays frontalier n’est pas dans le même continent.
 */
function outsideTheContinent() {
  let tab = []

  Country._countries.forEach(country => {
    console.log(country);
  })
  
  console.log("test");
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
  console.log(Object.values(Country.all_countries).filter(
    (country) => country._borders.length === 0
  ));
}

/**
 * Q4 - moreLanguages() : Tableau des pays parlant le plus de langues. Affichez aussi les 
 * langues (objets Language). 
 */
function moreLanguages() {
  console.log();
}

/**
 * Q5 - withCommonLanguage() : Tableau des pays ayant au moins un voisin parlant l’une 
 * de  ses  langues.  Affichez  aussi  les  pays  voisins  (objets  Country)  et  les  langues  en 
 * question (objets Language). 
 */
function withCommonLanguage() {
  console.log();
}

/**
 * Q6 - withoutCommonCurrency() : Tableau  des  pays  sans  aucun  voisin ayant au moins 
 * une de ses monnaies. 
 */
function withoutCommonCurrency() {
  console.log();
}

/**
 * Q7 - sortingDecreasingDensity() : Tableau  des  pays  triés  par  ordre  décroissant  de 
 * densité de population.
 */
function sortingDecreasingDensity() {
  console.log();
}

/**
 * Q8 - moreTopLevelDomains()  :  Tableau  des  pays  ayant  plusieurs Top Level Domains 
 * Internet.
 */
function moreTopLevelDomains() {
  console.log();
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