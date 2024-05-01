import React from "react";

export default function Loading() {
  console.log('Loading...');
  return (
    <div
      className={`left-0 top-0 z-50 flex min-h-[calc(100vh-210px)] w-full items-center justify-center bg-white bg-opacity-5 backdrop-blur-sm`}
    >
      <div
        className={`h-16 w-16 animate-spin rounded-full border-t-4 border-secondary-blue`}
      />
    </div>
  );
}