import { reducerw, actionCreators} from './WeatherForecasts';
import { WeatherDataState } from './WeatherForecasts';
import {ReceiveWeatherDataAction} from './WeatherForecasts';

describe("weatherStore",()=>{

    it("should be isLoading=true after FETCH_WEATHER_START",()=>{
       let inState: WeatherDataState|any;  
       const initState = inState;
       
       let rcvWeatherDataAction: ReceiveWeatherDataAction|any;
       var nextstate = reducerw(initState,rcvWeatherDataAction)
    
       expect(nextstate.isLoading).toBe(false);       
    });
});