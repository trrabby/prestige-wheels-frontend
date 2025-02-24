/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Divider, Modal, Tag } from "antd";
import { FieldValues } from "react-hook-form";
import CustomForm from "@/components/forms/CustomForm";
import CustomSelect from "@/components/forms/CustomSelect";
import { useUpdateOrderMutation } from "@/redux/features/admin/orderManagement/ordersManagementApi";
import { GradientCircularProgress } from "@/components/Progress";
import { toast } from "sonner";

interface ManageOrderModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  ordersData: any;
  setOrdersData: (data: any) => void; // Add setter function
}

const ManageOrderModal = ({
  open,
  setOpen,
  ordersData,
  setOrdersData,
}: ManageOrderModalProps) => {
  // console.log(ordersData);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  const [disabled, setDisabled] = useState(true);
  if (!ordersData) return null;
  const {
    key,
    customerInfo,
    orderInfo,
    email,
    orderStatus,
    paymentStatus,
    totalPrice,
  } = ordersData;
  // console.log(orderStatus);
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <GradientCircularProgress />
      </div>
    );
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating order data, Please Wait...");

    try {
      const res = await updateOrder({
        id: key as string,
        payload: data,
      }).unwrap();

      if (res.success === true) {
        toast.success(`${res.message}`, {
          id: toastId,
        });
      } // Update modal data with new values
      setOrdersData((prevData: any) => ({
        ...prevData,
        ...data, // Merge updated fields
      }));
    } catch (err) {
      // console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <Modal
        title={
          <div
            className="text-center text-2xl pb-5 "
            style={{ width: "100%", cursor: "text" }}
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
        footer={null}
        styles={{
          mask: { backgroundColor: "transparent", boxShadow: "none" },
        }}
        modalRender={(modal) => {
          return <div>{modal}</div>;
        }}
      >
        <CustomForm onSubmit={onSubmit}>
          <Divider>Order No: {key}</Divider>
          <div className="flex flex-col gap-2 text-base">
            <div>Number of products: {orderInfo.length}</div>
            <div className="flex gap-2">
              Payment Status:
              <Tag
                color={
                  paymentStatus === "Paid"
                    ? "green"
                    : paymentStatus === "Pending"
                    ? "blue"
                    : paymentStatus === "Failed"
                    ? "black"
                    : "red"
                }
              >
                {paymentStatus}
              </Tag>
            </div>

            <div className="flex gap-2">
              Order Status:
              <Tag
                color={
                  orderStatus === "Delivered"
                    ? "cyan"
                    : orderStatus === "Shipped"
                    ? "blue"
                    : orderStatus === "Confirmed"
                    ? "green"
                    : "red"
                }
              >
                {orderStatus}
              </Tag>
            </div>

            <div>Total Price: {totalPrice}</div>
          </div>
          <Divider>Customer Information</Divider>
          <div className="text-base">
            <div>Name: {customerInfo?.name}</div>
            <div>Email: {email}</div>
            <div>City/District: {customerInfo?.city}</div>
            <div>Sub-District: {customerInfo?.subDistrict}</div>
            <div>Post Office: {customerInfo?.postOffice}</div>
            <div>Colony: {customerInfo?.clolony}</div>
          </div>
          <Divider>Order Confirmation</Divider>
          <CustomSelect
            defaultValue={orderStatus}
            placeholder="Confirm order here"
            label="Confirm Order"
            options={[
              {
                value: "Pending",
                label: "Pending",
              },
              {
                value: "Confirmed",
                label: "Confirmed",
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
