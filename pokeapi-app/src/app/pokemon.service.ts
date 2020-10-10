import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  API_PATH = 'https://pokeapi.co/api/v2/pokemon';

  // pokemon?offset=1&limit=1050

  constructor(private httpClient: HttpClient) { }

  public getAll(){
    return this.httpClient.get(this.API_PATH+`?offset=1&limit=${this.getCount()}`);
  }

  private getCount(){
    let res = this.httpClient.get(this.API_PATH);

    return res.count;
  }
}
