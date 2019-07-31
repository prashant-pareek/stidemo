import React from 'react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { shallow } from '../../enzyme';

// import List from './List';
import Clients from '../Dashboard/Clients/Clients';

const mockStore = configureMockStore();
const store = mockStore({});


describe('Clients tests', () => {

  it('renders Clients', () => {
    const wrapper = shallow(<Provider store={store}><Clients /></Provider>);

    // Expect the wrapper object to be defined
    expect(wrapper.find('.MuiGrid-root')).toBeDefined();
    expect(wrapper.find('.MuiGrid-root button.MuiButton-root')).toBeDefined();
    // expect(wrapper.find('.item')).toHaveLength(items.length);
  });

//   it('renders a list item', () => {
//     const items = ['Thor', 'Loki'];
//     const wrapper = shallow(<List items={items} />);

//     // Check if an element in the Component exists
//     expect(wrapper.contains(<li key='Thor' className="item">Thor</li >)).toBeTruthy();
//   });

//   it('renders correct text in item', () => {
//     const items = ['John', 'James', 'Luke'];
//     const wrapper = shallow(<List items={items} />);

//     //Expect the child of the first item to be an array
//     expect(wrapper.find('.item').get(0).props.children).toEqual('John');
//   });
});