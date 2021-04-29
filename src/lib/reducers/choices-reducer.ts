type ChoicesActions =
  | { type: 'add'; choice: string }
  | { type: 'remove'; choice: string }
  | { type: 'modify'; choice: string; index: number }
  | { type: 'set'; choices: string[] };

type InitialChoices = {
  choices: string[];
};
const initialDataChoices: InitialChoices = {
  choices: []
};

const ChoicesReducer = (state: InitialChoices, action: ChoicesActions) => {
  switch (action.type) {
    case 'add':
      return {
        choices: [...state.choices, action.choice]
      };
    case 'modify':
      state.choices[action.index] = action.choice;
      return state;

    case 'remove':
      return {
        choices: state.choices.filter((c) => c !== action.choice)
      };
  }
};

export { ChoicesReducer, initialDataChoices };
