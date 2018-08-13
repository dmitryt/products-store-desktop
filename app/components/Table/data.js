import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';

import schemaFields from '../../schemas/clients';

export const uiSchemas = {
  clients: {
    'ui:order': ['name', 'email', 'phoneNumber', 'additionalInformation'],
    addInformation: {
      'ui:widget': 'textarea',
    },
    email: {
      'ui:options': {
        inputType: 'email',
      },
    },
  },
};

const indexes = get(uiSchemas, 'clients.ui:order').reduce(
  (acc, key, i) => ({ ...acc, [key]: i }),
  {}
);

export default sortBy(
  map(schemaFields, (value, id) => ({ ...value, id })),
  ({ id }) => indexes[id]
);
