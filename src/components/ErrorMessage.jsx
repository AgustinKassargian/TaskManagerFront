import React from "react";
import { BiSolidXCircle } from "react-icons/bi";

function ErrorMessage({ message }) {
  if (message) {
    return (
      <div className="flex items-center justify-center gap-2  bg-red-700/20 text-white border border-red-600 rounded-md p-4 text-center min-h-5">
        <BiSolidXCircle className="text-xl" />
        {message}
      </div>
    );
  }
}

export default ErrorMessage;
