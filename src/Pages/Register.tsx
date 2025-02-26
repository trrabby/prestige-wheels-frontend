/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const image = data.image;
    const inputValues = { ...data };
    delete inputValues?.image;

    const formData = new FormData();
    formData.append("data", JSON.stringify(inputValues));
    formData.append("file", image);

    const toastId = toast.loading("You are being registered. Please Wait");

    try {
      await register(formData).unwrap();
      toast.success("Registration Successful, Please Sign In", { id: toastId });
      navigate(`/login`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gray-100">
      <Helmet>
        <title>Sign Up | Prestige Wheels</title>
      </Helmet>

      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 flex flex-col lg:flex-row bg-white shadow-xl rounded-2xl overflow-hidden ">
        {/* Image Section */}
        <div className="hidden lg:flex w-5/12 bg-gradient-to-r from-purple-700 to-indigo-700 items-center justify-center p-6">
          <img
            src="https://i.ibb.co.com/fnpD264/sign-up-concept-illustration-114360-7895.jpg"
            alt="Register"
            className="rounded-lg shadow-md border-4 border-white"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-8/12 flex flex-col items-center justify-center p-8 md:p-12 bg-white">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Create an Account
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-6">
            Sign up to start your journey with us.
          </p>

          <Row justify="center" align="middle" className="w-full sm:w-10/12">
            <CustomForm onSubmit={onSubmit}>
              <CustomInput type="text" name="name" label="Name" />
              <CustomInput type="text" name="email" label="Email" />
              <CustomInput type="password" name="password" label="Password" />

              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Picture">
                    <Input
                      type="file"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />

              <p className="w-full text-left pb-4 text-sm md:text-base text-gray-600">
                Already have an account?{" "}
                <Link
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                  to={"/login"}
                >
                  Sign In
                </Link>
              </p>

              <Button
                style={{
                  background:
                    "linear-gradient(90deg, rgba(138, 43, 226, 0.9), rgba(75, 0, 130, 0.9))",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                }}
                htmlType="submit"
              >
                {isLoading ? <LoadingSpinner /> : "Sign Up"}
              </Button>
            </CustomForm>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Register;
