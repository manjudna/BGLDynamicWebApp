import * as types from "../actions/actionTypes";
import { initialState, weatherReducer } from "./weatherReducer";

describe("Weather reducer", () => {
  it("should be isLoading=true after FETCH_WEATHER_START", () => {
    const state = initialState;
    const action = { type: types.FETCH_WEATHER_START };
    const nextState = weatherReducer(state, action);
    expect(initialState.isLoading).toBeFalsy();
    expect(nextState.isLoading).toBeTruthy();
  });

  it("should have the correct data and isLoading=false after FETCH_WEATHER_SUCCESS", () => {
    const state = {
      ...initialState,
      isLoading: true
    };
    const payload = {
      city: "Rome",
      list: [{}, {}, {}]
    };
    const action = { type: types.FETCH_WEATHER_SUCCESS, payload };
    const nextState = weatherReducer(state, action);
    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.data).toHaveLength(1);
    expect(nextState.data[0].city).toBe("Rome");
    expect(nextState.data[0].list).toHaveLength(3);
  });

  it("should have an error message and isLoading=false after FETCH_WEATHER_FAIL", () => {
    const state = {
      ...initialState,
      isLoading: true
    };
    const action = { type: types.FETCH_WEATHER_FAIL, payload: new Error("!") };
    const nextState = weatherReducer(state, action);
    expect(nextState.isLoading).toBeFalsy();
    expect(nextState.errorMessage).not.toEqual(state.errorMessage);
  });
});
