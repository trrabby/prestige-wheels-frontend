import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
};

const CustomTextArea = ({
  name,
  label,
  disabled,
  placeholder,
  defaultValue,
  required,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Form.Item required={required} label={label}>
            <TextArea
              defaultValue={defaultValue}
              required={required}
              {...field}
              rows={4}
              placeholder={placeholder}
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

export default CustomTextArea;
