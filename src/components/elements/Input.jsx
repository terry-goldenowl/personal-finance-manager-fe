import React from "react";

function Input({
  type,
  name,
  onChange = null,
  onBlur = null,
  value = "",
  label,
  error,
  style = "",
  size = "medium",
  placeholder = "",
  accept = "*",
  required = null,
  disable = false,
  mb = "mb-3",
}) {
  const sizeStyle =
    size === "medium"
      ? "rounded-xl py-2 px-4 text-xl ring-2"
      : "rounded-md py-1.5 px-3 text-sm ring-1";

  return (
    <div className={mb}>
      {label && (
        <label htmlFor={name} className="flex items-center">
          {label}{" "}
          <span className="text-red-600 text-2xl">{required && "*"}</span>
        </label>
      )}

      <div>
        <input
          type={type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          accept={accept}
          className={
            "block border-gray-300 ring-inset ring-gray-300 focus:ring-purple-400 w-full outline-none shadow-sm " +
            sizeStyle +
            " " +
            style +
            " " +
            (error ? "ring-red-500" : "ring-gray-300")
          }
          placeholder={placeholder}
          disabled={disable}
        />
      </div>

      <p className="text-red-500 text-end italic text-sm">{error}</p>
    </div>
  );
}

export default Input;
