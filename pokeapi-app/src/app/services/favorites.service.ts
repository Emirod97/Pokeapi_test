import { Injectable } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This service manage the manipulation of the favorite pokemon whit a CRUD.
 */
export class FavoritesService {

  favorites = [];
  constructor() { }


  addOne(pokemon){
    if(this.favorites.includes(pokemon)){
      return false;
    }else{
      this.favorites.push(pokemon);
      return true;
    }
    
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
