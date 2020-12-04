const btnSearch = document.querySelector('.btn-search');

btnSearch.addEventListener('click', async function () {
    const searchKeyword = document.querySelector('.movie-keyword');
    const movies = await getMovies(searchKeyword.value);
    updateUI(movies);
    searchKeyword.value = '';
});

function getMovies(keyword) {
    return fetch(`http://www.omdbapi.com/?apikey=9c8fa799&s=${keyword}`)
        .then(response => response.json())
        .then(response => response.Search);
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = cards;
}

function showCards(movie) {
    return `<div class="col-md-4 my-3">
                <div class="card" style="width: 18rem;">
                    <img src="${movie.Poster}"
                        class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">Year: ${movie.Year}</p>
                        <a class="btn btn-primary btn-detail" data-imdbid="${movie.imdbID}" data-toggle="modal" data-target="#detail-modal">Show detail</a>
                    </div>
                </div>
            </div>`
}


// event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('btn-detail')) {
        const imdbID = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbID);
        updateDetailModal(movieDetail);
    }
});

// get movie detail
function getMovieDetail(movieId) {
    return fetch(`http://www.omdbapi.com/?apikey=9c8fa799&i=${movieId}`)
        .then(response => response.json())
        .then(movie => movie);
}

function updateDetailModal(movie) {
    const movieDetail = showModalDetail(movie);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function showModalDetail(movie) {
    return `<div class="row">
                <div class="col-md-3">
                    <img class="img-fluid"
                        src="${movie.Poster}">
                </div>
                <div class="col">
                    <h3>${movie.Title} (${movie.Year})</h3>
                    <p>Genre: <strong>${movie.Genre}</strong></p>
                    <p>Actors: <strong>${movie.Actors}</strong></p>
                    <p>Director: <strong>${movie.Director}</strong></p>
                    <p>Writers: <br> ${movie.Writer}</p>
                    <p>Plot: <br> ${movie.Plot}</p>
                </div>
            </div>`
}