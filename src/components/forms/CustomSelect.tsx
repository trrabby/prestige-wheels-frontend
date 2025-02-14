import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TCustomSelectProps = {
  label?: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
};

const CustomSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  placeholder,
  defaultValue,
  required,
}: TCustomSelectProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Form.Item required={required} label={label}>
          <Select
            defaultValue={defaultValue}
            placeholder={placeholder}
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
