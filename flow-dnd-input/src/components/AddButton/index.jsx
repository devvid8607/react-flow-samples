import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

// import "./index.css";

const initialNodes = [
  {
    id: "0",
    type: "default",
    data: { label: "Node" },
    position: { x: 0, y: 0 },
  },
  {
    id: "1",
    type: "default",
    data: { label: "Node" },
    position: { x: 0, y: 100 },
  },
];

const initialEdges = [
  {
    id: "edges-e-0-1",
    source: "0",
    target: "1",
    label: "+",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

const fitViewOptions = {
  padding: 3,
};

let id = 1;
const getId = () => `${id++}`;

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project } = useReactFlow();
  const [addnode, setAddnode] = useState(false);
  const [addChildeNode, setAddChildeNode] = useState(false);
  const [parentNode, setParentNode] = useState(null);
  const [targetNode, setTargetNode] = useState(null);

  const initialNodeType = {
    id: getId(),
    type: "default",
    position: { x: initialNodes[0].position.x, y: nodes.length * 100 },
    data: { label: "New Node" },
    width: 150,
  };

  const handleEdgeClick = (param, data) => {
    const findSourceNode = nodes.find((item) => item.id === data.source);
    const findTargetNode = nodes.find((item) => item.id === data.target);
    console.log(findSourceNode);
    console.log(findTargetNode);
    setNodes((nds) =>
      nds.concat({
        ...initialNodeType,
        data: {
          parent: data.source,
          child: data.target,
          ...initialNodeType.data,
        },
      })
    );
    setParentNode(findSourceNode);
    setTargetNode(findTargetNode);
    setAddnode(true);
  };
  const initialEdge = {
    id: String(parseInt(Math.random(100000000) * 1000000)),
    source: nodes[nodes.length - 2].id,
    target: nodes[nodes.length - 1].id,
    label: "+",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  };

  useEffect(() => {
    console.log(edges);
    if (addnode) {
      const findFirstNode = nodes.find(
        (item) => item.id === initialEdge.source
      );
      setEdges((eds) =>
        eds.concat({
          ...initialEdge,
          //   source: parentNode.id,
          //   target: targetNode.id,
        })
      );
      setAddnode(false);
      setParentNode(null);
    }
  }, [nodes, parentNode, targetNode]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  return (
    <div
      className="wrapper"
      style={{ width: "100%", height: "100%" }}
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={handleEdgeClick}
        fitView
        fitViewOptions={fitViewOptions}
      />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
