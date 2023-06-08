import React, { useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./text-updater-node.css";

function TextUpdaterNoder({ data }) {
  //   console.log(data);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  return (
    <>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Top} />
        <div>
          <label htmlFor="text">Text</label>
          <input id="text" name="text" onChange={onChange} />
        </div>
        <Handle type="source" id="a" position={Position.Bottom} />
        <Handle
          type="source"
          id="b"
          position={Position.Bottom}
          style={{ left: 40 }}
        />
      </div>
    </>
  );
}

export default TextUpdaterNoder;
