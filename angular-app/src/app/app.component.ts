import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrialRunServiceService } from './trial-run-service.service';
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

  pirate: any;
  error: string = '';

  constructor(private pirateService: TrialRunServiceService) {}

  getPirate() {
    const pirateId = this.pirateIdControl.value;
    // Call the service to get pirate data
    this.pirateService.getPirate(Number(pirateId)).subscribe(
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
