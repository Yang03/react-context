/**
 * reactive
 *
 * computed
 *
 * watchEffect
 *
 */

/**
 * 首先要判断对象是否是一个reactive对象
 *
 */

const wm1 = new WeakMap();
const wm2 = new WeakMap();

function reactive(target) {
  // 重复访问一个属性，只构建一次
  let observed = wm1.get(target);
  if (observed) {
    return observed;
  }

  //  如果对象本身已经是reactive对象
  if (wm2.has(target)) {
    return target;
  }

  observed = new Proxy(target, {
    set(target, key, value, receiver) {
      // const oldVal = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      // const extraInfo = { oldValue: target[key], newValue: value };
      // 触发effect
      // if (!Object.prototype.hasOwnProperty.call(target, key)) {
      //   trigger(target, key);
      // }
      // if (oldVal !== value) {
      //   trigger(target, key);
      // }
      trigger(target, key);
      return result;
    },
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      //  收集依赖
      track(target, key);
      return typeof result === "object" ? reactive(result) : result;
    }
  });
  wm1.set(target, observed);
  wm2.set(observed, target);

  return observed;
}

const effectStack = [];

const trackMap = new WeakMap();

/***
 * 首先创建一个trackMap
 * trackMap里面找当前对象是否存在依赖
 * 如果没有， 就创建一个空的依赖，放到
 * trackMap里面
 *
 * 然后根据key 找 当前对象下面的依赖
 * 如果没有，就创建一个空的依赖，添加到对象的
 * 依赖里面
 *
 * 然后依赖里面加入effect
 *
 * trackMap: {
 *  target: {
 *    key: effect
 * }
 * }
 *
 * trackMap = new WeakMap()
 * trackMapMap.get(target) ? doNoting : tarckMap.set(target, deps = new Map())
 *
 * deps.get(key) ? doNOting : deps.set(key, dep = new Set())
 *
 * dep.has(key) ? donoting ? dep.add(effect)
 *
 *
 */

function track(target, key) {
  const effect = effectStack[effectStack.length - 1];
  if (!effect) {
    return;
  }
  // console.log()
  //  先看当前对象的依赖
  let depsMap = trackMap.get(target);

  // 如果没有创建一个空的，放到trackMap里面
  if (!depsMap) {
    depsMap = new Map();
    trackMap.set(target, depsMap);
  }

  // 当前属性是否存在依赖
  let deps = depsMap.get(key);

  // 如果没有创建一个空的
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }

  // track的作用就是完成下面的数据结构
  // targetMap = {
  //   target: {
  //     name: [effect]，
  //     age: [effect]
  //   }
  // }
  // ps: targetMap 是WeakMap 数据结构，为了直观和理解就用对象表示
  //     [effect] 是 Set数据结构，为了直观和理解就用数组表示

  // 如果依赖里面没有effect 就加进去
  if (!deps.has(effect)) {
    deps.add(effect);

    // 如果effect 有依赖就在effect 的依赖添加effect
    if (effect.deps) {
      effect.deps.push(deps);
    }
  }
}

function trigger(target, key, extraInfo) {
  // console.log("trigger", effectStack);
  // // v1
  // effectStack.forEach(effect => {
  //   console.log("---->");
  //   effect();
  // });
  const depsMap = trackMap.get(target);
  if (!depsMap) return;
  // const map = depsMap.get(key);
  // if (!map) return

  let effects = new Set();
  let computedEffect = new Set();

  let deps = depsMap.get(key);
  deps.forEach(effect => {
    if (effect.computed) {
      computedEffect.add(effect);
    } else {
      effects.add(effect);
    }
  });

  computedEffect.forEach(effect => {
    // console.log(4, effect);
    effect();
  });

  effects.forEach(effect => {
    // console.log(5);
    effect();
  });
}

/***
 * 属性修改吗，执行的是一个回调
 *
 */

// 先创建一个effecctStack

function watchEffect(fn, options = {}) {
  const effect = createEffect(fn, options);
  return options.lazy ? effect : effect();
}

function createEffect(fn, options, args) {
  const currentEffect = (...args) => {
    try {
      if (effectStack.indexOf(currentEffect) === -1) {
        // console.log('fffffff')
        effectStack.push(currentEffect);
        return fn(...args);
      }
    } finally {
      effectStack.pop(currentEffect);
    }
  };
  currentEffect.lazy = options.lazy;
  currentEffect.computed = options.computed;
  currentEffect.deps = [];
  return currentEffect;
}

function computed(fn) {
  // v1
  const getter = fn;
  const fun = createEffect(getter, {
    lazy: true,
    computed: true
  });
  return {
    // effect: fun,
    get value() {
      return fun();
    }
  };
}

const state = reactive({
  count: 1
});

const double = computed(() => {
  return state.count * 2;
});

watchEffect(() => {
  console.log("watchEffect------>", state.count, double.value);
  // root.innerHTML = `<h1>${state.count}------${double.value}</h1>`;
});

state.count = 2;
