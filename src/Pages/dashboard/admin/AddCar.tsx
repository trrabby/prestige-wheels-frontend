import CustomForm from "@/components/forms/CustomForm";
import CustomInput from "@/components/forms/CustomInput";
import CustomSelectWithAddNew from "@/components/forms/CustomSelectWithAddNew";
import { SectionHead } from "@/components/SectionHead";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { OptionMaker } from "./utils/OptionMaker";
import CustomFileInput from "@/components/forms/CustomFileInput";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAddCarMutation } from "@/redux/features/admin/productsManagementApi";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const navigate = useNavigate();

  const { carBrandOptions, carModelOptions, carCategoryOptions } =
    OptionMaker();

  const [addCar, { isLoading }] = useAddCarMutation();
  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const image = data.image;
    const inputValues = { ...data };
    delete inputValues?.image;

    console.log(inputValues, image);
    // Create a FormData object and append the data
    const formData = new FormData();
    formData.append("data", JSON.stringify(inputValues));
    formData.append("file", image);

    const toastId = toast.loading("You are being registered. Please Wait");
    // console.log(formData);
    try {
      const res = await addCar(formData).unwrap();
      console.log(res);
      toast.success("Registration Successfull, Please Sign In", {
        id: toastId,
      });
      navigate(`/products`);
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
            key={"1"}
            label="Brand"
            name="brand"
            options={carBrandOptions}
          />
          <CustomSelectWithAddNew
            key={"2"}
            label="Model"
            name="model"
            options={carModelOptions}
          />

          <CustomInput key={"3"} type="number" name="year" label="Edittion" />
          <CustomInput key={"4"} type="number" name="price" label="Price" />

          <CustomSelectWithAddNew
            key={"5"}
            label="Category"
            name="category"
            options={carCategoryOptions}
          />

          <CustomInput
            key={"6"}
            type="textArea"
            name="description"
            label="Description"
          />

          <CustomFileInput key={"7"} label="Picture" name="image" />

          {/* <Controller
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item label="Picture">
                <Input
                  type="file"
                  value={value?.fileName}
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0])}
                />
              </Form.Item>
            )}
          /> */}

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
