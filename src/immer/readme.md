* get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
* has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
* deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
* ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
* getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
* defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。


* Reflect.get方法允许你从一个对象中取属性值。就如同属性访问器 语法，但却是通过函数调用来实现。


