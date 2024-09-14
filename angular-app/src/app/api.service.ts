import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private apiUrl = 'http://localhost:3000/api/test';
  private apiUrl = environment.apiUrl;

  private domain!: string;

  constructor(private http: HttpClient) {}

  // Method to get pirate data by ID
  getPirate(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
