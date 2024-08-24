export interface PublicHolidayDto {
  date: Date;
  localName: string;
  name: string;
  countryCode: string;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: string[];
}
