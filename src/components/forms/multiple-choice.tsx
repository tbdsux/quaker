import { useReducer, useRef, useState } from 'react';

import { DocumentAddIcon } from '@heroicons/react/outline';

import { ChoicesReducer, initialDataChoices } from '@lib/reducers/choices-reducer';

import { FormFieldQuestionProps, StringInputField } from './string-input';
import remove from 'pages/api/user/forms/get/responses/remove';

interface FormMultipleChoiceField extends FormFieldQuestionProps {
  defChoices?: string[];
}

const MultipleChoice = ({
  label,
  questionRef,
  defaultValue,
  defChoices
}: FormMultipleChoiceField) => {
  const [addChoice, setAddChoice] = useState(false);
  const [modifyChoice, setModifyChoice] = useState(false);
  const [mchoice, setMChoice] = useState<string>();
  const [{ choices }, dispatch] = useReducer(ChoicesReducer, initialDataChoices);
  const choiceInputRef = useRef<HTMLInputElement>();

  const handleModifyChoice = () => {
    const cValue = choiceInputRef.current.value;
    setAddChoice(true);
    dispatch({ type: 'modify', choice: cValue, index: choices.indexOf(mchoice) });

    setAddChoice(false);
    setModifyChoice(false);
    setMChoice('');
  };

  const handleAddChoice = () => {
    const cValue = choiceInputRef.current.value;
    if (cValue && !choices.includes(cValue)) {
      dispatch({ type: 'add', choice: cValue });

      // hide input form
      setAddChoice(false);
      setMChoice('');
    }
  };

  return (
    <>
      <StringInputField label={label} questionRef={questionRef} defaultValue={defaultValue} />

      <hr className="my-2" />
      <div className="flex items-center justify-between">
        <h4 className="uppercase font-medium">Choices:</h4>
        <button
          onClick={() => {
            setMChoice('');
            setAddChoice(true);
            setModifyChoice(false);
          }}
          className="inline-flex items-center bg-gray-400 hover:bg-gray-500 p-1 rounded-md text-white lowercase"
        >
          <DocumentAddIcon className="mr-1 h-4 w-4" /> new
        </button>
      </div>

      {addChoice && (
        <div className="mt-1 w-11/12 mx-auto flex items-center justify-between">
          <input
            ref={choiceInputRef}
            className="w-full p-2 rounded-md border"
            type="text"
            placeholder="Add field option"
            defaultValue={mchoice}
          />
          <button
            onClick={modifyChoice ? handleModifyChoice : handleAddChoice}
            className="text-sm ml-2 bg-teal-300 hover:bg-teal-400 text-white p-1 rounded-md"
          >
            {modifyChoice ? 'modify' : 'add'}
          </button>
        </div>
      )}

      <ul className="mt-3">
        {choices.map((c, index) => (
          <li
            key={index}
            className="p-3 border rounded-md my-1 flex items-center justify-between bg-teal-100 border-teal-600"
          >
            <p className="truncate">{c}</p>
            <div className="inline-flex">
              <button
                onClick={() => {
                  setModifyChoice(true);
                  setMChoice(c);
                  setAddChoice(true);
                }}
                className="text-sm text-gray-500"
              >
                modify
              </button>
              <button
                onClick={() => dispatch({ type: 'remove', choice: c })}
                className="text-sm text-red-500 ml-2"
              >
                remove
              </button>
              {/* <button>modify</button> */}
            </div>
          </li>
        ))}
      </ul>

      <p>not yet working</p>
    </>
  );
};

export { MultipleChoice };
