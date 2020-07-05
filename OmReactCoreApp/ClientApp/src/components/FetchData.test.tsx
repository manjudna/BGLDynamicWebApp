import React from "react";
import { shallow, mount, render } from "enzyme";
import "../setupEnzymeTests";
import FetchData from "./FetchData";
import { Provider } from 'react-redux';

describe("<FetchData />", () => {
    const storeFake = (state: any) => ({
                default: () => {},
                subscribe: () => {},
                dispatch: () => {},
                getState: () => ({ ...state })
            });
            const store = storeFake({}) as any;

    it("renders without crashing", () => {
      const wrapper = shallow( <Provider store={store}>                     
                                  <FetchData/>
                                 </Provider>);

    });

});
