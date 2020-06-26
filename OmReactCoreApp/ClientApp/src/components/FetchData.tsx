import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';
import { stat } from 'fs';

// At runtime, Redux will merge together...
type WeatherForecastProps =
  WeatherForecastsStore.WeatherDataState
  & typeof WeatherForecastsStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class FetchData extends React.PureComponent<WeatherForecastProps> {
    
    state = {
        searchQuery: '' as string,
        errorMessage: '' as string
       };

    handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchQuery: event.target.value });
    }

    handleSeachSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!this.state.searchQuery) {
            console.log('no search input');
            return;
        }

        console.log(this.state.searchQuery);

        this.props.requestWeatherData(this.state.searchQuery);

        if (this.props.weatherData.locationName === undefined) {
            this.setState({ errorMessage: 'City not found, Enter the valid location' });
        }
        else {
            this.setState({ errorMessage: '' });
        }
    }

    public componentDidMount() {
        this.props.requestWeatherData('London');
    }


    public render() {

        let sunrise = convertTime(this.props.weatherData.sunrise);
        let sunset = convertTime(this.props.weatherData.sunset);

        function convertTime(unixTime: any) {
            let dt = new Date(unixTime * 1000)
            let h = dt.getHours()
            let m = "0" + dt.getMinutes()
            let t = h + ":" + m.substr(-2)
            return t
        }

      return (
          <div>
                     


              <div className="row">
                  
                  
            
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSeachSubmit(e)}>
                     
                      <div className="col-sm-8">
                          <input className="form-control form-control form-control-sm" type="text" required value={this.state.searchQuery} onChange={(e) => this.handleSearchQueryChange(e)} placeholder="Search!" />
                      </div>
                      <div className="col-sm-4"> <button className="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;</div>
            </form>

              </div>

              {this.state.errorMessage && (
                  <label className="red-text" style={{ marginTop: "2.5rem", color: 'red', fontWeight: 'bolder', fontSize:'large' }}>
                      {this.state.errorMessage}
                  </label>
              )}
              
              <div className="row">
                  <div className="col-sm-8"> &nbsp;</div>
                  <div className="col-sm-4">&nbsp;</div>

              </div>

              <div className={this.props.weatherData.temperatureC>16?'app warm':'app'}>
                      
                      {
                          <div className="location-box">
                              <div className="location">{this.props.weatherData.locationName}</div>

                          </div>

                      }

                      {
                          <div className="weather-box">
                              <div className="temp">
                                  {this.props.weatherData.temperatureC}<span>&#8451;</span>

                              </div>
                              <div className="weather">{}</div>
                          </div>
                      }

                  {

                      <div className="row">
                         
                          <div className="col-sm-6">
                              <div className="weather-box">
                              <div className="weather">
                                  <div>Maximum Temperature</div>
                                  {this.props.weatherData.temperatureMax}<span>&#8451;</span>
                                  </div>
                                  </div>
                          </div>
                          <div className="col-sm-6">
                              <div className="weather-box">
                              <div className="weather">Minimum Temperature</div>
                              <div className="weathertext">

                                  {this.props.weatherData.temperatureMin}<span>&#8451;</span>
                                  </div>
                                  </div>
                          </div>
                          <div className="col-sm-2"></div>
                      </div>
                  } 
                                        
                  {

                      <div className="row">

                          <div className="col-sm-6">
                              <div className="weather-box">
                                  <div className="weather">
                                      <div>Sunrise</div>
                                      {sunrise}
                                  </div>
                              </div>
                          </div>
                          <div className="col-sm-6">
                              <div className="weather-box">
                              <div className="weather">
                                  <div>Sunset</div>
                                  {sunset}
                              </div>
                              </div>
                          </div>
                      </div>


                  }



                      {
                          <div className= "row">

                          <div className="col-sm-6">
                                  <div className="weather-box">
                                     
                                          <div className="weather">
                                              <div>Pressure: {this.props.weatherData.pressure} mbar</div>

                                          </div>
                              </div>
                          </div>
                          <div className="col-sm-6">
                              <div className="weather-box">
                                          <div className="weather">
                                              <div>Humidity: {this.props.weatherData.humidity}%</div>

                                          </div>
                                      </div>
                                  </div>
                              </div>
                          
                      }

                  </div>
      




                 

      </div>
    );
  }

  

  

  
}

export default connect(
    (state: ApplicationState) => state.weatherDatas, // Selects which state properties are merged into the component's props
   
  WeatherForecastsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any);
