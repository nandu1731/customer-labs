import React from "react";

const SegmentModalHeader = ({handleCancel}) => {
  return (
    <div className="bg-teal-500 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button onClick={handleCancel} className="hover:bg-teal-600 p-1 rounded">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold">Saving Segment</h2>
      </div>
      <button onClick={handleCancel} className="hover:bg-teal-600 p-1 rounded">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>{" "}
      </button>
    </div>
  );
};

export default SegmentModalHeader;
