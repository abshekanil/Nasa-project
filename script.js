let imageContainer = document.getElementById("current-image-container");
let dateInput = document.getElementById("search-input");
let searchForm = document.getElementById("search-form");
let searchHistory = document.getElementById("search-history");
let apikey = "xMZK47PbtboRKAdPaLMuZcp8pa05R1qr1n19SQuQ";
let heading = document.getElementById('heading');

document.addEventListener("DOMContentLoaded", function () {
    getCurrentImageOfTheDay();
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    let yesterdayDate = currentDate.toISOString().split("T")[0];

    let apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${yesterdayDate}`;

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            displayImage(data);
        })
        .catch((error) => {
            console.log("Error fetching data:", error);
        });
}

function getImageOfTheDay(date) {
    let apiData = `https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${date}`;

    heading.innerHTML = "Picture On " + date;

    fetch(apiData)
        .then((response) => response.json())
        .then((data) => {
            displayImage(data);
            saveSearch(date);
            addSearchToHistory(date);
        })
        .catch((error) => {
            console.log("Error fetching data:", error);
        });
}

function displayImage(data) {
    imageContainer.innerHTML = ''; // Clear previous content

    const imageElement = document.createElement("img");
    imageElement.src = data.url;
    imageElement.alt = data.title;

    const titleElement = document.createElement("h2");
    titleElement.textContent = data.title;

    const explanationElement = document.createElement("p");
    explanationElement.textContent = data.explanation;

    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(titleElement);
    imageContainer.appendChild(explanationElement);
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(date) {
    const listItem = document.createElement("li");
    listItem.textContent = date;
    listItem.addEventListener("click", function () {
        getImageOfTheDay(date);
    });
    searchHistory.appendChild(listItem);
}

function loadSearchHistory() {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.forEach(date => addSearchToHistory(date));
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let selectedDate = dateInput.value;
    getImageOfTheDay(selectedDate);
});
