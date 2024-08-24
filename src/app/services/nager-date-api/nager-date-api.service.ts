import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryDto, CountryInfoDto, PublicHolidayDto } from '../../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NagerDateApiService {
  readonly #http = inject(HttpClient);

  readonly #baseUrl = environment.BASE_URL;

  getAvailableCountries(): Observable<CountryDto[]> {
    return this.#http.get<CountryDto[]>(`${this.#baseUrl}/AvailableCountries`);
  }

  getNextPublicHolidays(countryCode: string): Observable<PublicHolidayDto[]> {
    return this.#http.get<PublicHolidayDto[]>(
      `${this.#baseUrl}/NextPublicHolidays/${countryCode}`
    );
  }

  getCountryPublicHolidaysByYear(
    countryCode: string,
    year: number
  ): Observable<PublicHolidayDto[]> {
    return this.#http.get<PublicHolidayDto[]>(
      `${this.#baseUrl}/PublicHolidays/${year}/${countryCode}`
    );
  }

  getCountryInfo(countryCode: string): Observable<CountryInfoDto> {
    return this.#http.get<CountryInfoDto>(
      `${this.#baseUrl}/CountryInfo/${countryCode}`
    );
  }
}
