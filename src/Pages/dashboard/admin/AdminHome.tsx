/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Row, Col, Typography, Skeleton, Button, Table } from "antd";
import {
  ShoppingCartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useGetRevenueQuery } from "@/redux/features/admin/orderManagement/ordersManagementApi";
import { Bar } from "@ant-design/charts";
import { useRef } from "react";
import { HiDocumentCurrencyBangladeshi } from "react-icons/hi2";

const { Title, Text } = Typography;

// Reusable Yearly Summary Card Component
const YearlySummaryCard = ({ yearData }: any) => {
  const columns = [
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (_: any, record: any) => `${record.brand} ${record.model}`,
    },
    {
      title: "Sold",
      dataIndex: "noOfCarsSold",
      key: "sold",
    },
    {
      title: "Revenue",
      dataIndex: "totalRevenue",
      key: "revenue",
      render: (value: number) => `${value.toLocaleString("en-IN")}`,
    },
    {
      title: "Avg. Price",
      dataIndex: "sellingPriceAvg",
      key: "avgPrice",
      render: (value: number) => `${value.toLocaleString("en-IN")}`,
    },
  ];

  return (
    <Card
      title={<Title level={4}>{yearData.year}</Title>}
      extra={
        <div className="flex items-center">
          <ShoppingCartOutlined
            style={{ fontSize: 20, color: "#52c41a", marginRight: 8 }}
          />
          <Text strong>Total Sold: {yearData.noOfCarsSold}</Text>
          <div className="flex gap-2 justify-center items-center">
            <HiDocumentCurrencyBangladeshi
              style={{ fontSize: 20, color: "#faad14", marginLeft: 16 }}
            />
            <Text strong>
              Total Revenue: {yearData.totalRevenue.toLocaleString("en-IN")} BDT
            </Text>
          </div>
        </div>
      }
      variant="borderless"
      style={{ width: "100%" }}
    >
      <Table
        columns={columns}
        dataSource={yearData.models}
        pagination={false}
        rowKey="model"
      />
    </Card>
  );
};

// Reusable Slider Component
const Slider = ({ title, data, scrollRef, cardWidth }: any) => {
  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    const scrollAmount = 630; // Scroll by a fixed amount
    if (container) {
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <Title level={4}>{title}</Title>
        <div className="relative">
          <Button
            icon={<LeftOutlined />}
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "24px",
              zIndex: 10,
            }}
          />
          <Button
            icon={<RightOutlined />}
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "24px",
              zIndex: 10,
            }}
          />

          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 p-4"
            style={{
              scrollbarWidth: "thin",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {data.map((yearData: any) => (
              <div
                key={yearData.year}
                className="flex-shrink-0"
                style={{
                  width: cardWidth, // Set the width dynamically
                  borderRadius: "8px",
                  border: "1px solid #f0f0f0",
                  padding: "16px",
                  background: "#fff",
                }}
              >
                <YearlySummaryCard yearData={yearData} />
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};

const DashboardHome = () => {
  const revenueSliderRef = useRef<any>(null);

  // Fetching the data using the Redux query hook
  const {
    data: RevenueData,
    isLoading,
    isError,
  } = useGetRevenueQuery(undefined);

  // Check if the data is still loading
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        {/* Skeleton Loader for Analytics Cards */}
        <Row gutter={16}>
          <Col span={8}>
            <Skeleton active title={false} paragraph={{ rows: 1 }} />
          </Col>
          <Col span={8}>
            <Skeleton active title={false} paragraph={{ rows: 1 }} />
          </Col>
        </Row>

        {/* Skeleton Loader for Car Sales Chart */}
        <Card variant="borderless">
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      </div>
    );
  }

  // Handle error if data fetch fails
  if (isError) {
    return <div className="text-center py-10">Failed to load data.</div>;
  }

  // Destructuring the data from the API response
  const yearsData = RevenueData?.data || [];

  // Prepare the sales data for the chart across all years
  const salesData = yearsData.flatMap((yearData: any) =>
    yearData.models.map((model: any) => ({
      year: yearData.year,
      name: `${model.brand} ${model.model}`,
      sales: model.noOfCarsSold,
    }))
  );

  const chartConfig = {
    data: salesData,
    xField: "name",
    yField: "sales",
    seriesField: "year",
    color: ["#52c41a", "#faad14"], // Different colors for different years
    label: {
      position: "middle",
      style: {
        fill: "#fff",
        opacity: 0.6,
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Revenue Overview by Year Slider */}
      <Slider
        title="Revenue Overview by Year"
        data={yearsData}
        scrollRef={revenueSliderRef}
        cardWidth="600px" // Increased width for better readability
      />

      {/* Car Sales Chart */}
      <Card variant="borderless">
        <Title level={4}>Car Sales Overview Across Years</Title>
        <Bar {...chartConfig} />
      </Card>
    </div>
  );
};

export default DashboardHome;
