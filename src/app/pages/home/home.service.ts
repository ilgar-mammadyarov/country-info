import { Injectable, computed, inject, signal } from '@angular/core';
import { NagerDateApiService } from '../../services';
import { Observable, filter, forkJoin, map, switchMap, take } from 'rxjs';
import { CountryDto } from '../../models';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CountryWithHoliday } from './home.models';

@Injectable()
export class HomeService {
  readonly #naggerDateApiService = inject(NagerDateApiService);
  readonly #availableCountries = toSignal<CountryDto[]>(
    this.#naggerDateApiService.getAvailableCountries(),
  );
  readonly filter = signal('');
  readonly filteredCountries = computed(() => {
    if (this.filter()) {
      return (
        this.#availableCountries()?.filter((country) =>
          country.name.toLowerCase().includes(this.filter()),
        ) ?? []
      );
    } else {
      return this.#availableCountries() ?? [];
    }
  });
  readonly #randomCountriesAndHolidays = toSignal<CountryWithHoliday[]>(
    this.getRandomHolidays(),
  );
  readonly randomHolidays = computed(
    () => this.#randomCountriesAndHolidays() ?? [],
  );

  private getRandomHolidays(): Observable<CountryWithHoliday[]> {
    return toObservable(this.filteredCountries).pipe(
      filter((countries) => countries.length > 0),
      take(1),
      switchMap((countries) => {
        const randomCountries = countries
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        return forkJoin([
          ...randomCountries.map((c) =>
            this.#naggerDateApiService.getNextPublicHolidays(c.countryCode),
          ),
        ]).pipe(
          map((holidays) => {
            return holidays.map((h) => {
              const countryWithHoliday: CountryWithHoliday = {
                countryCode: h[0].countryCode,
                countryName: randomCountries.find(
                  (c) => c.countryCode === h[0].countryCode,
                )!.name,
                holidayName: h[0].name,
                holidayDate: h[0].date,
              };
              return countryWithHoliday;
            });
          }),
        );
      }),
    );
  }
}
