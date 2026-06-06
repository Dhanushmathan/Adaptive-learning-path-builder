import { create } from "zustand";

export const useBuilderStore = create((set) => ({
    components: [],
    setComponents: (components) => set({ components }),

    nodes: [],
    edges: [],
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    addNode: (node) =>
        set((s) => ({ nodes: [...s.nodes, node] })),

    updateNode: (id, updates) =>
        set((s) => ({
            nodes: s.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
        })),

    removeNode: (id) =>
        set((s) => ({
            nodes: s.nodes.filter((n) => n.id !== id),
            edges: s.edges.filter((e) => e.sourceNodeId !== id && e.targetNodeId !== id),
            selectedNodeId: s.selectedNodeId === id ? null : s.selectedNodeId,
        })),

    addEdge: (edge) =>
        set((s) => ({ edges: [...s.edges, edge] })),

    updateEdge: (id, updates) =>
        set((s) => ({
            edges: s.edges.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),

    removeEdge: (id) =>
        set((s) => ({
            edges: s.edges.filter((e) => e.id !== id),
            selectedEdgeId: s.selectedEdgeId === id ? null : s.selectedEdgeId,
        })),

    // Selection
    selectedNodeId: null,
    selectedEdgeId: null,
    selectNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
    selectEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),

    // Path metadata
    pathId: null,
    pathName: 'Untitled Learning Path',
    pathStatus: 'draft',
    setPathId: (id) => set({ pathId: id }),
    setPathName: (name) => set({ pathName: name }),
    setPathStatus: (status) => set({ pathStatus: status }),

    // UI
    isSaving: false,
    setIsSaving: (v) => set({ isSaving: v }),
    lastSavedAt: null,
    setLastSavedAt: (d) => set({ lastSavedAt: d }),

})) 