import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WeatherForecastsState {
    isLoading: boolean;
    startDateIndex?: number;
    forecasts: WeatherForecast[];
    
}

export interface WeatherDataState {
    isLoading: boolean;
    location: string;
    error: string;
    weatherData: WeatherData;
}

export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
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
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestWeatherForecastsAction {
    type: 'REQUEST_WEATHER_FORECASTS';
    startDateIndex: number;
}

interface ReceiveWeatherForecastsAction {
    type: 'RECEIVE_WEATHER_FORECASTS';
    startDateIndex: number;
    forecasts: WeatherForecast[];
}

interface ReceiveWeatherDataAction {
    type: 'RECEIVE_WEATHER_DATA';
    location: string;
    weatherData: WeatherData;
    
}

interface RequestWeatherDataAction {
    type: 'REQUEST_WEATHER_DATA';
    location: string;
    
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction | ReceiveWeatherDataAction | RequestWeatherDataAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
            fetch(`weatherforecast`)
                .then(response => response.json() as Promise<WeatherForecast[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
                });

            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    },

    requestWeatherData: (location: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        // if (appState && appState.weatherDatas && startDateIndex !== appState.weatherDatas.startDateIndex) {
        fetch(`http://192.168.99.100:8081/WeatherData/` + location)
        //fetch(`https://localhost:44304/WeatherData/` + location)
            .then(response => response.json() as Promise<WeatherData>)
            .then(data => {
                //console.log(data);
                dispatch({ type: 'RECEIVE_WEATHER_DATA', location: location, weatherData: data });
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

const unloadedState: WeatherForecastsState = { forecasts: [], isLoading: false };

export const reducer: Reducer<WeatherForecastsState> = (state: WeatherForecastsState | undefined, incomingAction: Action): WeatherForecastsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true
            };
        case 'RECEIVE_WEATHER_FORECASTS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};


const unloadedStatew: WeatherDataState = {
    weatherData: {
        humidity: '', temperatureC: 0, locationName: '', pressure: '',
        sunrise: '', sunset: '', temperatureMax: '', temperatureMin: ''
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
        
            break;
    }

    return state;
};
