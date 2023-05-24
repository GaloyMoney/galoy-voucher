import React from "react";

export default function LoadingComponent() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <button type="button" className="flex items-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4.93 4.93A10.07 10.07 0 0112 2v2a8.07 8.07 0 00-5.657 2.343L4.93 4.93zm14.14 0l-1.414 1.414A8.07 8.07 0 0012 4V2a10.07 10.07 0 017.07 2.93z"
            ></path>
          </svg>
          Processing...
        </button>
      </div>
    </div>
  );
}
