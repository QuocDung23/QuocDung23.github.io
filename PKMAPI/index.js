let offset = 0;
let numberOffRender = 30;

let AllPokemon = [];
let filterPokemon = [];

let htmlPokemon = '';
let htmlType = '';

const fetchAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getPokemon () {
    const data = await fetchAPI('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=869');
    AllPokemon = data.results;
    filterPokemon = AllPokemon;
    renderPokemon();
}

function getIDPokemon (url) {
    const parts = url.split('/');
    return parseInt(parts[parts.length -2], 10)
}

// Render Pokemon 
async function renderPokemon () {
    let newHtmlPokemon = '';
    for (let index = offset; index < offset + numberOffRender && index < filterPokemon.length; index++) {
        const pokemon = filterPokemon[index];

        const ID = getIDPokemon(pokemon.url);

        let htmlType = '';
        const getTypes = await fetchAPI(pokemon.url);
        
        getTypes.types.forEach(Element => {
            htmlType += `<div class="type_item ${Element.type.name}">${Element.type.name}</div>`;
        });

        newHtmlPokemon += `
            <div class="item_child">
                <div class="item_id">
                    #${ID}
                </div>
                <div class="item_image" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png');">
                </div>
                <div class="item_name">
                    ${pokemon.name}
                </div>
                <div class="type">
                    ${htmlType}
                </div>
            </div>
        `;
    }

    const itemPokemon = document.querySelector('.items');
    itemPokemon.innerHTML += newHtmlPokemon; 
    setupLoadMore();
}


function setupLoadMore() {
    const loadMoreBtn = document.querySelector('.btn_loadmore');
    if (offset + numberOffRender < filterPokemon.length){
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = () => {
            offset += numberOffRender;
            renderPokemon();
        }
    }else loadMoreBtn.style.display = 'none'
}

function searchPokemon (query) {
    htmlPokemon= '';
    if (query === '') {
        filterPokemon = AllPokemon;
    }else {
        filterPokemon = AllPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
    }
    offset = 0;
    renderPokemon();
}
const searchInputHeader = document.querySelector('.input_header')
console.log(searchInputHeader)

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
const debouncedSearch = debounce(searchPokemon, 200);
searchInputHeader.addEventListener('input', (event) => {
    const query = event.target.value;
    debouncedSearch(query);
});

getPokemon();



