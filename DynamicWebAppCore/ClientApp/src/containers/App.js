import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { PropagateLoader } from "react-spinners";
import { fetchWeather } from "../actions/actionCreators";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import WeatherList from "../components/WeatherList";


// font-family: "Montserrat", sans-serif;
// font-family: "Lobster", cursive;
const Container = styled.div`
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
`;

class App extends Component {
  componentDidMount() {
    // start data loading with some city, so the user sees something
    this.props.fetchWeather("Mysore");
  }

  render() {
    const primaryColor = "orange darken-2";
    const secondaryColor = "purple darken-4";
    /*
      Pass the fetchWeather action creator down to the component hierarchy.
      We want to call it - namely we want to dispatch a new action to the redux
      store - when we enter a new city in the search bar.
    */
    const { data, errorMessage, fetchWeather } = this.props;
    return (
      <div className="container">
        <Container>
          <Header text={"Accurate Weather"} color={primaryColor} />
          <Content>
            <SearchBar
              color={secondaryColor}
              fetchWeather={fetchWeather}
              errorMessage={errorMessage}
            />
            {/* conditional rendering of a loader */}
            {this.props.isLoading && (
              <div className="row">
                <div className="col s12 offset-s6">
                  <PropagateLoader
                    color={"#0336ff"}
                    loading={this.props.isLoading}
                  />
                </div>
              </div>
            )}
            <WeatherList data={data} />
          </Content>
         
        </Container>
      </div>
    );
  }
}

/*
  Take a portion of the entire application state (managed by redux) and make it
  available to this container component via props.
*/
function mapStateToProps(state) {
  const { data, errorMessage, isLoading } = state.weather;
  const props = {
    data,
    errorMessage,
    isLoading
  };
  return props;
}

/* 
  Bind action creators to props and pass them to all reducers via the dispatch
  function. Anything returned from this function will end up as props on the
  UserList container.
*/
function mapDispatchToProps(dispatch) {
  // object destructuring: {fetchUsers (prop): fetchUsers (action creator)}
  return bindActionCreators({ fetchWeather }, dispatch);
}

/*
  Promote the "dumb", redux-unaware, presentational component, to a "smart",
  redux-aware, container component.
*/
const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);
const AppWithRedux = enhance(App);

export { App, AppWithRedux };
