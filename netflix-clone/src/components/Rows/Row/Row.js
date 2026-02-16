
import React, { useEffect, useState } from "react";
import "./row.css";
import axios from "../../../utlis/axios";
import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(fetchUrl);
        const request = await axios.get(fetchUrl);
        console.log(request.data);
        setMovies(request.data.results);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        // Detect if it is a TV show or movie
        const type = movie.media_type === "tv" || movie.first_air_date ? "tv" : "movie";

        const request = await axios.get(
          `/${type}/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        const trailer = request.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerUrl(trailer.key);
        } else {
          console.log("No trailer found");
        }
      } catch (error) {
        console.log("Trailer fetch error:", error);
      }
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row__posters">
        {movies?.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title || movie.name}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          />
        ))}
      </div>

      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;




// import React, { useEffect, useState } from "react";
// import "./row.css";
// import axios from "../../../utlis/axios";
// import movieTrailer from "movie-trailer";
// import YouTube from "react-youtube";

// const Row = ({ title, fetchUrl, isLargeRow }) => {
//   const [movies, setMovie] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState("");

//   const base_url = "https://image.tmdb.org/t/p/original";

//   useEffect(() => {
//     (async () => {
//       try {
//         console.log(fetchUrl);
//         const request = await axios.get(fetchUrl);
//         console.log(request);
//         setMovie(request.data.results);
//       } catch (error) {
//         console.log("error", error);
//       }
//     })();
//   }, [fetchUrl]);

//     const handleClick = (movie) => {
//       if (trailerUrl) {
//         setTrailerUrl("");
//       } else {
//           movieTrailer(movie?.title || movie?.name || movie.original_name).then((url) => {
//             console.log(url);
//             const urlParams = new URLSearchParams(new URL(url).search);
//             console.log(urlParams);
//             console.log(urlParams.get("v"));
//             setTrailerUrl(urlParams.get("v"));
//           });
//       }
//     };

//   const opts = {
//     height: "390",
//     width: "100%",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   return (
//     <div className="row">
//       <h1>{title}</h1>
//       <div className="row__posters">
//         {movies?.map((movie, index) => (
//           <img
//             onClick={() => handleClick(movie)}
//             key={index}
//             src={`${base_url}${
//               isLargeRow ? movie.poster_path : movie.backdrop_path
//             }`}
//             alt={movie.name}   
        
//             className={`row__poster ${isLargeRow && "row__posterLarge"}`}
//           />
//         ))}
//       </div>
//       <div style={{ padding: "40px" }}>
//         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//       </div>
//     </div>
//   );
// };

// export default Row;
