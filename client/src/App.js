import React, { useState, useEffect } from "react";
import axios from "axios";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import { Switch, Route } from "react-router-dom/";
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";

export default function App() {
  const [saved, setSaved] = useState([{ id: "" }]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          // Bu kısmı log statementlarıyla çalışın
          console.log(response);

          /* console.log(response.data); */

          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    ( !(saved.find(o => o.id === 'id'))) ? setSaved(...saved, {id:id});
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi
        list={
          [
            /* Burası esnek */
          ]
        }
      />
      <Switch>
        <Route path="/" exact>
          <FilmListesi />
        </Route>

        <Route path="/filmler/:id" exact>
          <Film />
        </Route>
      </Switch>
    </div>
  );
}
