### let, var, const
var 变量提升
```
console.log(a) //undefined
var a =3;

console.log(b) //b 未被定义
let b;
```

let（const）同样会被提升变量到代码块的顶部但是不会被赋予初始值。在变量声明之前引用这个变量，将抛出引用错误（ReferenceError）
var 提升并被初始值 undefined
### null 
```
 (n * 32) //n =0
```
null 在number类型环境中当0 处理，boolean类型环境中为false

### 变量作用域
在函数之外声明的变量，叫做全局变量，因为它可被当前文档中的任何其他代码所访问。在函数内部声明的变量，叫做局部变量，因为它只能在当前函数的内部访问。

ECMAScript 6 之前的 JavaScript 没有 语句块 作用域；相反，语句块中声明的变量将成为语句块所在函数（或全局作用域）的局部变量。例如，如下的代码将在控制台输出 5，因为 x 的作用域是声明了 x 的那个函数（或全局范围），而不是 if 语句块。
```
if (true) {
  var x = 5;
}
console.log(x); // 5
```
如果使用 ECMAScript 6 中的 let 声明，上述行为将发生变化。
```
if (true) {
  let y = 5;
}
console.log(y); // ReferenceError: y 没有被声明
```



### 七种基本数据类型:
布尔值（Boolean），有2个值分别是：true 和 false.
null ， 一个表明 null 值的特殊关键字。 JavaScript 是大小写敏感的，因此 null 与 Null、NULL或变体完全不同。
undefined ，和 null 一样是一个特殊的关键字，undefined 表示变量未赋值时的属性。
数字（Number），整数或浮点数，例如： 42 或者 3.14159。
任意精度的整数 (BigInt) ，可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。
字符串（String），字符串是一串表示文本值的字符序列，例如："Howdy" 。
代表（Symbol） ( 在 ECMAScript 6 中新添加的类型).。一种实例是唯一且不可改变的数据类型。
以及对象（Object）