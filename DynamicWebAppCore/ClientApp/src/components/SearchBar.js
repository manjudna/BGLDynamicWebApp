import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    // for convenience, when the user submit the form, we clean up the input
    this.setState({ term: "" });
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    const { color, errorMessage } = this.props;
    const buttonClassName = `${color} btn-flat white-text`;
    return (
      <div className="row">
        <form
          className="col s12"
          onSubmit={this.onFormSubmit}
          style={{ marginTop: "1rem" }}
        >
          <div className="search-bar" style={{ marginBottom: "0rem" }}>
            <div className="input-field col s6 offset-s2">
              <input
                type="text"
                placeholder="e.g. San Francisco, Rome, Tokyo"
                value={this.state.term}
                onChange={this.onInputChange}
              />
              {errorMessage && (
                <label className="red-text" style={{ marginTop: "2.5rem" }}>
                  {errorMessage}
                </label>
              )}
            </div>

            <div className="input-field col s3">
              <button type="submit" className={buttonClassName}>
                Submit
                <i className="material-icons right">wb_sunny</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  color: "teal darken-2"
};

SearchBar.propTypes = {
  color: PropTypes.string,
  errorMessage: PropTypes.string,
  fetchWeather: PropTypes.func.isRequired
};

export default SearchBar;
