class PokemonsController < ApplicationController

    def new
        pokemon = Pokemon.new
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        id = params[:trainer_id]
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: id)
        render json: PokemonSerializer.new(pokemon)
    end

    def index
        pokemons = Pokemon.all 
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end
end
 