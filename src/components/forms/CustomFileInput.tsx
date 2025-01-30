import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TCustomFileInputProps = {
  label: string;
  name: string;
  disabled?: boolean;
};

const CustomFileInput = ({ label, name, disabled }: TCustomFileInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : null}
        >
          <Input
            type="file"
            onChange={(e) => onChange(e.target.files?.[0])}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomFileInput;
