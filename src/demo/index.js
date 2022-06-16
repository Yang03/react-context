
// import ReactDOM from 'react-dom'
// import React, { useState, useRef, useEffect } from 'react';


// import 'zarm/dist/zarm.css'

// const Demo = () => {
//   const focusInput = useRef();
//   const [value, setValue] = useState('');

//   return (
//     <>
//       {/* <Cell title="数字">
//         <Input
//           ref={focusInput}
//           type="number"
//           placeholder="type is number"
//           value={value}
//           onChange={setValue}
//         />
//       </Cell>

//       <Cell title="金额">
//         <Input type="price" placeholder="type is price" defaultValue={value} />
//       </Cell>

//       <Cell title="身份证">
//         <Input type="idcard" placeholder="type is idcard" />
//       </Cell>

//       <Cell>
//         <Button size="xs" theme="primary" onClick={() => focusInput.current.focus()}>
//           click to focus the first input
//         </Button>
//       </Cell> */}
//        {/* <List>
//     <List.Item hasArrow title="Item 1" onClick={() => {}} />
//     <List.Item hasArrow title="Item 2" onClick={() => {}} />
//     <List.Item hasArrow title="Item 3" onClick={() => {}} />
//   </List> */}

//  <Button>Button</Button>
//     </>
//   );
// };

// import { useState, useEffect, useRef } from 'react';
import { Pull, Button } from 'zarm';

// const REFRESH_STATE = {
//   normal: 0, // 普通
//   pull: 1, // 下拉刷新（未满足刷新条件）
//   drop: 2, // 释放立即刷新（满足刷新条件）
//   loading: 3, // 加载中
//   success: 4, // 加载成功
//   failure: 5, // 加载失败
// };

// const LOAD_STATE = {
//   normal: 0, // 普通
//   abort: 1, // 中止
//   loading: 2, // 加载中
//   success: 3, // 加载成功
//   failure: 4, // 加载失败
//   complete: 5, // 加载完成（无新数据）
// };

// const getRandomNum = (min, max) => {
//   const Range = max - min;
//   const Rand = Math.random();
//   return min + Math.round(Rand * Range);
// };

// const fetchData = (length, dataSource = []) => {
//   let newData = [].concat(dataSource);
//   const startIndex = newData.length;
//   for (let i = startIndex; i < startIndex + length; i++) {
//     newData.push(<div key={+i}>第 {i + 1} 行</div>);
//   }
//   return newData;
// };

// let mounted = true;

// const Demo = () => {
//   const pullRef = useRef();
//   const [bodyScroll, setBodyScroll] = useState(false);
//   const [dataSource, setDataSource] = useState([]);
//   const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
//   const [loading, setLoading] = useState(LOAD_STATE.normal);

//   const toggleScrollContainer = () => {
//     const newBodyScroll = !bodyScroll;
//     setBodyScroll(newBodyScroll);

//     if (newBodyScroll) {
//       document.body.style.overflow = 'auto';
//     } else {
//       document.body.style.overflow = 'hidden';
//     }
//   };

//   // 模拟请求数据
//   const refreshData = () => {
//     setRefreshing(REFRESH_STATE.loading);
//     setTimeout(() => {
//       if (!mounted) return;
//       setDataSource(fetchData(20));
//       setRefreshing(REFRESH_STATE.success);
//     }, 2000);
//   };

//   // 模拟加载更多数据
//   const loadData = () => {
//     setLoading(LOAD_STATE.loading);
//     setTimeout(() => {
//       if (!mounted) return;

//       const randomNum = getRandomNum(0, 5);
//       console.log(`状态: ${randomNum === 0 ? '失败' : randomNum === 1 ? '完成' : '成功'}`);

//       let loadingState = LOAD_STATE.success;
//       if (randomNum === 0) {
//         loadingState = LOAD_STATE.failure;
//       } else if (randomNum === 1) {
//         loadingState = LOAD_STATE.complete;
//       } else {
//         setDataSource(fetchData(20, dataSource));
//       }

//       setLoading(loadingState);
//     }, 2000);
//   };

//   useEffect(() => {
//     setDataSource(fetchData(20));

//     return () => {
//       mounted = false;
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   const style = bodyScroll ? {} : { overflowY: 'auto', maxHeight: 400 };

//   const scrollContainer = () => {
//     return bodyScroll ? window : pullRef.current && pullRef.current.scrollContainer;
//   };

//   return (
//     <>
//       <Button>Button</Button>
//       <Pull
//         ref={pullRef}
//         style={style}
//         refresh={{
//           state: refreshing,
//           handler: refreshData,
//           // render: (refreshState, percent) => {
//           //   const cls = 'custom-control';
//           //   switch (refreshState) {
//           //     case REFRESH_STATE.pull:
//           //       return (
//           //         <div className={cls}>
//           //           <ActivityIndicator loading={false} percent={percent} />
//           //           <span>下拉刷新</span>
//           //         </div>
//           //       );

//           //     case REFRESH_STATE.drop:
//           //       return (
//           //         <div className={cls}>
//           //           <ActivityIndicator loading={false} percent={100} />
//           //           <span>释放立即刷新</span>
//           //         </div>
//           //       );

//           //     case REFRESH_STATE.loading:
//           //       return (
//           //         <div className={cls}>
//           //           <ActivityIndicator type="spinner" />
//           //           <span>加载中</span>
//           //         </div>
//           //       );

//           //     case REFRESH_STATE.success:
//           //       return (
//           //         <div className={cls}>
//           //           <Icon type="right-round" theme="success" />
//           //           <span>加载成功</span>
//           //         </div>
//           //       );

//           //     case REFRESH_STATE.failure:
//           //       return (
//           //         <div className={cls}>
//           //           <Icon type="wrong-round" theme="danger" />
//           //           <span>加载失败</span>
//           //         </div>
//           //       );

//           //     default:
//           //   }
//           // },
//         }}
//         load={{
//           state: loading,
//           distance: 200,
//           handler: loadData,
//           // render: (loadState) => {
//           //   const cls = 'custom-control';
//           //   switch (loadState) {
//           //     case LOAD_STATE.loading:
//           //       return <div className={cls}><ActivityIndicator type="spinner" /></div>;

//           //     case LOAD_STATE.failure:
//           //       return <div className={cls}>加载失败</div>;

//           //     case LOAD_STATE.complete:
//           //       return <div className={cls}>我是有底线的</div>;
//           //   }
//           // },
//         }}
//       >
//         {dataSource}
//       </Pull>
//     </>
//   );
// };

// ReactDOM.render(<Demo />, mountNode);

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";


const Demo = () => {

  return (
    <>
    </>
  );
};

// ReactDOM.render(<Demo />, document.getElementById("container"));

ReactDOM.render(<Demo />,  document.getElementById('app'));
