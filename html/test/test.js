/**
 * Q1 - outsideTheContinent() : Tableau JS des pays (objets Country) dont au moins un 
 * pays frontalier n’est pas dans le même continent.
 */
function outsideTheContinent() {
  console.log("test");
}

/**
 * Q2 - moreNeighbors() : Tableau  des  pays  ayant  le  plus  grand  nombre  de  voisins. 
 * Affichez aussi les voisins. 
 */
function moreNeighbors() {
  console.log();
}

/**
 * Q3 - neighborless() : Tableau des pays n’ayant aucun voisin. 
 */
function neighborless() {
  console.log();
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
    consigne : "Q1 - outsideTheContinent() : Tableau JS des pays (objets Country) dont au moins un pays frontalier n’est pas dans le même continent.",
    fonction : outsideTheContinent
  },
  {
    consigne : "Q2 - moreNeighbors() : Tableau  des  pays  ayant  le  plus  grand  nombre  de  voisins. Affichez aussi les voisins.",
    fonction : moreNeighbors
  },
  {
    consigne : "Q3 - neighborless() : Tableau des pays n’ayant aucun voisin.",
    fonction : neighborless
  },
  {
    consigne : "Q4 - moreLanguages() : Tableau des pays parlant le plus de langues. Affichez aussi les langues (objets Language).",
    fonction : moreLanguages
  },
  {
    consigne : "Q5 - withCommonLanguage() : Tableau des pays ayant au moins un voisin parlant l’une de  ses  langues.  Affichez  aussi  les  pays  voisins  (objets  Country)  et  les  langues  en question (objets Language).",
    fonction : withCommonLanguage
  },
  {
    consigne : "Q6 - withoutCommonCurrency() : Tableau  des  pays  sans  aucun  voisin ayant au moins une de ses monnaies",
    fonction : withoutCommonCurrency
  },
  {
    consigne : "Q7 - sortingDecreasingDensity() : Tableau  des  pays  triés  par  ordre  décroissant  de densité de population.",
    fonction : sortingDecreasingDensity
  },
  {
    consigne : "Q8 - moreTopLevelDomains()  :  Tableau  des  pays  ayant  plusieurs Top Level Domains Internet.",
    fonction : moreTopLevelDomains
  }
]

function affiche_question(partie, questions) {
  $("main").append(
    `
    <form>
      <fieldset id="#{partie}">
        <legend>Partie 1</legend>
      </fieldset>
    </form>
    `
  );
}

console.log(all_currencies);