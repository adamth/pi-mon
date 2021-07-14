import React from 'react';
import { Card, CardContent } from '@material-ui/core';

type ProviderRowProps = {
  name: string;
  params: any;
};

export const ProviderRow = ({ name, params }: ProviderRowProps) => {
  return (
    <Card>
      <CardContent>{name}</CardContent>
    </Card>
  );
};
