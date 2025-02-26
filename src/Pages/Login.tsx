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
      // console.log(res);
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
    <div className="flex flex-col lg:h-[calc(100vh-100px)] min-h-screen items-center justify-center">
      <Helmet>
        <title> Sign In| Prestige Wheels</title>
      </Helmet>

      <div
        style={{
          background:
            "linear-gradient(to right, rgba(138, 43, 226, 0.8), rgba(255, 255, 255, 0.8))",
        }}
        className="w-6/12 mx-auto flex flex-col items-center justify-center  text-white  min-h-[calc(100vh-270px)] rounded-xl space-y-2 font-extrabold shadow-lg hover:shadow-accent p-10 "
      >
        <Row justify="center" align="middle" className="w-8/12 mx-auto">
          <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <CustomInput type="text" name="email" label="Email:" />
            <CustomInput type="text" name="password" label="Password" />
            <p className="w-full text-left pb-5">
              Don't have an account ?{" "}
              <Link className="hover:text-white" to={"/register"}>
                {" "}
                Sign Up{" "}
              </Link>
            </p>
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
              {isLoading ? <LoadingSpinner /> : "Sign In"}
            </Button>
          </CustomForm>
        </Row>
      </div>
    </div>
  );
};

export default Login;
