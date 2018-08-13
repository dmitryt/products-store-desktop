// @flow
import React from 'react';
import MTextField from '@material-ui/core/TextField';

type IProps = {
  schema: any,
  data: any,
};

const TextArea = ({ schema, data, ...rest }: IProps) => (
  <MTextField {...rest} id={schema.name} value={data} multiline rows="2" />
);

export default TextArea;
