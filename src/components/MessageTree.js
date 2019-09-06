import React from "react";
import Tree from "react-d3-tree";
import Merkle from "../merkle/lib/merkle";
import ChipArea from "./ChipArea";

const containerStyles = {
  width: "100%",
  height: "40vh"
};

export default class CenteredTree extends React.Component {
  state = {
    root: "",
    treeData: {},
    data: ["UNICEF", "Project", "Connect", "map", "every", "school", "blockchain", "demo"]
  };

  makeTree = data => {
    const merkle = new Merkle();

    for (let i = 0; i < data.length; i++) {
      merkle.add(data[i]);
    }

    merkle.calculateRoot();

    const root = merkle.data[merkle.data.length - 1];
    this.setState({
      root,
      data: data,
      treeData: merkle.toJson()
    });
  };

  componentDidMount() {
    this.makeTree(this.state.data);
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 4
      }
    });
  }

  render() {
    return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree
          data={this.state.treeData}
          translate={this.state.translate}
          orientation={"vertical"}
          textLayout={{ textAnchor: "start", x: 20, y: 0, transform: undefined }}
          nodeSize={{ x: 80, y: 80 }}
          separation={{ siblings: 2, nonSiblings: 2 }}
          pathFunc="straight"
        />
        <div className="message-content">
          <h3>The message hash is:</h3>
          <h1 className="">{this.state.root}</h1>
          <ChipArea data={this.state.data} makeTree={this.makeTree} />
          <h3>Drag and drop the words to change the cryptographic message.</h3>
        </div>
      </div>
    );
  }
}
