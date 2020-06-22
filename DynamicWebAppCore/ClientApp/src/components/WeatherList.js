import React from "react";
import PropTypes from "prop-types";

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'react-bootstrap';

const WeatherList = props => {

  let sunrise = convertTime( props.data.sunrise);
  let sunset = convertTime( props.data.sunset);

  function convertTime(unixTime){
    let dt = new Date(unixTime * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substr(-2)
    return t
}

  return (
    <div className={props.data.temperatureC>16?'app warm':'app'}>
      {/*
        README! Since in the reducer I insert a new city at the first position
        of the `data` array, I cannot use the index as the `key`. Also, since
        a user could potentially search the same city twice (or more), the `key`
        I am using here might not be unique (it's a warning, not an error).
      */}
      
      {
<div className="location-box">
<div className="location">{props.data.locationName}</div>

</div>  
                    
      }

{
  <div className="weather-box">
  <div className="temp">
      {props.data.temperatureC}<span>&#8451;</span>

  </div>
  <div className="weather">{}</div>
</div>
}

{
  <div className={"weather row"}>
  <div className={"col s12 m12"}>  

  <div className="weather-box">

  <div className={"col s6 m6"}>  
  
  <div className="weather">
  <div>Maximum Temperature</div>
    {props.data.temperatureMax}<span>&#8451;</span>       
  </div>
  </div>
  <div className={"col s6 m6"}>  
  <div className="weather">Minimum Temperature</div>
  <div className="weathertext">
   
  {props.data.temperatureMin}<span>&#8451;</span>
  </div>
  </div>
  </div>
</div>
</div>
}



{
  <div className={"weather row"}>
     <div className={"col s12 m12"}>  
   <div className="weather-box">
   <div className={"col s6 m6"}>  
   <div className="weather">
     
     <div>Sunrise</div>       
      {sunrise}       
   </div>
   </div>
   <div className={"col s6 m6"}>  
   <div className="weather">
   <div>Sunset</div>
   {sunset}
   </div>
   </div>
</div>
</div>
</div>
}    



{
  <div className={"weather row"}>
     <div className={"col s12 m12"}>  
   <div className="weather-box">
   <div className={"col s6 m6"}>  
   <div className="weather">
   <div>Pressure: {props.data.pressure} mbar</div>
         
   </div>
   </div>
   <div className={"col s6 m6"}>  
   <div className="weather">
   <div>Humidity: {props.data.humidity}%</div>
   
   </div>
   </div>
</div>
</div>
</div>
}      

    </div>
  );
};



export default WeatherList;
