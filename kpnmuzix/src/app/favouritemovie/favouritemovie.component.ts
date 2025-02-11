import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-favouritemovie',
  templateUrl: './favouritemovie.component.html',
  styleUrl: './favouritemovie.component.css'
})
export class FavouritemovieComponent implements OnInit {
  favouriteMovieData: any = []
  // movieID: any[] = []
  constructor(
    private movieService: MovieService
  ) { }
  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.movieService.getAllFavouriteMovies().subscribe({
      next: async (res: any) => {
        // this.favouriteMovieData=res
        // res.map((item:any)=>{
        //   this.movieID.push(
        //     item.movieId
        //   )
        // })
        // let initialData:any=res
        await Promise.all(res.map((item: any) => {
          this.movieService.getMovieById(item.movieId).subscribe({
            next: (ele: any) => {
              console.log(ele)
              this.favouriteMovieData.push(ele)
            }
          })
        }))
        console.log(this.favouriteMovieData, "favourite movie data")
      },
      error: (err) => {
        alert("Something went wrong, please try again later");
      }
    });

  }
}



