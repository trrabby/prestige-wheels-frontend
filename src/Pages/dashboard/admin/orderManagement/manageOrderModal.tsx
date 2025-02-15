/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Button, Divider, Modal } from "antd";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import { FieldValues } from "react-hook-form";
import CustomForm from "@/components/forms/CustomForm";
import CustomSelect from "@/components/forms/CustomSelect";

interface ManageOrderModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  ordersData: any;
}

const ManageOrderModal = ({
  open,
  setOpen,
  ordersData,
}: ManageOrderModalProps) => {
  console.log(ordersData);

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
            className="text-center text-2xl pb-5"
            style={{ width: "100%", cursor: "move" }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Manage Order Status
          </div>
        }
        open={open}
        onOk={handleCancel}
        onCancel={handleCancel}
        modalRender={(modal) => {
          return (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              nodeRef={draggleRef}
              onStart={(event, uiData) => onStart(event, uiData)}
            >
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          );
        }}
      >
        <CustomForm onSubmit={onSubmit}>
          <Divider>"Order Information"</Divider>
          <CustomSelect
            options={[
              {
                value: "Pending",
                label: "Pending",
              },
              {
                value: "Shipped",
                label: "Shipped",
              },
              {
                value: "Delivered",
                label: "Delivered",
              },
              {
                value: "Canceled",
                label: "Canceled",
              },
            ]}
            name="orderStatus"
          />
          <div className="w-full text-center">
            <Button
              style={{
                background:
                  "linear-gradient(90deg, rgba(138, 43, 226, 0.8), rgba(75, 0, 130, 0.8))",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
              htmlType="submit"
            >
              "Submit"
              {/* {isLoading ? <LoadingSpinner /> : "Submit"} */}
            </Button>
          </div>
        </CustomForm>
      </Modal>
    </>
  );
};

export default ManageOrderModal;
