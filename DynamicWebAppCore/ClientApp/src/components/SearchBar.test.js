import React from "react";
import { shallow, mount, render } from "enzyme";
import "../setupEnzymeTests";
import SearchBar from "./SearchBar";

describe("<SearchBar />", () => {
  it("renders one (and only one) button", () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find("button")).toHaveLength(1);
  });
  it("renders the button with the correct icon", () => {
    const wrapper = mount(<SearchBar />);
    expect(
      wrapper
        .find("button")
        .children()
        .first()
        .hasClass("material-icons")
    ).toEqual(true);
  });
});
