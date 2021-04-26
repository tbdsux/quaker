import { FieldDataProps } from 'types/forms';

type FormRenderProps = {
  formfields: object[];
  formresp?: object;
};

const RenderForm = ({ formfields, formresp }: FormRenderProps) => {
  return (
    <>
      {formfields.map((field: FieldDataProps) => (
        <div className="my-2" key={formfields.indexOf(field)}>
          <label className={`tracking-wide mb-1`} htmlFor={field.question}>
            {field.question}
          </label>
          {field.type == 'user-input' ? (
            <div>
              <input
                className="py-2 border px-4 rounded-md w-full"
                name={field.question}
                type="text"
                defaultValue={formresp ? formresp[field.question] : null}
                readOnly={formresp ? true : false}
              />
            </div>
          ) : field.type == 'text-input' ? (
            <div>
              <textarea
                className="py-2 rounded-md px-4 border h-32 w-full"
                name={field.question}
                defaultValue={formresp ? formresp[field.question] : null}
                readOnly={formresp ? true : false}
              ></textarea>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default RenderForm;
