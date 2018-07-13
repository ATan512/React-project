//This project is a weather app
//import components and files
import React from 'react';
import './App.css';
import Titles from './Components/Titles';
import Form from './Components/Form';
import Weather from './Components/Weather';

//my API key = 0c58ceede96c4bb0e97798c1e12b74e8;

class App extends React.Component {
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    low_temp: undefined,
    high_temp: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

//create a function to get the values that the user enters
getWeather = async (event) => {
//the line below prevents the whole page from reloading each time
  event.preventDefault();
  const city = event.target.elements.city.value;
  const country = event.target.elements.country.value;
  //make the API call for the city and country that the user enters
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=0c58ceede96c4bb0e97798c1e12b74e8&units=imperial`);
  const data = await api_call.json();

  //make sure there is a city and country before trying to set anything
  if (city && country){
  console.log(data);
  //set the state using the info from the API call
  this.setState({
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    low_temp: data.main.temp_min,
    high_temp: data.main.temp_max,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    error: ''
  });
}
//the Else statement is for if there are no values entered, and so the user sees an error message if they try to click the "Get Weather" button with blank values
  else{
    this.setState({
    city: undefined,
    country: undefined,
    temperature: undefined,
    low_temp: undefined,
    high_temp: undefined,
    humidity: undefined,
    description: undefined,
    error: 'Please enter a city and country'
    });
  }
}

  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temperature}
          low_temp={this.state.low_temp}
          high_temp={this.state.high_temp}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
}

//so the other files can access this
export default App;
