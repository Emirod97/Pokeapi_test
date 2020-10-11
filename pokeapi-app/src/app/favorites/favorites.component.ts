import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private favoritesService: FavoritesService) { }

  pokemon;

  ngOnInit(): void {
    this.pokemon = this.favoritesService.getAll();
  }

  delFromFavorites(index){
    this.favoritesService.deleteOne(index);
  }

}
