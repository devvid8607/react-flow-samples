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
        className="dndnode"
        onDragStart={(e) => onDragStart(e, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(e) => onDragStart(e, "output")}
        draggable
      >
        Output Node
      </div>
      <div
        className="dndnode custom"
        onDragStart={(e) => onDragStart(e, "textUpdater")}
        draggable
      >
        Custom Node
      </div>
      <div
        className="dndnode custom"
        onDragStart={(e) => onDragStart(e, "decision")}
        draggable
      >
        Decision Node
      </div>
      <div
        className="dndnode custom"
        onDragStart={(e) => onDragStart(e, "trapezoid")}
        draggable
      >
        Trapezoid
      </div>
    </aside>
  );
};

export default Sidebar;
