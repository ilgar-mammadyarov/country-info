import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { NagerDateApiService } from '../../services';
import { take, tap } from 'rxjs';
import { CountryInfoDto, PublicHolidayDto } from '../../models';

@Injectable()
export class CountryService {
  readonly #naggerDateApiService = inject(NagerDateApiService);
  readonly #countryCode = signal('');
  readonly #countryInfo = signal<CountryInfoDto | null>(null);
  readonly #selectedYear = signal(new Date().getFullYear());
  readonly #holidays = signal<PublicHolidayDto[]>([]);

  readonly countryInfo = computed(() => this.#countryInfo());
  readonly selectedYear = computed(() => this.#selectedYear());
  readonly holidays = computed(() => this.#holidays());

  readonly YEARS = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ];

  constructor() {
    effect(() => {
      if (this.#countryCode() && this.selectedYear()) {
        this.getCountryWithHolidayAndYear(
          this.#countryCode(),
          this.selectedYear()
        );
      }
    });

    effect(() => {
      if (this.#countryCode()) {
        this.#naggerDateApiService
          .getCountryInfo(this.#countryCode())
          .pipe(
            take(1),
            tap(countryInfo => this.#countryInfo.set(countryInfo))
          )
          .subscribe();
      }
    });
  }

  setCountryCode(countryCode: string): void {
    this.#countryCode.set(countryCode);
  }

  setSelectedYear(year: number): void {
    this.#selectedYear.set(year);
  }

  getCountryWithHolidayAndYear(countryCode: string, year: number): void {
    this.#naggerDateApiService
      .getCountryPublicHolidaysByYear(countryCode, year)
      .pipe(
        take(1),
        tap(holidays => this.#holidays.set(holidays))
      )
      .subscribe();
  }
}
