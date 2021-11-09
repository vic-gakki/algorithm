/**
 * 判断是否是回文链表
 *  技巧： 快慢指针
 */

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class RandomNode {
  constructor(value) {
    this.value = value
    this.next = null
    this.rand = null
  }
}

// version 1 need n extra space
function isPalindrome (head) {
  let stack = []
  let p = head
  while (p !== null) {
    stack.push(p.value)
    p = p.next
  }
  p = head
  while (p !== null) {
    if (p.value !== stack.pop()) {
      return false
    }
    p = p.next
  }
  return true
}


// version 2 need n / 2 extra space
function isPalindrome2 (head) {
  let slow = head
  let fast = head
  let stack = []
  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
  }
  while (slow !== null) {
    stack.push(slow)
    slow = slow.next
  }
  while (stack.length) {
    if (head.value !== stack.pop().value) {
      return false
    }
    head = head.next
  }
  return true
}

// version 3
function isPalindrome3 (head) {
  let fast = head
  let slow = head

  // find mid (if even, slow will be the right-most one)
  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
  }


  // reverse list from mid to right
  let prev = null
  let cur = slow
  let next
  while (cur !== null) {
    next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }

  // compare
  let res = true
  let left = head
  let right = prev
  while (left !== null && right !== null) {
    if (left.value !== right.value) {
      res = false
      break;
    }
    left = left.next
    right = right.next
  }
  cur = prev
  prev = null
  next = null
  while (cur !== null) {
    next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }

  return res
}





// 将单向链表按某值划分成左边小，中间相等，右边大的形式
function partitionList (head, pivot) {
  let sH = null
  let sT = null
  let eH = null
  let eT = null
  let bH = null
  let bT = null
  let cur = head
  while (cur !== null) {
    let next = cur.next
    cur.next = null
    if (cur.value < pivot) {
      if (sH === null) {
        sH = cur
      } else {
        sT.next = cur
      }
      sT = cur
    } else if (cur.value === pivot) {
      if (eH === null) {
        eH = cur
      } else {
        eT.next = cur
      }
      eT = cur
    } else {
      if (bH === null) {
        bH = cur
      } else {
        bT.next = cur
      }
      bT = cur
    }
    cur = next
  }

  if (sT !== null) {
    sT.next = eH
    eT = eT === null ? sT : eT
  }
  if (eT !== null) {
    eT.next = bH
  }
  return sH !== null ? sH : eH !== null ? eH : bH
}



// 复制含有随机指针节点的链表
function copyList (head) {
  let cur = head
  while (cur !== null) {
    let next = cur.next
    cur.next = new RandomNode(cur.value)
    cur.next.next = next
    cur = next
  }

  cur = head
  while (cur !== null) {
    let copy = cur.next
    let next = copy.next
    copy.rand = cur.rand.next
    cur = next
  }

  let copyHead = head.next
  cur = head
  while (cur !== null) {
    let copy = cur.next
    let next = copy.next
    copy.next = next.next
    cur.next = next
    cur = next
  }
  return copyHead
}



// 判断两个链表是否相交
function intersection (head1, head2) {
  const loopNode1 = getLoopNode(head1)
  const loopNode2 = getLoopNode(head2)
  if (loopNode1 === null && loopNode2 === null) {
    // 两个无环链表
    return noLoopIntersection(head1, head2)
  }
  if (loopNode1 !== null && loopNode2 !== null) {
    // 两个有环链表
    return loopIntersection(head1, loopNode1, head2, loopNode2)
  }
  // 一个链表无环 一个链表有环 --->  不可能相交
  return null

}

// 获取链表入环节点
function getLoopNode (head) {
  let slow = head
  let fast = head

  // 快慢指针 
  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) break;
  }

  if (slow !== fast) {
    return null
  }

  // 快慢指针相等 --->  慢指针走k步，快指针2k步，假设相遇点到入环点距离m步   --->  起点到入环口k-m步，相遇点向前走k-m步也到入环口
  slow = head
  while (head !== fast) {
    slow = slow.next
    fast = fast.next
  }
  return slow
}


// 通过尾节点判断是否有相交
function noLoopIntersection (head1, head2) {
  let n = 0
  let end1 = head1
  let end2 = head2
  while (end1.next !== null) {
    n++
    end1 = end1.next
  }

  while (end2.next !== null) {
    n--
    end2 = end2.next
  }

  if (end1 !== end2) {
    return null
  }

  // 重新赋值为较长链表
  end1 = n > 0 ? head1 : head2
  end2 = end1 === head2 ? head1 : head2
  n = Math.abs(n)
  while (n !== 0) {
    n--
    end1 = end1.next
  }

  if (end1 !== end2) {
    end1 = end1.next
    end2 = end2.next
  }

  return end1
}



function loopIntersection (head1, loopNode1, head2, loopNode2) {
  // 如果入环点相同 --->  存在相交点，可以把入环点看作尾节点类比无环比较
  if (loopNode1 === loopNode2) {
    let n = 0
    let cur1 = head1
    let cur2 = head2
    while (cur1 !== loopNode1) {
      n++
      cur1 = cur1.next
    }
    while (cur2 !== loopNode2) {
      n--
      cur2 = cur2.next
    }
    cur1 = n > 0 ? head1 : head2
    cur2 = cur1 === head1 ? head2 : head1
    n = Math.abs(n)

    while (n !== 0) {
      cur1 = cur1.next
      n--
    }
    while (cur1 !== cur2) {
      cur1 = cur1.next
      cur2 = cur2.next
    }
    return cur1
  }

  let cur = loopNode1.next
  while (cur !== loopNode1) {
    if (cur === loopNode2) {
      // 从一个入环点开始遍历环，如果环中某个节点和另一个入环点相等 ---> 两个链表在环中相交，两个入环点都是第一个入环点
      return loopNode1
    }
    cur = cur.next
  }
  return null

}







// for test
function genList (arr) {
  let dummy = new Node(-1)
  let current = dummy
  arr.forEach(item => {
    const n = new Node(item)
    current.next = n
    current = n
  })
  return dummy.next
}
function logList (head) {
  while (head !== null) {
    console.log(head.value);
    head = head.next
  }
}


// const test = [genList([1, 2, 3, 2, 1])
//   , genList([1])
//   , genList([1, 1])
//   , genList([1, 2])
//   , genList([1, 1, 2])
//   , genList([1, 1, 1])
//   , genList([1, 2, 1])]
// test.forEach(item => {
//   console.log('start test------------');
//   console.log(isPalindrome(item));
//   console.log(isPalindrome2(item));
//   console.log(isPalindrome3(item));
//   console.log('end test------------');
// })


const partitionTest = genList([1, 3, 5, 7, 8, 9, 6])
logList(partitionList(partitionTest, 6));