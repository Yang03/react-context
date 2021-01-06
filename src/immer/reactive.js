const rawToReactive = new WeakMap()
const reactiveToRaw = new WeakMap()


function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    return typeof res === 'object' ? reactive(res) : res
  }
}


function set(target, key, val, receiver) {
  const hadKey = Object.prototype.hasOwnProperty.call(target, key)

  const oldValue = target[key]

  val = reactiveToRaw.get(val) || val

  const result = Reflect.set(target, key, val, receiver)

  if (!hadKey) {
    console.log('1')
  } else if (val !== oldValue) {
    console.log(2)
  }
  return result
}

const mutableHandlers = {
  get: createGetter(),
  set: set,
}

// entry
function reactive(target) {
  return createReactiveObject(
    target,
    rawToReactive, // 原始对象映射响应式对象的WeakMap
    reactiveToRaw, // 响应式对象映射原始对象的WeakMap
    mutableHandlers,
  )
}

function createReactiveObject(target, toProxy, toRaw, baseHandlers) {
  let observed = toProxy.get(target)
  // 原数据已经有相应的可响应数据, 返回可响应数据
  // 目标对象已经是可观察的，直接返回已创建的响应式Proxy，toProxy就是rawToReactive这个WeakMap，用于映射响应式Proxy
  if (observed !== void 0) {
    console.log('0', observed)
    return observed
  }
  // 原数据已经是可响应数据
   console.log('-------------->', toRaw, target)
  // has 是判断 target 其实是 observed
  if (toRaw.has(target)) {
     console.log('2')
    return target
  }
 
  // 这里解决的是多层的proxy
  observed = new Proxy(target, baseHandlers)
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  return observed
}


const r = reactive({
  a: {
    b: 1
  }
})

//  r.a.c = 2
//  //  访问第二次的时候r.a 已经是observed
//  r.a.c = 3

// toRaw.set(observed, target)
// 这里的 r 就是observed 所有has判断 toRaw.has(target=== observed)
 const c = reactive(r)


// 重复访问的时候，let observed = toProxy.get(target) 可以直接返回
// console.log(r.a, r.a)