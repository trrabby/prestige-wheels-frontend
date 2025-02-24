/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { GrDocumentUpdate } from "react-icons/gr";
import ManageUserModal from "./ManageUserModal";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useDeleteUserMutation } from "@/redux/features/admin/userManagement/UsersManagementApi";
import { MdDeleteOutline } from "react-icons/md";
import { LoadingSpinner } from "@/components/LoadingSpinner";
// Assuming you have a modal for managing users

interface UserDataType {
  key: string;
  name: string;
  email: string;
  imgUrl: string | null;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

type DataIndex = keyof UserDataType;

interface ManageUsersTableProps {
  usersData: any[];
}

const ManageUsersTable = ({ usersData }: ManageUsersTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);
  const [open, setOpen] = useState(false);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleOpenModal = (user: UserDataType) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const data: UserDataType[] = usersData.map((user) => ({
    key: user._id,
    name: user.name,
    email: user.email,
    imgUrl: user.imgUrl,
    role: user.role,
    status: user.status,
    isDeleted: user.isDeleted,
    createdAt: new Date(user.createdAt)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", ""),
    updatedAt: new Date(user.updatedAt)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", ""),
  }));

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: FilterDropdownProps["confirm"]
  ) => {
    clearFilters();
    setSearchText("");
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<UserDataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<UserDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      className: "text-center",
      render: (role) => (
        <Tag color={role === "admin" ? "black" : "yellow"}>{role}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "text-center",
      render: (status) => (
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
      ),
    },
    {
      title: "Deleted",
      dataIndex: "isDeleted",
      key: "isDeleted",
      className: "text-center",
      render: (isDeleted) => (
        <Tag color={isDeleted ? "red" : "green"}>
          {isDeleted ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "x",
      align: "center",
      render: (record) => {
        return (
          <div className="flex gap-2 items-center justify-center">
            <Tooltip
              placement="top"
              title="Update user"
              color={"cyan"}
              key={"toolTipcolor"}
            >
              <button
                onClick={() => handleOpenModal(record)}
                className=" bg-accent p-2 text-center text-xs font-bold  text-white hover:bg-[#13C2C2] hover:text-white hover:scale-110 hover:duration-500 flex items-center gap-2 justify-center"
              >
                {" "}
                <GrDocumentUpdate className="hover:scale-125 duration-500" />
              </button>
            </Tooltip>
            <Tooltip
              placement="top"
              title="Delete"
              color={"red"}
              key={"toolTipcolor2"}
            >
              <button
                onClick={() => deleteHandler(record.key)}
                className="bg-accent p-2 text-center text-xs font-bold uppercase text-white transition hover:bg-red-500 hover:text-white hover:scale-110 duration-500 flex items-center gap-2"
              >
                <MdDeleteOutline className="hover:scale-125 duration-500" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Registered on",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated on",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  const deleteHandler = async (id: string) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        isLoading ? <LoadingSpinner /> : "Yes, delete it!"
      }`,

      showClass: {
        popup: `
          animate__animated,
          animate__fadeInUp,
          animate__faster,
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.loading("Delating", { id: "deleteCar" });
        try {
          const response = await deleteUser(id);
          if (response.data.success) {
            toast.success("Car deleted successfully", { id: "deleteCar" });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <>
      <Table<UserDataType> columns={columns} dataSource={data} />;
      {open && selectedUser && (
        <ManageUserModal
          open={open}
          setOpen={setOpen}
          userData={selectedUser}
          setUserData={setSelectedUser}
        />
      )}
    </>
  );
};

export default ManageUsersTable;
