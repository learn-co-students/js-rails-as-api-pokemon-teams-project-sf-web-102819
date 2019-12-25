const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// let mainDiv = document.getElementById('pokemon-cards')
//     let newCard = document.createElement('div')
//     newCard.setAttribute('class', 'card')
//     newCard.setAttribute('id', )

document.addEventListener('DOMContentLoaded', function(){
    fetchTrainers()
    // fetchPokemon()
    // addPostListener()
    addDeleteListener()
})

function fetchTrainers(){
    let mainDiv = document.getElementById('pokemon-cards')
    console.log('hi')
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => {
        allTrainers = json.data
        console.log(allTrainers)
        mainDiv.innerHTML = allTrainers.map(trainer => renderTrainerCard(trainer)).join("")
        for (let i = 0; i < allTrainers.length; i++){
            fetchPokemon(allTrainers[i])
        }
        addDeleteListener();
        addPostListener();
    })
}

function addPostListener(){
    let addPokemonButtons = document.getElementsByClassName('add-pokemon-button')
        for (let i = 0; i < addPokemonButtons.length; i++){
            addPokemonButtons[i].addEventListener('click', function(e){
                console.log(e.target)
                postPokemon(e)
            })
        }
}

function addDeleteListener(){
    let deleteButtons = document.getElementsByClassName('delete-button')
        for(let i = 0; i< deleteButtons.length; i++){
            deleteButtons[i].addEventListener('click', function(e){
                removePokemon(e)
        })
    }
}

function fetchPokemon(data){
    console.log('hi')
        let trainerPokemon = data.attributes.pokemon
        let trainerId = `trainer-${data.id}`
        console.log(trainerPokemon)
        let trainerCard = document.getElementById(`${trainerId}`)
        let listElement = document.createElement('ul')
        listElement.innerHTML = trainerPokemon.map(pokemon => renderPokemon(pokemon)).join("")
        trainerCard.append(listElement)
}

function renderPokemon(pokemon){
    return `<li id =pokemon-${pokemon.id}>${pokemon.nickname}(${pokemon.species})
    <span><button class=delete-button>Delete Pokemon!</button></span></li>
    `
}

function renderTrainerCard(trainer){

    return `
    <div class=card id=trainer-${trainer.id}>${trainer.attributes.name}
    <br>
    <button class=add-pokemon-button>Add Pokemon</button>
    </div>
    <br>
    `
}

function postPokemon(e){
    e.preventDefault();
    let thisTrainer = e.target.parentElement
    let trainerId = thisTrainer.id
    let postId = trainerId.split("-")[1]
    let listDiv = document.querySelector(`#${trainerId} ul`)

    let data = {
        trainer_id: postId
    }
    if (listDiv.children.length < 6){
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
        let pokemon = json.data
        let thisSpecies = pokemon.attributes.species
        let thisName = pokemon.attributes.nickname
        let thisTrainer = pokemon.relationships.trainer.data.id
        
        let pokemonObject = {
            id: `${pokemon.id}`,
            species: `${thisSpecies}`,
            nickname: `${thisName}`, 
            trainer_id: `${thisTrainer}` 
        }
        listDiv.innerHTML += renderPokemon(pokemonObject)
        addDeleteListener();
        console.log(listDiv)
        console.log(pokemon)
    })
} else {
    alert("You can only have 6 pokemon per poke-team!")
}
}

function removePokemon(e){
    let thisPokemon = e.target.parentElement.parentElement
    let pokemonId = thisPokemon.id.split("-")[1]
    console.log(thisPokemon)
    let data = {
        id: pokemonId
    }
    console.log(data)
    fetch(`http://localhost:3000/pokemons/${pokemonId}`,{
        method: 'DELETE'
    })
    .then(response => {
        console.log(response)
        let list = thisPokemon.parentElement
        list.removeChild(document.getElementById(`${thisPokemon.id}`))
    })
}
// function addPostListener(){
//     let postButton = document.getElementById('post-button')
//     postButton.addEventListener('click', function(){
//         console.log('delete')
//     })
// }

// function addDeleteListener(){
//     let deleteButtons = document.getElementsByClassName('delete-button')
//     let deleteArray = Array.from(deleteButtons)
//     console.log(deleteArray)
//     for (let i = 0; i < deleteButtons.length; i++){
//         console.log('hi')
//         deleteButtons[i].addEventListener("click", function(e){
//             console.log(e.target)
//         })
//     }
// }




