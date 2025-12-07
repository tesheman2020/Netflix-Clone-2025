// import React from "react";
// import "./Banner.css";
// import instance from "../../utlis/axios";
// import requests from "../../utlis/requests";
// import { useEffect, useState } from "react";


// const Banner = () => {
//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     (async () => {
//       try {
//           const request = await instance.get(requests.fetchNetflixOriginals);
          
          
//         // Select a random movie from the results array
//         setMovie(
//           request.data.results[
//             Math.floor(Math.random() * request.data.results.length)
//           ]
//         );
//       } catch (error) {
//         console.log("error", error);
//       }
//       })();
//           // Empty dependency array ensures this runs once when the component mounts
//   }, []);
    
//   // Text truncation function
//         const truncate = (str, n) => {
//           return str?.length > n ? str.substring(0, n - 1) + "..." : str;
//         };

//   return (
//     <div
//       className="banner"
//       style={{
//         backgroundSize: "cover",
//         backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`, // Using template literal here: "none",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="banner__contents">
//         <h1 className="banner__title">
//           {movie?.title || movie?.name || movie?.original_name}
//         </h1>
//         <div className="banner__buttons">
//           <button className="banner__button">Play</button>
//           <button className="banner__button">My List</button>
//         </div>
//          {/* <h1 className"banner__description">{truncate(movie?.overview, 150)}</h1> */}
//       </div>
//       <div className="bunner__fadeButtom" />
//     </div>
//   );
// };

// export default Banner;



import React, { useEffect, useState } from "react";
import "./Banner.css";
import instance from "../../utlis/axios";
import requests from "../../utlis/requests";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  // Optional text truncation function
//   const truncate = (str, n) => {
//     return str?.length > n ? str.substring(0, n - 1) + "..." : str;
//   };

  useEffect(() => {
    (async () => {
      try {
        const request = await instance.get(requests.fetchNetflixOriginals);
        const results = request.data.results;

        setMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);
      const truncate = (str, n) => {
        return str?.length > n ? str.substring(0, n - 1) + "..." : str;
      };

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
          : "none",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      {/* FIXED: "bunner" → "banner", "fadeButtom" → "fadeBottom" */}
      <div className="bunner__fadeBottom" />
    </div>
  );
};

export default Banner;
