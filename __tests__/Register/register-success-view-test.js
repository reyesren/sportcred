import RegisterSuccessView from '../../src/View/Register/RegisterSuccessView';
import renderer from 'react-test-renderer';
import * as React from 'react';

it('should render correctly', () => {
  renderer.create(<RegisterSuccessView route={{params: {name: 'john'}}} />);
});va
