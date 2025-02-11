import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ViewportScroller } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrl: './default-page.component.css'
})
export class DefaultPageComponent {
  movieData: any;
  currentPg: number = 1;
  totalPages: number = 0;
  // router: any;
  movieCarouselData: any;
  selectedLanguage: string = 'en'; // Default language
  availableLanguages: any[] = [];
 

  constructor(private movieservice: MovieService,private viewportScroller: ViewportScroller, private _snackBar: MatSnackBar) {
    this.movieservice.searchItem.subscribe((data: string) => {

      // console.log(data, "search item in dashboard")
      // if (data == "") {
      //   this.currentPg = 1
      //   this.loadData()

      // }
      // else {

      //   this.movieservice.searchMovie(data, 1).subscribe(
      //     {
      //       next: (res) => {
      //         console.log(res)
      //         this.movieData = res.results;
      //         this.totalPages = res.total_pages;
      //       },
      //       error: (err) => {
      //         alert("Something went wrong, please try again later");
      //       }
      //     }
      //   )
      // }

    })
  }

  ngOnInit() {
    console.log("dashboard works");
    this.loadData();
    // this.loadMovies();
    // this.loadAvailableLanguages();

    
  }

  loadData() {
    this.movieservice.getAllMovies(this.currentPg).subscribe((res: any) => {
      console.log(res);
      this.movieData = res.results;
      this.totalPages = res.total_pages;
      if (this.currentPg === 1) {
        this.movieCarouselData = this.movieData.slice(0, 5);
      }
    });
  }

  decreasePage() {
    this.currentPg--;
    if (this.currentPg <= 1) {
      this.currentPg = 1;
    }
    this.loadData();
  }

  increasePage() {
    this.currentPg++;
    if (this.currentPg >= this.totalPages) {
      this.currentPg = this.totalPages;
    }
    this.loadData();
  }
 
 toggleLike(item: any) {
    // console.log(item);
    // let user_data: any = localStorage.getItem("user_data");
    // // user_data = JSON.parse(user_data);
    // console.log(user_data);
    // if (item.liked == true) {
    //   console.log(item.liked);
    //   this.movieservice.deleteFavourite({
    //     "movieId": item.id,
    //     "email": user_data
    //   }).subscribe({
    //     next: (res: any) => {
    //       console.log(res);
          // Remove the deleted movie from local storage
          // let moviesInLocalStorage: any[] = JSON.parse(localStorage.getItem("movies") || "[]");
          // const updatedMovies = moviesInLocalStorage.filter(movie => movie.id !== item.id);
          // localStorage.setItem("movies", JSON.stringify(updatedMovies));

          // alert("Movie removed from favourite successfully!");
          // Reload movies from local storage or API after deletion if needed
  //         this._snackBar.open('Movie removed from favourite successfully!', 'Dismiss', {
  //           duration: 3000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'bottom'
  //         });
  //       },
  //       error: (err: any) => {
  //         this._snackBar.open('Something Went Wrong! Please try again later', 'Dismiss', {
  //           duration: 3000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'bottom'
  //         });
  //       }
  //     });
  //   } else {
  //     item.liked = !item.liked;
  //     this.movieservice.addToFavourite({
  //       "movieId": item.id,
  //       "movieName": item.title,
  //       "email": user_data,
  //       "genreIds": item.genre_ids
  //     }).pipe().subscribe({
  //       next: (res: any) => {
  //         this._snackBar.open('Movie added to favourite successfully!', 'Dismiss', {
  //           duration: 3000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'bottom'
  //         });
  //       },
  //       error: (err) => {
  //         this._snackBar.open('Something Went Wrong! Please try again later', 'Dismiss', {
  //           duration: 3000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'bottom'
  //         });
  //       }
  //     });
  //   }

    
  // }

  // loadAvailableLanguages() {
  //   this.movieservice.getAvailableLanguages().subscribe((res: any) => {
  //     this.availableLanguages = res;
  //   });
  // }

  // loadMovies() {
  //   this.movieservice.getMoviesByLanguage(this.selectedLanguage).subscribe((res: any) => {
  //     console.log(res);
  //     this.movieData = res.results;
  //     this.totalPages = res.total_pages;
  //     // You may want to handle pagination here if needed
  //   });
  // }

  // changeLanguage(event: any) {
  //   this.selectedLanguage = event.target.value;
  //   this.loadMovies();
  }
  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
  } 




