const elementInPagination = 25;
let pageActuelle = 1;

function displayAllCountries(container_selector, array) {
  const html = `
    ${array.map(country => `
      <tr>
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
    `).join('')}
  `;

  $(container_selector).append(html);
}

function paginations(array, nbElements = elementInPagination, progression) {
  const totalPages = Math.ceil(array.length / nbElements);
  removeAllElement("tbody");
  pageActuelle += progression;

  // Calcul de la tranche des pays à afficher pour la page actuelle
  displayAllCountries("tbody", array.slice((pageActuelle-1) * nbElements, pageActuelle * nbElements));


  // Mettre à jour les boutons de pagination
  if (pageActuelle > 1 && pageActuelle < totalPages) {
    $("#prec").prop("disabled", false);
    $("#suiv").prop("disabled", false);
  }
  if (pageActuelle === 1) {
    $("#prec").prop("disabled", true);
  }
  if (pageActuelle === totalPages) {
    $("#suiv").prop("disabled", true);
  }

  // Mettre à jour l'affichage de la page
  $(".spanPage").text(`Page ${pageActuelle}`);
  window.scrollTo({
    top: 0,
    behavior: "smooth"});
}

function removeAllElement(container_selector) {
  $(container_selector).empty();
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
});
