import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/Movie';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrailerModalComponentComponent } from '../trailer-modal-component/trailer-modal-component.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewonemovie',
  templateUrl: './viewonemovie.component.html',
  styleUrls: ['./viewonemovie.component.css']
})
export class ViewonemovieComponent implements OnInit {
  selectedMovieData: any;
  movieId: string | null | undefined;
  trailerUrl: SafeResourceUrl | undefined;
  currentPg: number = 1;
  totalPages: number = 0;
  movieData: any;
  // router: any;
  movieCarouselData: any;
  selectedLanguage: string = 'en'; // Default language
  availableLanguages: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      this.getMovieDetails();
      // this.loadData();
    });
  }

  getMovieDetails(): void {
    if (this.movieId) {
      this.movieService.getMovieById(Number(this.movieId)).subscribe((movie: Movie) => {
        this.selectedMovieData = movie;
        console.log(this.selectedMovieData,"movie data here")
        this.movieService.getAllFavouriteMovies().subscribe({
          next: (async (ele: any) => {
            ele.map((abc: any) => {
              if (abc.movieId == this.selectedMovieData.id) {
                this.selectedMovieData.liked = true
              }
            })
          }),
          error: (err: any) => {
            console.log("error in adding favourite")
          }
        })
      });
    }
  }

  loadData() {
    this.movieService.getAllMovies(this.currentPg).subscribe((res: any) => {
      console.log(res);
      this.movieData = res.results;
      let favouriteMovieData: any = []
      this.movieService.getAllFavouriteMovies().subscribe(
        {
          next: (async (ele: any) => {
            favouriteMovieData = ele
            await Promise.all(this.movieData.map((xyz: any) => {
              favouriteMovieData.forEach((abc: any) => {
                if (xyz.id == abc.movieId) {
                  xyz.liked = true
                }
                return xyz
              })

            }))

            this.totalPages = res.total_pages;
            if (this.currentPg === 1) {
              this.movieCarouselData = this.movieData.slice(0, 5);
            }
          })
        }
      )

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
    console.log(item);
    let user_data: any = localStorage.getItem("user_data");
    // user_data = JSON.parse(user_data);
    console.log(user_data);
    if (item.liked == true) {
      console.log(item.liked);
      this.movieService.deleteFavourite({
        "movieId": item.id,
        "email": user_data
      }).subscribe({
        next: (res: any) => {
          console.log(res);
          // Remove the deleted movie from local storage
          let moviesInLocalStorage: any[] = JSON.parse(localStorage.getItem("movies") || "[]");
          const updatedMovies = moviesInLocalStorage.filter(movie => movie.id !== item.id);
          localStorage.setItem("movies", JSON.stringify(updatedMovies));

          // alert("Movie removed from favourite successfully!");
          // Reload movies from local storage or API after deletion if needed
          item.liked=false
          this.snackBar.open('Movie removed from favourite successfully!', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error: (err: any) => {
          item.liked=false
          this.snackBar.open('Movie removed from favourite successfully!', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    } else {
      item.liked = !item.liked;
      this.movieService.addToFavourite({
        "movieId": item.id,
        "movieName": item.title,
        "email": user_data,
        "genreIds": item.genre_ids
      }).pipe().subscribe({
        next: (res: any) => {
          this.snackBar.open('Movie added to favourite successfully!', 'Dismiss', {
            duration: 2800,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error: (err) => {
          this.snackBar.open('Something Went Wrong! Please try again later', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }


  }


  openTrailer(): void {
    const formattedTitle = this.selectedMovieData.title.replace(/\s/g, '+');
    const apiKey = 'AIzaSyAVs-E6XU_LB4Oc7irnaChGsZAFcH9hWWc';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${formattedTitle}+trailer&type=video&key=${apiKey}`;

    this.http.get(apiUrl).subscribe((response: any) => {
      if (response.items && response.items.length > 0) {
        const videoId = response.items[0].id.videoId;
        const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);

        const dialogRef = this.dialog.open(TrailerModalComponentComponent, {
          width: '560px',
          data: { trailerUrl: this.trailerUrl }
        });
      } else {
        console.error('No videos found in search results');
        this.snackBar.open('Trailer not available', 'Close', {
          duration: 3000
        });
      }
    }, (error) => {
      this.snackBar.open('Trailer not available', 'Close', {
        duration: 3000
      });
      console.error('Error fetching YouTube search results:', error);
    });
  }
}
