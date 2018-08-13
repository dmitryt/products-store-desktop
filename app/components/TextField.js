// @flow
import React from 'react';
import MTextField from '@material-ui/core/TextField';

type IProps = {
  schema: any,
  data: any,
};

const TextField = ({ schema, data, ...rest }: IProps) => (
  <MTextField {...rest} id={schema.name} value={data} />
);

export default TextField;
