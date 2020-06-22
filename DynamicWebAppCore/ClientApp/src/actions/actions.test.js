import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
const HttpStatus = require("http-status-codes");
import { mockRomeFiveDayForecast } from "../mocks";
import * as types from "./actionTypes";
import * as actions from "./actionCreators";

/*
  For async action creators using Redux Thunk or other middleware, it's best to
  completely mock the Redux store for tests.
  https://redux.js.org/recipes/writing-tests
*/
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Async fetch weather action", () => {
  /*
    Mock axios requests for testing. It's better to install the mock before each
    test case, and uninstall it after each test case.
  */
  beforeEach(function() {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should create FETCH_WEATHER_START and FETCH_WEATHER_SUCCESS when succeeds in fetching the weather", done => {
    /*
      Mock a successful HTTP request (200) whose response is a 5-day weather
      forecast for Rome.
    */
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: HttpStatus.OK,
        response: mockRomeFiveDayForecast
      });
    });

    // Create a mock redux store which contains no actions at the beginning.
    const store = mockStore({ data: [], isLoading: false });
    expect(store.getActions()).toHaveLength(0);

    /*
      We expect that a successful fetchWeather dispatches 2 actions to the mock
      redux store: one for the start of the HTTP request, one for the success of
      that request.
    */
    const expectedActions = [
      { type: types.FETCH_WEATHER_START },
      { type: types.FETCH_WEATHER_SUCCESS, payload: mockRomeFiveDayForecast }
    ];
    const promise = store.dispatch(actions.fetchWeather("rome"));
    return promise.then(() => {
      expect(store.getActions()).toHaveLength(2);
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it("should create FETCH_WEATHER_START and FETCH_WEATHER_FAIL when fails in fetching the weather", done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: HttpStatus.NOT_FOUND,
        response: {
          cod: "404",
          message: "city not found"
        }
      });
    });

    const store = mockStore({});
    expect(store.getActions()).toHaveLength(0);

    const error = new Error("Request failed with status code 404");
    const expectedActions = [
      { type: types.FETCH_WEATHER_START },
      { type: types.FETCH_WEATHER_FAIL, payload: error }
    ];
    const promise = store.dispatch(actions.fetchWeather("aaa"));
    return promise.then(() => {
      expect(store.getActions()).toHaveLength(2);
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
