const apiKey = '12b42543';
const form = document.querySelector("form");
const input = document.querySelector("#movie");
const movieList = document.querySelector("#movie-list");
const urlMovie = `http://img.omdbapi.com/?apikey=${apiKey}&`

form.addEventListener("submit", (event) => { //  lorsque vous soumettez le formulaire (en cliquant sur le bouton "Envoyer"), une fonction sera appelée.
  event.preventDefault(); // empêche le comportement par défaut du formulaire d'être exécuté
  const movie = input.value;  // récupère la valeur saisie dans le champ de saisie de texte
  movieList.innerHTML = ''; //  vide le contenu de l'élément HTML qui est stocké dans la variable "movieList". Cela signifie que lorsque vous effectuez une nouvelle recherche, les résultats précédents sont effacés.
  
  fetch(`http://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`) // envoie une demande à l'API OMDB pour obtenir les informations sur le film que vous avez recherché.
    .then(response => response.json()) //  prend la réponse de l'API et la transforme en un format de données qu'on peut utiliser en javascript.
    .then(data => { 
       data.Search.forEach((movie) => { // parcourt les résultats de la recherche et pour chaque film dans les résultats, elle crée un élément HTML qui contient une image de l'affiche du film, le titre et l'année de sortie.
        console.log(data);
        
          const movieItem = document.createElement("div");
          movieItem.classList.add("col-sm-4", "popo");
          movieItem.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
            <div class="col-md-4">
            <img src="${movie.Poster}" class="img-fluid rounded-start" alt="${movie.Title}" >
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">Année de sortie: ${movie.Year}</p>
                <button href="#" class="btn btn-secondary" onclick="showDescription('${movie.imdbID}')"> Read more</button>
            </div>
            </div>
        </div>
        </div>`
        
          movieList.appendChild(movieItem); // ajoute l'élément créé à la liste de films affichée sur votre page web.
        });
    })
    .catch(error => console.log(error)); // permet de gérer les erreurs qui peuvent se produire lors de la demande à l'API. Si une erreur se produit, elle sera affichée dans la console pour vous permettre de la résoudre.
});

function showDescription(imdbID) {
    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&lang=fr`)
      .then(response => response.json())
      .then(data => {
        const modalTitle = document.querySelector('#movieModalLabel');
        const modalBody = document.querySelector('.modal-body');
        modalTitle.innerHTML = data.Title;
        modalBody.innerHTML = `<p>Résumé: ${data.Plot}</p><p>Réalisateur:  ${data.Director}</p><p>Sortie le:  ${data.Released}</p>`;
        $('#movieModal').modal('show');
        console.log(data);


      })
      .catch(error => console.log(error));
  }



