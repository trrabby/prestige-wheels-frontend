import CustomForm from "@/components/forms/CustomForm";
import CustomInput from "@/components/forms/CustomInput";
import CustomSelectWithInput from "@/components/forms/CustomSelectWithInput";
import { SectionHead } from "@/components/SectionHead";
import { useGetAllProductsQuery } from "@/redux/features/admin/productsManagementApi";
import { Button, Form, Input, Row } from "antd";
import { Controller, FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AddCar = () => {
  // const navigate = useNavigate();

  const { data: carsData } = useGetAllProductsQuery([
    {
      name: "fields",
      value: "brand",
    },
  ]);
  const carBrands = [...new Set(carsData?.data.map((car) => car.brand))];
  console.log(carBrands);

  // Format carBrands in the option select format
  const carBrandOptions = carBrands.map((brand) => ({
    value: brand,
    label: brand,
  }));

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
    console.log(formData);
    try {
      // const res = await register(formData).unwrap();
      // console.log(res);
      toast.success("Registration Successfull, Please Sign In", {
        id: toastId,
      });
      // navigate(`/login`);
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
          <CustomSelectWithInput
            label="Brand"
            name="brand"
            options={carBrandOptions}
          />
          {/* <CustomSelect label="Brand" name="brand" options={carBrandOptions} /> */}
          <CustomInput type="text" name="name" label="Name:" />
          <CustomInput type="text" name="email" label="Email:" />
          <CustomInput type="text" name="password" label="Password" />

          <Controller
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
          />

          <p className="w-full text-left pb-5">
            Already have an account ?{" "}
            <Link className="hover:text-white" to={"/login"}>
              {" "}
              Sign In{" "}
            </Link>
          </p>

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
              Sign Up
            </Button>
          </div>
        </CustomForm>
      </Row>
    </div>
  );
};

export default AddCar;
