import ReactFlow, {
  MiniMap,
  addEdge,
  useEdgesState,
  Controls,
  Background,
  NodeResizer,
  NodeResizeControl,
  NodeToolbar,
  Panel,
  useNodesState,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNoder from "./TextUpdaterNoder";

import defaultNodes from "./nodes";
import defaultEdges from "./edges";
import { useCallback, useMemo, useState } from "react";

const nodeColor = (node) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};

function Flow() {
  const nodeTypes = useMemo(
    () => ({
      textUpdater: TextUpdaterNoder,
    }),
    []
  );

  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const [variant, setVariant] = useState("dots");
  const proOptions = { hideAttribution: true };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
      >
        <Background color="#ccc" variant={variant} />
        <Panel>
          <div>Variant</div>
          <button onClick={() => setVariant("dots")}>Dots</button>
          <button onClick={() => setVariant("lines")}>Lines</button>
          <button onClick={() => setVariant("cross")}>Cross</button>
        </Panel>
        {/* <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable /> */}
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
