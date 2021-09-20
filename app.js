async function getCountries() {
    try {
        let res = await fetch("https://restcountries.eu/rest/v2/all");
        return await res.json();

    } catch (error) {
        console.log(error);
    }
}


let countries = [];

async function renderAllCountries() {

    countries = await getCountries();
    let html = '';

    countries.forEach(country => {
        let htmlSegment = ` <div class="box">
        <div class="card-body">
          <h2>${country.name}</h2>
          <p>Capital: ${country.capital}</p>
          <p>Region: ${country.region}</p>
          <p>Population: ${country.population}</p><br /><br />
          <img src="${country.flag}" alt="Card image">
          <button type="button" class="btn btn-primary" onclick="getCountryDetails('${country.name}')">See Profile</button>
          </div> </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.allCountries');
    container.innerHTML = html;

}

renderAllCountries();

function getSearchResults(val) {
    if ($("#searchForm").valid()) {
        $('.allCountries,.filterContainer,.seeCountryContainer').hide();
        let html = '';
        countries.forEach(country => {
            if (country.alpha2Code === val.toUpperCase() || country.alpha3Code.startsWith(val.toUpperCase()) || country.name.toUpperCase().startsWith(val.toUpperCase()) || country.capital.toUpperCase().startsWith(val.toUpperCase())) {

                let htmlSegment = ` <div class="box">
                <div class="card-body">
                <h2 class="card-title">${country.name}</h2>
                <p>Capital: ${country.capital}</p>
                <p>Region: ${country.region}</p>
                <p>Population: ${country.population}</p><br /><br />
                <img  src="${country.flag}" alt="Card image" >
                <button type="button" class="btn btn-primary" onclick="getCountryDetails('${country.name}')">See Profile</button>
                </div></div>`;


                html += htmlSegment;
            }
        });


        let container = document.querySelector('.searchContainer');
        $('.searchContainer').show();
        container.innerHTML = html;
    }
}

function showInput(val) {
    if (val == "population") {
        $('.filterInput2').show();
    } else {
        $('.filterInput2').hide();
    }
}

function getFilterResults(val1, val2) {
    if ($('#filterForm').valid()) {
        $('.allCountries,.searchContainer,.seeCountryContainer').hide();
        let html = '';
        if ($('#filter').val() == "population") {
            countries.forEach(country => {
                if (country.population >= parseInt(val1) && country.population <= parseInt(val2)) {
                    let htmlSegment = ` <div class="box">
                <div class="country-details">
                <div class="card-body">
                <h2 class="card-title">${country.name}</h2>
                <p>Capital: ${country.capital}</p>
                <p>Region: ${country.region}</p>
                <p>Population: ${country.population}</p><br /><br />
                <img  src="${country.flag}" alt="Card image" >
                <button type="button" class="btn btn-primary" onclick="getCountryDetails(${country.name})">See Profile</button>
                </div>
                
                </div></div>`;
                    html += htmlSegment;
                }
            });
        } else if ($('#filter').val() == "languages" || $('#filter').val() == "currencies") {
            countries.forEach(country => {

                var counter = $('#filter').val();
                console.log(counter)
                country[counter].forEach(item => {
                    if (item.name != null) {
                        if (val1.toUpperCase() === item.name.toUpperCase()) {
                            let htmlSegment = ` <div class="box">
                            <div class="card-body">
                            <h2 class="card-title">${country.name}</h2>
                            <p>Capital: ${country.capital}</p>
                            <p>Region: ${country.region}</p>
                            <p>Population: ${country.population}</p><br /><br />
                            <img  src="${country.flag}" alt="Card image" >
                            <button type="button" class="btn btn-primary" onclick="getCountryDetails(${country.name})">See Profile</button>
                            </div>
                            
                            </div>`;
                            html += htmlSegment;
                        }
                    }
                });

                console.log(counter);
            });

        } else if ($('#filter').val() === "timezones") {
            var count = 0;
            countries.forEach(country => {

                var counter = $('#filter').val();
                console.log(counter)
                country.timezones.forEach(item => {

                    if (item != null) {
                        if (val1.toUpperCase() === item.toUpperCase()) {
                            count++;
                            let htmlSegment = ` <div class="box">
                            <div class="card-body">
                            <h2 class="card-title">${country.name}</h2>
                            <p>Capital: ${country.capital}</p>
                            <p>Region: ${country.region}</p>
                            <p>Population: ${country.population}</p><br /><br />
                            <img  src="${country.flag}" alt="Card image" >
                            <button type="button" class="btn btn-primary" onclick="getCountryDetails(${country.name})">See Profile</button>
                            </div>
                            
                            </div>`;
                            html += htmlSegment;
                        }
                    }
                });

                console.log(count);
            });
        } else if ($('#filter').val() === "region") {
            var count = 0;
            countries.forEach(country => {

                if (val1.toUpperCase() === country.region.toUpperCase()) {
                    count++;
                    let htmlSegment = ` <div class="box">
                      <div class="card-body">
                      <h2 class="card-title">${country.name}</h2>
                      <p>Capital: ${country.capital}</p>
                      <p>Region: ${country.region}</p>
                      <p>Population: ${country.population}</p><br /><br />
                      <img  src="${country.flag}" alt="Card image" >
                      <button type="button" class="btn btn-primary" onclick="getCountryDetails(${country.name})">See Profile</button>
                      </div>
                      
                     </div>`;
                    html += htmlSegment;

                }
            });

            console.log(count);

        }

        let container = document.querySelector('.filterContainer');
        $('.filterContainer').show();
        container.innerHTML = html;
    }
}

function getCountryDetails(val) {
    let html = '';
    countries.forEach(country => {

        if (val.toUpperCase() === country.name.toUpperCase()) {
            let htmlSegment = ` <div class="box">
            <div class="card-body">
              <h2 class="card-title">${country.name}</h2>
              <p>Capital: ${country.capital}</p>
              <p>Alpha2Code: ${country.alpha2Code}</p>
              <p>latlng: ${country.latlng[0]} , ${country.latlng[1]}</p>
              <p>area: ${country.area}</p>
              <p>Timezone:`

            for (let i = 0; i < (country.timezones).length; i++) {

                if (i == (country.timezones).length - 1) {
                    htmlSegment += ` ${country.timezones[i]} `;

                } else {
                    htmlSegment += ` ${country.timezones[i]} `;
                }
            }
            htmlSegment += `</p><p>numeric code: ${country.numericCode}</p>
              <p>Region: ${country.region}</p>
              <p>Population: ${country.population}</p>
              <p>Neighbour countries: <br />`

            for (let i = 0; i < (country.borders).length; i++) {

                for (let j = 0; j < (countries).length; j++) {

                    if (country.borders[i] != undefined && countries[j].alpha3Code != undefined) {
                        if (country.borders[i] == countries[j].alpha3Code) {

                            htmlSegment += `<button type="button" id="${countries[j].alpha3Code}" class="btn btn-primary" onclick="getCountryDetails('${countries[j].name}')">${countries[j].name}</button>`;

                        }
                    }
                }
            }


            htmlSegment += `</p><br /><br /><p>Currencies: `

            for (let i = 0; i < (country.currencies).length; i++) {

                if (i == (country.currencies).length - 1) {
                    htmlSegment += ` ${country.currencies[i].name} `;

                } else {
                    htmlSegment += ` ${country.currencies[i].name} `;
                }
            }


            htmlSegment += `</p>`

            htmlSegment += `</p><p>Official languages: `

            for (let i = 0; i < (country.languages).length; i++) {

                if (i == (country.languages).length - 1) {
                    htmlSegment += ` ${country.languages[i].name} `;

                } else {
                    htmlSegment += ` ${country.languages[i].name} `;
                }
            }

            htmlSegment += `</p><br /><br />
            <img  src="${country.flag}" alt="Card image" >
            </div>
            
          </div>`;
            html += htmlSegment;

        }
    });
    $('.allCountries,.searchContainer,.filterContainer').hide();
    let container = document.querySelector('.seeCountryContainer');
    $('.seeCountryContainer').show();
    container.innerHTML = html;
}