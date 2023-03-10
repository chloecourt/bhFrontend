type InputAttributesType = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type: string;
  required: boolean;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
};

const FormInput = ({
  label,
  inputAttributes,
}: {
  label: string;
  inputAttributes: InputAttributesType;
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-white" htmlFor={label}>
        {label}
      </label>
      <input
        {...inputAttributes}
        className={
          inputAttributes.className ||
          "shadow appearance-none border rounded sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1"
        }
      />
    </div>
  );
};

export default FormInput;

/**
 * https://codesandbox.io/s/react-forms-1b0g2?from-embed=&file=/src/app.js:1338-1461
 */
