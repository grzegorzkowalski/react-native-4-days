// SlowComponent.js
import React from 'react';
import { Text } from 'react-native';

function fetchDetails() {
  return new Promise(resolve => setTimeout(() => resolve('Detail Loaded!'), 2000));
}

const resource: {
  promise?: Promise<any>;
  result?: string;
  read: () => string;
} = {
  promise: undefined,
  result: undefined,
  read: function (): string {
    if (!resource.promise) {
      throw resource.promise = fetchDetails().then(r => resource.result = r as string);
    }
    if (!resource.result) throw resource.promise;
    return resource.result;
  }
};

export default function SlowComponent() {
  const detail = resource.read(); // This will suspend!
  return <Text>{detail}</Text>;
}