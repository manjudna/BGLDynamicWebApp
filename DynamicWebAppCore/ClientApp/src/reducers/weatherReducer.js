import * as actions from "../actions/actionTypes";

export const initialState = {
  data: [],
  isLoading: false,
  errorMessage: ""
};

export function weatherReducer(state = initialState, action) {
  console.log('reducer called');
  switch (action.type) {
    case actions.FETCH_WEATHER_SUCCESS:
      const { city, list } = action.payload;
      const obj = {
        city,
        list
      };
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errorMessage: ""
      };
    case actions.FETCH_WEATHER_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: ""
      };
    case actions.FETCH_WEATHER_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: "Cannot find the city you just typed"
      };
    default:
      return state;
  }
}
