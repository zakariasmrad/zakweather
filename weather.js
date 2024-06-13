let zhistory = JSON.parse(localStorage.getItem('zhistory')) || [];
let hist = JSON.parse(localStorage.getItem('hist')) || [];
console.log(zhistory);
let weather = {
    apiKey: "0399d05032ecd5afd2b067f17a0069cc",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then ((response) =>{
        if (!response.ok){
            alert("No weather found");
            throw new Error("No weather found");
        }
         return response.json();
        })
        .then((data) => this.displayweather(data));
        },
       displayweather: function (data) {
        const {name} = data;
        const {icon,description} = data.weather[0];
        const {temp,humidity} =  data.main;
        const {speed} = data.wind;
        document.querySelector('.city').innerText = "weather in" + " " + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + "C";
        document.querySelector('.humidity').innerText = "humidity:" + humidity + "%";
        document.querySelector('.wind').innerText = "wind speed:" + speed + "KM/H";
        document.querySelector('.weather').classList.remove('loading');
        const info = {
            name: name,
            temp: temp,
        };
        zhistory.push(info);
        localStorage.setItem('zhistory' , JSON.stringify(zhistory));
        displayhistory();
       },
       search: function (){
        this.fetchWeather(document.querySelector('.search-bar').value);
        displayhistory()
       },
    };
document.querySelector('.search button').addEventListener('click' , () =>{
    weather.search();
    displayhistory()
});
document.querySelector('.search-bar').addEventListener('keyup' , (e) =>{
    if (e.key == "Enter"){
        weather.search();
    }
    displayhistory()
}); 
function displayhistory(){
    const hist = document.querySelector('#History');
    hist.innerHTML = "";
    zhistory.forEach( info => {
    const hitem = document.createElement('li');
    hist.appendChild(hitem);
    hitem.textContent = `${info.name} - ${info.temp}C`;
    //hitem.innerHTML = info.name +" "+ info.temp;
    localStorage.setItem('hist' ,JSON.stringify(hist))
    });
};
function after(){
    var element = document.getElementById("after");
    element.classList.toggle("after");
    var div = document.getElementById("before");
    div.classList.toggle("after");
    displayhistory();
};
function reset() {
    alert(`Hi your HISTORY will be reseted
    Thank you`);
    zhistory = [];
    localStorage.setItem('zhistory', JSON.stringify(zhistory));
    displayhistory();
};