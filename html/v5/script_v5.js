/// Initialisation des variables
// Pagination
const elementInPagination = 25;
let pageActuelle = 1;
let array = Object.values(Country.all_countries);

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
              <h3>Complément</h3>
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
    displayAllCountries("tbody", array.slice((pageActuelle - 1) * nbElements, pageActuelle * nbElements));


    // Mettre à jour les boutons de pagination
    $("#prec").prop("disabled", pageActuelle === 1);
    $("#suiv").prop("disabled", pageActuelle === totalPages);

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




// Trie 
let sortStates = {};

function updateSortImage(th, state) {
    $("th > img").remove();

    if (state === 1) {
        // Ajoute l'image pour le tri croissant
        $(th).append('<img src="../assets/img/croissant.png" alt="Croissant" class="asc">');
    } else if (state === -1) {
        // Ajoute l'image pour le tri décroissant
        $(th).append('<img src="../assets/img/decroissant.png" alt="Décroissant" class="desc">');
    }
}

$("th[data-sort]").click(function () {
    const trierPar = $(this).data("sort");

    Object.keys(sortStates).forEach(key => {
        if (key !== trierPar) {
            sortStates[key] = 0;
        }
    });

    //Savoir si trie croissant, décroissant, ou pas de trie
    if (sortStates[trierPar] === undefined || sortStates[trierPar] === 0) {
        sortStates[trierPar] = 1; //trie croissant
    } else if (sortStates[trierPar] === 1) {
        sortStates[trierPar] = -1; //trie decroissant
    } else if (sortStates[trierPar] === -1) {
        sortStates[trierPar] = 0; //pas de trie
    } else {
        sortStates[trierPar] = 1;
    }
    if (sortStates[trierPar] === 0) {
        array = [...Object.values(Country.all_countries)];
        removeAllElement("tbody");
        paginations(array, elementInPagination, 0);

        updateSortImage($(this).closest("td")[0], sortStates[trierPar]);

        return;
    }

    const sortDirection = sortStates[trierPar];

    array = [...Object.values(Country.all_countries)];

    switch (trierPar) {
        case "name":
            array.sort((a, b) => sortDirection * (a._name.localeCompare(b._name)));
            break;
        case "population":
            array.sort((a, b) => {
                return a._population === b._population
                    ? sortDirection * (a._name.localeCompare(b._name))
                    : sortDirection * (a._population - b._population);
            });
            break;
        case "surface":
            array.sort((a, b) => {
                return a._area == b._area
                    ? sortDirection * (a._name.localeCompare(b._name))
                    : sortDirection * (a._area - b._area);
            });
            break;
        case "density_pop":
            array.sort((a, b) => {
                return a.getPopDensity == b.getPopDensity
                    ? sortDirection * (a._name.localeCompare(b._name))
                    : sortDirection * (a.getPopDensity - b.getPopDensity);
            });
            break;
        case "region":
            array.sort((a, b) => {
                return !a._region.localeCompare(b._region)
                    ? sortDirection * (a._name.localeCompare(b._name))
                    : sortDirection * (a._region.localeCompare(b._region))
            });
            break;
        default:
            break;
    };

    updateSortImage($(this).closest("th")[0], sortDirection);

    removeAllElement("tbody");
    pageActuelle = 1;
    paginations(array, elementInPagination, 0);
});


$(document).ready(function () {
    // Initialiser la pagination
    paginations(array, elementInPagination, 0);

    // Actions sur les boutons de pagination
    $("#suiv").click(function () {
        paginations(array, elementInPagination, 1);
    });

    $("#prec").click(function () {
        paginations(array, elementInPagination, -1);
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
        paginations(array, elementInPagination, - pageActuelle + 1);
    });
    $("#langue").change(function () {
        paginations(array, elementInPagination, - pageActuelle + 1);
    });
    $("#nom_pays").on("input", function () {
        paginations(array, elementInPagination, - pageActuelle + 1);
    });
});