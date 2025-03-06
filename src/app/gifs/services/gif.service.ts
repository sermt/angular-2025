import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GiphyResponseToGifs } from '../adapters/gif.adapters';
import Gif from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);
  readonly trendingGifsSignal;

  searchTerms: any;

  constructor() {
    this.trendingGifsSignal = toSignal(
      this.loadTrendingGif().pipe(map(GiphyResponseToGifs)),
      { initialValue: [] }
    );
  }

  loadTrendingGif(): Observable<GiphyResponse> {
    return this.http.get<GiphyResponse>(
      environment.giphyApiBaseUrl +
        environment.giphyTrendingEndpoint +
        '?api_key=' +
        environment.giphyApiKey
    );
  }

  ngOnInit(): void {
    this.searchTerms = (searchTerm: string) => {

      return this.http.get<GiphyResponse>(
        environment.giphyApiBaseUrl + environment.giphySearchEndpoint,
        {
          params: {
            q: searchTerm,
            api_key: environment.giphyApiKey,
            limit: 20,
          },
        }
      ).pipe(
        tap(console.log),
        map(GiphyResponseToGifs),
        tap(console.log)
      );
    }
  }

}
