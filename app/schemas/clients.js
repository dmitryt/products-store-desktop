export default {
  schema: {
    title: 'A registration form',
    description: 'A simple form example.',
    type: 'object',
    required: [
      'name',
    ],
    properties: {
      name: {
        type: 'string',
        title: 'Name',
      },
      email: {
        type: 'email',
        title: 'Email',
      },
      phoneNumber: {
        type: 'string',
        title: 'Phone Number',
      },
      addInformation: {
        type: 'text',
        title: 'Additional Information',
      },
    },
  },
};
