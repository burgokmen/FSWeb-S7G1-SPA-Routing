import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom/";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          // Bu kısmı log statementlarıyla çalışın
          console.log(response.data);

          /* console.log(response.data); */

          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    const foundM = saved.find((m) => m.id === id);
    if (!foundM) {
      const movie = movieList.find((m) => m.id === id);
      setSaved([...saved, movie]);
    }
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <Router>
      <div>
        <KaydedilenlerListesi list={saved} />
      </div>
      <div>
        <Switch>
          <Route path="/" exact>
            <FilmListesi movies={movieList} />
          </Route>

          <Route path="/filmler/:movieId" exact>
            <Film kaydedilenlerListesineEkle={KaydedilenlerListesineEkle} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
