/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main2.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main2.js":
/*!**********************!*\
  !*** ./src/main2.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/yangpan/react-context/src/main2.js: Identifier 'PinchZoomPan' has already been declared (49:6)\n\n\u001b[0m \u001b[90m 47 | \u001b[39m\u001b[36mconst\u001b[39m between \u001b[33m=\u001b[39m (min\u001b[33m,\u001b[39m max\u001b[33m,\u001b[39m value) \u001b[33m=>\u001b[39m \u001b[33mMath\u001b[39m\u001b[33m.\u001b[39mmin(max\u001b[33m,\u001b[39m \u001b[33mMath\u001b[39m\u001b[33m.\u001b[39mmax(min\u001b[33m,\u001b[39m value))\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 48 | \u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 49 | \u001b[39m\u001b[36mclass\u001b[39m \u001b[33mPinchZoomPan\u001b[39m \u001b[36mextends\u001b[39m \u001b[33mReact\u001b[39m\u001b[33m.\u001b[39m\u001b[33mComponent\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m      \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 50 | \u001b[39m  constructor() {\u001b[0m\n\u001b[0m \u001b[90m 51 | \u001b[39m    \u001b[36msuper\u001b[39m(\u001b[33m...\u001b[39marguments)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 52 | \u001b[39m    \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mstate \u001b[33m=\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mgetInititalState()\u001b[33m;\u001b[39m\u001b[0m\n    at Object.raise (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:6325:17)\n    at ScopeHandler.checkRedeclarationInScope (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:3759:12)\n    at ScopeHandler.declareName (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:3725:12)\n    at Object.checkLVal (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:8021:22)\n    at Object.parseClassId (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:10855:14)\n    at Object.parseClass (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:10572:10)\n    at Object.parseStatementContent (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:9871:21)\n    at Object.parseStatement (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:9829:17)\n    at Object.parseBlockOrModuleBlockBody (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:10405:25)\n    at Object.parseBlockBody (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:10392:10)\n    at Object.parseTopLevel (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:9758:10)\n    at Object.parse (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:11270:17)\n    at parse (/Users/yangpan/react-context/node_modules/@babel/parser/lib/index.js:11306:38)\n    at parser (/Users/yangpan/react-context/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\n    at normalizeFile (/Users/yangpan/react-context/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\n    at runSync (/Users/yangpan/react-context/node_modules/@babel/core/lib/transformation/index.js:44:43)\n    at runAsync (/Users/yangpan/react-context/node_modules/@babel/core/lib/transformation/index.js:35:14)\n    at process.nextTick (/Users/yangpan/react-context/node_modules/@babel/core/lib/transform.js:34:34)\n    at _combinedTickCallback (internal/process/next_tick.js:132:7)\n    at process._tickCallback (internal/process/next_tick.js:181:9)");

/***/ })

/******/ });
//# sourceMappingURL=index.a94efa4.js.map