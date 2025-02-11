import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  favoriteMovies: any[] = [];
  recommendedMovies: any[] = [];

  constructor(private http: HttpClient, private movieService: MovieService,private router:Router) { }

  ngOnInit(): void {
    const authToken = localStorage.getItem('auth_token');
    if (!authToken) {
      console.error('Authentication token missing');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    this.http.get<any[]>('http://localhost:8090/api/v1/getFavourite', { headers }).subscribe(
      (data: any[]) => {
        this.favoriteMovies = data;
        const genreIds: number[] = [];
        this.favoriteMovies.forEach(movie => {
          genreIds.push(...movie.genreIds);
        });
        if (this.movieService) {
          this.movieService.fetchRecommendedMovies(genreIds)
            .then(() => {
              this.recommendedMovies = this.movieService.recommendedMovies;
            })
            .catch(error => {
              console.error('Error fetching recommended movies:', error);
            });
        } else {
          console.error('Movie service is not initialized.');
        }
      },
      error => {
        console.error('Error fetching favorite movies:', error);
      }
    );
  }
  viewMovie(movie: any) {
    this.router.navigate(['/view-one-movie', movie.id]);
  }
}
