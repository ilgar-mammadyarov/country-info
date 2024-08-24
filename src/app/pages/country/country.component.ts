import { Component, OnInit, inject } from '@angular/core';
import { CountryService } from './country.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [MatButtonToggleModule, MatCardModule, MatChipsModule, DatePipe],
  providers: [CountryService],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
})
export class CountryComponent implements OnInit {
  readonly #countryService = inject(CountryService);
  readonly #activatedRoute = inject(ActivatedRoute);

  readonly selectedYear = this.#countryService.selectedYear;
  readonly countryInfo = this.#countryService.countryInfo;
  readonly years = this.#countryService.YEARS;
  readonly holidays = this.#countryService.holidays;

  ngOnInit(): void {
    const countryCode = this.#activatedRoute.snapshot.paramMap.get('id');
    if (countryCode) {
      this.#countryService.setCountryCode(countryCode);
    }
  }

  setSelectedYear(year: number): void {
    this.#countryService.setSelectedYear(year);
  }
}
