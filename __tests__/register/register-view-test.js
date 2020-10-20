import RegisterView from '../../src/view/register/RegisterView';
import renderer from 'react-test-renderer';
import * as React from 'react';

it('should render correctly', () => {
  renderer.create(<RegisterView />);
});
