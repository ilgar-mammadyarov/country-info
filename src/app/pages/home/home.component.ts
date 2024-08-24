import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { HomeService } from './home.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    MatCardModule,
    MatChipsModule,
    DatePipe,
  ],
  providers: [HomeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  readonly #homeService = inject(HomeService);
  searchController = new FormControl('');

  readonly filteredCountries = this.#homeService.filteredCountries;
  readonly filter = this.#homeService.filter;
  readonly randomCountriesWithHolidays = this.#homeService.randomHolidays;

  ngOnInit(): void {
    this.searchCountries();
  }

  searchCountries(): void {
    this.searchController.valueChanges
      .pipe(debounceTime(300))
      .subscribe(search => this.filter.set(search?.toLowerCase() ?? ''));
  }
}
