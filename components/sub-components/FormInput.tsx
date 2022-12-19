import React from "react";

type InputAttributesType = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement>;
  type: string;
  required: boolean;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
};
/**
 *
 * @param label: string
 * @param onChange: (e: event)=> void
 * @param type string
 * @param required boolean
 * @param placeholder? string
 * @returns
 */
const FormInput = ({
  label,
  inputAttributes,
}: {
  label: string;
  inputAttributes: InputAttributesType;
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <input
        {...inputAttributes}
        className={
          inputAttributes.className ||
          "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1"
        }
      />
    </div>
  );
};

export default FormInput;

/**
 * https://codesandbox.io/s/react-forms-1b0g2?from-embed=&file=/src/app.js:1338-1461
 */
