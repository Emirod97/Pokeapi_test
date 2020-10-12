import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * This service consumes the api
 */
export class PokemonService {

  API_PATH = 'https://pokeapi.co/api/v2/pokemon';

  // pokemon?offset=1&limit=1050

  constructor(private httpClient: HttpClient) { }

  /**
   * get the initials pokemons
   */
  public getAll() {
    return this.httpClient.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5');
  }

  /**
   * This gets all the info of a certain pokemon.
   */
  public getOne(path) {
    return this.httpClient.get(path);
  }


  /**
   * This method get the previos or the next bunch of pokemon.
   */
  public getChangePage(path){
    return this.httpClient.get(path);
  }
}
