import { memo, useEffect, useState } from "react";
import { Handle, Position, NodeResizeControl } from "reactflow";
import "./style.css";

const controlStyle = {
  background: "transparent",
  border: "none",
};

const divStyle = {
  width: 250,
  height: 150,
};

const CustomNode = ({ data }) => {
  return (
    <div style={divStyle}>
      <NodeResizeControl style={controlStyle}>
        <ResizeIcon />
      </NodeResizeControl>

      <div>
        <Handle type="target" position={Position.Left} />
        <div className="node-content">
          <form className="responsive-form">
            <label htmlFor="fname">First name:</label>
            <br />
            <input type="text" id="fname" name="fname" />
            <br />
            <label htmlFor="lname">Last name:</label>
            <br />
            <input type="text" id="lname" name="lname" />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
};

function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="#ff0071"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "absolute", right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

export default memo(CustomNode);
