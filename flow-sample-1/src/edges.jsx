export default [
  { id: "e1-2", source: "1", target: "2" },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    label: "to the",
    type: "step",
  },

  { id: "edge-1", source: "node-1", target: "node-2", sourceHandle: "b" },
  { id: "edge-2", source: "node-1", target: "node-3", sourceHandle: "a" },

  { id: "a1-a2", source: "A-1", target: "A-2" },
  { id: "a2-b", source: "A-2", target: "B" },
  { id: "a2-c", source: "A-2", target: "C" },
  { id: "b1-b2", source: "B-1", target: "B-2" },
  { id: "b1-b3", source: "B-1", target: "B-3" },
];
