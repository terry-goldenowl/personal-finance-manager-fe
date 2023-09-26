import React, { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Input from "../../../components/elements/Input";
import { FileUploader } from "react-drag-drop-files";
import profile from "../../../assets/images/profile.png";
import UsersServices from "../../../services/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import AuthService from "../../../services/auth";
import ConfirmDeleteModal from "../../../components/modal/ConfirmDeleteModal";
import EmailVerification from "../../auth/components/EmailVerification";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../stores/auth";

function Profile({ onClose }) {
  const { user, roles } = useSelector((state) => state.auth);

  const [preview, setPreview] = useState(
    user.photo ? user.photo : profile
  );

  const [photo, setPhoto] = useState();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (file) => {
    // CLEAR ANY PHOTO STATE BEFORE
    setPhoto(null);

    setErrors((prev) => {
      if (prev && prev.image) delete prev.image;
      return prev;
    });

    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      const imageExtensions = ["jpg", "jpeg", "png", "gif"];

      if (!imageExtensions.includes(fileExtension)) {
        setPreview(null);
        setErrors((prev) => {
          return { ...prev, image: "Must be an image!" };
        });
        return;
      }

      setPhoto(file);

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleChangeEmail = async (event) => {
    setEmail(event.target.value);
    if (event.target.value !== user.email) {
      setIsEmailVerified(false);
    }
  };

  const handleSendCode = async () => {
    try {
      const verifyResponse = await AuthService.sendVerificationCode({
        email,
      });

      if (verifyResponse.status === "success") {
        setIsVerifyEmail(true);
      } else {
        toast.error(
          "Fail to send verification code to your new email! Try later or use another email."
        );
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = {
        name,
        email,
        photo,
      };

      const responseData = await UsersServices.updateUser(data);

      if (responseData.status === "success") {
        toast.success("Update user successfully!");
        setIsVerifyEmail(false);
        dispatch(authActions.update(responseData.data.user));
      } else {
        toast.error(responseData.error);
      }
    } catch (e) {
      setIsUpdating(false);
      toast.error(e.response.data.message);
    }
  };

  const handleAccept = async () => {
    let haveErrors = false;
    setErrors(null);

    if (email.length === 0) {
      haveErrors = true;
      setErrors((prev) => {
        return { ...prev, email: "Email is required" };
      });
    }

    if (name.length === 0) {
      haveErrors = true;
      setErrors((prev) => {
        return { ...prev, name: "Name is required" };
      });
    }

    if (!haveErrors) {
      setIsUpdating(true);
      if (!isEmailVerified) {
        await handleSendCode();
        return;
      }

      await handleUpdate();
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      let haveErrors = false;
      setErrors(null);

      if (password.length === 0) {
        haveErrors = true;
        setErrors((prev) => {
          return {
            ...prev,
            password: "Old password is required!",
          };
        });
      }

      if (newPassword.length < 8 || newPassword.length > 32) {
        haveErrors = true;
        setErrors((prev) => {
          return {
            ...prev,
            newPassword:
              "Password must be at least 8 and as most 32 characters!",
          };
        });
      }

      if (newPassword !== passwordConfirm) {
        haveErrors = true;
        setErrors((prev) => {
          return {
            ...prev,
            passwordConfirm: "New password confirmation does not match",
          };
        });
      }

      if (haveErrors) return;

      setIsSavingPassword(true);
      const data = {
        password,
        newPassword,
        newPassword_confirmation: passwordConfirm,
      };

      const responseData = await UsersServices.updatePassword(data);

      if (responseData.status === "success") {
        toast.success("Update password successfully! Please login again.");
        dispatch(authActions.logout());
        navigate("/login");

        await AuthService.logout();
      } else {
        toast.error(responseData.error);
        setErrors(responseData.error);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
    setIsSavingPassword(false);
  };

  const handleDeleteUser = async () => {
    try {
      const responseData = await UsersServices.deleteUser();

      if (responseData.status === "success") {
        dispatch(authActions.logout());

        navigate("/login");
      } else {
        toast.error(responseData.error);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const handleVerifySuccess = async () => {
    setIsEmailVerified(true);
    setIsVerifyEmail(false);
    await handleUpdate();
  };

  return (
    <Modal
      title={"Profile"}
      onClose={onClose}
      width={
        isUpdatingPassword
          ? "sm:w-3/5 w-11/12"
          : "xl:w-1/4 md:w-1/3 sm:w-1/2 w-11/12"
      }
      onAccept={handleAccept}
      processing={isUpdating}
    >
      <div className="flex w-full lg:flex-row flex-col">
        <div
          className={
            "sm:px-3 px-1 " +
            (isUpdatingPassword
              ? "lg:w-1/2 w-full lg:border-r-2 lg:border-r-blue-100"
              : "w-full")
          }
        >
          <div className="flex gap-2 justify-end">
            {roles.map((role) => (
              <div
                key={role}
                className="px-4 py-0.5 rounded-full bg-yellow-500 text-white font-bold uppercase text-xs"
              >
                {role}
              </div>
            ))}
          </div>
          <div className="mb-3">
            {preview && (
              <div className="overflow-hidden mb-3 flex justify-center">
                <img
                  src={preview}
                  alt=""
                  className="object-cover h-60 w-60 rounded-full"
                />
              </div>
            )}
            <FileUploader
              multiple={false}
              handleChange={handleFileChange}
              name="image"
              types={["JPG", "JPEG", "PNG", "GIF"]}
            />
          </div>

          <Input
            label={"Name"}
            type={"text"}
            name={"name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors?.name}
            size="small"
          />
          <Input
            label={"Email"}
            type={"email"}
            name={"email"}
            value={email}
            onChange={handleChangeEmail}
            error={errors?.email}
            size="small"
          />
          <div
            className={
              "flex mt-4 " +
              (isUpdatingPassword ? "justify-end" : "justify-between")
            }
          >
            {!isUpdatingPassword && (
              <button
                className="text-sm bg-gray-200 rounded-full py-1 px-3 hover:bg-blue-500 hover:text-white border border-blue-500"
                onClick={() => setIsUpdatingPassword(true)}
              >
                Update password
              </button>
            )}
            {roles.includes("user") && (
              <button
                className="text-sm bg-red-500 rounded-full py-1 px-3 hover:bg-red-600 text-white"
                onClick={() => setIsConfirmDelete(true)}
              >
                Delete account
              </button>
            )}
          </div>
        </div>
        {isUpdatingPassword && (
          <div className="lg:w-1/2 w-full sm:px-3 px-1">
            <Input
              type={"password"}
              name={"password"}
              value={password}
              label={"Old Password"}
              onChange={(e) => setPassword(e.target.value)}
              error={errors?.password}
              size="small"
              required
            />
            <Input
              type={"password"}
              name={"newPassword"}
              value={newPassword}
              label={"New Password"}
              onChange={(e) => setNewPassword(e.target.value)}
              error={errors?.newPassword}
              size="small"
              required
            />
            <Input
              type={"password"}
              name={"password_confirmation"}
              value={passwordConfirm}
              label={"Password Confirmation"}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={errors?.passwordConfirm}
              size="small"
              required
            />

            <div className="flex justify-between mt-3">
              <button
                className="text-sm bg-gray-200 rounded-full py-1 px-3 hover:bg-blue-500 hover:text-white"
                onClick={() => setIsUpdatingPassword(false)}
              >
                Back
              </button>
              <button
                className="py-1 px-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 text-sm"
                onClick={handleUpdatePassword}
              >
                {isSavingPassword ? "Updating password" : "Update password"}
              </button>
            </div>
          </div>
        )}
        {isConfirmDelete && (
          <ConfirmDeleteModal
            message={
              "Do you really want to DELETE your account? All of your data will be deleted too. This action can not be undone. Think carefully before you click the delete button!"
            }
            onAccept={handleDeleteUser}
            onClose={() => setIsConfirmDelete(false)}
          />
        )}
        {isVerifyEmail && (
          <EmailVerification
            email={email}
            onClose={() => setIsVerifyEmail(false)}
            onSuccess={handleVerifySuccess}
          />
        )}
      </div>
    </Modal>
  );
}

export default Profile;
