/// Initialisation des variables
// Pagination
const elementInPagination = 25;
let pageActuelle = 1;

// Détails
let details_prec = null;
let details_img = null;

// Filtre
const allRegion = Object.values(Country.all_countries).reduce((res, country) => {
  if (!res.includes(country._region)) {
    res.push(country._region);
  }
  return res;
}, []);

const langues = Object.values(Language.all_language).sort((langue1, langue2) => {
  return langue1._name > langue2._name
});

function displayAllCountries(container_selecter, array) {
  const html = `
    ${array.map(country => {
      const voisins = country._borders;
      const voisins_size = voisins.length;
      const monnaies = country.getCurrencies;
      const monnaies_size = monnaies.length;

      return `
        <tr id="${country._alpha3Code}" onclick="clickCountry(event)">
          <td>${country._name || "N/A"}</td>
          <td>${country._population ? country._population + " hab." : "N/A"}</td>
          <td>${country._area ? Math.round(country._area) + " km<sup>2</sup>" : "N/A"}</td>
          <td>${country.getPopDensity ? parseFloat(country.getPopDensity).toFixed(3) + " hab/km<sup>2</sup>" : "N/A"}</td>
          <td>${country._region || "N/A"}</td>
          <td>
            <img 
              src="${country._img || "../assets/img/drapeau_default.png"}" 
              alt="Drapeau du pays ${country._name || "N/A"}" 
              title="${country._name || "N/A"}" 
            >
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <div>
              <h3>Complémentaire</h3>
              <ul>
                <li>Capital : ${country._capital}</li>
              </ul>
              <h3>Monnaie${monnaies_size > 1 ? "s" : ""}</h3>
              ${monnaies !== 0 ? `
              <ul>
                ${monnaies.map((monnaie) => `
                  <li>${monnaie.toString()}</li>
                `).join('')}
              </ul>
              ` : `
              <span>${country._name} n'a pas de monnaie</span>
              `}
            </div>
            <div>
              <h3>Pays voisin${voisins_size > 1 ? "s" : ""}&nbsp;:</h3>
              ${voisins_size !== 0 ? `
              <ul class="voisin">
                ${voisins.map(voisin => `
                <li>
                  <figure>
                    <img src="${Country.all_countries[voisin]?._img || "../assets/img/drapeau_default.png"}" 
                      alt="${Country.all_countries[voisin]?._name || "N/A"}" 
                      title="${Country.all_countries[voisin]?._name || "N/A"}"
                    >
                    <figcaption>${Country.all_countries[voisin]?._name || "N/A"}</figcaption>
                  </figure>
                </li>
              `).join('')}
              </ul>
              ` : `
              <span>${country._name} n'a pas de pays voisin</span>
              `}
            </div>
          </td>
        </tr>
      `
    }).join('')}
  `;


  $(container_selecter).append(html)
}

/// Détails
function clickCountry(event) {
  $(`#${details_prec} + tr`).removeClass("detailsOpen");

  // Click en dehors de l'image
  if (event.target.localName !== "img") {
    // Si le clique précédent n'était pas sur la ligne alors on ouvre
    if (details_prec != event.target.parentNode.id) {
      details_prec = event.target.parentNode.id;
      $(`#${details_prec} + tr`).addClass("detailsOpen");
    
    // Sinon, on referme
    } else {
      details_prec = null;
      $(`#${details_prec}`).removeClass("detailsOpen");
    }
  } else {
    details_img = event.target.parentNode.parentNode.id;
    $("#img_countries").addClass("imgDetailsOpen");
    $("#img_country").attr("src", Country.all_countries[details_img]._img);
    $("#img_country").attr("alt", Country.all_countries[details_img]._name);
    $("#img_country").attr("title", Country.all_countries[details_img]._name);
  }
}

$("#img_countries").on("click", () => {
  $("#img_countries").removeClass("imgDetailsOpen");
});


/// Pagination
function paginations(array, nbElements = elementInPagination, progression) {
  array = filtre(array);

  const totalPages = Math.ceil(array.length / nbElements);
  removeAllElement("tbody");
  pageActuelle += progression;

  // Calcul de la tranche des pays à afficher pour la page actuelle
  displayAllCountries("tbody", array.slice((pageActuelle-1) * nbElements, pageActuelle * nbElements));


  // Mettre à jour les boutons de pagination
  $("#prec").prop("disabled", pageActuelle === 1);
  $("#suiv").prop("disabled", pageActuelle === totalPages || totalPages === 0);
  
  // Mettre à jour l'affichage de la page
  $(".spanPage").text(`Page ${pageActuelle}`);
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function removeAllElement(container_selector) {
  $(container_selector).empty();
}

function filtre(countries) {
  const select_region = $("#continent").val();
  const select_langue = $("#langue").val();
  const input_pays = $("#nom_pays").val();

  const region_isEmpty = select_region === "default";
  const langue_isEmpty = select_langue === "default";
  const pays_isEmpty = input_pays === "";

  return countries.filter((country) => {
    let checkLangue = langue_isEmpty;
    if (!langue_isEmpty) {
      console.log(country.getLanguages);
      checkLangue = country.getLanguages.some((langue) => langue._name === select_langue)
    }
    let checkRegion = country._region === select_region || region_isEmpty;
    let checkPays = country._name.toLowerCase().includes(input_pays.toLowerCase()) || pays_isEmpty;

    return checkRegion && checkLangue && checkPays;
  });
}

function resetFiltre() {
  $("#continent").val("default");
  $("#langue").val("default");
  $("#nom_pays").val("");
}

$(document).ready(function () {
  // Initialiser la pagination
  paginations(Object.values(Country.all_countries), elementInPagination, 0);

  // Actions sur les boutons de pagination
  $("#suiv").click(function () {
    paginations(Object.values(Country.all_countries), elementInPagination, 1);
  });

  $("#prec").click(function () {
    paginations(Object.values(Country.all_countries), elementInPagination, -1);
  });

  /// Filtre
  // Chargement des filtres
  allRegion.forEach((region_) => {
    $("#continent").append(`<option value="${region_}">${region_}</option>`);
  });
  langues.forEach((langue) => {
    $("#langue").append(`<option value="${langue._name}">${langue}</option>`);
  });

  // evenements
  $("#continent").change(function () {
    paginations(Object.values(Country.all_countries), elementInPagination, - pageActuelle + 1);
  });
  $("#langue").change(function () {
    paginations(Object.values(Country.all_countries), elementInPagination, - pageActuelle + 1);
  });
  $("#nom_pays").on("input", function () {
    paginations(Object.values(Country.all_countries), elementInPagination, - pageActuelle + 1);
  });
});