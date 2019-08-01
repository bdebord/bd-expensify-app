import { createStore, Action } from "redux";


type State = {
  count: number;
};

interface CustomAction extends Action {
  incrementBy?: number;
  decrementBy?: number;
  count?: number;
  type: string;
}

const incrementCount = ( { incrementBy = 1 } = {} ) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ( {decrementBy = 1} = {} ) => ({
  type: 'DECREMENT',
  decrementBy
});

const resetCount = () => ({
  type: 'RESET'
});

const setCount = ( count: number ) => ({
  type: "SET",
  count
});

//reducers
const countReducer = ((state: State = { count: 0 }, action: CustomAction) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
      case "RESET":
            return {
              count: 0
          };
      case "SET":
        return {
          count: action.count
        };
    default:
      return state;
  }
});

const store = createStore(countReducer);

// const store = createStore((state: State = { count: 0 }, action: CustomAction) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return {
//         count: state.count + action.incrementBy
//       };
//     case "DECREMENT":
//       return {
//         count: state.count - action.decrementBy
//       };
//       case "RESET":
//             return {
//               count: 0
//           };
//       case "SET":
//         return {
//           count: action.count
//         };
//     default:
//       return state;
//   }
// });

const unsubscribe = store.subscribe(() =>{
  console.log(store.getState());
});

console.log(store.getState());

//Actions - an object that gets sent to the store
store.dispatch(decrementCount({decrementBy: 95}));
store.dispatch(decrementCount());
store.dispatch(resetCount());

store.dispatch(incrementCount({incrementBy: 6}));

store.dispatch(incrementCount());

// store.dispatch({
//     type: "INCREMENT",
//     incrementBy: 5
// });

store.dispatch(setCount(999));




