import { MutableRefObject } from 'react';

interface FieldQuestionInputProps {
  questionRef: MutableRefObject<HTMLInputElement>;
  defaultValue: string;
}

const FieldQuestionInput = ({ questionRef, defaultValue }) => {
  return (
    <div className="flex flex-col w-5/6 mx-auto">
      <label htmlFor="field-question">Please enter the question to ask...</label>
      <input
        ref={questionRef}
        name="field-question"
        type="text"
        placeholder="Your question..."
        className="py-2 border px-4 rounded-md"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export { FieldQuestionInput };
export type { FieldQuestionInputProps };
