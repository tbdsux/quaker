import { FieldQuestionInput, FieldQuestionInputProps } from './field-question';

interface FormFieldQuestionProps extends FieldQuestionInputProps {
  label: string;
}

const StringInputField = ({ label, questionRef, defaultValue }: FormFieldQuestionProps) => {
  return (
    <div>
      <h2 className="text-lg my-3 font-bold tracking-wide uppercase text-teal-800">{label}</h2>
      <FieldQuestionInput questionRef={questionRef} defaultValue={defaultValue} />
    </div>
  );
};

export { StringInputField };
