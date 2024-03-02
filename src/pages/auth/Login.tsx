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
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='sm:w-1/2 sm:mx-auto  md:w-2/4 mdLg:w-1/2 lg:w-2/5 mx-5 min-w-max'>
        <form className='flex flex-col gap-3'>
          <LabelCore title='Login' className='text-center pr-10 bg-white text-4xl font-bold' width='w-full' />
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
          <div className='w-full flex items-center justify-between '>
            <Link to={'/t'} className='text-sm text-blue-500 '>
              Forgot password?
            </Link>
            <Link to={'/'} className='text-sm text-blue-500'>
              Don't have an account?
            </Link>
          </div>
          <div className='flex items-center my-6'>
            <hr className='flex-grow bg-gray-500 h-1 rounded-sm' />
            <div className='mx-4 text-gray-500'>Or sign in with</div>
            <hr className='flex-grow bg-gray-500 h-1 rounded-sm' />
          </div>
          <div className='flex items-center justify-center'>
            <div
              className='flex rounded-md justify-stretch border bg-red-200 p-2 min-w-fit cursor-pointer mr-2 hover:bg-red-300'
              onClick={() => {}}>
              <FcGoogle className='w-8 h-8' />
            </div>
            {/* sign in with facebook */}
            <div
              className='flex rounded-md justify-stretch border bg-blue-200 p-2 min-w-fit cursor-pointer ml-2 hover:bg-blue-300'
              onClick={() => {}}>
              <FaSquareFacebook className='w-8 h-8' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
