

console.log("Hello World")
let city_name1;

let search = document.querySelector("#search")
console.log(search)

let city = document.querySelector("#search")
city.addEventListener("keydown", (e)=>{
    if (e.key=="Enter") {
        city_name1 = city.value
        main()
    }
})

let body = document.querySelector(".main-box")
console.log(body)

//-----------FETCHING DATA FROM API------------
async function getData() {

    let key = `e09d39c12ad5110f055c02b099b58ad7`
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name1}&units=metric&appid=${key}`)
    const responce = await data.json()
    return responce
}

//-----------MAIN FUNCTION------------
async function main() {

    //-----------GETTING DATA FROM API ------------
    let ans = await getData()
    console.log(ans)
    console.log(ans.main.temp)


    //-----------SETTING CUSTOM VARIABLE FOR FURTHUR USE------------
    let name = ans.name
    let temp = ans.main.temp
    let humidity = ans.main.humidity
    let wind = ans.wind.speed
    let feel = ans.main.feels_like
    let description = ans.weather[0].description.toLowerCase()
    let sunrise = ans.sys.sunrise
    let sunset  = ans.sys.sunset
    let timezone = ans.timezone
    let current_time = ans.dt
    let img;

    //----------GETTING TIME OF THE LOCATION-----------
    let time = new Date((current_time + timezone) * 1000);
    let hours = time.getUTCHours().toString().padStart(2, '0')
    let minutes = time.getUTCMinutes().toString().padStart(2, '0')
    let time24hrs = `${hours}:${minutes}`
    console.log(time24hrs)
    let day = time.getUTCDate().toString().padStart(2, '0')
    let month = time.getUTCMonth().toString().padStart(2, '0')
    let year = time.getUTCFullYear().toString().padStart(2, '0')
    console.log(day, month, year)



    //-----------SETTING BODY HTML USING JS--------------
    body.innerHTML = `<div class="time_name">
                <div class="cloud"><img src="night_rain.svg"alt=""></div>
                <div class="time">
                    <div class="time_main">${time24hrs}</div>
                    <div class="date">
                        <h3>${day}/${month}/${year}</h3>
                        <h4>DD/MM/YY</h4>
                    </div>
                </div>
            </div>

            <div class="weather">
                <div class="city"><span id="city-name">${name}</span></div>

                <div class="temp_days">
                    <div class="upper">

                        <div class="temperature">
                            <span>
                                <div class="tt">${temp}°C</div>
                                <div class="cc">Temperature</div>
                            </span>
                    </div>

                        <div class="feel">
                            <span>
                                <div class="degree">${feel}°C</div>
                                <div class="like">feels like</div></div>
                            </span>

                    </div>

                    <div class="lower">
                        <div class="humidity">

                            <div class="hum">
                                <h3>${humidity}</h3>
                                <h3>Humidity</h3>
                            </div>
                            
                            <div class="wind">
                                <h3>${wind} mph</h3>
                                <h3>Wind</h3>
                            </div>

                            <div class="discription">
                                <h3>${description}</h3>
                            </div>

                        </div>
                    </div>


                </div>

            </div>`

}

main()
