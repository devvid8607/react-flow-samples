import {
  useEdgesState,
  useNodesState,
  MarkerType,
  ReactFlowProvider,
  ReactFlow,
  Controls,
  Background,
  Panel,
  addEdge,
} from "reactflow";
import { useCallback, useEffect, useMemo, useRef } from "react";
import "./index.css";
import "reactflow/dist/style.css";
import { useState } from "react";
import CustomNode from "./flow/CustomNode";
import Sidebar from "./Sidebar";
import { TestTextArea } from "./flow/TestTextArea";
import CustomResizerNode from "./flow/CustomResizerNode";
import ResizableNode from "./flow/ResizableNode";
import AddButton from "./components/AddButton";

const initialNodes = [
  {
    id: "1",
    // type: "ResizableNode",
    type: "CustomResizerNode",
    data: { label: "NodeResizer" },
    position: { x: 0, y: 50 },
    style: {
      background: "#fff",
      border: "1px solid black",
      borderRadius: 15,
      fontSize: 12,
    },
  },
];

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [formFieldValues, setFormFieldValues] = useState({});

  const [textAreaValue, setTextAreaValue] = useState("");

  console.log(textAreaValue);

  // console.log(formFieldValues);

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  //edge options
  const defaultEdgeOptions = {
    style: { stroke: "black" },
    type: "step",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
    },
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const nodeTypes = useMemo(
    () => ({
      customNode: CustomNode,
      textAreaNode: TestTextArea,
      CustomResizerNode: CustomResizerNode,
      ResizableNode: ResizableNode,
    }),
    []
  );

  const updateFormFieldValues = (updatedFormFields) => {
    // console.log(updatedFormFields);
    setFormFieldValues(updatedFormFields);
  };

  const updateTextArea = (updatedTextAreas) => {
    console.log(updatedTextAreas);
    setTextAreaValue(updatedTextAreas);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      // console.log(type);
      if (typeof type === "undefined" || !type) {
        return;
      }
      // console.log(reactFlowInstance);
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // console.log(position);
      let newNode;

      if (type == "textAreaNode") {
        newNode = {
          id: getId(),
          type,
          position,
          data: {
            onUpdateTextArea: updateTextArea,
            textAreaValue,
            setTextAreaValue,
          },
        };
      } else if (type == "customNode") {
        newNode = {
          id: getId(),
          type,
          position,
          data: {
            label: `${type} node`,
            formFields: [
              {
                id: `${id}_name`,
                label: "Name",
                name: "name",
                type: "text",
                value: "",
              },
              {
                id: `${id}_email`,
                label: "Email",
                name: "email",
                type: "email",
                value: "",
              },
              {
                id: `${id}_password`,
                label: "Password",
                name: "password",
                type: "password",
                value: "",
              },
            ],
            onUpdateFormFields: updateFormFieldValues,
            formFieldValues,
            setFormFieldValues,
          },
        };
      } else {
        newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };
      }
      console.log(newNode);
      setNodes((nds) => nds.concat(newNode));
      updateTextArea(newNode.data.textAreaValue);
      updateFormFieldValues(newNode.id, newNode.data.formFields);
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onSave = useCallback(() => {
    console.log(textAreaValue);
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();

      // Update formFields array with current textbox values
      const updatedNodes = flow.nodes.map((node) => {
        console.log(node);
        if (node.type === "customNode") {
          const nodeId = node.id;
          // const updatedFormFields = node.data.formFields.map((field) => {
          //   const updatedValue = formFieldValues[nodeId]?.[field.name] || "";
          //   return { ...field, value: updatedValue };
          // });

          return {
            ...node,
            data: {
              ...node.data,
              formFields: formFieldValues,
            },
          };
        } else if (node.type === "textAreaNode") {
          // const textareaValue = node?.data?.textAreaValue;
          // console.log("here :" + JSON.stringify(node));
          return {
            ...node,
            data: {
              ...node.data,
              textAreaValue,
            },
          };
        }

        return node;
      });
      console.log(updatedNodes);
      const updatedFlow = {
        ...flow,
        nodes: updatedNodes,
      };

      console.log(updatedFlow);
      localStorage.setItem("flowKey", JSON.stringify(updatedFlow));
    }
  }, [reactFlowInstance, formFieldValues, textAreaValue]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("flowKey"));
      console.log(flow);

      // if (flow) {
      //   const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      //   setNodes(flow.nodes || []);
      //   setEdges(flow.edges || []);

      //   // Update form field values based on restored data
      //   const updatedFormFieldValues = {};
      //   flow.nodes.forEach((node) => {
      //     if (node.type === "customNode" && node.data && node.data.formFields) {
      //       const nodeFormFieldValues = {};
      //       node.data.formFields.forEach((field) => {
      //         nodeFormFieldValues[field.name] = field.value || "";
      //       });
      //       updatedFormFieldValues[node.id] = nodeFormFieldValues;
      //     }
      //   });

      //   // Set the form field values and trigger re-rendering
      //   setFormFieldValues(updatedFormFieldValues);
      // }
    };

    restoreFlow();
  }, [setNodes, setEdges, setFormFieldValues]);

  useEffect(() => {
    localStorage.setItem("formFieldValues", JSON.stringify(formFieldValues));
  }, [formFieldValues]);

  return (
    <>
      <div className="dndflow">
        <AddButton />
        {/* <ReactFlowProvider>
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
              </Panel>
            </ReactFlow>
          </div>
          <Sidebar />
        </ReactFlowProvider> */}
      </div>
    </>
  );
}

export default App;
