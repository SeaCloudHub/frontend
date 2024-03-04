import { useFormik } from 'formik';
import React from 'react';
import TextFieldCore from '../../components/core/form/TextFieldCore';
import LabelCore from '../../components/core/form/LabelCore';
import { loginInitialValues, loginSchema } from '../../helpers/form-schema/login.schema';
import ButtonCore from '../../components/core/button/ButtonCore';
import { FcGoogle } from 'react-icons/fc';
import { FaSquareFacebook } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setIsLogin(true);
      console.log(values);
    },
  });
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='mdLg:w-1/2 mx-5  min-w-max sm:mx-auto sm:w-1/2 md:w-2/4 lg:w-2/5'>
        <form className='flex flex-col gap-3'>
          <LabelCore title='Login' className='bg-white pr-10 text-center text-4xl font-bold' width='w-full' />
          {/* map field from formik */}
          {Object.keys(formik.values).map((key, index) => (
            <TextFieldCore
              key={index}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              type={key}
              placeholder={key}
              className='w-full'
              disabled={isLogin}
              value={Object.values(formik.values)[index] as string}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[key as keyof typeof formik.values] && Boolean(formik.errors[key as keyof typeof formik.values])
              }
              helperText={formik.touched[key as keyof typeof formik.values] && formik.errors[key as keyof typeof formik.values]}
            />
          ))}
          <ButtonCore
            type='contained'
            title='Login'
            contentColor='white'
            rs={{ className: 'w-full', backgroundColor: 'green', borderRadius: '5px' }}
            onClick={formik.handleSubmit}
            loading={isLogin}
            disabled={isLogin}
          />
          <div className='flex w-full items-center justify-between '>
            <Link to={'/t'} className='text-sm text-blue-500 '>
              Forgot password?
            </Link>
            <Link to={'/'} className='text-sm text-blue-500'>
              Don't have an account?
            </Link>
          </div>
          <div className='my-6 flex items-center'>
            <hr className='h-1 flex-grow rounded-sm bg-gray-500' />
            <div className='mx-4 text-gray-500'>Or sign in with</div>
            <hr className='h-1 flex-grow rounded-sm bg-gray-500' />
          </div>
          <div className='flex items-center justify-center'>
            <div
              className='mr-2 flex min-w-fit cursor-pointer justify-stretch rounded-md border bg-red-200 p-2 hover:bg-red-300'
              onClick={() => {}}>
              <FcGoogle className='h-8 w-8' />
            </div>
            {/* sign in with facebook */}
            <div
              className='ml-2 flex min-w-fit cursor-pointer justify-stretch rounded-md border bg-blue-200 p-2 hover:bg-blue-300'
              onClick={() => {}}>
              <FaSquareFacebook className='h-8 w-8' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
