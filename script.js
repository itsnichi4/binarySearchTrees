class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        // Remove duplicates and sort array
        arr = Array.from(new Set(arr)).sort((a, b) => a - b);

        if (arr.length === 0) {
            return null;
        }

        const midIndex = Math.floor(arr.length / 2);
        const root = new Node(arr[midIndex]);

        root.left = this.buildTree(arr.slice(0, midIndex));
        root.right = this.buildTree(arr.slice(midIndex + 1));

        return root;
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(data) {
        const newNode = new Node(data);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (data < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else if (data > current.data) {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            } else {
                // if data is already in the tree, do nothing
                return;
            }
        }
    }

    delete(data) {
        let current = this.root;
        let parent = null;
        let found = false;

        while (current !== null && !found) {
            if (data < current.data) {
                parent = current;
                current = current.left;
            } else if (data > current.data) {
                parent = current;
                current = current.right;
            } else {
                found = true;
            }
        }

        if (!found) {
            return;
        }

        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null;
            } else if (current === parent.left) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        } else if (current.left === null) {
            if (current === this.root) {
                this.root = current.right;
            } else if (current === parent.left) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        } else if (current.right === null) {
            if (current === this.root) {
                this.root = current.left;
            } else if (current === parent.left) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        } else {
            let successorParent = current.right;
            let successor = current.right;
            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }

        }
    }
}

const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
tree.prettyPrint(); // Should print the same tree as before

tree.insert(0);
tree.prettyPrint(); // Should print the tree with 0 added to the left of 1

tree.insert(9);
tree.prettyPrint(); // Should print the tree with 9 added to the right of 8

tree.delete(5);
tree.prettyPrint(); // Should print the tree with 5 removed and replaced by its successor (6)

// height function
function height(node) {
    if (!node) {
        return -1;
    }
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
}

// depth function
function depth(node) {
    if (!node) {
        return 0;
    }
    return depth(node.parent) + 1;
}

// isBalanced function
function isBalanced(node) {
    if (!node) {
        return true;
    }
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    const heightDiff = Math.abs(leftHeight - rightHeight);
    if (heightDiff > 1) {
        return false;
    }
    return isBalanced(node.left) && isBalanced(node.right);
}

function rebalance(tree) {
    const arr = [];
    inOrderTraversal(tree.root, arr);
    return new Tree(arr);
  }
  
  function inOrderTraversal(node, arr) {
    if (node === null) {
      return;
    }
    inOrderTraversal(node.left, arr);
    arr.push(node.data);
    inOrderTraversal(node.right, arr);
  }
  


// Create a tree with unbalanced heights
const tree1 = new Tree([1, 2, 3, 4, 5, 6]);
console.log('Height:', height(tree1.root)); // Should print 3
console.log('Depth of node 6:', depth(tree1.root.right.right)); // Should print 2
console.log('Is balanced:', isBalanced(tree1.root)); // Should print false

// Create a tree with balanced heights
const tree2 = new Tree([1, 2, 3, 4, 5, 6, 7]);
console.log('Height:', height(tree2.root)); // Should print 3
console.log('Depth of node 7:', depth(tree2.root.right.right)); // Should print 2
console.log('Is balanced:', isBalanced(tree2.root)); // Should print true

// Create a tree with a height difference of 2 between left and right subtrees
const tree3 = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log('Height:', height(tree3.root)); // Should print 4
console.log('Depth of node 10:', depth(tree3.root.right.right.right)); // Should print 3
console.log('Is balanced:', isBalanced(tree3.root)); // Should print false

const unbalancedTree = new Tree([1, 2, 3, 4, 5, 6 ]);
console.log('Before rebalance:');
unbalancedTree.prettyPrint();
console.log('Is balanced:', isBalanced(unbalancedTree.root)); // Should print false

const balancedTree = rebalance(unbalancedTree);
console.log('After rebalance:');
balancedTree.prettyPrint();
console.log('Is balanced:', isBalanced(balancedTree.root)); // Should print true
