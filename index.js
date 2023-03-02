const searchAllData = async (id) => {
  const container = document.getElementById('single-player-details').innerHTML = '';
  document.getElementById('male').classList.add('d-none');
  document.getElementById('female').classList.add('d-none');



  const inputValue = document.getElementById('search-value').value;
  document.getElementById('spinner').classList.remove('d-none');

  const searchID = id || inputValue;  //shorthand operator

  const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchID}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(url);
  document.getElementById('spinner').classList.add('d-none');

  displayData(data.player);
}
const displayData = (players) => {
  document.getElementById('search-value').value = '';
  // console.log(players);
  const container = document.getElementById('player-info');
  container.innerHTML = ''
  players.forEach(player => {
    const { strThumb, strPlayer, strNationality, idPlayer } = player //destracturing
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card w-100" style="height: 500px; width: 100px;">
          <img src="${strThumb ? strThumb : "https://picsum.photos/500/300?random=1"}" class="card-img-top w-100 h-75 img-fluid" style="object-fit: cover;"  alt="...">
          <div class="card-body w-full">
            <h5 class="card-title">${strPlayer}</h5>
            <p class="card-text">${strNationality}</p>
          </div>
         <div class="my-3 mx-3">
         <button onclick="singlePlayer('${idPlayer}')" type="button" class="btn btn-success">Details</button>
         <button type="button" class="btn btn-danger">Delete</button>
         </div>

        </div>`;
    container.appendChild(div);
  });
}
const singlePlayer = (id) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
  // console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => showSinglePlayer(data.players[0]))
}
const showSinglePlayer = (data) => {
  const { strGender } = data;

  const container = document.getElementById('single-player-details');
  const div = document.createElement('div');

  if (strGender === 'Male') {
    document.getElementById('male').classList.remove('d-none');

  } else {
    document.getElementById('female').classList.remove('d-none');
  }
  div.innerHTML = `
    <div class="card mb-3 w-100 h-100" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${data.strThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data.strPlayer}</h5>
        <p class="card-text">${data.strDescriptionEN.slice(0, 100) + "...."}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            </div>
        </div>
        </div>
        `;
  container.appendChild(div);

}
document.getElementById('search-value').addEventListener('keypress', function (e) {
  console.log(e.key);
  if (e.key === 'Enter') {
    searchAllData();
  }
});

searchAllData("messi")