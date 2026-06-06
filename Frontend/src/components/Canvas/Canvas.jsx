import React, { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useBuilderStore } from '../../store/builderStore';
import { nodeTypes } from './ALPNode';

let nodeCounter = 150;

const toRFNode = (n) => ({
  id: n.id,
  type: 'alpNode',
  position: n.position,
  data: {
    label: n.label,
    componentType: n.type,
    approximateDurationMinutes: n.config?.approximateDurationMinutes,
    passingScore: n.config?.assessment?.passingScore,
  }
});

const toRFEdge = (e) => ({
  id: e.id,
  source: e.sourceNodeId,
  target: e.targetNodeId,
  label: e.label,
  markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
  style: { stroke: '#94a3b8', strokeWidth: 2 },
  data: { conditions: e.conditions },
})

const START_NODE = {
  id: 'node-start',
  type: 'alpNode',
  position: { x: 300, y: 60 },
  data: { label: 'Start', componentType: 'start' },
  deletable: false,
}

const Canvas = () => {

  const {
    nodes: storeNodes,
    edges: storeEdges,
    addNode,
    addEdge: storeAddEdge,
    removeNode,
    selectNode,
    selectEdge,
    selectedNodeId,
    selectedEdgeId,
  } = useBuilderStore();

  const initialNodes = storeNodes.length > 0 ? storeNodes.map(toRFNode) : [START_NODE]
  const [rfNodes, setRFNodes, onNodesChange] = useNodesState(initialNodes)
  const [rfEdges, setRFEdges, onEdgesChange] = useEdgesState(storeEdges.map(toRFEdge))

  const wrapperRef = useRef(null);
  const [rfInstance, setRFInstance] = useState(null);

  const onConnect = useCallback((connection) => {
    const edgeId = `edge-${connection.source}-${connection.target}-${Date.now()}`;
    const rfEdge = {
      id: edgeId,
      source: connection.source,
      target: connection.target,
      markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
      style: { stroke: '#94a3b8', strokeWidth: 2 },
      data: { conditions: { operator: 'AND', rules: [] } },
    }
    setRFEdges((eds) => addEdge(rfEdge, eds))
    storeAddEdge({
      id: edgeId,
      sourceNodeId: connection.source,
      targetNodeId: connection.target,
      priority: 1,
      isDefault: false,
      conditions: { operator: 'AND', rules: [] },
    })
  }, [setRFEdges, storeAddEdge]);

  const onDrop = useCallback((e) => {
    e.preventDefault()
    const raw = e.dataTransfer.getData('application/alp-component')
    if (!raw || !rfInstance) return

    const component = JSON.parse(raw);
    const bounds = wrapperRef.current.getBoundingClientRect()
    const position = rfInstance.screenToFlowPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    })

    const nodeId = `node-${component.id}-${++nodeCounter}`

    setRFNodes((nds) => [...nds, {
      id: nodeId,
      type: 'alpNode',
      position,
      data: {
        label: component.title,
        componentType: component.type,
        approximateDurationMinutes: component.approximateDurationMinutes,
        passingScore: component.metadata?.assessment?.passingScore,
      },
    }])

    addNode({
      id: nodeId,
      componentId: component.id,
      type: component.type,
      label: component.title,
      position,
      config: {
        approximateDurationMinutes: component.approximateDurationMinutes,
        ...(component.type === 'assessment' && component.metadata?.assessment
          ? { assessment: component.metadata.assessment }
          : {}),
      },
    })
  }, [rfInstance, setRFNodes, addNode]);

  const onDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const onNodeClick = useCallback((_, node) => selectNode(node.id), [selectNode])
  const onEdgeClick = useCallback((_, edge) => selectEdge(edge.id), [selectEdge])
  const onPaneClick = useCallback(() => { selectNode(null); selectEdge(null) }, [selectNode, selectEdge])

  const displayNodes = rfNodes.map((n) => ({ ...n, selected: n.id === selectedNodeId }))
  const displayEdges = rfEdges.map((e) => ({
    ...e,
    style: e.id === selectedEdgeId
      ? { stroke: '#6366f1', strokeWidth: 2.5 }
      : { stroke: '#94a3b8', strokeWidth: 2 },
  }))

  return (
    <div ref={wrapperRef} className='flex-1 h-full'>
      <ReactFlow
        nodes={displayNodes}
        edges={displayEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRFInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        deleteKeyCode="Delete"
        minZoom={0.2}
        maxZoom={2}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
        <Controls position="bottom-right" />
        <MiniMap
          position="bottom-left"
          nodeColor={(n) => {
            const t = n.data?.componentType
            if (t === 'assessment') return '#6366f1'
            if (t === 'start') return '#22c55e'
            if (t === 'end') return '#94a3b8'
            return '#3b82f6'
          }}
          maskColor="rgba(248,250,252,0.7)"
        />
      </ReactFlow>
    </div>
  )
}

export default Canvas;