import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space, Form } from "antd";
import { Controller } from "react-hook-form";
import type { InputRef } from "antd";

type TCustomSelectWithAddNewProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
};

const CustomSelectWithAddNew = ({
  label,
  name,
  options,
  disabled,
  mode,
  placeholder,
  defaultValue,
  required,
}: TCustomSelectWithAddNewProps) => {
  // console.log(options);
  const [selectOptions, setSelectOptions] = useState(options || []);
  const [nameInput, setNameInput] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (
      nameInput &&
      !selectOptions.some((option) => option.value === nameInput)
    ) {
      const newOption = { value: nameInput, label: nameInput };
      setSelectOptions((prevOptions) => [...prevOptions, newOption]);
      setNameInput("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : null}
        >
          <Select
            defaultValue={defaultValue}
            placeholder={placeholder}
            showSearch
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={[...(options || []), ...selectOptions]}
            size="large"
            disabled={disabled}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={nameInput}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelectWithAddNew;
