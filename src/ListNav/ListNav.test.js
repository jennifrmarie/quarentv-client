import React from 'react';
import ReactDOM from 'react-dom';
import ListNav from './ListNav';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
    const tree = renderer
      .create(<ListNav name="Messages" unread={4}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });