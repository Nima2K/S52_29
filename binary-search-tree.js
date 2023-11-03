class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  insertRecursively(val, node = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val === node.val) return undefined;
    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.left);
    } else {
      if (!node.right) {
        node.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, node.right);
    }
  }

  find(val) {
    if (!this.root) return undefined;

    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return undefined;
  }

  findRecursively(val, node = this.root) {
    if (!node) return undefined;

    if (val === node.val) return node;
    if (val < node.val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  dfsPreOrder(node = this.root, visited = []) {
    if (node) {
      visited.push(node.val);
      visited = this.dfsPreOrder(node.left, visited);
      visited = this.dfsPreOrder(node.right, visited);
    }
    return visited;
  }

  dfsInOrder(node = this.root, visited = []) {
    if (node) {
      visited = this.dfsInOrder(node.left, visited);
      visited.push(node.val);
      visited = this.dfsInOrder(node.right, visited);
    }
    return visited;
  }

  dfsPostOrder(node = this.root, visited = []) {
    if (node) {
      visited = this.dfsPostOrder(node.left, visited);
      visited = this.dfsPostOrder(node.right, visited);
      visited.push(node.val);
    }
    return visited;
  }

  bfs() {
    let node = this.root;
    const queue = [];
    const visited = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      visited.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return visited;
  }

  remove(val) {
    this.root = this.removeNode(this.root, val);
    return this;
  }

  removeNode(node, key) {
    if (node === null) return null;

    if (key < node.val) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.val) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      const aux = this.findMinNode(node.right);
      node.val = aux.val;
      node.right = this.removeNode(node.right, aux.val);
      return node;
    }
  }

  findMinNode(node) {
    while (node.left !== null) node = node.left;
    return node;
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  getHeight(node) {
    if (!node) return 0;

    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let parent = null;
    let current = this.root;

    while (current.right !== null) {
      parent = current;
      current = current.right;
    }

    if (current.left !== null) {
      current = current.left;
      while (current.right !== null) {
        current = current.right;
      }
      return current.val;
    } else {
      return parent.val;
    }
  }
}

module.exports = BinarySearchTree;
