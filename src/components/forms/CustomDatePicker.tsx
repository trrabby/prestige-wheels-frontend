import { Form, DatePicker } from "antd";
import { Controller } from "react-hook-form";
import moment from "moment";

type TDatePickerProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  defaultValue?: moment.Moment | null;
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
        defaultValue={defaultValue || null}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label={label}
            validateStatus={error ? "error" : ""}
            help={error ? error.message : null}
          >
            <DatePicker
              {...field}
              value={field.value ? moment(field.value) : null} // Remove defaultValue from here
              style={{ width: "100%", height: "100%" }}
              picker={picker}
              disabled={disabled}
              placeholder={placeholder}
              onChange={(date) =>
                field.onChange(date ? date.format("YYYY") : null)
              } // Store value as a formatted string
              defaultValue={defaultValue} // Only used for initial rendering
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
