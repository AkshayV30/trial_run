import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomMaterialModule } from './custom-material.module';
import { ImageUploadResponse } from './modal.interace';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CustomMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-app';

  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);

  error = signal('');
  imageInput = signal<File | null>(null);

  generatedContent: ImageUploadResponse | undefined;
  imageUrl: string | ArrayBuffer | null = null;

  //  // stage 2
  form: FormGroup = this.fb.group({
    imageInput: [null, Validators.required],
  });

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      // console.log('File selected:', file);

      this.imageInput.set(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No file selected');
    }
  }

  onSubmit() {
    if (this.imageInput() !== null) {
      const formData = new FormData();
      formData.append('imageInput', this.imageInput()!);

      const subscription = this.apiService
        .callTheQualityInspector(formData)
        .subscribe({
          next: (response) => {
            console.log('Upload successful:', response);

            this.generatedContent = {
              message: response.message,
              imagePath: response.imagePath,
              generatedResponse: response.generatedResponse,
            };
          },
          error: (err) => {
            console.error('Upload failed:', err.message);
          },
        });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    } else {
      console.error('Form is invalid');
    }
  }

  //  // stage 1
  // form = new FormGroup({
  //   promptInput: new FormControl(''),
  // });
  // onSubmit() {
  //   console.log(this.form.value);

  //   // this.generatedContent = this.form.value.promptInput ?? '';

  //   const promptText = this.form.value.promptInput ?? '';

  //   if (promptText.trim()) {
  //     // Calling API service to send the prompt
  //     const subscription = this.apiService
  //       .promptContentText(promptText)
  //       .subscribe({
  //         next: (response) => {
  //           // Update the generated content with the response text from the backend
  //           console.log(response);
  //           this.generatedContent = response.text;
  //         },
  //         error: (error: Error) => {
  //           console.error('Error:', error);
  //           this.error.set(error.message);
  //         },
  //       });
  //     this.destroyRef.onDestroy(() => subscription.unsubscribe());
  //   }
  // }
}
