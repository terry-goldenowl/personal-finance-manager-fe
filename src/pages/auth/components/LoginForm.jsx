import React from "react";
import { Formik } from "formik";
import AuthInput from "./AuthInput";
import { useNavigate } from "react-router";

function RegisterForm() {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-purple-500 text-3xl text-center">Login</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.password) {
            errors.password = "Required";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="mt-6" method="post">
            <AuthInput
              type={"email"}
              name={"email"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              label={"Email"}
              error={errors.email && touched.email && errors.email}
            />

            <AuthInput
              type={"password"}
              name={"password"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              label={"Password"}
              error={errors.password && touched.password && errors.password}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white py-2 w-full rounded-lg mt-12 text-xl hover:bg-purple-700"
            >
              Submit
            </button>
            <p className="text-center mt-2 text-md">
              Not have account yet?{" "}
              <button
                className="font-bold text-purple-600 hover:underline"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </p>
          </form>
        )}
      </Formik>
    </>
  );
}

export default RegisterForm;
