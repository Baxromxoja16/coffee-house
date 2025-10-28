import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, IProduct } from '../shared/types/interfaces';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '../shared/services/toast-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = 'https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/';
  
  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  getFavorite() {
    return this.http.get(this.url + 'products/favorites').pipe(
      catchError((err: any, caught: any) => {
        return of({error: 'error'})
      }),
      tap((data: ApiResponse) => {
        if (data.error) {
          this.toastService.error('Something went wrong. Please, refresh the page');
          return;
        };
      })
    )
  }

  getProducts() {
    return this.http.get(this.url + 'products/').pipe(
      catchError((err: any, caught: any) => {
        return of({error: 'error'})
      }),
      tap((data: ApiResponse) => {
        if (data.error) {
          this.toastService.error('Something went wrong. Please, refresh the page');
          return;
        };
      })
    )
  }

}
