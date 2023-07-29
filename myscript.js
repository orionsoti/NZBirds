const bird_data = "data/nzbird.json";
const bird_display = document.getElementById("bird-cards");
const bird_array = [];
fetch(bird_data).then((response) => response.json()).then((data) => createBirds(data)).catch((error) => console.error(error));

function createBirds(data) {
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
  </article>
`;
    bird_display.insertAdjacentHTML("beforeend", bird_card);
    bird.element = document.getElementById(`${birdID}`);
    bird_array.push(bird);
  }
}

document.getElementById('toggle-sidebar').addEventListener('click', function() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
});
