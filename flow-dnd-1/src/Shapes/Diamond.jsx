import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { right: -30, top: 60 };

const handleStyle2 = { right: -5, top: 0 };

function Diamond({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  console.log(data);
  return (
    <div className="diamond">
      <Handle type="source" position={Position.Left} style={handleStyle} />
      <div>
        {/* <label htmlFor="text">Text:</label> */}
        {/* <input id="text" name="text" onChange={onChange} /> */}
        <p>{data.text}</p>
        {data.btn}
        {data?.btnArray?.map((item) => (
          <button>{item}</button>
        ))}
      </div>
      {/* <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} /> */}
      <Handle type="target" position={Position.Right} style={handleStyle2} />
    </div>
  );
}

export default Diamond;
