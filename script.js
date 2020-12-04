const btnSearch = document.querySelector('.btn-search');

btnSearch.addEventListener('click', async function(){
    const searchKeyword = document.querySelector('.movie-keyword');
    const movies = await getMovies(searchKeyword.value);
    updateUI(movies);
    searchKeyword.value = '';
});

function getMovies(keyword){
    return fetch(`http://www.omdbapi.com/?apikey=9c8fa799&s=${keyword}`)
    .then(response => response.json())
    .then(response => response.Search);
}

function updateUI(movies){
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = cards;
}

function showCards(movie){
    return `<div class="col-md-4 my-3">
                <div class="card" style="width: 18rem;">
                    <img src="${movie.Poster}"
                        class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">Year: ${movie.Year}</p>
                        <a class="btn btn-primary" data-toggle="modal" data-target="#detail-modal">Show detail</a>
                    </div>
                </div>
            </div>`
}