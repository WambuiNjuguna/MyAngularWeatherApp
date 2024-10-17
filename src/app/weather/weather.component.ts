
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  weatherData: any;
  city: string = '';
  errorMessage: string= '';
  currentDate: Date = new Date();
  currentDateFormatted: string = '';
  currentTimeFormatted: string = '';
  weatherIcon: string = '';
  weatherDescription: string = '';

  constructor(private http: HttpClient) {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      this.city = lastCity;
      this.getWeatherData();
    }
   }

  getWeatherData() {
    const apiKey = '52ca98313ecd382a12f78589a2512e8c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.weatherData = data;
      console.log(data); 
      
      localStorage.setItem('lastCity', this.city); // Store last checked city in local storage
      this.errorMessage = '';
      this.currentDate = new Date();
      this.currentDateFormatted = this.formatDate(this.currentDate);
        this.currentTimeFormatted = this.formatTime(this.currentDate);

        switch (data.weather[0].main) {
          case "Clouds":
            this.weatherIcon = '/assets/Images/Cloudy.PNG';
            this.weatherDescription = '(Cloudy)';
            break;
          case "Clear":
            this.weatherIcon = '/assets/Images/clear.png';
            this.weatherDescription = '(Clear)';
            break;
          case "Drizzle":
            this.weatherIcon = '/assets/Images/drizzle.png';
            this.weatherDescription = '(Drizzle)';
            break;
          case "Rain":
            this.weatherIcon = 'assets/Images/rain.png';
            this.weatherDescription = '(Rainy)';
            break;
          case 'Mist':
            this.weatherIcon = '/assets/Images/mist.png';
            this.weatherDescription = '(Misty)';
            break;
          case "Snow":
            this.weatherIcon = '/assets/Images/snow.png';
            this.weatherDescription = '(Snowy)';
            break;
          default:
            this.weatherIcon = '';
            this.weatherDescription = '';
            break;
        }
    },
    
    (error) => {
      this.errorMessage = 'City not found. Please enter a valid city name.';
      this.weatherData= null;
    }
  );
}

formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
}
  formatTemperature(temp: number): string {
    return temp.toFixed(0); 
  }
}
