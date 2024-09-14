import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrialRunServiceService {
  private apiUrl = 'http://localhost:3000/api/test';

  constructor(private http: HttpClient) {}

  // Method to get pirate data by ID
  getPirate(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
