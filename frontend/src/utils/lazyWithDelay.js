import React from 'react';

export function lazyWithDelay(factory, delay = 800) {
  return React.lazy(() =>
    Promise.all([
      factory(),
      new Promise(resolve => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports)
  );
} 