import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  search: string = ''; // initialize search with an empty string
  movies: any[] = [];
  filteredMovies: any[] = [];

  constructor(private movieService: MovieService) {}

  @Output()
  sendToParent: EventEmitter<string> = new EventEmitter<string>();

  searchDataEvent() {
    console.log(this.search)
    // if(this.search=="")
    // {
    //   return
    // }
    // else{
      this.movieService.searchItem.next(this.search)
    // }
    // this.filterMovies(this.search);
  }

  clearDataEvent() {
    this.search = '';
    this.movieService.searchItem.next(this.search)
    // this.filteredMovies = [];
    // this.sendToParent.emit('');
  }

  filterMovies(searchTerm: string) {
    if (searchTerm.length > 0) {
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      ); 
    } else {
      this.filteredMovies = this.movies;
    }
    this.sendToParent.emit(searchTerm);
  }
 ngOnInit() {
  this.movieService.getAllMovies(1).subscribe((movies) => {
    this.movies = movies.results;
    this.filteredMovies = this.movies;
    console.log(this.filteredMovies);
  });
}
}
