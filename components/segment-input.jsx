import React from "react";

const SegmentInputBox = ({ segmentName, setSegmentName }) => {
  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter the Name of the Segment
        </label>
        <input
          type="text"
          placeholder="Name of the segment"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <p className="text-sm text-gray-600 mb-4">
        To save your segment, you need to add the schemas to build the query
      </p>

      <div className="flex justify-end gap-4 mb-4">
        <button className={`flex items-center gap-2 text-sm`}>
          <span className={`w-2 h-2 rounded-full bg-green-600`}></span>
          User Traits
        </button>
        <button className={`flex items-center gap-2 text-sm`}>
          <span className={`w-2 h-2 rounded-full bg-pink-600`}></span>
          Group Traits
        </button>
      </div>
    </>
  );
};

export default SegmentInputBox;
