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
import { useAddCarMutation } from "@/redux/features/admin/productsManagementApi";
import CustomTextArea from "@/components/forms/CustomTextArea";
import CustomDatePicker from "@/components/forms/CustomDatePicker";
import CustomSelect from "@/components/forms/CustomSelect";
import CustomFileUploadNew from "@/components/forms/CustomFileUploadNew";

const AddCar = () => {
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

  const [addCar, { isLoading }] = useAddCarMutation();

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
      const res = await addCar(formData).unwrap();
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
      <SectionHead title="Add Car" para="Add you product"></SectionHead>
      <Row className="md:w-6/12 mx-auto" justify="center" align="middle">
        <CustomForm onSubmit={onSubmit}>
          <CustomSelectWithAddNew
            key={1}
            label="Brand"
            name="brand"
            options={carBrandOptions}
            placeholder="Select/add car's brand"
          />
          <CustomSelectWithAddNew
            key={2}
            label="Model"
            name="model"
            options={carModelOptions}
            placeholder="Select/add car's category"
          />

          <CustomSelect
            key={3}
            label="Category"
            name="category"
            options={carCategoryOptions}
            placeholder="Select a category"
          />

          <CustomDatePicker
            key={4}
            name="year"
            label="Edition"
            placeholder="Select Production Date"
          />

          <CustomInput
            key={5}
            type="number"
            name="price"
            label="Price in Taka"
            placeholder="Enter selling price"
          />
          <CustomInput
            key={6}
            type="number"
            name="quantity"
            label="Quantity"
            placeholder="Enter quantity"
          />

          <CustomTextArea
            key={7}
            name="description"
            label="Description"
            placeholder="Write Description"
          />

          {/* <CustomFileInput key={8} label="Picture" name="image" /> */}
          <CustomFileUploadNew key={10} label="Picture" name="image" />

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

export default AddCar;
