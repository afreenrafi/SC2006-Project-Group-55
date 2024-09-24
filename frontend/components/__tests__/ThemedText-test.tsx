import * as React from 'react';
import renderer from 'react-test-renderer';

import { ThemedText } from '../ThemedText';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemedText 
      lightColor="#fff" 
      darkColor="#000" 
      style={{}} 
    >
      Snapshot test!
    </ThemedText>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
