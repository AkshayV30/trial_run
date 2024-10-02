import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomMaterialModule } from './custom-material.module';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CustomMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-app';

  // places = signal<Place[] | undefined>(undefined);
  error = signal('');
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    promptInput: new FormControl(''),
  });

  generatedContent: string = '';

  ngOnInit() {}

  onSubmit() {
    console.log(this.form.value);

    // this.generatedContent = this.form.value.promptInput ?? '';

    const promptText = this.form.value.promptInput ?? '';

    if (promptText.trim()) {
      // Calling API service to send the prompt
      const subscription = this.apiService
        .promptContentText(promptText)
        .subscribe({
          next: (response) => {
            // Update the generated content with the response text from the backend
            console.log(response);
            this.generatedContent = response.text;
          },
          error: (error: Error) => {
            console.error('Error:', error);
            this.error.set(error.message);
          },
        });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }
}
