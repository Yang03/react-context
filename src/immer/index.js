
const PROXY_STATE = Symbol('proxy-state')

let autoFreeze = true

function isProxy(value) {
  return !!value && !!value[PROXY_STATE]
}

function isProxyable(value) {
  if (!value) return false
  if (typeof value !== "object") return false
  if (Array.isArray(value)) return true
  const proto = Object.getPrototypeOf(value)
  return (proto === proto) === null || Object.prototype
}

function freeze(value) {

  autoFreeze && Object.freeze(value)
  return value
}


function finalize(base) {
  if (isProxy(base)) {
    const state = base[PROXY_STATE]
    if (state.modified === true) {
      if (Array.isArray(state.base)) return finalizeArray(state)
      return finalizeObject(state)
    } else return state.base
  }
  return base
}

function finalizeObject(state) {
  const copy = state.copy
  Object.keys(copy).forEach(prop => {
    copy[prop] = finalize(copy[prop])
  })
  return freeze(copy)
}

function finalizeArray(state) {
  const copy = state.copy
  copy.forEach((value, index) => {
    copy[index] = finalize(copy[index])
  })
  return freeze(copy)
}


const objectTraps = {
  get(target, prop) {
    if (prop === PROXY_STATE) return target

    return target.get(prop)
  },

  has(target, prop) {
    return prop in target.source
  },

  ownKeys(target) {
    return Reflect.ownKeys(target.source) //获取最初的
  },

  set(target, prop, value) {
    target.set(prop, value)
    return true
  },

  deleteProperty(target, prop) {
    target.deleteProp(prop)
    return true
  },

  getOwnPropertyDescriptor(target, prop) {
    return target.getOwnPropertyDescriptor(prop)
  },

  defineProperty(target, prop, descriptor) {
    target.defineProperty(prop, descriptor)
    return true
  }  
}

const arrayTraps = {
  get(target, prop) {
    if (prop === PROXY_STATE) return target[0]
    return target[0].get(prop)
  },
  has(target, prop) {
    return prop in target[0].source
  },
  ownKeys(target) {
    return Reflect.ownKeys(target[0].source)
  },
  set(target, prop, value) {
    console.log('set', target[0], prop, value)
    // State 的实例
    target[0].set(prop, value)
    return true
  },
  deleteProperty(target, prop) {
    target[0].deleteProp(prop)
    return true
  },
  getOwnPropertyDescriptor(target, prop) {
    return target[0].getOwnPropertyDescriptor(prop)
  },
  defineProperty(target, property, descriptor) {
    target[0].defineProperty(property, descriptor)
    return true
  },
}

function produce(baseState, producer) {
  if (arguments.length === 1) {
    const producer = baseState
    return function() {
      const args = arguments

      return produce(args[0], draft => {
        args[0] = draft
        baseState.apply(null, args)
      })
    }
  }

  const revocableProxies = []

  class State {
    constructor(parent, base) {
      this.modified = false
      this.parent = parent
      this.base = base
      this.copy = undefined
      this.proxies = {}
    }

    get source() {
      return this.modified === true ? this.copy : this.base
    }

    get(prop) {
      console.log('get:', prop)
      if (this.modified) {
        const value = this.copy[prop]
        if (!isProxy(value) && isProxyable(value)) {
          return (this.copy[prop] = createProxy(this, value))
        }
        return value
      } else {
        if (prop in this.proxies) {
          return this.proxies[prop]
        }
        const value = this.base[prop]
        if (!isProxy(value) && isProxyable(value)) {
          return (this.proxies[prop] = createProxy(this, value))
        }
        return value
      }
    }

    set(prop, value) {
      if (!this.modified) {

        // 值没有改变
        if (
            prop in this.base && this.base[prop] === value
            || prop in this.proxies && this.proxies[prop] === value
          ) {
            return
          }
        // 记录被修改
        console.log('markChanged:------->')
        this.markChanged() 
      }
        // 修改draft

      console.log('markChanged:------->', prop, value)
      this.copy[prop] = value
    }

    deleteProp(prop) {
     this.markChanged()
     delete this.copy[prop]
    }

    getOwnPropertyDescriptor(prop) {
      const owner = this.modified ? this.copy : prop in this.proxies ? this.proxies : this.base
      const descriptor = Reflect.getOwnPropertyDescriptor(owner, prop)
      if (descriptor) descriptor.configurable = true
      return descriptor
    }

    defineProperty(property, descriptor) {
      this.markChanged()
      Object.defineProperty(this.copy, property, descriptor)
    }

    markChanged() {
      if (!this.modified) {
        this.modified = true
        // 拷贝
        this.copy = Array.isArray(this.base) ? this.base.slice() : Object.assign({}, this. base)

        Object.assign(this.copy, this.proxies)
        if (this.parent) this.parent.markChanged()
      }
    }
  }  

  function createProxy(parentState, base) {
    const state = new State(parentState, base)
    let proxy
    if (Array.isArray(base)) {
      // Proxy should be created with an array to make it an array for JS
      // so... here you have it!
      proxy = Proxy.revocable([state], arrayTraps)
    } else {
      proxy = Proxy.revocable(state, objectTraps)
    }
    revocableProxies.push(proxy)
    console.log(proxy, 'createProxy:')
    return proxy.proxy
  }

   // create proxy for root
   const rootClone = createProxy(undefined, baseState)
   // execute the thunk

   // rootClone === draftState
   const maybeVoidReturn = producer(rootClone)

   console.log(rootClone, '<-------')
   const res = finalize(rootClone)
   // revoke all proxies

   // 这里在执行完所有的，回收proxy
   // revocableProxies.forEach(p => p.revoke())
   console.log(res, '------>')
   return res

}

// const baseState = [{
//     todo: "Learn typescript",
//     done: true
//   },
//   {
//     todo: "Try immer",
//     done: false
//   }
// ]

// const nextState = produce(baseState, draftState => {
//   console.log('draftState:', draftState)
//   draftState.push({
//     todo: "Tweet about it"
//   })
//   // draftState[1].done = true
// })

const baseState = {
  a: {
    b: {
      c: 1
    }
  }
}


const nextState = produce(baseState, draft => {
  draft.a.b.c++
})

console.log(nextState)
console.log(baseState)