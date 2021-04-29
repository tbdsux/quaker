import { FieldDataProps } from '~types/forms';

type FieldActions =
  | { type: 'add'; field: FieldDataProps }
  | { type: 'remove'; field: FieldDataProps }
  | { type: 'modify'; field: FieldDataProps; index: number }
  | { type: 'set'; fields: FieldDataProps[] };

type fieldState = {
  fields: FieldDataProps[];
};

const InitFields: fieldState = {
  fields: []
};

const FieldsReducer = (state: fieldState, action: FieldActions) => {
  switch (action.type) {
    // add field
    case 'add':
      return {
        fields: [...state.fields, action.field]
      };
    // remove field
    case 'remove':
      // NOTE: I am having issues with splice, so I this will do...
      return {
        fields: state.fields.filter((item) => item !== action.field)
      };
    // modify field
    case 'modify':
      state.fields.splice(action.index, 1);
      state.fields.splice(action.index, 0, action.field);
      return state;
    // set field
    case 'set':
      return {
        fields: action.fields
      };
    default:
      return state;
  }
};

export { FieldsReducer, InitFields };
