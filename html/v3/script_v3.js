let details_prec = null;
let details_img = null;

function displayAllCountries(container_selecter, array) {
  const html = `
    ${array.map(country => `
      <tr id="${country._alpha3Code}" onclick="clickCountry(event)">
        <td>${country._name}</td>
        <td>${country._population} hab.</td>
        <td>${Math.round(country._area)} km<sup>2</sup></td>
        <td>${parseFloat(country.getPopDensity).toFixed(3)} hab/km<sup>2</sup></td>
        <td>${country._region}</td>
        <td><img src="${country._img || "N/A"}" alt="Drapeau du pays ${country._name}" title="${country._name}" ></td>
        <article>
        </article>
      </tr>
    `).join('')}
  `;

  $(container_selecter).append(html)
}

function clickCountry(event) {
  $(`#${details_prec}`).removeClass("detailsOpen");

  // Click en dehors de l'image
  if (event.target.localName !== "img") {
    // Si le clique précédent n'était pas sur la ligne alors on ouvre
    if (details_prec != event.target.parentNode.id) {
      details_prec = event.target.parentNode.id;
      $(`#${details_prec}`).addClass("detailsOpen");
    
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

$(document).ready(function () {
  displayAllCountries("tbody", Object.values(Country.all_countries));
});

$("#img_countries").on("click", () => {
  $("#img_countries").removeClass("imgDetailsOpen");
});