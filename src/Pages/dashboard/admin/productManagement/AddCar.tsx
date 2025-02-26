/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomForm from "@/components/forms/CustomForm";
import CustomInput from "@/components/forms/CustomInput";
import CustomSelectWithAddNew from "@/components/forms/CustomSelectWithAddNew";
import { SectionHead } from "@/components/SectionHead";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { OptionMaker } from "../utils/OptionMaker";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAddCarMutation } from "@/redux/features/admin/productManagement/productsManagementApi";
import CustomTextArea from "@/components/forms/CustomTextArea";
import CustomDatePicker from "@/components/forms/CustomDatePicker";
import CustomSelect from "@/components/forms/CustomSelect";
import CustomFileUploadNew from "@/components/forms/CustomFileUploadNew";
import { Helmet } from "react-helmet-async";
import { GradientCircularProgress } from "@/components/Progress";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const {
    carBrandOptions,
    carModelOptions,
    isLoading: isOptionMakerLoading,
  } = OptionMaker();
  // console.log(carBrandOptions);

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

  const [addCar, { isLoading }] = useAddCarMutation();
  const navigate = useNavigate();
  if (isOptionMakerLoading) {
    return (
      <div className="flex justify-center items-center">
        <GradientCircularProgress />
      </div>
    );
  }

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);

    const imgArray = data.image;
    let year;

    if (data.year._isAMomentObject) {
      year = data?.year?.year();
    } else {
      year = Number(data?.year);
    }

    const inputValues = { ...data };
    inputValues.year = year;
    delete inputValues?.image;
    // console.log(inputValues);

    // Create a FormData object and append the data
    const formData = new FormData();
    if (imgArray) {
      imgArray.forEach((image: any) => {
        formData.append("files", image?.originFileObj);
      });
    }

    formData.append("data", JSON.stringify(inputValues));
    // console.log(inputValues, imgArray);

    const toastId = toast.loading("Adding Car, Please Wait...");
    // console.log(formData);
    try {
      const res = await addCar(formData).unwrap();
      // console.log(res);
      if (res.success === true) {
        toast.success("Car added successfully", {
          id: toastId,
        });
      }
      console.log(res);
      navigate(`/cars/${res.data._id}`);
    } catch (err) {
      // console.log(err);
      toast.error(
        "Something went wrong. Please make sure you input required information.",
        { id: toastId }
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Car | Prestige Wheels</title>
      </Helmet>
      <SectionHead title="Add Car"></SectionHead>
      <Row className="md:w-6/12 mx-auto" justify="center" align="middle">
        <CustomForm onSubmit={onSubmit}>
          <CustomSelectWithAddNew
            key={1}
            label="Brand"
            name="brand"
            options={carBrandOptions}
            placeholder="Select/add car's brand"
            required={true}
          />
          <CustomSelectWithAddNew
            key={2}
            label="Model"
            name="model"
            options={carModelOptions}
            placeholder="Select/add car's category"
            required={true}
          />

          <CustomSelect
            key={3}
            label="Category"
            name="category"
            options={carCategoryOptions}
            placeholder="Select a category"
            required={true}
          />

          <CustomDatePicker
            key={4}
            name="year"
            label="Edition"
            placeholder="Select Production Date"
            required={true}
          />

          <CustomInput
            key={5}
            type="number"
            name="price"
            label="Price in Taka"
            placeholder="Enter selling price"
            required={true}
          />
          <CustomInput
            key={6}
            type="number"
            name="quantity"
            label="Quantity"
            placeholder="Enter quantity"
            required={true}
          />

          <CustomTextArea
            key={7}
            name="description"
            label="Description"
            placeholder="Write Description"
            required={true}
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
