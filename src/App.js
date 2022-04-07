import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {

    const [searchInputSetting, setSearchInputSetting] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const [pictType, setPictType] = useState("photo"); 
    const [pictNumber, setPictNumber] = useState("25");  
    
    const [displayPic, setDisplayPic] = useState([]);

    useEffect(() => {
      axios.get(
        `https://pixabay.com/api/?key=17555297-46a99d3dc7abf78679ec9e640${searchInputSetting}`
      ).then((res) => {
        let arrayTemp = []
        for (let i = 0; i < res.data.hits.length; i++) {
          arrayTemp.push(res.data.hits[i].previewURL)
        }
        setDisplayPic(arrayTemp)
      }).catch((err) => {
          console.log(err);
      });
    },[searchInputSetting])



    const handleSearchInput = (updateValue) => {
      setSearchInput(updateValue)
    }

    const handlepictType = (updateValue) => {
      setPictType(updateValue)
    }

    const handlepictNumber = (updateValue) => {
      setPictNumber(updateValue)
    }

    const setSearchQuery = (e) => {
      e.preventDefault()
      setSearchInputSetting(`&q=${searchInput}&image_type=${pictType}&per_page=${pictNumber}`)
    }



  return (
    <div>
        <nav class="bg-black sticky top-0">

            <form
            onSubmit={(e) => setSearchQuery(e)}
            class="flex flex-1 items-center justify-center items-stretch px-8 p-4 space-x-8">

              <img class="h-12 w-12 rounded-full" src="/loupe.jpg" alt="search Picto"></img>

                <input 
                    class="appearance-none border rounded text-gray-700"
                    type="text"
                    placeholder="Rechercher des images"
                    value = {searchInput}
                    onChange = {(e) => handleSearchInput(e.target.value)}
                    required
                ></input>

                <select
                    class="aborder rounded text-gray-700 px-2 leading-tight"
                    onChange = {(e) => handlepictType(e.target.value)}
                    value = {pictType}
                >
                    {[["photo","photographies"],["illustration","illustrations"],["vector","Vecteurs"]].map(element => <option value={element[0]}>{element[1]}</option>)}
                </select>

                <p
                  class="text-gray-300 font-bold grid place-content-center"
                >Résultats affichés:</p>


                <select
                    class="aborder rounded text-gray-700 px-2 leading-tight w-16"
                    onChange = {(e) => handlepictNumber(e.target.value)}
                    value = {pictNumber}
                >
                    {[10,25,50,100].map(element => <option value={element}>{element}</option>)}
                </select>

                <button
                    class="text-gray-300 border-2 border-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-bold"
                    type="submit"
                >Rechercher</button>

            </form>
            
        </nav>

        {!displayPic.length &&
          <div class="grid place-items-center m-64" > 
            "Aucun résultats trouvé. Veuillez effectuer une nouvelle recherche"
          </div>
        }
            
        <div class="p-8 flex flex-wrap justify-center" >
            {displayPic.map((pict, index) =>
                <img
                    class="h-auto w-auto m-4"
                    src={pict}
                    key={index}
                    alt="pict result"
                ></img>
            )}
        </div>
        

      </div>
  );
}

export default App;
