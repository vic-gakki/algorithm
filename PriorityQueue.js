/**
 * 优先级队列（小根堆）
 * 
 * method：
 * poll 弹出堆顶元素
 * add 添加元素
 * isEmpty 是否还有元素
 */
class PriorityQueue {
  constructor(size, comparator) {
    this.heapSize = size
    this.queue = new Array(size)
    this.active = -1
    this.comparator = comparator || ((a, b) => a - b)
  }

  poll () {
    this.swap(0, this.active)
    const value = this.queue[this.active]
    this.active--
    this.heapify()
    return value
  }

  add (value) {
    return this.heapInsert(value)
  }

  isEmpty () {
    return this.active < 0
  }

  heapInsert (value) {
    if (this.active === this.heapSize - 1) {
      return false
    }
    this.queue[++this.active] = value
    let index = this.active
    let parentIndex = Math.trunc((index - 1) / 2)
    while (this.comparator(this.queue[index], this.queue[parentIndex]) > 0) {
      this.swap(index, parentIndex)
      index = parentIndex
      parentIndex = Math.trunc((index - 1) / 2)
    }
  }

  heapify () {
    let index = 0
    let leftChild = index * 2 + 1
    while (leftChild <= this.active) {
      let bigger = leftChild + 1 <= this.active && this.comparator(this.queue[leftChild + 1], this.queue[leftChild]) > 0 ? leftChild + 1 : leftChild
      bigger = this.comparator(this.queue[bigger], this.queue[index]) > 0 ? bigger : index
      if (bigger === index) {
        break;
      }
      this.swap(index, bigger)
      index = bigger
      leftChild = index * 2 + 1
    }
  }
  swap (l1, l2) {
    if (l1 === l2) return
    let temp = this.queue[l1]
    this.queue[l1] = this.queue[l2]
    this.queue[l2] = temp
  }

}


let pq = new PriorityQueue(6, (a, b) => a.age - b.age)
console.log(pq.isEmpty())
pq.add({ age: 3 })
pq.add({ age: 1 })
pq.add({ age: 5 })
pq.add({ age: 2 })
pq.add({ age: 10 })
while (!pq.isEmpty()) {
  console.log(pq.poll())
}