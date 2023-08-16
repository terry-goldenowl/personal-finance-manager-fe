import React from "react";
import { Formik } from "formik";
import AuthInput from "./AuthInput";
import { useNavigate } from "react-router";

function ResetPasswordForm() {
  return (
    <>
      <h2 className="text-purple-500 text-3xl text-center">Reset password</h2>
      <Formik
        initialValues={{
          password: "",
          newPassword: "",
          newPassword_confirmation: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.password) {
            errors.password = "Required";
          }
          if (!values.newPassword) {
            errors.newPassword = "Required";
          }
          if (!values.newPassword_confirmation) {
            errors.newPassword_confirmation = "Required";
          }

          if (
            values.newPassword &&
            values.newPassword !== values.newPassword_confirmation
          ) {
            errors.newPassword_confirmation =
              "Password confirmation is not correct!";
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
              name={"newPassword"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
              label={"New Password"}
              error={
                errors.newPassword && touched.newPassword && errors.newPassword
              }
            />

            <AuthInput
              type={"password"}
              name={"newPassword_confirmation"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword_confirmation}
              label={"New Password Confirmation"}
              error={
                errors.newPassword_confirmation &&
                touched.newPassword_confirmation &&
                errors.newPassword_confirmation
              }
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white py-2 w-full rounded-lg mt-12 text-xl hover:bg-purple-700"
            >
              Reset password
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default ResetPasswordForm;
