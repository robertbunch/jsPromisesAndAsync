const apiKey = `e9ddb24aed6d48c4342303aba5269e28`;
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const imgUrl = `http://image.tmdb.org/t/p/w300/`;

// WRONG WAY
// let globalMovieData = [];
// $.ajax({
// 	url: apiUrl+"Interstellar",
// 	method: `get`,
// 	success: (movieData) => {
// 		console.log(movieData)
// 		globalMovieData = movieData.results
// 	}
// });
// // globalMovieData = movieData.results
// console.log(globalMovieData)

// The Promise Way
function getMovieData(movieTitle){
	return new Promise((resolve, reject)=>{
		$.ajax({
			url: apiUrl+movieTitle,
			method: 'get',
			success: (movieData)=>{
				// console.log(movieData)
				resolve(movieData.results);
			},
			error: (errorMsg)=>{
				reject(errorMsg)
			}
		})
	})
}

document.getElementById('movie-form').addEventListener('submit',(event)=>{
	event.preventDefault();
	// console.log("Form Submitted");
	const movieTitle = document.getElementById('movie-title').value;
	const movieData = getMovieData(movieTitle);
	console.log(movieData);
	// I WANT TO PUT THE MOVIE INFO ON THE MAIN PAGE!!!
	movieData.then((data)=>{
		// console.log(data);
		document.getElementById('movies').innerHTML = `<img src=${imgUrl}${data[0].poster_path} />`
	}).catch((errorMsg)=>{
		console.log(errorMsg)
	})
});