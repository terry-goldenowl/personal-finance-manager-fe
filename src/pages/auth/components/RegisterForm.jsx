import React from "react";
import { Formik } from "formik";
import AuthInput from "./AuthInput";
import { useNavigate } from "react-router";

function RegisterForm() {
  const navigate = useNavigate();
  return (
    <div
      className="border-blue-400 rounded-3xl p-6"
      style={{
        width: 450,
        boxShadow: "0 0 30px rgb(216, 180, 254)",
      }}
    >
      <h1 className="text-purple-500 text-3xl text-center">Register</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Required";
          }

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

          if (values.password !== values.password_confirmation) {
            errors.password_confirmation =
              "Password confirmation is not correct";
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
          <form onSubmit={handleSubmit} className="mt-6">
            <AuthInput
              type={"name"}
              name={"name"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              label={"Name"}
              error={errors.name && touched.name && errors.name}
            />
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
            <AuthInput
              type={"password"}
              name={"password_confirmation"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password_confirmation}
              label={"Password Confirmation"}
              error={
                errors.password_confirmation &&
                touched.password_confirmation &&
                errors.password_confirmation
              }
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white py-2 w-full rounded-lg mt-8 text-xl hover:bg-purple-700"
            >
              Submit
            </button>
            <p className="text-center mt-2 text-md">
              Already have account?{" "}
              <button
                className="font-bold text-purple-600 hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
