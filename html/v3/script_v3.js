let details_prec = null;
let details_img = null;

function displayAllCountries(container_selecter, array) {
  const html = `
    ${array.map(country => `
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
          <h3>Pays voisins&nbsp;:</h3>
          <ul>
          ${country._borders.map((voisin) => `
            <li>
              <figure>
                <img src="${Country.all_countries[voisin]._img || "../assets/img/drapeau_default.png"}" 
                  alt="${Country.all_countries[voisin]._name}" 
                  title="${Country.all_countries[voisin]._name}"
                >
                <figcaption>${Country.all_countries[voisin]._name}</figcaption>
              </figure>
            </li>
          `).join('')}
          </ul>
        </td>
      </tr>
    `).join('')}
  `;

  $(container_selecter).append(html)
}

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

$(document).ready(function () {
  displayAllCountries("tbody", Object.values(Country.all_countries));
});

$("#img_countries").on("click", () => {
  $("#img_countries").removeClass("imgDetailsOpen");
});