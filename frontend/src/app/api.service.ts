import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  error = signal('');
  private apiUrl = environment.apiUrl;

  private destroyRef = inject(DestroyRef);

  private httpClient = inject(HttpClient);

  promptContentText(promptText: string) {
    return this.httpClient
      .post<{ text: string }>(`${this.apiUrl}/generateContent/txt`, {
        promptText,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('failed to load'));
        })
      );
  }

  promptContent(promptText: string, filePath: string) {
    return this.httpClient
      .post(`${this.apiUrl}/genrateResult`, {
        promptText,
        filePath,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('failed to load'));
        })
      );
  }
}
