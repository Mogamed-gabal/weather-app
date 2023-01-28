// prepare all needs
let months=[
    'jan','feb','mars','april','may','jun','julay','august','september','october','nov','dece'
]
let days=[
    'sunday','monday','tuesday','wenesday','thursday','friday','starday'
];
let data;
let date;
let currentCity="cairo";
// main-temp variables
let searchInput=document.getElementById('search')
let today=document.getElementById('t-day')
let todaDate=document.getElementById('t-date')
let country=document.getElementById('location')
let celisiousDegree=document.getElementById('today-degree')
let stateImg=document.getElementById('today-icon')
let WeatherDescribtion=document.getElementById('today-description')
let sun=document.getElementById('humidty')
let windSpeed=document.getElementById('wind')
let windDirection=document.getElementById('compass')
let celouds=document.getElementById('cloud')
let celoudTow=document.getElementById('cloud-2')
let celoud=document.getElementById('cloud-3')
let sun1=document.getElementById('desc-sun')
// second day varaibles
let secDay=document.querySelectorAll('.s-day')
let secondImg=document.getElementsByClassName('second')
let secondCelisiusDegree=document.getElementsByClassName('max-degree')
let secondFDegree=document.getElementsByClassName('min-degree')
let secondDescription=document.getElementsByClassName('second-description')



// fetch api
async function getWeatherData()
{
    let apiResponse=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
    data=await apiResponse.json()
    console.log(data)
    dispalyMainTemp()
    dispalySecondTemp()

}
getWeatherData()

//main temp content
function dispalyMainTemp()
{
     date=new Date();
    let dayDate=days[date.getDay()]
    today.innerHTML=dayDate
    let mDate=date.getDate()+months[date.getMonth()]
    todaDate.innerHTML=mDate
    let tempCity=data.location.name
    country.innerHTML=tempCity
    let todayDegree=data.current.feelslike_c
    celisiousDegree.innerHTML=todayDegree
    let tempImg=data.current.condition.icon
    stateImg.setAttribute('src',`https:${tempImg}`)
    let weatherDesc=data.current.condition.text
    WeatherDescribtion.innerHTML=weatherDesc;
    let humidity=data.current.humidity
    sun.innerHTML=humidity
    let wind=data.current.vis_miles
    windSpeed.innerHTML=wind
    let compass=data.current.wind_dir
    windDirection.innerHTML=compass
    
}
// 2,3d temps
function dispalySecondTemp()
{
    for(let i=0;i<secDay.length;i++)
    {
        secDay[i].innerHTML=days [new Date(data.forecast.forecastday[i+1].date).getDay()];
        secondImg[i].setAttribute("src",`https:${data.forecast.forecastday[i+1].day.condition.icon}`)
        secondCelisiusDegree[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c
        secondFDegree[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c
        secondDescription[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text
    }
}
// search input
searchInput.addEventListener('keyup',()=>
{
    currentCity=searchInput.value;
    console.log(currentCity)
    getWeatherData()
})