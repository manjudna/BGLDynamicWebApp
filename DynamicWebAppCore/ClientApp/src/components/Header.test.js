import React from "react";
import { shallow, mount, render } from "enzyme";
import "../setupEnzymeTests";
import Header from "./Header";

describe("<Header />", () => {
  it("renders one <nav>", () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find("nav")).toHaveLength(1);
  });
  it("has the correct class", () => {
    const wrapper = mount(<Header />);
    expect(
      wrapper
        .find("nav")
        .children()
        .first()
        .hasClass("nav-wrapper")
    ).toEqual(true);
  });
});
