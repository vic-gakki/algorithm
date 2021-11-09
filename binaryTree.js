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
    this.value = val
    this.left = null
    this.right = null
  }
  static genTree (arr) {
    const nodes = arr.map(item => new TreeNode(item))

  }
}



/**
 * 二叉树 迭代遍历
 * 
 * 手动构造栈
 * 
 */
function preOrderUnrecur (root) {
  let stack = []
  stack.push(root)
  while (stack.length) {
    let cur = stack.pop()
    console.log(cur.value);
    if (cur.right !== null) {
      stack.push(cur.right)
    }
    if (cur.left !== null) {
      stack.push(cur.left)
    }
  }
}


// 准备两个栈，一个用于遍历入栈，一个用于维护出栈顺序
function postOrderUnrecur (root) {
  let stack = []
  let helper = []
  stack.push(root)
  while (stack.length) {
    let cur = stack.pop()
    cur.left && (stack.push(cur.left))
    cur.right && (stack.push(cur.right))
    helper.push(cur)
  }
  while (helper.length) {
    console.log(helper.pop());
  }
}



// version 1
function inOrderUnrecur (root) {
  let stack
  let cur = root
  while (!stack || stack.length) {
    if (!stack) {
      stack = []
    }
    while (cur !== null) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()
    cur = cur.right
  }
}

// version 2 
function inOrderUnrecur1 (head) {
  let stack = []
  while (stack.length || head !== null) {
    if (head !== null) {
      stack.push(head)
      head = head.left
    } else {
      head = stack.pop()
      head = head.right
    }
  }
}