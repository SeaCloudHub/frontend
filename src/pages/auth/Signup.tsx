import { useFormik } from 'formik';
import { signupInitialValues, signupSchema } from '../../helpers/form-schema/signup.schema';
import React from 'react';
import LabelCore from '../../components/core/form/LabelCore';
import TextFieldCore from '../../components/core/form/TextFieldCore';
import ButtonCore from '../../components/core/button/ButtonCore';

const Register = () => {
  const [isSignup, setIsSignup] = React.useState(false);

  const formik = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      setIsSignup(true);
      console.log(values);
    },
  });

  return (
    <div>
      <div className='mdLg:w-1/2 mx-5  min-w-max sm:mx-auto sm:w-1/2 md:w-2/4 lg:w-2/5'>
        <form className='flex flex-col gap-1'>
          <LabelCore title='Sign up' className='bg-white pr-10 text-center text-4xl font-bold' width='w-full' />
          {/* map field from formik */}
          {Object.keys(formik.values).map((key, index) => (
            <TextFieldCore
              key={index}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              // type={key}
              className='w-full'
              disabled={isSignup}
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
            title='Sign up'
            contentColor='white'
            rs={{
              className: 'w-full',
              backgroundColor: 'green',
              borderRadius: '5px',
            }}
            onClick={formik.handleSubmit}
            loading={isSignup}
            disabled={isSignup}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
