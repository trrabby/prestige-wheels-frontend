/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Divider, Modal, Tag } from "antd";
import { FieldValues } from "react-hook-form";
import CustomForm from "@/components/forms/CustomForm";
import CustomSelect from "@/components/forms/CustomSelect";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/redux/features/admin/userManagement/UsersManagementApi";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface ManageUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userData: any;
  setUserData: (data: any) => void; // Add setter function
}

const ManageUserModal = ({
  open,
  setOpen,
  userData,
  setUserData,
}: ManageUserModalProps) => {
  // console.log(userData);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [disabled, setDisabled] = useState(true);
  if (!userData) return null;
  const { key, name, email, imgUrl, role, status, isDeleted } = userData;
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
    setOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating user information, Please Wait...");

    try {
      const res = await updateUser({
        id: key as string,
        updatedData: data,
      }).unwrap();

      if (res.success === true) {
        toast.success(`${res.message}`, {
          id: toastId,
        });
      } // Update modal data with new values
      setUserData((prevData: any) => ({
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
            Update User Information
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
          <div className="flex justify-center items-center">
            {imgUrl && (
              <img
                className="w-32 h-32 rounded-full"
                src={imgUrl}
                alt="profile img"
              ></img>
            )}
          </div>
          <Divider style={{ color: "red", fontSize: "20px" }}>{name}</Divider>
          <Divider>Email: {email}</Divider>
          <Divider>
            Role:{" "}
            <Tag color={role === "admin" ? "black" : "yellow"}>{role}</Tag>
          </Divider>
          <Divider>
            Status:{" "}
            <Tag
              color={
                status === "active"
                  ? "green"
                  : status === "blocked"
                  ? "red"
                  : "default"
              }
            >
              {status}
            </Tag>
          </Divider>
          <Divider>
            Deleted:{" "}
            <Tag color={isDeleted ? "red" : "green"}>
              {isDeleted ? "Yes" : "No"}
            </Tag>
          </Divider>

          <div className="flex gap-2 w-full">
            <div className="w-6/12">
              <CustomSelect
                defaultValue={role}
                placeholder="Select Role"
                label="Update Role"
                options={[
                  {
                    value: "admin",
                    label: "Admin",
                  },
                  {
                    value: "user",
                    label: "User",
                  },
                ]}
                name="role"
              />
            </div>

            <div className="w-6/12">
              <CustomSelect
                defaultValue={status}
                placeholder="Select status"
                label="Update Status"
                options={[
                  {
                    value: "active",
                    label: "Active",
                  },
                  {
                    value: "blocked",
                    label: "Blocked",
                  },
                ]}
                name="status"
              />
            </div>
          </div>

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

export default ManageUserModal;
