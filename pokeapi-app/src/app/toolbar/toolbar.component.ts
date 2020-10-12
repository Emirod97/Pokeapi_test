import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private favoritesService: FavoritesService) { }

  pokemon;
  ngOnInit(): void {
    this.pokemon = this.favoritesService.getAll();
  }

}
