import { Component } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherApp';
  public locationVal = '';
  public weatherDetails:boolean = false;
  public apiKey:string = "5abda228b772e9b5882428bd392cfcff";
  public loading: boolean = false;
  public errorMessage: boolean = false;

  public WeatherData = {
    humidity: null,
    temperature: null,
    weatherCondition: ""
  }

  constructor(private http: HttpClient) {}

    public fetchWeather(city: string) {
      this.loading = true;
      this.errorMessage = false;
      const apiUrl = 
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey;
      const timeoutValue = 2000;
      this.http
      .get(apiUrl)
      .pipe(timeout(timeoutValue))
        .subscribe((response) => {       
          this.loading = false;
          if (!response) {
            alert("No weather found.");
            this.loading = true;
            this.errorMessage = true;
            throw new Error("No weather found.");
          }
          else {
            this.errorMessage = false;
            this.displayWeather(response);
          }
        },(error) => {
          this.loading = false;
          this.weatherDetails = false;
          this.errorMessage = true;
          alert("No weather found this location!!.");
        })
        
        
        
    }


    public displayWeather(data: any) {
      console.log(data);
      this.WeatherData.humidity = data.main.humidity;
      this.WeatherData.temperature = data.main.temp;
      this.WeatherData.weatherCondition = data.weather[0].description;
    }


 public  search(locationValue:string) {
    this.fetchWeather(locationValue);
    console.log(locationValue);
  }


  public searchEvent(locationName: string) {
    debugger;
    this.weatherDetails  = true;
    this.search(locationName);
      }
  
  }
