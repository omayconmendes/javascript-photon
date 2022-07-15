/*
    Pexels API Authorization: 563492ad6f91700001000001201f2d708b5e4e34a3217b218ec6e1aa
*/

// Selectors
const authorization = '563492ad6f91700001000001201f2d708b5e4e34a3217b218ec6e1aa';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');

let searchValue;


// Events
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchPhotos(searchValue);
})

// Functions
function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: authorization
        }
    });

    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    })
}

async function curatedPhotos() {
    const data = await fetchApi('https://api.pexels.com/v1/curated');
    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}`)
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}


curatedPhotos();