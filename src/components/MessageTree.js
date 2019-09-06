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
    data: ["2GiB", "2GiB", "4.2GiB", "4.2GiB", "1.2GiB", "1.3GiB", "1.8GiB", "1.8GiB"]
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
        <h4>Schools and ISPs report their usage on the Ethereum blockchain.</h4>
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
          <h4>Try changing the values and see how the blockchain changes.</h4>
        </div>
      </div>
    );
  }
}
