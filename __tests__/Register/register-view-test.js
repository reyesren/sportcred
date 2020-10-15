import RegisterView from '../../src/View/Register/RegisterView';
import renderer from 'react-test-renderer';
import * as React from 'react';

it('should render correctly', () => {
  renderer.create(<RegisterView />);
});
