const bird_data = "data/nzbird.json";
const bird_display = document.getElementById("bird-cards");
const bird_array = [];
fetch(bird_data).then((response) => response.json()).then((data) => createBirdCards(data)).catch((error) => console.error(error));

function createBirdCards(data) {
  for (const bird of data) {
    const status = bird.status.split(" ");
    const birdID = bird.scientific_name.replaceAll(" ", "");
    const bird_card = ` <article class="bird-card" id="${birdID}">
    <div class="image-box">
      <img class="bird-image" src=${bird.photo.source} alt="picture of a ${bird.primary_name}"/>
      <div class="bird-title"> <h2>${bird.primary_name}</h2>
        <p class="credit">Photo by ${bird.photo.credit}</p>
      </div>
      <div role="img" aria-label="Conservation Status: ${bird.status}" class="status-colour-box ${status[status.length - 1]}"></div>
    </div>
    <section class="bird-details">
      <h3 class="english-name">${bird.english_name}</h3>
      <dl>
      <div class="bird-scientific-name">
        <dt>Scientific Name</dt>
        <dd>${bird.scientific_name}</dd>
      </div>
      <div class="bird-family">
        <dt>Family</dt>
        <dd>${bird.family}</dd>
      </div>
      <div class="bird-order">
        <dt>Order</dt>
        <dd>${bird.order}</dd>
      </div>
      <div class="bird-status">
        <dt>Status</dt>
        <dd>${bird.status}</dd>
      </div>
      <div class="bird-length">
        <dt>Length</dt>
        <dd>${bird.size.length.value} ${bird.size.length.units} </dd>
      </div>
      <div class="bird-weight">
        <dt>Weight</dt>
        <dd>${bird.size.weight.value} ${bird.size.weight.units}</dd>
      </div>
      </dl>
    </section>
  </article>`;
    bird_display.insertAdjacentHTML("beforeend", bird_card);
    bird.element = document.getElementById(`${birdID}`);
    bird_array.push(bird);
  }
}

const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    backToTopButton.classList.remove('hidden');
  } else {
    backToTopButton.classList.add('hidden');
  }
});
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

filter_button = document.getElementById("filter-button");
search_text = document.getElementById("search");
status_filter = document.getElementById("status");
sort_filter = document.getElementById("sort");
filter_button.addEventListener("click", function (event) {
  event.preventDefault();
  for (const bird_card of bird_array) {
    const search_text_equal = Object.values(bird_card).some((value) => value.toString().normalize("NFC").toLowerCase().includes(search_text.value.normalize("NFC").toLowerCase()));
    const status_equal = status_filter.value === "all" || bird_card.status.toLowerCase().includes(status_filter.value);
    bird_card.element.classList.toggle("hide", !search_text_equal || !status_equal);
  }
  switch (sort_filter.value) {
    case "none":
      bird_display.append(...[...bird_array].map((element) => element.element));
      break;
    case "lightestToHeaviest":
      bird_display.append(...[...bird_array].sort((a, b) => a.size.weight.value - b.size.weight.value).map((element) => element.element));
      break;
    case "heaviestToLightest":
      bird_display.append(...[...bird_array].sort((a, b) => b.size.weight.value - a.size.weight.value).map((element) => element.element));
      break;
    case "longestToShortest":
      bird_display.append(...[...bird_array].sort((a, b) => b.size.length.value - a.size.length.value).map((element) => element.element));
      break;
    case "shortestToLongest":
      bird_display.append(...[...bird_array].sort((a, b) => a.size.length.value - b.size.length.value).map((element) => element.element));
      break;
  }
  const numberOfResults = bird_array.filter(bird_card => !bird_card.element.classList.contains("hide")).length;
  document.getElementById("results-count").textContent = `${numberOfResults} result(s) found`;
}
);

const toggleButton = document.getElementById('dark-mode-toggle');
toggleButton.addEventListener('click', function() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  toggleButton.innerHTML = isDarkMode ? '<img id="lighticon" src="sun.png"></img>' : '<img id="darkicon" src="moon.png"></img>';
  localStorage.setItem('dark-mode', isDarkMode ? 'true' : 'false');
});
if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark-mode');
  toggleButton.innerHTML = '<img id="lighticon" src="sun.png"></img>';

}

document.getElementById('reset-filter').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('search').value = '';
  document.getElementById('status').value = 'all';
  document.getElementById('sort').value = 'none';
  filter_button.click();

});

document.getElementById('search').addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      filter_button.click();
  }
});

