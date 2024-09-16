import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieSlider.css"; // Custom style uchun

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://backend-movies-pi.vercel.app/movies");
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 h-[40vh] ">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>

      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-[200px] object-cover cursor-pointer"
              onClick={() => setSelectedMovie(movie)}
            />
            <h2 className="text-center mt-2 font-semibold">{movie.title}</h2>
          </div>
        ))}
      </Slider>

      {selectedMovie && (
  <div className="mt-10 p-6 border overflow-hidden rounded-lg shadow-black shadow-lg w-1/2 mx-auto ">
    <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
    <img
      src={selectedMovie.poster}
      alt={selectedMovie.title}
      className="w-[300px] min-h-full  float-left mr-4"
    />
    <p><strong>Director:</strong> {selectedMovie.director}</p>
    <p><strong>Cast:</strong> {selectedMovie.cast.join(", ")}</p>
    <p><strong>Year:</strong> {selectedMovie.year}</p>
    <p><strong>Rating:</strong> {selectedMovie.rating}</p>
    <p><strong>Synopsis:</strong> {selectedMovie.synopsis}</p>

    {selectedMovie.trailer && (
      <div className="mt-4 flex flex-col">
        <h3 className="text-xl font-semibold mb-2">Trailer</h3>
        <iframe
          src={selectedMovie.trailer}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-[70%] h-[200px]"
        ></iframe>
      </div>
    )}
  </div>
)}

    </div>
  );
};

// Next tugma
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next absolute right-5 top-1/2 transform -translate-y-1/2 `}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

// Prev tugma
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev absolute left-5 top-1/2 transform -translate-y-1/2 `}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

export default MovieSlider;
