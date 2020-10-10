import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonList } from '../../models/pokemonList';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  pokemonList: PokemonList[];
  next: String;
  previous: String;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {

    this.pokemonService.getAll().subscribe((res) => {
      console.log(res);
      this.next = res['next'];
      this.previous = res['previous'];
      this.pokemonList = res['results'];
      // console.log(this.pokemon);

      this.fillInfo();
    })

  }

  fillInfo() {
    this.pokemonList.forEach(poke => {
      this.pokemonService.getOne(poke.url).subscribe((res) => {
        poke.info = res;
      })
    });

  }

  nextPage() {
    this.pokemonService.getNextPage(this.next).subscribe((res) => {
      console.log(res);
      this.next = res['next'];
      this.previous = res['previous'];
      this.pokemonList = res['results'];
      this.fillInfo();
    })
  }

  previousPage() {
    this.pokemonService.getNextPage(this.previous).subscribe((res) => {
      console.log(res);
      this.next = res['next'];
      this.previous = res['previous'];
      this.pokemonList = res['results'];
      this.fillInfo();
    })
  }

}
