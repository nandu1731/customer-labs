import { useState } from "react";
import SegmentModalHeader from "./segment-modal-header";
import SegmentInputBox from "./segment-input";

const SaveSegment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [currentSchema, setCurrentSchema] = useState(undefined);

  const allSchemas = [
    { label: "First Name", value: "first_name", type: "user" },
    { label: "Last Name", value: "last_name", type: "user" },
    { label: "Gender", value: "gender", type: "user" },
    { label: "Age", value: "age", type: "user" },
    { label: "Account Name", value: "account_name", type: "group" },
    { label: "City", value: "city", type: "user" },
    { label: "State", value: "state", type: "user" },
  ];

  const getAvailableSchemas = (excludeValues = []) => {
    return allSchemas.filter((schema) => !excludeValues.includes(schema.value));
  };

  const addSchema = () => {
    if (currentSchema) {
      const selected = allSchemas.find((s) => s.value === currentSchema);
      setSelectedSchemas([...selectedSchemas, { ...selected, id: Date.now() }]);
      setCurrentSchema("");
    }
  };

  const removeSchema = (id) => {
    setSelectedSchemas(selectedSchemas.filter((schema) => schema.id !== id));
  };

  const updateSchema = (id, newValue) => {
    const selected = allSchemas.find((s) => s.value === newValue);
    setSelectedSchemas(
      selectedSchemas.map((schema) =>
        schema.id === id ? { ...selected, id } : schema
      )
    );
  };

  const availableSchemas = getAvailableSchemas(
    selectedSchemas.map((schema) => schema.value)
  );

  const handleCancel = () => {
    setShowPopup(false);
    setCurrentSchema("");
    setSelectedSchemas([]);
    setSegmentName("");
  };

  const handleSave = async () => {
    if (!segmentName.trim()) {
      alert("Please enter a segment name");
      return;
    }

    if (selectedSchemas.length === 0) {
      alert("Please add at least one schema");
      return;
    }

    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    // When I am accessing webhook url from client side, its throwing CORS.
    // So saving data from server using API Routes.
    const response = await fetch("/api/saveSegment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.status) {
      alert(result.message || "Segment saved successfully!");
      handleCancel();
    } else {
      alert(result.error || "Failed to save segment");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(!showPopup)}
        className={`px-6 py-2 bg-teal-600 text-white rounded border-3-white hover:bg-teal-700`}
      >
        SaveSegment
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-opacity-50 z-50">
          <div
            className={`fixed right-0 top-0 h-full bg-white shadow-xl w-full max-w-md transform transition-transform duration-300 ease-in-out ${
              showPopup ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <SegmentModalHeader handleCancel={handleCancel} />

            {/* Content */}

            <div
              className="p-6 overflow-y-auto"
              style={{ height: "calc(100vh - 140px)" }}
            >
              <SegmentInputBox
                segmentName={segmentName}
                setSegmentName={setSegmentName}
              />

              {/* Schema List */}
              <div className="space-y-3 mb-4">
                {selectedSchemas.map((schema) => {
                  const alreadySelectedSchemaValues = selectedSchemas.map(
                    (item) => item.value
                  );

                  const remainingOptions = allSchemas.filter((option) =>
                    schema.value != option.value
                      ? !alreadySelectedSchemaValues.includes(option.value)
                      : true
                  );

                  return (
                    <div className="flex gap-4 items-center" key={schema.id}>
                      <span
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          schema.type === "user"
                            ? "bg-green-500"
                            : "bg-pink-500"
                        }`}
                      ></span>
                      <div
                        key={schema.id}
                        className="flex w-[90%] items-center gap-2 p-3 border border-gray-300 rounded"
                      >
                        <select
                          value={schema.value}
                          id={schema.value}
                          onChange={(e) =>
                            updateSchema(schema.id, e.target.value)
                          }
                          className="flex-1 px-2 py-1 border-none focus:outline-none text-sm"
                        >
                          <option value="Add schema to segment">
                            Add schema to segment
                          </option>
                          {remainingOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => removeSchema(schema.id)}
                        className="p-2 hover:bg-teal-100 rounded block bg-teal-50"
                      >
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mb-4 flex gap-2 items-center">
                <span
                  className={`w-3 h-3 rounded-full flex-shrink-0 bg-gray-300`}
                ></span>
                <select
                  value={currentSchema}
                  onChange={(e) => setCurrentSchema(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={availableSchemas.length === 0}
                >
                  <option value="">Add schema to segment</option>
                  {availableSchemas.map((schema) => (
                    <option key={schema.value} value={schema.value}>
                      {schema.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Schema Button */}
              <button
                onClick={addSchema}
                className="text-teal-600 text-sm flex items-center gap-1 hover:text-teal-700"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add new schema
              </button>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gray-50 flex justify-start gap-3 border-t">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
              >
                Save the Segment
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-red-500 hover:bg-red-50 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveSegment;
