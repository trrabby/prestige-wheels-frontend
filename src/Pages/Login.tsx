import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { TUser, setUser } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { verifyToken } from '../utils/verifyToken';
import { useAppDispatch } from '@/redux/hook';
import CustomForm from '@/components/forms/CustomForm';
import CustomInput from '@/components/forms/CustomInput';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    email: 'trrabby1@gmail.com',
    password: 'admin12345',
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Logging in');

    try {
      const res = await login(data).unwrap();
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged in', { id: toastId, duration: 2000 });

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/`);
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <CustomInput type="text" name="email" label="Email:" />
        <CustomInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </CustomForm>
    </Row>
  );
};

export default Login;
