jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { Card } from '../../components/ui/Card';

describe('Card', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Hello Card</Text>
      </Card>
    );
    expect(getByText('Hello Card')).toBeTruthy();
  });
});
