import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Clients from './Clients';

const mockStore = configureMockStore();
const store = mockStore({});

configure({adapter: new Adapter()});

describe('<Clients />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Provider store={store}><Clients /></Provider>);
  });

  it('should render empty table if no data provided', () => {
    expect(wrapper.find('.MuiGrid-root')).toBeDefined();
    expect(wrapper.find('.MuiGrid-root button.MuiButton-root')).toBeDefined();
  });
});