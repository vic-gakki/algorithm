// 逆序对  求小和   --- 归并思路[O(n * lgn) O(n) 稳定]
function reversePairs (arr) {
  return process(arr, 0, arr.length - 1)
}
function process (arr, left, right) {
  if (left === right) {
    return 0
  }
  const mid = left + ((right - left) >> 1)
  return process(arr, left, mid) + process(arr, mid + 1, right) + merge(arr, left, mid, right)
}
function merge (arr, left, mid, right) {
  let res = 0
  let p1 = left
  let p2 = mid + 1
  let help = []
  let i = 0
  while (p1 <= mid && p2 <= right) {
    // if (arr[p2] < arr[p1]) {
    //   res += mid - p1 + 1
    //   for (let i = p1; i <= mid; i++) {
    //     console.log(arr[i], arr[p2])
    //   }
    // }
    // help[i++] = arr[p2] < arr[p1] ? arr[p2++] : arr[p1++]
    if (arr[p1] > arr[p2]) {
      res += mid - p1 + 1
    }
    help[i++] = arr[p1] > arr[p2] ? arr[p2++] : arr[p1++]
  }
  while (p1 <= mid) {
    help[i++] = arr[p1++]
  }
  while (p2 <= right) {
    help[i++] = arr[p2++]
  }
  for (let i = 0; i < help.length; i++) {
    arr[left + i] = help[i]
  }
  return res
}



// 荷兰国旗   快排思想
function sort (arr, num) {
  let p = arr.length - 1
  let start = 0
  while (start < p) {
    if (arr[start] > num) {
      swap(arr, start, p)
      p--
    } else {
      start++
    }
  }
}
function sort2 (arr, num) {
  let smallerIndex = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= num) {
      swap(arr, smallerIndex + 1, i)
      smallerIndex++
    }
  }
}
function sort3 (arr, num) {
  let smallerIndex = -1
  let greaterIndex = arr.length
  let cur = 0
  while (cur < greaterIndex) {
    if (arr[cur] < num) {
      swap(arr, smallerIndex + 1, cur)
      smallerIndex++
      cur++
    } else if (arr[cur] === num) {
      cur++
    } else {
      swap(arr, cur, greaterIndex - 1)
      greaterIndex--

    }
  }
}



// 快排3.0 随机pivot + 三指针    O(n * lgn)  O(lgn)  不稳定
function quickSort (arr) {
  if (!arr || arr.length < 2) {
    return
  }
  process(arr, 0, arr.length - 1)
}


function process (arr, left, right) {
  if (left >= right) {
    return
  }
  let [l, r] = partition(arr, left, right)
  process(arr, left, l - 1)
  process(arr, r + 1, right)
}

function partition (arr, left, right) {
  let randomPivot = Math.floor(Math.random() * (right - left + 1)) + left
  swap(arr, randomPivot, right)
  let smallerBound = left - 1
  let greaterBound = right
  let cur = left
  let pivot = arr[right]
  while (cur < greaterBound) {
    if (arr[cur] < pivot) {
      swap(arr, ++smallerBound, cur++)
    } else if (arr[cur] > pivot) {
      swap(arr, --greaterBound, cur)
    } else {
      cur++
    }
  }
  swap(arr, greaterBound, right)
  return [smallerBound + 1, greaterBound]
}



// 堆排序   O(n * lgn)  O(1)  不稳定
function heapSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    heapInsert(arr, i)
  }
  let heapSize = arr.length
  // swap(arr, 0, --heapSize)
  while (heapSize > 0) {
    swap(arr, 0, --heapSize)
    heapify(arr, 0, heapSize)
  }
}
function heapInsert (arr, index) {
  let parentIndex = Math.trunc((index - 1) / 2)
  while (arr[index] > arr[parentIndex]) {
    swap(arr, index, parentIndex)
    index = parentIndex
    parentIndex = Math.trunc((index - 1) / 2)
  }
}
function heapify (arr, index, heapSize) {
  let leftChildIndex = index * 2 + 1
  while (leftChildIndex < heapSize) {
    let largest = leftChildIndex + 1 < heapSize && arr[leftChildIndex] < arr[leftChildIndex + 1] ? leftChildIndex + 1 : leftChildIndex
    largest = arr[largest] < arr[index] ? index : largest
    if (largest === index) {
      break;
    }
    swap(arr, index, largest)
    index = largest
    leftChildIndex = index * 2 + 1
  }
}



// 桶排序  基数排序
function bucketSort (arr) {
  bucketSortWithRange(arr, 0, arr.length - 1)
}

function bucketSortWithRange (arr, left, right) {
  // 取数组最大值计算位数 -> 遍历次数
  let max = Number.MIN_VALUE
  for (let i = left; i <= right; i++) {
    max = Math.max(arr[i], max)
  }
  let digits = getDigits(max)


  for (let i = 1; i <= digits; i++) {
    // count词频数组
    let count = new Array(10).fill(0)
    let helper = new Array(right - left + 1)
    for (let j = left; j <= right; j++) {
      count[getNum(arr[j], i)]++
    }

    // 构建前缀和
    for (let x = 1; x < 10; x++) {
      count[x] = count[x] + count[x - 1]
    }

    // 数组从右至左遍历 取出元素与前缀和对应数字的的值位置对应
    for (let k = right; k >= left; k--) {
      const radix = getNum(arr[k], i)
      helper[--count[radix]] = arr[k]
    }

    for (let j = left; j <= right; j++) {
      arr[j] = helper[j - left]
    }
  }
}


function getNum (num, digit) {
  digit--
  while (digit !== 0) {
    num = Math.floor(num / 10)

    digit--
  }
  return num % 10
}


function getDigits (n) {
  let res = 0
  while (n !== 0) {
    n /= 10
    res++
  }
  return res
}


function swap (arr, l, r) {
  if (l === r) return
  arr[l] = arr[l] ^ arr[r]
  arr[r] = arr[l] ^ arr[r]
  arr[l] = arr[l] ^ arr[r]
}



// 选择 O(n²) O(1) 不稳定
// 冒泡 O(n²) O(1) 稳定
// 插入排序 O(n²) O(1) 稳定
function insertSort (arr) {
  for (let i = 1; i < arr.length; i++) {
    const value = arr[i]
    let index = i - 1
    while (index >= 0 && arr[index] > value) {
      arr[index + 1] = arr[index]
      index--
    }
    arr[index + 1] = value
  }
}

// for test
let arr = [2, 4, 3, 6, 4, 7, 5, 4]
// sort2(arr, 4)
// heapSort(arr)
// quickSort(arr)
// bucketSort(arr)
insertSort(arr)
console.log(arr)