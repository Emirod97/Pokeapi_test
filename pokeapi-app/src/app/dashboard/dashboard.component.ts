import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonList } from '../../models/pokemonList';
import { FavoritesService } from '../services/favorites.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
/**
 * This is the main page that its going to be desplayed when launched
 */
export class DashboardComponent implements OnInit {

  /**
   * Variable declaration for the use of the component
   */
  pokemonList: PokemonList[];
  next: String;
  previous: String;
  displayedColumns: string[] = ['Image', 'Name', 'Weight', 'Height', 'Add'];
  dataSource: MatTableDataSource<PokemonList>;

  constructor(private pokemonService: PokemonService, private favoritesService: FavoritesService,
    private snackBar: MatSnackBar) { }



  @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  /**
   * Prepares all of the variables filling it with info
   */
  ngOnInit(): void {
    this.pokemonService.getAll().subscribe((res) => {
      this.next = res['next'];
      this.previous = res['previous'];
      this.pokemonList = res['results'];
      this.fillInfo();
    })

  }

  /**
   * This method complete the info that is mising and fills the rest of the info.
   */
  fillInfo() {
    this.pokemonList.forEach(poke => {
      this.pokemonService.getOne(poke.url).subscribe((res) => {
        poke.info = res;
      })
    });

    this.dataSource = new MatTableDataSource<PokemonList>(this.pokemonList);
    this.dataSource.paginator = this.paginator

  }

  /**
   * In these methods send a new get request to the pokeapi service and get the new
   * bunch if pokemons from the link given.
   */
  nextPage() {
    this.pokemonService.getChangePage(this.next).subscribe((res) => {
      this.next = res['next'];
      this.previous = res['previous'];
      this.pokemonList = res['results'];
      this.fillInfo();
    })
  }

  previousPage() {
    this.pokemonService.getChangePage(this.previous).subscribe((res) => {
      this.next = res['next'];
      this.previous = res['previous'];
      this.pokemonList = res['results'];
      this.fillInfo();
    })
  }


  /**
   * This method consumes a service for data manipulation for the favorites
   * it recives the pokemon info and add it to the model in the service.
   */
  addToFavorites(item) {

    if (this.favoritesService.addOne(item)) {
      this.snackBar.open(item.name + ' was added successfully!', 'OK', {
        duration: 3000,
      });
    } else {
      this.snackBar.open(item.name + ' its already in your list!!!', 'OK', {
        duration: 5000,
      });
    }

  }

}
