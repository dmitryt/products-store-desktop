import get from 'lodash/get';

const schema = {
  schema: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: {
        type: 'string',
        title: 'Name'
      },
      email: {
        type: 'string',
        title: 'Email'
      },
      phoneNumber: {
        type: 'string',
        title: 'Phone Number'
      },
      addInformation: {
        type: 'text',
        title: 'Additional Information'
      }
    }
  }
};

export default get(schema, 'schema.properties', {});
