// import { SchemaTree } from "../../common/node";
import { ThunkAction, createSlice } from "@reduxjs/toolkit";

import { Action } from "./types";
import { DNode } from "../../common/types";
import { ProtoEngine } from "../../proto/engine";
import { ReduxState } from ".";

// === BEGIN PROTO {
const YAML_PROJECT_BASE = `
  name: project
  schema:
      root:
        children:
          quickstart: 
          topic: 
          version: 
          features:
          rel:
      quickstart:
        desc: get started with project
      features:
        desc: what does it do
      ref:
        kind: namespace
        choices:
            competitors: 
            shortcuts:
      rel:
        desc: relative
      version:
        children:
          version-major: 
          version-minor: 
          version-breaking: 
      plan:
        children:
          requirements:
            alias: req
          timeline:
            desc: "how long will it take"
      version-major:
        desc: the major version
`;
const YAML_PROJECT_DEV = `
  name: dev project
  schema: 
    root:
      children: 
        upgrade:
        dev:
        ref:
    dev:
      children:
        dev-layout: 
        architecture:
          alias: arch        
        qa:
        ops:
    ref:
      children:
        config:
        lifecycle:
    config: 
`;

// const rootSchemaNode: SchemaNode = {
//   id: "root",
//   children: [],
//   parent: null,
//   data: { title: "root", desc: "root", type: "schema" },
// };
// const initialTree = new SchemaTree("root", rootSchemaNode);
// const treeProjectBase = SchemaTree.fromSchemaYAML(YAML_PROJECT_BASE);
// const treeProjectDev = SchemaTree.fromSchemaYAML(YAML_PROJECT_DEV);
// initialTree.addSubTree(treeProjectBase, rootSchemaNode.id);
// initialTree.addSubTree(treeProjectDev, rootSchemaNode.id);
// console.log(initialTree);

// const rootStub: NoteNodeStub = {
//   id: "root/note",
//   data: { title: "root", desc: "root", type: "note", schemaId: "-1" },
// };

// === } END PROTO

export interface NodeState {
  // schemaDict: SchemaNodeDict;
  // noteStubDict: NoteStubDict;
  // treeOrientation: "vertical" | "horizontal";
  activeNodeId: string;
}

export interface SetActiveNodeIdAction extends Action<{ id: string }> {
  payload: {
    id: string;
  };
}

const initialState: NodeState = {
  // get(): Promise<DNode>
  //
  // schemaDict: { ...initialTree.nodes },
  // noteStubDict: { ...initialNoteStubs },
  // treeOrientation: "horizontal",
  activeNodeId: "",
  // engine.get(activeNodeID)
  // engine
};

const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    setActiveNodeId(state: NodeState, action: SetActiveNodeIdAction) {
      state.activeNodeId = action.payload.id;
    },
  },
});

type FetchNodeThunk = ThunkAction<
  Promise<DNode>,
  ReduxState,
  null,
  Action<string>
>;

type GetNodeThunk = ThunkAction<
  Promise<DNode>,
  ReduxState,
  null,
  Action<string>
>;

const effects = {
  fetchNode: (query: string): FetchNodeThunk => async () => {
    //TODO
    const scope = { username: "kevin" };
    const engine = ProtoEngine.getEngine();
    const resp = await engine.query(scope, query);
    // FIXME: verify
    return resp.item[0];
  },
  getNode: (id: string): GetNodeThunk => async () => {
    //TODO
    const scope = { username: "kevin" };
    const engine = ProtoEngine.getEngine();
    const resp = await engine.get(scope, id);
    // FIXME: verify
    return resp.item;
  },
};

const { reducer, actions } = nodeSlice;
export {
  reducer as nodeReducer,
  actions as nodeActions,
  effects as nodeEffects,
};