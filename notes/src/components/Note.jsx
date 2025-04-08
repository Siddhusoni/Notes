import React, { useState } from "react";

const Note = ({ id, text, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleBlur = () => {
    setIsEditing(false);
    onEdit(id, value);
  };

  return (
    <div className="relative bg-pink-200 border-l-4 border-yellow-400 rounded-lg shadow-md p-4 w-full sm:w-64 md:w-72 lg:w-80 transition-all duration-300 hover:shadow-xl">
      <div className="min-h-[96px] text-gray-800 text-sm sm:text-base font-medium leading-relaxed whitespace-pre-wrap break-words">
        {isEditing ? (
          <textarea
            className="w-full h-28 bg-yellow-50 p-2 rounded border border-yellow-300 outline-none resize-none text-gray-800"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <div>{text}</div>
        )}
      </div>

      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="p-1 rounded-full text-blue-600 hover:text-white hover:bg-blue-600 transition"
          title="Edit"
          onClick={() => setIsEditing(true)}
        >
          ✎
        </button>
        <button
          className="p-1 rounded-full text-red-500 hover:text-white hover:bg-red-500 transition"
          title="Delete"
          onClick={() => onDelete(id)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Note;
