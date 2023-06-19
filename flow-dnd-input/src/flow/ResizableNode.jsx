import { memo } from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import "./style.css";

const ResizableNode = ({ data }) => {
  return (
    <>
      <NodeResizer minWidth={100} minHeight={250} />

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
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: 50, bottom: 20 }}
      />
    </>
  );
};

export default memo(ResizableNode);
