import React from "react";
import { shallow, mount, render } from "enzyme";
import { Provider } from "react-redux";
import { App, AppWithRedux } from "./App";
import * as actions from "../actions/actionCreators";
import { initialState } from "../reducers/weatherReducer";
import store from "../store";
import "../setupEnzymeTests";

/*
  Since <App /> is not hooked up to the redux store and it calls the action
  creator fetchWeather in the componentDidMount lifecycle hook, we need to pass
  the action creator as a prop manually.
*/
describe("<App /> (not connected to redux)", () => {
  const { data, isLoading, errorMessage } = initialState;
  it("should render without crashing", () => {
    const wrapper = shallow(<App fetchWeather={actions.fetchWeather} />);
  });
});

describe("<AppWithRedux /> (connected to redux store)", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <AppWithRedux />
      </Provider>
    );
  });
});
