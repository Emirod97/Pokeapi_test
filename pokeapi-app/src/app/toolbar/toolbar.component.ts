import { Component, OnInit } from '@angular/core';
import { PokemonList } from 'src/models/pokemonList';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private favoritesService: FavoritesService) { }

  /**
   * Initialize the pokemon variable that its going to feed the badge in the view
   */
  pokemon: PokemonList[];
  ngOnInit(): void {
    this.pokemon = this.favoritesService.getAll();
  }

}
