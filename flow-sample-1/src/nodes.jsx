export default [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
    style: { backgroundColor: "#6ede87", color: "white" },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
    style: { backgroundColor: "#ff0072", color: "white" },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
    style: { backgroundColor: "#6865A5", color: "white" },
  },
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 50, y: 350 },
    data: { value: 123 },
  },
  {
    id: "node-2",
    type: "output",
    targetPosition: "top",
    position: { x: 0, y: 500 },
    data: { label: "node 2" },
  },
  {
    id: "node-3",
    type: "output",
    targetPosition: "top",
    position: { x: 200, y: 500 },
    data: { label: "node 3" },
  },

  {
    id: "A",
    type: "group",
    position: { x: 600, y: 200 },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: "A-1",
    type: "input",
    data: { label: "Child Node 1" },
    position: { x: 10, y: 10 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "A-2",
    data: { label: "Child Node 2" },
    position: { x: 10, y: 90 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "B",
    type: "output",
    position: { x: 600, y: 400 },
    data: null,
    style: {
      width: 170,
      height: 140,
      backgroundColor: "rgba(240,240,240,0.25)",
    },
  },
  {
    id: "B-1",
    data: { label: "Child 1" },
    position: { x: 50, y: 10 },
    parentNode: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: "B-2",
    data: { label: "Child 2" },
    position: { x: 10, y: 90 },
    parentNode: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: "B-3",
    data: { label: "Child 3" },
    position: { x: 100, y: 90 },
    parentNode: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: "C",
    type: "output",
    position: { x: 800, y: 400 },
    data: { label: "Node C" },
  },
];
