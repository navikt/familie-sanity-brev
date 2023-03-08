import { Stack, Card, Flex, Text } from '@sanity/ui';
import React from 'react';

export const FritekstområdePreview: React.FC = () => (
  <Stack>
    <Card padding={3} tone={'caution'}>
      <Flex justify="center">
        <Text>Fritekstområde</Text>
      </Flex>
    </Card>
  </Stack>
);
