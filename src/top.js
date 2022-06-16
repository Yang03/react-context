function quickSort(arr, start, end) {
  if (start < end) {
    var mid = getMiddle(arr, start, end)
    quickSort(arr, start, mid)
    quickSort(arr, mid + 1, end)
  }
} 

function getMiddle(arr, start, end) {
  var mid = arr[start]

  var left = start
  var right = end 

  while(left < right) {
    while(left < right && mid <= arr[right]) {
      right--
    }
    arr[left] = arr[right]
    // right 8  12 > 7
    while(left < right && mid >= arr[left]) {
      left++
    }

    arr[right] = arr[left]

  }
  arr[left] = mid
  return left
}

var a = [12, 44, 55, 83, 87, 90, 32, 51, 7, 99]
quickSort(a, 0,  a.length -1)
console.log(a)