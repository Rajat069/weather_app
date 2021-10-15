locationBtn = document.getElementById("location");
infoTxt = document.querySelector(".info-txt");
let weather = {
  apiKey: "ec26f2221b0b58e92391ee088381013d",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ec26f2221b0b58e92391ee088381013d`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    let visibility = data.visibility;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    if (visibility > 1000) {
      visibility = visibility / 1000;
    }
    document.querySelector(".visibilty").innerText =
      "Visibility: " + visibility + " km";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("nainital");

// location //

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});
function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ec26f2221b0b58e92391ee088381013d`
  )
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        infoTxt.innerText = "Something went wrong";
      }
      return response.json();
    })
    .then((data) => weather.displayWeather(data));
  weather.displayWeather(data);
}
function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}
/*function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  fetch(api).then((res) => res.json());
  then((data) => weather.displayWeather(data)).catch(() => {
    infoTxt.innerText = "Something went wrong";
    infoTxt.classList.replace("pending", "error");
  });
}
*/
