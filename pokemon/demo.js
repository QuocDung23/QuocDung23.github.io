const notify = document.querySelector('.notify')

function fetchPromise( URL) {
    return new Promise (
        function(resolve) {
            fetch(URL)

            .then(
                function(response) {
                    const promise = response.json()
                    resolve(promise)
                }
            )
            .catch(
                function(error) {
                    console.log(error)
                    notify.innerHTML = 'Oh no! Some thing went wrong.'
                }
            )
        }
    )
}

let offset = 0
const limit = 5
let pokemons = []
fetchPromise('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898')
.then(
    function(value) {
        notify.innerHTML = ''
        pokemons = value.resulst
        render()
    }
)

function render() {
    const renderLimit = offset + limit
    for( ;offset < renderLimit; offset++){
        const pokemon = filteredPokemon[offset]
        const div = document.createElement('div')
        div.innerText = pokemon.name
        notify.appendChild(div)

        div.appendChild(wrapper)
    }
}

const button = document.querySelector('.button_more')
button.addEventListener(
    'click',
    render
)