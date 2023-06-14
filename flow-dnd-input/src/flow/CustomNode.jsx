import React, { useState } from "react";
import { Handle } from "reactflow";

const CustomNode = ({ data, id }) => {
  const { label, formFields, onUpdateFormFields } = data;
  const [formValues, setFormValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newFormValues = Object.fromEntries(formData.entries());

    const updatedFormFields = formFields.map((field) => {
      const updatedValue = newFormValues[field.name] || "";
      return { ...field, value: updatedValue };
    });

    onUpdateFormFields(updatedFormFields);

    setFormValues(newFormValues);

    console.log("Form values:", newFormValues);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
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
              <input id={field.id} type={field.type} name={field.name} />
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
