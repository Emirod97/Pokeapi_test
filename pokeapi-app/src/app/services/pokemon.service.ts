import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  API_PATH = 'https://pokeapi.co/api/v2/pokemon';

  // pokemon?offset=1&limit=1050

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5');
  }

  public getOne(path) {
    return this.httpClient.get(path);
  }

  public getNextPage(path){
    return this.httpClient.get(path);
  }
}
