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

    find(value, node = this.root) {
        if (node === null) {
            return null;
        }

        if (node.data === value) {
            return node;
        } else if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }

    levelOrder(fn = node => node.data) {
        if (this.root === null) {
            return [];
        }

        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(fn(node));

            if (node.left !== null) {
                queue.push(node.left);
            }

            if (node.right !== null) {
                queue.push(node.right);
            }
        }

        return result;
    }

    inOrder(fn = node => node.data) {
        const result = [];

        function traverse(node) {
            if (node === null) {
                return;
            }

            traverse(node.left);
            result.push(fn(node));
            traverse(node.right);
        }

        traverse(this.root);

        return result;
    }

    preOrder(fn = node => node.data) {
        const result = [];

        function traverse(node) {
            if (node === null) {
                return;
            }

            result.push(fn(node));
            traverse(node.left);
            traverse(node.right);
        }

        traverse(this.root);

        return result;
    }

    postOrder(fn = node => node.data) {
        const result = [];

        function traverse(node) {
            if (node === null) {
                return;
            }

            traverse(node.left);
            traverse(node.right);
            result.push(fn(node));
        }

        traverse(this.root);

        return result;
    }

    height(node) {
        if (!node) {
            return 0;
        }
    
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
    
        return 1 + Math.max(leftHeight, rightHeight);
    }
    

    depth(node) {
        if (!node) {
            return -1;
        }

        const parentDepth = this.depth(node.parent);

        return 1 + parentDepth;
    }
    
    isBalanced(node = this.root) {
        if (!node) {
          return true;
        }
      
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
      
        if (Math.abs(leftHeight - rightHeight) > 1) {
          return false;
        }
      
        return this.isBalanced(node.left) && this.isBalanced(node.right);
      }
      
    rebalance() {
        const arr = this.traverse();
        this.root = this.buildTree(arr);
    }

    traverse(node = this.root, arr = []) {
        if (node) {
            this.traverse(node.left, arr);
            arr.push(node.data);
            this.traverse(node.right, arr);
        }

        return arr;
    }

    
}

// const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
// tree.prettyPrint(); // Should print the same tree as before

// tree.insert(0);
// tree.prettyPrint(); // Should print the tree with 0 added to the left of 1

// tree.insert(9);
// tree.prettyPrint(); // Should print the tree with 9 added to the right of 8

// tree.delete(5);
// tree.prettyPrint(); // Should print the tree with 5 removed and replaced by its successor (6)



// const node = tree.find(5);
// console.log(node); 



// const levelOrderArr = tree.levelOrder();
// console.log(levelOrderArr); 



// const inOrderArr = tree.inorder();
// console.log(inOrderArr); 



// const preOrderArr = tree.preorder();
// console.log(preOrderArr); 



// const postOrderArr = tree.postorder();
// console.log(postOrderArr); 




// const arr2 = [4, 2, 6, 1, 3, 5, 7, 1600, 8, 1200, 12, 1700, 150000,];
// const tree = new Tree(arr2);

// console.log(tree.height(tree.root)); // Output: 4

// console.log(tree.depth(tree.root)); // Output: 0

// tree.insert(20)
// tree.insert(19)


// console.log(tree.height(tree.root)); // Output: 6


// console.log(tree.depth(tree.root)); // Output: 0

// tree.prettyPrint()
// console.log(tree.isBalanced()) // output: false

// tree.rebalance()
// tree.prettyPrint()
// console.log(tree.isBalanced()) // output: false

function generateRandomArray(size, max) {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * max) + 1);
    }
    return arr;
  }
  
  
  // Creating a binary search tree from an array of random numbers
  const randomArr = generateRandomArray(10, 100);
  const bst = new Tree



  randomArr.forEach(num => bst.insert(num));

  console.log(randomArr)

  bst.prettyPrint()
  // Confirming that the tree is balanced
  console.log(`Is the tree balanced? ${bst.isBalanced()}`);
  
  // Print elements in level, pre, post, and in order
  console.log('Level order:');
  bst.levelOrder().forEach(num => console.log(num));
  console.log('Pre order:');
  bst.preOrder().forEach(num => console.log(num));
  console.log('Post order:');
  bst.postOrder().forEach(num => console.log(num));
  console.log('In order:');
  bst.inOrder().forEach(num => console.log(num));
  

  
  bst.insert(120);
  bst.insert(130);
  bst.insert(140);
  console.log("Added 3 numbers > 100")


  console.log(`Is the tree balanced? ${bst.isBalanced()}`);
  

  bst.rebalance();

  console.log("Balancing the tree back")


  console.log(`Is the tree balanced? ${bst.isBalanced()}`);
  
  // Print elements in level, pre, post, and in order
  console.log('Level order:');
  bst.levelOrder().forEach(num => console.log(num));
  console.log('Pre order:');
  bst.preOrder().forEach(num => console.log(num));
  console.log('Post order:');
  bst.postOrder().forEach(num => console.log(num));
  console.log('In order:');
  bst.inOrder().forEach(num => console.log(num));