import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {

    const [displayPic, setDisplayPic] = useState([]);
    const [noResult, setnoResult] = useState(false);

    useEffect(() => {
        axios.get(
          `https://pixabay.com/api/?key=17555297-46a99d3dc7abf78679ec9e640&`
        ).then((res) => {
          let arrayTemp = []
          for (let i = 0; i < res.data.hits.length; i++) {
            arrayTemp.push(res.data.hits[i].previewURL)
          }
          setDisplayPic(arrayTemp)
          console.log(arrayTemp);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const setSearchQuery = async () => {

      const searchInput = document.getElementById("KWSInput").value
      const pictType = document.getElementById("pictType").value
      const pictNumber = document.getElementById("pictNumber").value
      const searchSetting = searchInput + `&image_type=${pictType}` + `&per_page=${pictNumber}`

      await axios.get(
        `https://pixabay.com/api/?key=17555297-46a99d3dc7abf78679ec9e640&q=${searchSetting}`
      ).then((res) => {
        let arrayTemp = []
        for (let i = 0; i < res.data.hits.length; i++) {
          arrayTemp.push(res.data.hits[i].previewURL)
        }
        setDisplayPic(arrayTemp)
        if (arrayTemp.length === 0) {
            setnoResult(true)
        } else {
            setnoResult(false)
        }
      }).catch((err) => {
          console.log(err);
      });

    
      document.getElementById('KWSInput').value = ''

    }

  return (
    <div>
        <nav class="bg-black sticky top-0">
            <div class="flex flex-1 items-center justify-center items-stretch px-8 p-4 space-x-8">
              <img class="h-12 w-12 rounded-full" src="/loupe.jpg"></img>

                <input 
                    class="appearance-none border rounded text-gray-700"
                    type="text"
                    id='KWSInput'
                    placeholder="Rechercher des images"
                    required
                ></input>

                <select
                    class="aborder rounded text-gray-700 px-2 leading-tight"
                    id="pictType" 
                >
                    <option value="photo" selected>photographies</option>
                    <option value="illustration" >illustrations</option>
                    <option value="vector" >Vecteurs</option>
                </select>

                <p
                  class="text-gray-300 font-bold grid place-content-center"
                >Résultats affichés:</p>

                <select
                    class="aborder rounded text-gray-700 px-2 leading-tight w-16"
                    id="pictNumber" 
                >
                    <option value="10" >10</option>
                    <option value="25" selected>25</option>
                    <option value="50" >50</option>
                    <option value="100" >100</option>
                </select>

                <button
                    class="text-gray-300 border-2 border-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold"
                    onClick={setSearchQuery}
                >Rechercher</button>

            </div>
        </nav>

        {noResult ?
          <div class="grid place-items-center m-64" > 
            "Aucun résultats trouvé. Veuillez effectuer une nouvelle recherche"
          </div>
        :
            <div class="p-8 flex flex-wrap justify-center" >
                {displayPic.map(pict =>
                    <img
                        class="h-auto w-auto m-4"
                        src={pict}
                    ></img>
                )}
            </div>
        }
        

      </div>
  );
}

export default App;
