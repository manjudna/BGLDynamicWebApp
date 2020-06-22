import React from "react";
import PropTypes from "prop-types";

const Header = props => {
  const navClass = `nav-extended ${props.color}`;
  const divClass = `nav-wrapper ${props.color} center-align`;
  let h3Class;
  const arr = props.textColor.split(" ");
  if (arr.length === 1) {
    h3Class = `${arr[0]}-text`;
  } else {
    h3Class = `${arr[0]}-text ${arr[1]}-text`;
  }
  return (
    <nav className={navClass}>
      <div className={divClass}>
        <h3 className={h3Class}>{props.text}</h3>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  text: "Header text",
  color: "purple darken-4",
  textColor: "white"
};

Header.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string
};

export default Header;
