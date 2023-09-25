import { useState } from "react";

function Search(){

  const [city, setCity] = useState("")


  function searchInput(e){
    e.preventDefault();
    //setCity("");
    let currentValue = document.querySelector('input[name=searchInput]').value;
    /* alert(currentValue); */

    /* Fazer requisição API depois*/

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric&lang=pt_br`;
    fetch(url)

    .then(response=> response.json())

    .then(data=>{

        const {main, name, sys, weather} = data;

        if(sys != undefined){

        if(weather != undefined) {
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
          setCity(`
          
          <div class="containerCity">
          <p>Cidade: ${name}</p>
          <p>País: ${sys.country}</p>
          <p>Temperatura: ${main.temp}</p>
          <p>Céu: ${weather[0]['description']}</p>
          <img src="${icon}" />
          </div>

          `)
        }

      }else{
        setCity("");
      }

    })
  }

  return (
    <div className="searchWraper">
      <div className="search">
        <h2>Digite a cidade que deseja... ⛅</h2>
        <form onSubmit={(e)=>searchInput(e)}>
        <input placeholder="Digite aqui..." type="text" name="searchInput"/>
        <input type="submit" value="Pesquisar por cidade!"/>
        </form>
      </div>

      {
        (city!="")?
        <div dangerouslySetInnerHTML={{__html: city}}/>:

        <div>
          Pesquise por algo acima!
        </div>
      }

    </div>
  )
}

export default Search;