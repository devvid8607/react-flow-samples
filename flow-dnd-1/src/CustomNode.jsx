import React from "react";
import { Handle } from "react-flow-renderer";

const CustomNode = ({ data }) => {
  const { label, formFields } = data;

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log("Form values:", formValues);
  };

  return (
    <div>
      <Handle type="target" position="left" style={{ background: "#555" }} />
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <h4>{label}</h4>
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.name}>
              <label>{field.label}</label>
              <input type={field.type} name={field.name} />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
      <Handle type="source" position="right" style={{ background: "#555" }} />
    </div>
  );
};

export default CustomNode;
