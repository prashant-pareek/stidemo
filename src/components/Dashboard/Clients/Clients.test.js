import React from 'react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { shallow } from '../../../enzyme';

// import List from './List';
import Clients from './Clients';

const mockStore = configureMockStore();
const store = mockStore({});


describe('Clients tests', () => {

  it('renders Clients', () => {
    const wrapper = shallow(<Provider store={store}><Clients /></Provider>);

    // Expect the wrapper object to be defined
    expect(wrapper.find('.MuiGrid-root')).toBeDefined();
    expect(wrapper.find('.MuiGrid-root button.MuiButton-root')).toBeDefined();
  });

});