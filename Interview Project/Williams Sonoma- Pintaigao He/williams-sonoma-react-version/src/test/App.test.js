import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';
import MainPage from '../Pages/Main';
import DetailPage from '../Pages/Detail';
import Carousal from '../Pages/Carousal-Modal';
import data from "./Mock/data"
import Item from '../Components/Item';

let mock = jest.fn();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('should render MainPage correctly', () => {
  const wrapper = shallow(<MainPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should render DetailPage correctly', () => {
  const wrapper = shallow(<DetailPage match={mock} location={{ 'state': data.groups[0] }} props={data.groups[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render DetailPage correctly', () => {
  const wrapper = shallow(<Carousal images={data.groups[0].images} startIndex={0} displayModal={true} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render DetailPage correctly', () => {
  const wrapper = shallow(<Item item={data.groups[0]} />);
  expect(wrapper).toMatchSnapshot();
});