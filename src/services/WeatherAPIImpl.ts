import { City } from '../@types/typeCity';
import { CurrentForecast, Weather } from '../@types/typeForecasts';
import { IWeatherAPI, QueryCity } from './IWeatherAPI';

const API_RESOURCES = {
  search: 'search.json',
  CurrentForecast: 'current.json',
  forecast: 'forecast.json',
};

export class WeatherAPIImpl implements IWeatherAPI {
  private WEATHER_API_KEY: string;
  private WEATHER_API_BASE_URL: string;
  private WEATHER_API_VERSION: string;

  constructor() {
    this.WEATHER_API_KEY = import.meta.env.VITE_API_KEY_WEATHER;
    this.WEATHER_API_BASE_URL = 'https://api.weatherapi.com';
    this.WEATHER_API_VERSION = 'v1';
  }

  async findCityByName(nameCity = ''): Promise<City> {
    const params = new URLSearchParams();
    if (this.WEATHER_API_KEY !== null) {
      params.append('key', this.WEATHER_API_KEY);
    }
    if (nameCity !== null) {
      params.append('q', nameCity);
    }

    const fullUrl = new URL(
      `${this.WEATHER_API_BASE_URL}/${this.WEATHER_API_VERSION}/${API_RESOURCES.search}`,
    );
    fullUrl.search = new URLSearchParams(params).toString();

    const response = await fetch(fullUrl);
    const data: City = await response.json();

    return data;
  }
  async findCurrentForecastByCity(query: QueryCity): Promise<CurrentForecast> {
    const { nameCity, hasAirQuality } = query;

    const params = new URLSearchParams();
    if (this.WEATHER_API_KEY !== null) {
      params.append('key', this.WEATHER_API_KEY);
    }
    if (nameCity !== null) {
      params.append('q', nameCity);
    }
    if (hasAirQuality !== null) {
      params.append('aqi', hasAirQuality);
    }

    const fullUrl = new URL(
      `${this.WEATHER_API_BASE_URL}/${this.WEATHER_API_VERSION}/${API_RESOURCES.CurrentForecast}`,
    );
    fullUrl.search = new URLSearchParams(params).toString();

    const response = await fetch(fullUrl);
    const data = await response.json();

    return data;
  }
  async findWeatherDetailsByCity(query: QueryCity): Promise<Weather> {
    const { nameCity, hasAirQuality, hasAlerts, days } = query;

    const params = new URLSearchParams();
    if (this.WEATHER_API_KEY !== null) {
      params.append('key', this.WEATHER_API_KEY);
    }
    if (nameCity !== null) {
      params.append('q', nameCity);
    }
    if (hasAirQuality !== null) {
      params.append('aqi', hasAirQuality);
    }
    if (hasAlerts !== null && hasAlerts !== undefined) {
      params.append('alerts', hasAlerts);
    }
    if (days !== null && days !== undefined) {
      params.append('days', days.toString());
    }

    const fullUrl = new URL(
      `${this.WEATHER_API_BASE_URL}/${this.WEATHER_API_VERSION}/${API_RESOURCES.forecast}`,
    );
    fullUrl.search = new URLSearchParams(params).toString();

    const response = await fetch(fullUrl);
    const data = await response.json();

    return data;
  }
}
