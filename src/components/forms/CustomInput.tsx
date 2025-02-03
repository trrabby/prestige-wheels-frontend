import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
};

const CustomInput = ({
  type,
  name,
  label,
  disabled,
  placeholder,
  defaultValue,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        defaultValue={defaultValue} // Ensure react-hook-form initializes with this value
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              value={field.value ?? defaultValue} // Ensure the value is always set
              placeholder={placeholder}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomInput;
