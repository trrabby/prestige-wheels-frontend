/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomForm from "@/components/forms/CustomForm";
import CustomInput from "@/components/forms/CustomInput";
import CustomSelectWithAddNew from "@/components/forms/CustomSelectWithAddNew";
import { SectionHead } from "@/components/SectionHead";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { OptionMaker } from "./utils/OptionMaker";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  useGetAllProductsQuery,
  useUpdateCarMutation,
} from "@/redux/features/admin/productsManagementApi";
import CustomTextArea from "@/components/forms/CustomTextArea";
import CustomDatePicker from "@/components/forms/CustomDatePicker";
import CustomSelect from "@/components/forms/CustomSelect";
import CustomFileUploadNew from "@/components/forms/CustomFileUploadNew";
import { useParams } from "react-router-dom";
import { LoadingSpinnerCircle } from "@/components/LoadingSpinnerCircle";

const UpdateCar = () => {
  const { id } = useParams();
  console.log(id);
  const { carBrandOptions, carModelOptions } = OptionMaker();

  const carCategoryOptions = [
    {
      value: "Sedan",
      label: "Sedan",
    },
    {
      value: "SUV",
      label: "SUV",
    },
    {
      value: "Truck",
      label: "Truck",
    },
    {
      value: "Coupe",
      label: "Coupe",
    },
    {
      value: "Convertible",
      label: "Convertible",
    },
  ];

  // console.log(carBrandOptions);
  const [updateCar, { isLoading }] = useUpdateCarMutation();
  const { data: carData, isLoading: isProductLoading } = useGetAllProductsQuery(
    [{ name: "_id", value: `${id}` }]
  );

  console.log(carData?.data[0]);

  if (isProductLoading) {
    return <LoadingSpinnerCircle />;
  }

  const car = carData?.data[0];
  const { brand, model, category, year, price, imgUrl, description, quantity } =
    car || {};

  const defaultDate = year ? new Date(year, 0, 1) : null;
  console.log(defaultDate);
  const onSubmit = async (data: FieldValues) => {
    // console.log(data);

    const imgArray = data.image;
    const year = data?.year?.$y.toString();
    // console.log(year);
    const inputValues = { ...data };
    inputValues.year = year;
    delete inputValues?.image;

    // Create a FormData object and append the data
    const formData = new FormData();
    imgArray.forEach((image: any) => {
      formData.append("files", image?.originFileObj);
    });

    formData.append("data", JSON.stringify(inputValues));
    console.log(inputValues, imgArray);

    const toastId = toast.loading("Adding Car, Please Wait...");
    // console.log(formData);
    try {
      const res = await updateCar({}).unwrap();
      console.log(res);
      if (res.success === true) {
        toast.success("Car added successfully", {
          id: toastId,
        });
      }
      // navigate(`/products`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <SectionHead title="Update Car" para="Update you product"></SectionHead>
      <Row className="md:w-6/12 mx-auto" justify="center" align="middle">
        <CustomForm onSubmit={onSubmit}>
          <CustomSelectWithAddNew
            defaultValue={brand}
            key={1}
            label="Brand"
            name="brand"
            options={carBrandOptions}
            placeholder="Select/add car's brand"
          />
          <CustomSelectWithAddNew
            defaultValue={model}
            key={2}
            label="Model"
            name="model"
            options={carModelOptions}
            placeholder="Select/add car's category"
          />

          <CustomSelect
            defaultValue={category}
            key={3}
            label="Category"
            name="category"
            options={carCategoryOptions}
            placeholder="Select a category"
          />

          <CustomDatePicker
            defaultValue={defaultDate}
            key={4}
            name="year"
            label="Edition"
            placeholder="Select Production Date"
          />

          <CustomInput
            defaultValue={price}
            key={5}
            type="number"
            name="price"
            label="Price in Taka"
            placeholder="Enter selling price"
          />
          <CustomInput
            defaultValue={quantity}
            key={6}
            type="number"
            name="quantity"
            label="Quantity"
            placeholder="Enter quantity"
          />

          <CustomTextArea
            defaultValue={description}
            key={7}
            name="description"
            label="Description"
            placeholder="Write Description"
          />

          <CustomFileUploadNew
            defaultValue={imgUrl?.map((url) => ({ url, name: url, uid: url }))}
            key={10}
            label="Picture"
            name="image"
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
              {isLoading ? <LoadingSpinner /> : "Add Car"}
            </Button>
          </div>
        </CustomForm>
      </Row>
    </div>
  );
};

export default UpdateCar;
