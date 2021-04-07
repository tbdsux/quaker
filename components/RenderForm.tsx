import { FieldData } from 'pages/user/forms/[formid]'

interface FormRender {
  formfields: object[]
  formresp?: object
}

const RenderForm = ({ formfields, formresp }: FormRender) => {
  return (
    <>
      {formfields.map((field: FieldData) => (
        <div className="my-2" key={formfields.indexOf(field)}>
          <label
            className="text-lg tracking-wide mb-1"
            htmlFor={field.question}
          >
            {field.question}
          </label>
          {field.type == 'user-input' ? (
            <div>
              <input
                className="py-2 text-lg border px-4 rounded-md w-full"
                name={field.question}
                type="text"
                value={formresp ? formresp[field.question] : null}
              />
            </div>
          ) : field.type == 'text-input' ? (
            <div>
              <textarea
                className="py-2 text-lg rounded-md border h-32 w-full"
                name={field.question}
                value={formresp ? formresp[field.question] : null}
              ></textarea>
            </div>
          ) : null}
        </div>
      ))}
    </>
  )
}

export default RenderForm