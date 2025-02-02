import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { ICars } from "@/types/cars.type";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteCarMutation } from "@/redux/features/admin/productsManagementApi";
import { toast } from "sonner";
import { LoadingSpinnerCircle } from "@/components/LoadingSpinnerCircle";

interface DataType {
  key: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  price: number;
  imgUrl: string[];
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

type DataIndex = keyof DataType;

interface ManageCarsTableProps {
  carsData: ICars[];
}

const ManageCarsTable = ({ carsData }: ManageCarsTableProps) => {
  const [deleteCar, { isLoading }] = useDeleteCarMutation();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const data: DataType[] = carsData.map((car) => ({
    key: car._id,
    brand: car.brand,
    model: car.model,
    category: car.category,
    year: car.year,
    price: car.price,
    imgUrl: car.imgUrl,
    description: car.description,
    quantity: car.quantity,
    inStock: car.inStock,
    isDeleted: car.isDeleted,
    createdAt: car.createdAt,
    updatedAt: car.updatedAt,
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
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    clearFilters();
    setSearchText("");
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
            onClick={() =>
              clearFilters &&
              handleReset(
                clearFilters,
                selectedKeys as string[],
                confirm,
                dataIndex
              )
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
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
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
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

  const columns: TableColumnsType<DataType> = [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: "20%",
      ...getColumnSearchProps("brand"),
      sorter: (a, b) => a.brand.localeCompare(b.brand),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ser No",
      dataIndex: "key",
      key: "key",
      ...getColumnSearchProps("key"),
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      ...getColumnSearchProps("model"),
      sorter: (a, b) => a.model.localeCompare(b.model),
      sortDirections: ["descend", "ascend"],
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortDirections: ["descend", "ascend"],
      align: "center",
    },
    {
      title: "Quantiy",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["descend", "ascend"],
      align: "right",
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      align: "right",
    },
    {
      title: "Stock",
      dataIndex: "inStock",
      key: "inStock",
      ...getColumnSearchProps("inStock"),
      sorter: (a, b) => Number(b.inStock) - Number(a.inStock),
      sortDirections: ["descend", "ascend"],
      align: "center",
      render: (inStock: boolean) =>
        inStock ? (
          <Tag color="cyan">Stock</Tag>
        ) : (
          <Tag color="error">Out of Stock</Tag>
        ),
    },
    {
      title: "Update/Delete",
      key: "x",
      align: "center",
      render: (record) => {
        return (
          <div className="flex gap-2 items-center justify-center">
            <Tooltip
              placement="left"
              title="Update"
              color={"cyan"}
              key={"toolTipcolor"}
            >
              <Link to={`updateCar/${record.key}`}>
                <button className=" bg-accent p-2 text-center text-xs font-bold  text-white hover:bg-[#13C2C2] hover:text-white hover:scale-110 hover:duration-500 flex items-center gap-2 justify-center">
                  {" "}
                  <GrDocumentUpdate className="hover:scale-125 duration-500" />
                </button>
              </Link>
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
  ];

  if (isLoading) {
    return <LoadingSpinnerCircle />;
  }

  const deleteHandler = async (id: string) => {
    console.log(id);
    try {
      const result = await deleteCar(id);
      console.log(result.data.success === true);
      if (result) {
        toast.success("Car deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <Table<DataType> columns={columns} dataSource={data} />;
};

export default ManageCarsTable;
