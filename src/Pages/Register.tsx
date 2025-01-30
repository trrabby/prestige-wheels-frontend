import { Button, Form, Input, Row } from "antd";
import { Controller, FieldValues } from "react-hook-form";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomForm from "@/components/forms/CustomForm";
import CustomInput from "@/components/forms/CustomInput";
import { Helmet } from "react-helmet-async";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Register = () => {
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
      const res = await register(formData).unwrap();
      console.log(res);
      toast.success("Registration Successfull, Please Sign In", {
        id: toastId,
      });
      navigate(`/login`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(345deg, rgba(255,255,255,1) 3%, rgba(39,39,109,0.7371323529411764) 28%, rgba(255,246,247,1) 100%)",
      }}
      className="flex flex-col lg:min-h-[calc(100vh-100px)] items-center justify-center p-5"
    >
      <Helmet>
        <title> Prestige Wheels | Sign Up</title>
      </Helmet>

      <div
        style={{
          background:
            "linear-gradient(to right, rgba(138, 43, 226, 0.8), rgba(255, 255, 255, 0.8))",
        }}
        className=" border w-full md:w-6/12 mx-auto text-white  min-h-[calc(100vh-270px)] rounded-xl space-y-2 font-extrabold shadow-lg hover:shadow-accent p-10"
      >
        <Row justify="center" align="middle">
          <CustomForm onSubmit={onSubmit}>
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
                {isLoading ? <LoadingSpinner /> : "Sign Up"}
              </Button>
            </div>
          </CustomForm>
        </Row>
      </div>
    </div>
  );
};

export default Register;
