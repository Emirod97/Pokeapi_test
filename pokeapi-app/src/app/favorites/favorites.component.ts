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

/**
 * This component consume the favoritesService and dleploys the info
 * of the pokemon selected.
 */
export class FavoritesComponent implements OnInit {

  /**
   * Variable declaration for the use of the component
   */
  constructor(private favoritesService: FavoritesService) { }
  pokemon: PokemonList[];
  displayedColumns: string[] = ['Image', 'Name', 'Weight', 'Height', 'Delete'];
  dataSource: MatTableDataSource<PokemonList>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * this method inicialices the paginator for the table
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Prepares all of the variables filling it with info
   */
  ngOnInit(): void {
    this.pokemon = this.favoritesService.getAll();
    this.dataSource = new MatTableDataSource<PokemonList>(this.pokemon);
    this.dataSource.paginator = this.paginator;

  }

  /**
   * This method calls the delete method from the favoritesServices and 
   * recieves the index of the list and splice it.
   */
  delFromFavorites(index) {
    this.favoritesService.deleteOne(index);
    this.dataSource = new MatTableDataSource<PokemonList>(this.pokemon);
    this.dataSource.paginator = this.paginator;
  }

}
