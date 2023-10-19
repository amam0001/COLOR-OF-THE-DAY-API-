const searchForm = document.querySelector('#search-form');
const historyList = document.querySelector('#history-list');
const clearHistoryBtn = document.querySelector('#clear-history-btn');
const colorSwatch = document.querySelector('#color-swatch');

const title = document.createElement('h1');
title.textContent = 'Color of the Day';
document.querySelector('body').insertBefore(title, searchForm);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateInput = document.querySelector('#date-input').value;
    searchColor(dateInput);
});

function searchColor(date) {
    fetch(`https://colors.zoodinkers.com/api?date=${date}`)
        .then(response => response.json())
        .then(data => {
            const hexValue = data.hex;
            colorSwatch.style.backgroundColor = hexValue;
            addToHistoryList(date, hexValue);
            saveSearchToLocalStorage(date, hexValue);
        })
        .catch(error => console.error(error));
}

function addToHistoryList(date, hexValue) {
   const li = document.createElement('li');
const swatch = document.createElement('div');
const hex = document.createElement('p');
swatch.classList.add('swatch');
swatch.style.backgroundColor = hexValue;
hex.textContent = hexValue;
li.appendChild(swatch);
li.appendChild(hex);
li.innerHTML += `${date}`;
historyList.appendChild(li);
}

function saveSearchToLocalStorage(date, hexValue) {
    let searches = localStorage.getItem('searches');
    searches = searches ? JSON.parse(searches) : [];
    searches.push({date: date, hexValue: hexValue});
    localStorage.setItem('searches', JSON.stringify(searches));
}

function loadSearchesFromLocalStorage() {
    let searches = localStorage.getItem('searches');
    searches = searches ? JSON.parse(searches) : [];
    searches.forEach(search => addToHistoryList(search.date, search.hexValue));
}

clearHistoryBtn.addEventListener('click', () => {
    historyList.innerHTML = '';
    localStorage.removeItem('searches');
    colorSwatch.style.backgroundColor = 'transparent'; // Clear color display
});

loadSearchesFromLocalStorage();