import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "@/redux/hook";
import CustomForm from "@/components/forms/CustomForm";
import CustomInput from "@/components/forms/CustomInput";

import { Helmet } from "react-helmet-async";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    email: "trrabby1@gmail.com",
    password: "admin12345",
  };

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Signing in");

    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Signed in", { id: toastId, duration: 2000 });
      navigate(`/`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Helmet>
        <title>Sign In | Prestige Wheels</title>
      </Helmet>

      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Image Section */}
        <div className="hidden lg:flex w-5/12 bg-gradient-to-r from-purple-600 to-indigo-600 items-center justify-center p-6">
          <img
            src="https://i.ibb.co.com/cw11hgP/computer-security-with-login-password-padlock-107791-16191.jpg"
            alt="Login"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-7/12 flex flex-col items-center justify-center p-6 md:p-10 bg-white">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign In</h2>

          <Row justify="center" align="middle" className="w-full sm:w-10/12">
            <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
              <CustomInput type="text" name="email" label="Email:" />
              <CustomInput type="password" name="password" label="Password" />

              <p className="w-full text-left pb-4 text-sm md:text-base text-gray-600">
                Don't have an account?{" "}
                <Link
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                  to={"/register"}
                >
                  Sign Up
                </Link>
              </p>

              <Button
                style={{
                  background:
                    "linear-gradient(90deg, rgba(138, 43, 226, 0.8), rgba(75, 0, 130, 0.8))",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  width: "100%",
                }}
                htmlType="submit"
              >
                {isLoading ? <LoadingSpinner /> : "Sign In"}
              </Button>
            </CustomForm>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Login;
