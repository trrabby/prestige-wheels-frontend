import { Form, DatePicker } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  defaultValue?: Date | null;
};

const CustomDatePicker = ({
  name,
  label,
  disabled,
  placeholder,
  picker = "year",
  defaultValue,
}: TDatePickerProps) => {
  return (
    <div className="w-full" style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={label}
            validateStatus={error ? "error" : ""}
            help={error ? error.message : null}
          >
            <DatePicker
              defaultValue={defaultValue}
              style={{ width: "100%", height: "100%" }}
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
