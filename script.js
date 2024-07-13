const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');




// This functon fetch movie information using OMDB API
 const getMovieInfo = async (movie) => {

    try{
        const myApiKey = '2108ae65';
        const url = ` http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
    
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Unable to fetch movie data.");
        }
        const data = await response.json();
        showMovieData(data);
    }catch(error){
        showErrorMessage("No Movie Found !!!")
    }
   // console.log(data);
 }

// Function to show movie details in UI
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');

    // Here data D-Structure done
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;
    
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
    
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    
    Genre.split(',').forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML  += `<p><strong>Released Date: </strong>${Released}</p>
                                <p><strong>Duration: </strong>${Runtime}</p>
                                <p><strong>Cast: </strong>${Actors}</p>
                                <p><strong>Plot: </strong>${Plot}</p>`;

    // Creating a div for Movie Poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src='${Poster}'/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}
// This function display Error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = ` <h2>${message}</h2>`
    movieContainer.classList.add('noBackground');
}


// This function to handle form submission
const handleFormSubmission = (e) =>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage('Fetching Movie Information please wait....')
        getMovieInfo(movieName);
    }
    else{
       showErrorMessage('Error Please Enter movie name for get information');
    }
}
// Here Add addEventListner on form
searchForm.addEventListener('submit', handleFormSubmission);


