/**
 * 从大数组获取前 n 个最值记录
 * @author lxfriday
 */
function swap(arr, a, b) {
  const t = arr[a]
  arr[a] = arr[b]
  arr[b] = t
}

// 大值下沉
function heapify(arr, len, i, compareVal) {
  let min = i
  const l = 2 * i + 1
  const r = 2 * i + 2

  if (l < len && compareVal(arr[l]) < compareVal(arr[min])) min = l
  if (r < len && compareVal(arr[r]) < compareVal(arr[min])) min = r

  if (min !== i) {
    swap(arr, i, min)

    heapify(arr, len, min, compareVal)
  }
}

/**
 * 对 target 建堆
 * @param {array} target 堆数组
 * @param {*} compareVal 从 dataUnit 对象获取比对值
 */
function createHeap(target, compareVal = v => v) {
  for (let i = Math.floor((target.length - 1) / 2); i >= 0; i--) {
    heapify(target, target.length, i, compareVal)
  }
}

function findMaxPrev(dataUnit, target, compareVal = v => v) {
  if (compareVal(dataUnit) > compareVal(target[0])) {
    target[0] = dataUnit
    heapify(target, target.length, 0, compareVal)
  }
}

module.exports = {
  createHeap,
  findMaxPrev,
}
