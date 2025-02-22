/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { Button, Divider, Modal } from "antd";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import CustomForm from "../forms/CustomForm";
import { FieldValues } from "react-hook-form";
import CustomInput from "../forms/CustomInput";
import { LoadingSpinner } from "../LoadingSpinner";
import { useCreateOrderMutation } from "@/redux/features/admin/orderManagement/ordersManagementApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import CustomTextArea from "../forms/CustomTextArea";
import { HiDocumentCurrencyBangladeshi } from "react-icons/hi2";
import { FaUserSecret } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/redux/features/admin/productManagement/productsManagementSlice";

interface CustomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  checkOutData: any;
}

const CustomModal = ({ open, setOpen, checkOutData }: CustomModalProps) => {
  // console.log(checkOutData);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  const navigate = useNavigate();
  let user: TUser | undefined;
  if (token) {
    user = verifyToken(token) as TUser;
  }

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

  const orderInfo = checkOutData.orderedProduct.map((item: any) => ({
    productId: item._id,
    orderedQuantity: item.quantity,
  }));

  const onSubmit = async (data: FieldValues) => {
    data["name"] = user?.name;

    const checkOutOrder = {
      email: user?.email,
      orderInfo,
      customerInfo: data,
      totalPrice: Number(checkOutData.totalPrice),
    };

    try {
      const res = await createOrder(checkOutOrder).unwrap();
      console.log(res);
      toast.success(`${res.message}`);
      navigate(`/${user?.role}/my-orders`);
      dispatch(clearCart());
    } catch (err: any) {
      console.log(err);
      if (err.data.message) {
        toast.error(
          `${err.data.message.split(":")[1]}:${err.data.message.split(":")[2]}`,
          {
            duration: 5000,
          }
        );
      } else {
        toast.error(`Something went wrong`);
      }
    }
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
            Confirm Order
          </div>
        }
        open={open}
        onCancel={handleCancel}
        footer={null}
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
            {user && (
              <div>
                <p className="text-lg flex gap-2 items-center justify-start">
                  <FaUserSecret /> {user.name}
                </p>
                <p className="text-lg flex gap-2 items-center justify-start">
                  <MdOutlineMailOutline />
                  {user.email}
                </p>
                <p className="text-lg flex gap-2 items-center justify-start">
                  <span className="text-primary text-bold flex gap-2 items-center justify-center">
                    <HiDocumentCurrencyBangladeshi />
                    {checkOutData.totalPrice} BDT
                  </span>
                </p>
              </div>
            )}
            <br />
            <CustomInput
              name="number"
              type="number"
              label="Number"
              placeholder="Your mobile number"
              required={true}
            />
          </div>
          <Divider>Address</Divider>
          <div className="grid grid-cols-2 gap-2">
            <CustomInput
              name="city"
              type="text"
              label="City/District"
              placeholder="You city/district"
              required={true}
            />
            <CustomInput
              name="subDistrict"
              type="text"
              label="Sub District"
              placeholder="You sub-district"
              required={true}
            />
            <CustomInput
              name="postOffice"
              type="text"
              label="Post Office"
              placeholder="You post code"
              required={true}
            />
            <CustomInput
              name="clolony"
              type="text"
              label="Colony"
              placeholder="You colony/area"
              required={true}
            />
          </div>
          <Divider>If any request</Divider>
          <CustomTextArea
            name="customerRequest"
            label="Request"
            placeholder="Write your request (if any)"
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
              {isLoading ? <LoadingSpinner /> : "Submit"}
            </Button>
          </div>
        </CustomForm>
      </Modal>
    </>
  );
};

export default CustomModal;
