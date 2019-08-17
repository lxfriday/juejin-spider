const { createHeap, findMaxPrev } = require('../utils/sortPrev')

describe('堆排序 + array.sort 获取前 n 个最大', () => {
  test('[8, 10, 666, 77, 2, 1000, 10, 0, 8, 66, 1, 8889, 667] max 4 to be [8889, 1000, 667, 666]', () => {
    const arr = [8, 10, 666, 77, 2, 1000, 10, 0, 8, 66, 1, 8889, 667]
    const target = arr.slice(0, 4)
    createHeap(target)

    for (let i = 4; i < arr.length; i++) {
      findMaxPrev(arr[i], target)
    }

    expect(target.sort((a, b) => b - a).toString(',')).toBe('8889,1000,667,666')
  })
})
