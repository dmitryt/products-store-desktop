// @flow
import React from 'react';
import get from 'lodash/get';

import TextField from './TextField';
import TextArea from './TextArea';

function getComponent(schema) {
  switch (schema.type) {
    case 'string':
      return TextField;
    case 'text':
      return TextArea;
    default:
      return TextField;
  }
}

type IProps = {
  schema: any,
  data: any,
  key: string
};

export default function createFieldFactory({ schema, key, ...rest }: IProps) {
  const fieldSchema = get(schema, key, {});
  const Component = getComponent(fieldSchema);
  return <Component schema={fieldSchema} {...rest} />;
}
