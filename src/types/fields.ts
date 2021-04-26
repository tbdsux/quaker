const FormFieldTypes = [
  {
    name: 'User Input',
    value: 'user-input'
  },
  {
    name: 'Text Input',
    value: 'text-input'
  },
  {
    name: 'Multiple Choice',
    value: 'multiple-choice'
  }
];

const FormFieldObject = {
  'user-input': FormFieldTypes[0],
  'text-input': FormFieldTypes[1],
  'multiple-choice': FormFieldTypes[2]
};

export { FormFieldTypes, FormFieldObject };
