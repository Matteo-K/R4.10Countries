function displayAllCountries(container_selecter, array) {
  const html = `
    ${array.map(country => `
      <tr>
        <td>${country._name}</td>
        <td>${country._population} hab.</td>
        <td>${Math.round(country._area)} km<sup>2</sup></td>
        <td>${parseFloat(country.getPopDensity).toFixed(3)} hab/km<sup>2</sup></td>
        <td>${country._region}</td>
        <td><img src="${country._img || "N/A"}" alt="Drapeau du pays ${country._name}" title="Saint-Vincent-et-les-Grenadines" ></td>
        </td>
      </tr>
    `).join('')}
  `;

  $(container_selecter).append(html)
}

$(document).ready(function () {
  displayAllCountries("tbody", Object.values(Country.all_countries));
});