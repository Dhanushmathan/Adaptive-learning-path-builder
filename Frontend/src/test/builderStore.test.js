import { describe, it, expect, beforeEach } from 'vitest'
import { useBuilderStore } from "../store/builderStore"

const mockNode = {
    id: 'node-test-1',
    componentId: 'cmp-assess-math-1',
    type: 'assessment',
    label: 'Math Test',
    position: { x: 100, y: 100 },
    config: { approximateDurationMinutes: 35 },
}

const mockEdge = {
    id: 'edge-test-1',
    sourceNodeId: 'node-start',
    targetNodeId: 'node-test-1',
    conditions: { operator: 'AND', rules: [] },
}

describe('BuilderStore', () => {
    beforeEach(() => {
        useBuilderStore.setState({
            nodes: [],
            edges: [],
            selectedNodeId: null,
            selectedEdgeId: null,
            pathName: 'Untitled',
            pathStatus: 'draft',
        })
    })

    it('adds a node', () => {
        useBuilderStore.getState().addNode(mockNode)
        expect(useBuilderStore.getState().nodes).toHaveLength(1)
        expect(useBuilderStore.getState().nodes[0].id).toBe('node-test-1')
    })

    it('updates a node label', () => {
        useBuilderStore.getState().addNode(mockNode)
        useBuilderStore.getState().updateNode('node-test-1', { label: 'Updated Label' })
        expect(useBuilderStore.getState().nodes[0].label).toBe('Updated Label')
    })

    it('removes a node and its connected edges', () => {
        useBuilderStore.getState().addNode(mockNode)
        useBuilderStore.getState().addEdge(mockEdge)
        useBuilderStore.getState().removeNode('node-test-1')
        expect(useBuilderStore.getState().nodes).toHaveLength(0)
        expect(useBuilderStore.getState().edges).toHaveLength(0)
    })

    it('adds and updates an edge', () => {
        useBuilderStore.getState().addEdge(mockEdge)
        useBuilderStore.getState().updateEdge('edge-test-1', { label: 'Pass route' })
        expect(useBuilderStore.getState().edges[0].label).toBe('Pass route')
    })

    it('selecting a node clears edge selection', () => {
        useBuilderStore.getState().selectEdge('edge-test-1')
        useBuilderStore.getState().selectNode('node-test-1')
        const state = useBuilderStore.getState()
        expect(state.selectedNodeId).toBe('node-test-1')
        expect(state.selectedEdgeId).toBeNull()
    })

    it('selecting an edge clears node selection', () => {
        useBuilderStore.getState().selectNode('node-test-1')
        useBuilderStore.getState().selectEdge('edge-test-1')
        const state = useBuilderStore.getState()
        expect(state.selectedEdgeId).toBe('edge-test-1')
        expect(state.selectedNodeId).toBeNull()
    })

    it('updates path name and status', () => {
        useBuilderStore.getState().setPathName('SAT Prep Path')
        useBuilderStore.getState().setPathStatus('published')
        expect(useBuilderStore.getState().pathName).toBe('SAT Prep Path')
        expect(useBuilderStore.getState().pathStatus).toBe('published')
    })
})
