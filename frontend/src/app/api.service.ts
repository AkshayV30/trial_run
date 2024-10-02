import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../environments/environment';
import { ImageUploadResponse } from './modal.interace';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  error = signal('');
  private apiUrl = environment.apiUrl;

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
        filePath,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('failed to load'));
        })
      );
  }

  // Updated method for image upload
  uploadImage(formData: FormData) {
    return this.httpClient
      .post<ImageUploadResponse>(`${this.apiUrl}/upload`, formData)
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Image upload failed: ' + error.message)
          );
        })
      );
  }
}
