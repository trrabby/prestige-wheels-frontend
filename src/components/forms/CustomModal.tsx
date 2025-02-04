import React, { useRef, useState } from "react";
import { Divider, Modal } from "antd";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import CustomForm from "./CustomForm";
import { FieldValues } from "react-hook-form";
import CustomInput from "./CustomInput";

interface CustomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CustomModal = ({ open, setOpen }: CustomModalProps) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null!);

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };
  return (
    <>
      <Modal
        title={
          <div
            className="text-center"
            style={{ width: "100%", cursor: "move" }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Confirm Order
          </div>
        }
        open={open}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <CustomForm onSubmit={onSubmit}>
          <div>
            <CustomInput
              name="name"
              type="text"
              label="Name"
              placeholder="You Name"
            />
            <CustomInput
              name="email"
              type="email"
              label="Email"
              placeholder="You Email"
            />

            <CustomInput
              name="number"
              type="number"
              label="Number"
              placeholder="You Mobile Number"
            />
          </div>
          <Divider>Address</Divider>
          <div className="grid grid-cols-2 gap-2">
            <CustomInput
              name="city"
              type="text"
              label="City/District"
              placeholder="You city/district"
            />
            <CustomInput
              name="subDistrict"
              type="text"
              label="Sub District"
              placeholder="You sub-district"
            />
            <CustomInput
              name="postOffice"
              type="text"
              label="Post Office"
              placeholder="You post code"
            />
            <CustomInput
              name="clolony"
              type="text"
              label="Colony"
              placeholder="You colony/area"
            />
          </div>
        </CustomForm>
      </Modal>
    </>
  );
};

export default CustomModal;
