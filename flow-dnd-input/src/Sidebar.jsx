import React from "react";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <aside>
      <div
        className="dndnode input"
        onDragStart={(e) => onDragStart(e, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode custom"
        onDragStart={(e) => onDragStart(e, "customNode")}
        draggable
      >
        Custom Node
      </div>
      <div
        className="dndnode custom"
        onDragStart={(e) => onDragStart(e, "textAreaNode")}
        draggable
      >
        TextArea Node
      </div>
    </aside>
  );
};

export default Sidebar;
