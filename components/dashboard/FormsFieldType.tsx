interface fieldType {
  type: string
}

const FieldType = ({ type }: fieldType) => {
  if (type == 'user-input') {
    return (
      <div>
        <h2 className="text-lg my-3 font-bold tracking-wide uppercase text-teal-800">
          User Input
        </h2>
        <div className="flex flex-col w-5/6 mx-auto">
          <label htmlFor="field-question">
            Please enter the question to ask...
          </label>
          <input
            name="field-question"
            type="text"
            placeholder="Your question..."
            className="py-2 border px-4 rounded-md"
          />
        </div>
      </div>
    )
  } else if (type == 'text-input') {
    return (
      <div>
        <h2 className="text-lg my-3 font-bold tracking-wide uppercase text-teal-800">
          Text Input
        </h2>
        <div className="flex flex-col w-5/6 mx-auto">
          <label htmlFor="field-question">
            Please enter the question to ask...
          </label>
          <input
            name="field-question"
            type="text"
            placeholder="Your question..."
            className="py-2 border px-4 rounded-md"
          />
        </div>
      </div>
    )
  } else if (type == 'multiple-choice') {
    return (
      <div>
        <h2 className="text-lg my-3 font-bold tracking-wide uppercase text-teal-800">
          Multiple Choice
        </h2>
        <div>Currently in the works...</div>
      </div>
    )
  }

  return null
}

export default FieldType
