import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
};

const CustomTextArea = ({
  name,
  label,
  disabled,
  placeholder,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TextArea
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
