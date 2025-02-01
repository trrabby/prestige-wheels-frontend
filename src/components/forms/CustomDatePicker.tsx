import { Form, DatePicker } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  picker?: "date" | "week" | "month" | "quarter" | "year";
};

const CustomDatePicker = ({
  name,
  label,
  disabled,
  placeholder,
  picker = "year",
}: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={label}
            validateStatus={error ? "error" : ""}
            help={error ? error.message : null}
          >
            <DatePicker
              {...field}
              picker={picker}
              disabled={disabled}
              placeholder={placeholder}
              onChange={(date) => field.onChange(date)}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
