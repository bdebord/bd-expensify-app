import { createStore, combineReducers } from "redux";
import expensesReducer from "../reducers/expenses";
import filterReducer from "../reducers/filters";

// Store creation


export default () => {
    const store = createStore(
        combineReducers({
          expenses: expensesReducer,
          filters: filterReducer
        }),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      );
    return store;
};
