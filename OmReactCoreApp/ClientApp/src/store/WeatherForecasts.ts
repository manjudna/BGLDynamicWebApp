import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WeatherDataState {
    isLoading: boolean;
    location: string;
    error: string;
    weatherData: WeatherData;
}

export interface WeatherData {
   
    temperatureC: number;
    temperatureMax: string;
    temperatureMin: string;
    pressure: string;
    humidity: string;
    sunrise: string;
    sunset: string;
    locationName: string;
    desc: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface ReceiveWeatherDataAction {
    type: 'RECEIVE_WEATHER_DATA';
    location: string;
    weatherData: WeatherData;
    
}

interface RequestWeatherDataAction {
    type: 'REQUEST_WEATHER_DATA';
    location: string;
    
}

interface FetchWeatherDataFail {
    type: 'FETCH_WEATHER_FAIL';
    error: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = ReceiveWeatherDataAction | RequestWeatherDataAction | FetchWeatherDataFail;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
   
    requestWeatherData: (location: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        // if (appState && appState.weatherDatas && startDateIndex !== appState.weatherDatas.startDateIndex) {
       // fetch(`http://192.168.99.100:8081/WeatherData/` + location)
        //fetch(`https://localhost:44304/WeatherData/` + location)
        fetch(process.env.REACT_APP_BASE_URL + location)
            //.then(response => response.json() as Promise<WeatherData>)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                //console.log(data);
                if (data.status === 404) {
                    dispatch({ type: 'FETCH_WEATHER_FAIL', error: data.status });
                }
                else {
                    dispatch({ type: 'RECEIVE_WEATHER_DATA', location: location, weatherData: data });
                }
            })
            .catch(error => {
                console.log(error);
            });

        dispatch({ type: 'REQUEST_WEATHER_DATA', location: location });
        //}
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.



const unloadedStatew: WeatherDataState = {
    weatherData: {
        humidity: '', temperatureC: 0, locationName: '', pressure: '',
        sunrise: '', sunset: '', temperatureMax: '', temperatureMin: '', desc:''
    }, isLoading: false, location: '', error:''
};

export const reducerw: Reducer<WeatherDataState> = (state: WeatherDataState | undefined, incomingAction: Action): WeatherDataState => {
    if (state === undefined) {
        return unloadedStatew;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {

        case 'REQUEST_WEATHER_DATA':
            console.log('request', state.weatherData);
            return {
                location: action.location,
                weatherData: state.weatherData,
                isLoading: true,
                error:''
            };
        case 'RECEIVE_WEATHER_DATA':
            console.log('recieve', action.weatherData);
            
            return {
                location: action.location,
                weatherData: action.weatherData,
                isLoading: false,
                error: ''
            };

        case 'FETCH_WEATHER_FAIL':
            console.log('recieve', action.error);

            return {
                isLoading: false,
                location: '',
                weatherData: {
                    humidity: '', temperatureC: 0, locationName: '', pressure: '',
                    sunrise: '', sunset: '', temperatureMax: '', temperatureMin: '', desc:''
                },
                
                error: 'Cannot find the city you just typed, please enter valid city ie.. London, Paris, New York'
            };


            break;
    }

    return state;
};
