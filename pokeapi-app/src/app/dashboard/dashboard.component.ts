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

export class DashboardComponent implements OnInit  {

  pokemonList: PokemonList[];
  next: String;
  previous: String;

  constructor(private pokemonService: PokemonService, private favoritesService: FavoritesService,
    private snackBar: MatSnackBar) { }
  
  displayedColumns: string[] = ['Image', 'Name', 'Weight', 'Height', 'Add'];
  dataSource: MatTableDataSource<PokemonList>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {

    

    this.pokemonService.getAll().subscribe((res) => {
      console.log(res);
      this.next = res['next'];
      this.previous = res['previous'];
      this.pokemonList = res['results'];
      // console.log(this.pokemon);
      // this.dataSource = new MatTableDataSource<PokemonList>(this.pokemonList);
      console.log(this.dataSource);
      
      this.fillInfo();
    })

  }

  fillInfo() {
    this.pokemonList.forEach(poke => {
      this.pokemonService.getOne(poke.url).subscribe((res) => {
        poke.info = res;
      })
    });

    this.dataSource = new MatTableDataSource<PokemonList>(this.pokemonList);
    this.dataSource.paginator = this.paginator

  }

  nextPage() {
    this.pokemonService.getNextPage(this.next).subscribe((res) => {
      console.log(res);
      this.next = res['next'];
      this.previous = res['previous'];
      this.pokemonList = res['results'];
      
      console.log(this.dataSource);
      this.fillInfo();
    })
  }

  previousPage() {
    this.pokemonService.getNextPage(this.previous).subscribe((res) => {
      console.log(res);
      this.next = res['next'];
      this.previous = res['previous'];
      this.pokemonList = res['results'];
      // this.dataSource = new MatTableDataSource<PokemonList>(this.pokemonList);
      console.log(this.dataSource);
      this.fillInfo();
    })
  }

  addToFavorites(item){
    console.log(item);
    
    if(this.favoritesService.addOne(item)){
      this.snackBar.open(item.name+' was added successfully!', 'OK', {
        duration: 3000,
      });
    }else{
      this.snackBar.open(item.name+' its already in your list!!!', 'OK', {
        duration: 5000,
      });
    }
    
  }

}
