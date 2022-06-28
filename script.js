
'use strict';

const dictionaryContainer = document.querySelector('.container');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const errorMessage = document.querySelector('.error');
const loadingSpinner = document.querySelector('.loader');
const retryBtn = document.querySelector('.retry-btn');
const emptyTextField = document.querySelector('.empty-field');

const displayData = function (newData) {
    const html = `
                  <h3>${newData.word}</h3>
                  <p>${newData.phonetic || ' '}</p>
                  <p>Definition: ${newData.meanings[0].definitions[0].definition || 'none'}</p>
                  <p>Synonyms:   ${newData.meanings[0].synonyms.join(', ') || 'none'}</p>
                  <p>Antonyms:   ${newData.meanings[0].antonyms.join(', ') || 'none'}</p>
                  <a href></a>
                 `;

    dictionaryContainer.insertAdjacentHTML('beforeend', html);
}

const getResults = function () {

    fetchDictionaryData(inputData.value);
    searchBar.style.display = "none";
    loadingSpinner.style.display = "block";

}


// Using async/await

const inputData = document.getElementById('input');

const fetchDictionaryData = async function (word) {

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        const [newData] = data;
        displayData(newData);
        retryBtn.style.display = "block";
        loadingSpinner.style.display = "none";

    }
    catch {

        errorMessage.textContent = `'${word}' does not exist.`;
        retryBtn.style.display = "block";
        loadingSpinner.style.display = "none";

    }

}

inputData.addEventListener('keypress', e => {
    console.log(e);

    if (e.code === "Enter") {
        if (inputData.value === "") {

            emptyTextField.style.display = "block";

        } else {
            getResults();
            emptyTextField.style.display = "none";

        }

    }

});

searchBtn.addEventListener('click', function () {

    if (inputData.value === "") {

        emptyTextField.style.display = "block";

    } else {

        getResults();
        emptyTextField.style.display = "none";

    }



})




// I may work on this feature later on to reset the dictionary without refreshing the page

// retryBtn.addEventListener('click', function () {

//     searchBar.style.display = "block";
//     inputData.value = "";
//     retryText.style.display = "none";
//     displayData.<>

// })