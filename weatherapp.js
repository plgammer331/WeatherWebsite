const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".inputcity")
const card=document.querySelector(".Weather-info")
const apiKey="91ce06abd636e42f5ca00715e72c68e9";
weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();
    const city=cityInput.value;
    if(city){
        try{
            const weatherData= await getweatherData(city);
            displayweatherInfo(weatherData);
        }catch(error){
            console.error(error);
            displayError(error);

        }

    }else{
        displayError("please enter a city")
    }

});

async function getweatherData(city){
const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const response= await fetch(apiUrl);
 
    if(!response.ok){
        throw new Error("could not fetch weather data")
    }
    return await response.json();
}
function displayweatherInfo(data){
    const {name: city, 
        main:{temp, humidity},
         weather: [{description, id}]} =data;   

         card.textContent="";
         card.style.display="flex";

         const cityDisplay=document.createElement("h1");
         const tempDisplay=document.createElement("p");
         const humiditydisplay=document.createElement("p");
         const descDisplay=document.createElement("p");
         const weatherEmoji=document.createElement("p");

         cityDisplay.textContent=city;
         tempDisplay.textContent=`${(temp -273.15).toFixed(1)}°C`;
        humiditydisplay.textContent=`Humidity: ${humidity}`;
        descDisplay.textContent=description;

         
        
        cityDisplay.classList.add(".cityName");
         tempDisplay.classList.add("Temp");
         humiditydisplay.classList.add("humidityDisplay")
         descDisplay.classList.add("Description")

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humiditydisplay);
        card.appendChild(descDisplay);

}

function displayError(message){
const errorDisplay=document.createElement("p")
errorDisplay.textContent=message
errorDisplay.classList.add("Error")

card.textContent="";
card.style.display="flex";
card.appendChild(errorDisplay);

}