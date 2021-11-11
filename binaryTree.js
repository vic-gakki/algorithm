/**
 *
 * 递归序：每个节点有三次访问机会
 *
 * function f(){
 *  // 1、进入方法
 *    TODO
 *  // 1
 *
 *  f(node.left)
 *  // 2、左子树遍历完成
 *    TODO
 *  // 2
 *
 * f(node.right)
 *  // 3、右子树遍历完成
 *    TODO
 *  // 3
 * }
 *
 *
 *
 */

class TreeNode {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
  static genTree(arr) {
    const nodes = arr.map((item) => new TreeNode(item));
  }
}

/**
 * 二叉树 迭代遍历
 *
 * 手动构造栈
 *
 */
function preOrderUnrecur(root) {
  let stack = [];
  stack.push(root);
  while (stack.length) {
    let cur = stack.pop();
    console.log(cur.value);
    if (cur.right !== null) {
      stack.push(cur.right);
    }
    if (cur.left !== null) {
      stack.push(cur.left);
    }
  }
}

// 准备两个栈，一个用于遍历入栈，一个用于维护出栈顺序
function postOrderUnrecur(root) {
  let stack = [];
  let helper = [];
  stack.push(root);
  while (stack.length) {
    let cur = stack.pop();
    cur.left && stack.push(cur.left);
    cur.right && stack.push(cur.right);
    helper.push(cur);
  }
  while (helper.length) {
    console.log(helper.pop());
  }
}

// version 1
function inOrderUnrecur(root) {
  let stack;
  let cur = root;
  while (!stack || stack.length) {
    if (!stack) {
      stack = [];
    }
    while (cur !== null) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    cur = cur.right;
  }
}

// version 2
function inOrderUnrecur1(head) {
  let stack = [];
  while (stack.length || head !== null) {
    if (head !== null) {
      stack.push(head);
      head = head.left;
    } else {
      head = stack.pop();
      head = head.right;
    }
  }
}

/**
 * 获取二叉树的最大宽度
 *
 * version 1：Queue + Map
 *    节点进队列的时候保存 层级信息
 *    节点出队列的时候，获取层级信息，和当前遍历层级对比
 *      如果层级相同 ---> 当前层级的节点 + 1
 *      如果层级不同 ---> 到下一层级了，结算当前层级节点的个数，当前层级移动，层级节点数重置
 */
function maxWidth(head) {
  if (!head) {
    return 0;
  }

  const queue = new Array();
  queue.push(head);

  const levelMap = new WeakMap();
  levelMap.set(head, 1);

  let currentLevel = 1;
  let currentLevelNodees = 0;
  let maxWidth = Number.MIN_VALUE;

  while (!queue.length) {
    const node = queue.unshift();
    const currentNodeLevel = levelMap.get(node);
    if (currentLevel === currentNodeLevel) {
      currentLevelNodees++;
    } else {
      maxWidth = Math.max(maxWidth, currentLevelNodees);
      currentLevel++;
      currentLevelNodees = 1;
    }
    if (node.left) {
      levelMap.set(node.left, currentNodeLevel + 1);
      queue.push(node.left);
    }
    if (node.right) {
      levelMap.set(node.right, currentNodeLevel + 1);
      queue.push(node.right);
    }
  }

  maxWidth = Math.max(maxWidth, currentLevelNodees);
  return maxWidth;
}

/**
 *
 * 获取二叉树的最大宽度：version 2  Queue
 *
 *
 */
function maxWidth2(head) {
  if (!head) {
    return 0;
  }

  let nodeQueue = new Array();
  nodeQueue.push(head);

  let maxWidth = Number.MIN_VALUE;
  let currentEndNode = head;
  let nextEndNode = null;
  let currentLevelNodes = 0;

  while (!nodeQueue.length) {
    currentLevelNodes++;
    const node = nodeQueue.unshift();

    if (node.left) {
      nodeQueue.push(node.left);
      nextEndNode = node.left;
    }
    if (node.right) {
      nodeQueue.push(node.right);
      nextEndNode = node.right;
    }

    if (node === currentEndNode) {
      currentEndNode = nextEndNode;
      nextEndNode = null;
      maxWidth = Math.max(maxWidth, currentLevelNodes);
      currentLevelNodes = 0;
    }
  }
  return maxWidth;
}
