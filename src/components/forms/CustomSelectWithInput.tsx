import { Form } from "antd";
import { Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useState } from "react";

type TCustomSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
};

const animatedComponents = makeAnimated();

const CustomSelectWithInput = ({
  label,
  name,
  options,
  disabled,
}: TCustomSelectProps) => {
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            components={animatedComponents}
            options={options}
            isClearable
            isSearchable
            onInputChange={(value) => setInputValue(value)}
            onChange={(newValue) => {
              const selectedOption = newValue as { value: string } | null;
              if (selectedOption) {
                field.onChange(selectedOption.value);
              } else {
                field.onChange(inputValue);
              }
            }}
            inputValue={inputValue}
            onBlur={() => {
              if (!field.value) {
                field.onChange(inputValue);
              }
            }}
            isDisabled={disabled}
            styles={{
              control: (provided) => ({
                ...provided,
                width: "100%",
              }),
            }}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelectWithInput;
