import React from 'react';
import Atoms from '../atoms';

export default (props) => (
  <Atoms.Button {...props} style={{...props.style}}>
    <Atoms.TextButton>{props.children}</Atoms.TextButton>
  </Atoms.Button>
);
