/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { GrDocumentUpdate } from "react-icons/gr";
import ManageOrderModal from "./manageOrderModal";

interface OrderDataType {
  key: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  totalPrice: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

type DataIndex = keyof OrderDataType;

interface ManageOrdersTableProps {
  ordersData: any[];
}

const ManageOrdersTable = ({ ordersData }: ManageOrdersTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderDataType | null>(
    null
  );
  const [open, setOpen] = useState(false);
  // console.log(ordersData);
  const handleOpenModal = (order: OrderDataType) => {
    setSelectedOrder(order);
    setOpen(true);
  };
  const data: OrderDataType[] = ordersData.map((order) => ({
    key: order._id,
    customerName: order.customerInfo.name,
    customerInfo: order.customerInfo,
    email: order.email,
    phone: order.customerInfo.number,
    city: order.customerInfo.city,
    orderInfo: order.orderInfo,
    totalPrice: order.totalPrice,
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
    createdAt: new Date(order.createdAt)
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
  ): TableColumnType<OrderDataType> => ({
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

  const columns: TableColumnsType<OrderDataType> = [
    {
      title: "Order No",
      dataIndex: "key",
      key: "key",
      ...getColumnSearchProps("key"),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      className: "text-right",
      key: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      className: "text-center",
      render: (status) => (
        <Tag
          color={
            status === "Paid"
              ? "green"
              : status === "Pending"
              ? "blue"
              : status === "Failed"
              ? "black"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      className: "text-center",
      key: "orderStatus",
      render: (status) => (
        <Tag
          color={
            status === "Delivered"
              ? "cyan"
              : status === "Shipped"
              ? "blue"
              : status === "Confirmed"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Update",
      key: "x",
      align: "center",
      render: (record) => {
        return (
          <div className="flex gap-2 items-center justify-center">
            <Tooltip
              placement="top"
              title="Update order status"
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
          </div>
        );
      },
    },
    {
      title: "Ordered On",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <>
      <Table<OrderDataType> columns={columns} dataSource={data} />;
      {open && selectedOrder && (
        <ManageOrderModal
          open={open}
          setOpen={setOpen}
          ordersData={selectedOrder}
          setOrdersData={setSelectedOrder}
        />
      )}
    </>
  );
};

export default ManageOrdersTable;
