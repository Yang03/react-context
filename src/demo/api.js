import {Toast} from 'zarm'

export const fetchTest = () => {
  return  fetch('http://www.reddit.com/r/react.json')
  .then(
          response =>  {
            Toast.show('成功')
            return response.json()
          }
  ).then((json) => json)
}