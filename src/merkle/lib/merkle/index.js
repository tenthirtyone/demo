const crypto = require('crypto');

export default class Merkle {
  constructor(config) {
    this.nodeId = config && config.nodeId || 'default';
    this.data = [];
  }
  add(data) {
    this.data.push(data);
    return this;
  }
  remove(index) {
    this.data.splice(index, 1);
    return this;
  }
  removeData(data) {
    this.remove(this.data.indexOf(data));
    return this;
  }
  size() {
    return this.data.length;
  }
  toJson() {
    let data = this.data.slice().reverse();

    const merkleRoot = data[0];
    data = data.map((word) => {
      return {
        name: word.length > 10 ? 
          `${word.slice(0,4)}...${word.slice(word.length-4)}` :
          word,
        children: []
      };
    });
    
    data[0].name = merkleRoot;

    for (let i=0; i<data.length; i++) {
      const currentIdx = i;
      const left = (2*i + 1);
      const right = (2*i + 2);
      const currentNode = data[currentIdx];
      const leftNode = data[left];
      const rightNode = data[right];

      

      if (right < data.length) {        
        currentNode.children.push(rightNode);
      }
      if (left < data.length) {        
        currentNode.children.push(leftNode);
      }



    }

    return data[0];
  }
  calculateRoot() {
    const data = this.data.slice();

    while (data.length > 1) {
      const sha2 = crypto.createHmac('sha256', '');
      const payload = `${data.shift()}${data.shift() || ''}`;
      sha2.update(payload);
      const hash = sha2.digest('hex');
      this.add(hash);
      data.push(hash);
    }
    return this.data;
  }
}