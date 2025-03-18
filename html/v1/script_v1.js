function displayAllCountries(container_selecter, array) {
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

  $(container_selecter).append(html)
}

$(document).ready(function () {
  displayAllCountries("tbody", Object.values(Country.all_countries));
});