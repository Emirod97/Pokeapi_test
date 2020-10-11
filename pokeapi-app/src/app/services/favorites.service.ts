import { Injectable } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites = [];
  constructor() { }


  addOne(pokemon){
    console.log(pokemon);
    
    this.favorites.push(pokemon);
    console.log(this.favorites);
    
  }

  getAll(){
    console.log(this.favorites);
    
    return this.favorites;
  }

  getOne(index){
    return this.favorites[index];
  }

  deleteOne(index){
    this.favorites.splice(index, 1);
  }

  deleteAll(){
    this.favorites = [];
  }
}
