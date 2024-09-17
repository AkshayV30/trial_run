import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-app';

  pirateIdControl = new FormControl('');

  generatedContent: string = '';

  pirate: any;
  error: string = '';

  constructor(private apiService: ApiService) {}

  generateContent() {
    const promptText = 'optimize the missing dimension';
    const filePath = './assets/testImage.jpeg'; // Example file path

    this.apiService.generateContent(promptText, filePath).subscribe({
      next: (response: { data: string }) => {
        this.generatedContent = response.data;
      },
      error: (error: any) => {
        console.error('Error generating content', error);
      },
    });
  }

  getPirate() {
    const pirateId = this.pirateIdControl.value;
    // Call the service to get pirate data
    this.apiService.getPirate(Number(pirateId)).subscribe(
      (response: any) => {
        // console.log(response);
        this.pirate = response.data;
        this.error = '';
      },
      (error) => {
        console.error('Error fetching pirate:', error);
        this.pirate = null;
        this.error = `Pirate with ID ${pirateId} not found.`;
      }
    );
  }
}
