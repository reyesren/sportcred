import CMButton from '../components/button/index.js';
import renderer from 'react-test-renderer';
import * as React from 'react';

it('should render correctly', () => {
    renderer.create(<CMButton />);
})