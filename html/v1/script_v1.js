function displayAllCountries(container_selecter, array) {
  const html = `
    ${array.map(country => `
      <tr>
        <td>
          <label><span>${"BONJOUR"}&nbsp:</span>${"BONJOUR"}</label>
        </td>
      </tr>
    `).join('')}
  `;

  $(container_selecter).append(html)
}

$(document).ready(function () {
  displayAllCountries("table", Object.values(Country.all_countries));
});