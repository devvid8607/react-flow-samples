import React, { useEffect, useRef, useState } from "react";
import { NodeToolbar, Handle, Position } from "reactflow";

export function TestTextArea({ data }) {
  const { textAreaValue, setTextAreaValue, onUpdateTextArea } = data;
  const ref = useRef();

  const [myValue, setMyValue] = useState(textAreaValue || "");
  const [isVisible, setVisible] = useState(false);

  const handleTextareaChange = (e) => {
    setMyValue(e.target.value);
    onUpdateTextArea(e.target.value);
  };

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <NodeToolbar isVisible={isVisible} position={Position.Right}>
        <div>This is a tooltip</div>
      </NodeToolbar>
      <NodeToolbar position={Position.Top}>
        <button>delete</button>
        <button>copy</button>
        <button>expand</button>
      </NodeToolbar>
      <div>
        <Handle type="target" position="left" style={{ background: "#555" }} />
        <textarea
          ref={ref}
          // className="form-input h-[300px] w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          value={myValue}
          onChange={handleTextareaChange}
          placeholder="Type message here."
        />
        <Handle type="source" position="right" style={{ background: "#555" }} />
      </div>
    </div>
  );
}
