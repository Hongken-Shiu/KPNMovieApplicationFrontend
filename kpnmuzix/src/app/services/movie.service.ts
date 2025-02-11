import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private MyAPIKey: string = "34c2b91a16cf1d1d7e52f570edafbbf2";
  searchItem = new BehaviorSubject<string>("");

  // private urlMovieDB: string = "https://api.themoviedb.org/3"
  constructor(private http: HttpClient, private router: Router) { }
  movieName: string | undefined;
  movieInfo: any;
  currentPage: number = 1;
  recommendedMovieId: any;
  email: any;
  favMovieObj: any = {};
  recommendedMovies: any[] = [];


  // To display all Movies
  getAllMovies(currentPage: number) {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&page=${currentPage}`;
    return this.http.get<any>(url);
  }

  addToFavourite(body: any) {
    let url = `http://localhost:8090/api/v1/favourite`;
    const auth_token = localStorage.getItem("auth_token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(url, body, { headers });
  }

  deleteFavourite(body: any) {
    let url = `http://localhost:8090/api/v1/user/${body.email}/${body.movieId}`;
    const auth_token = localStorage.getItem("auth_token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(url, { headers });
  }
  getAllFavouriteMovies() {
    let url = `http://localhost:8090/api/v1/getFavourite`;
    const auth_token = localStorage.getItem("auth_token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get(url, { headers })
  }

  // getFavouriteMovieByMovieId(movieId: string) {
  //   let url = `http://localhost:8090/api/v1/favourite/${movieId}`;
  //   return this.http.get(url);
  // }

  searchMovie(searchItem: any, currentPage: number) {
    console.log("i am inside the movie service");
    console.log(searchItem);
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.MyAPIKey}&query=${searchItem}&page=${currentPage}`
    console.log(searchUrl);
    // console.log(this.y);
    return this.http.get<any>(searchUrl);
    // return this.http.getRequest("searchUrl");
  }
  getMovieById(id: number) {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.MyAPIKey}`;
    return this.http.get<any>(url);
  }

  async fetchRecommendedMovies(genreIds: number[]): Promise<void> {
    const authToken = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    const promises = genreIds.map(genreId => {
      const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
      return this.http.get<any>(apiUrl, { headers }).toPromise();
    });

    try {
      const results = await Promise.all(promises);
      const combinedResults = results.reduce((acc, curr) => acc.concat(curr.results), []);
      this.shuffleArray(combinedResults);
      this.recommendedMovies = combinedResults.slice(0, 50);
    } catch (error) {
      console.error('Error fetching recommended movies:', error);
      throw error;
    }
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getAvailableLanguages(): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${this.MyAPIKey}`);
  }

  getMoviesByLanguage(language: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.MyAPIKey}&language=${language}`);
  }



}
