import CMTextfield from '../components/textfield/index.js';
import renderer from 'react-test-renderer';
import * as React from 'react';

it('should render correctly', () => {
    renderer.create(<CMTextfield />);
})