import React from "react";
import { useHistory } from "react-router-dom/";
import FilmCard from "./FilmCard";

export default function FilmListesi(props) {
  const history = useHistory();
  const { movies } = props;

  return (
    <div className="movie-list">
      {movies?.map((movie) => (
        <div>
          <FilmDetaylari key={movie.id} movie={movie} />
        </div>
      ))}
    </div>
  );
}

function FilmDetaylari(props) {
  const { title, director, metascore } = props.movie;

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
    </div>
  );
}
