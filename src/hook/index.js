// https://github.com/hangyangws/hooks-store/tree/master/src
// https://github.com/facebook/react/issues/14520?spm=taofed.bloginfo.blog.4.a9055ac8d4kjxD


// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }


function App() {
  const { values } = useInput();
  function register(xx) {
    return (ref) => {
      console.log(ref, xx)
    }
  }
  return (
    <input type="text" name="name" value={values.name}
    ref={register({ required: true, maxLength: 2 })}
    />
  )
}

/***
 *
 import providers from './providers';

 // 数据 Provider 组合器
 const ProvidersComposer = (props) => (
   props.providers.reduceRight((children, Parent) => ( <
     Parent > {
       children
     } < /Parent>
   ), props.children)
 );

 const Provider = (props) => {
   return ( <
     ProvidersComposer providers = {
       providers
     } > {
       props.children
     } <
     /ProvidersComposer>
   );
 };

 export default Provider;
 * 
 * 
 * 
 * 
 */