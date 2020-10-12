import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonList } from 'src/models/pokemonList';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private favoritesService: FavoritesService) { }

  displayedColumns: string[] = ['Image', 'Name', 'Weight', 'Height', 'Delete'];
  dataSource: MatTableDataSource<PokemonList>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  pokemon;

  ngOnInit(): void {
    this.pokemon = this.favoritesService.getAll();
    this.dataSource = new MatTableDataSource<PokemonList>(this.pokemon);
    this.dataSource.paginator = this.paginator;

  }

  delFromFavorites(index) {
    this.favoritesService.deleteOne(index);
    this.dataSource = new MatTableDataSource<PokemonList>(this.pokemon);
    this.dataSource.paginator = this.paginator;
  }

}
