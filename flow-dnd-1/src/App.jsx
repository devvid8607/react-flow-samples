import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ShapeFlow from "./Shapes";

import "./index.css";
import Sidebar from "./Sidebar";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  addEdge,
  MarkerType,
  useReactFlow,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNoder from "./TextUpdaterNoder";
import Trapezoid from "./Shapes/Trapezoid";
import Parallelogram from "./Shapes/Parallelogram";
import Rectangle from "./Shapes/Rectangle";
import Diamond from "./Shapes/Diamond";
const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const [rfInstance, setRfInstance] = useState(null);
  const [value, setValue] = useState("");
  console.log(value);

  const defaultEdgeOptions = {
    style: { strokeWidth: 1, stroke: "black" },
    type: "step",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
  };

  const nodeTypes = useMemo(
    () => ({
      textUpdater: TextUpdaterNoder,
      decision: Diamond,
      trapezoid: Trapezoid,
    }),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    // console.log(event);
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onchange = (e) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      console.log(type);
      if (typeof type === "undefined" || !type) {
        return;
      }
      console.log(reactFlowInstance);
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      console.log(position);
      let newNode;
      if (type !== "textUpdater") {
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };
      } else {
        newNode = {
          id: getId(),
          type,
          position,
          data: {
            label: `${type} node`,
          },
        };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log(flow);
      localStorage.setItem("flowKey", flow);
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("flowKey"));
      console.log(flow);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        // setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
    flow.nodes.map((node) => {});
  }, [setNodes]);

  useEffect(() => {
    console.log("getting flowdata");
    const flow = JSON.parse(localStorage.getItem("flowKey"));
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      // setViewport({ x, y, zoom });
    }
  }, []);

  return (
    <>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              defaultEdgeOptions={defaultEdgeOptions}
              nodeTypes={nodeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Controls />
              <Background />
              <Panel position="top-right">
                <button onClick={onSave}>save</button>
                <button onClick={onRestore}>restore</button>
                {/* <button onClick={onAdd}>add node</button> */}
              </Panel>
            </ReactFlow>
          </div>
          <Sidebar />
        </ReactFlowProvider>
      </div>
      {/* <ShapeFlow /> */}
    </>
  );
}

export default App;
