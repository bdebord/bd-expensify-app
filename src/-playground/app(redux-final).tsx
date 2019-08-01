import { createStore, combineReducers, Action } from "redux";
import * as uuid from "uuid";
import { string, number } from "prop-types";
import { type } from "os";

interface expenseStateType {
    
      id: string;
      description?: string;
      note?: string;
      amount?: number;
      createdAt?: number;
    };


interface ExpenseAction extends Action {
  expense?: expenseStateType;
  id?: string;
  updates?: any;
}

interface FilterAction extends Action {
  text?: string;
  endDate?: number,
  startDate?: number,
  date?: number
}

interface filterStateType {
  text: string;
  sortBy: string; //date or amount
  startDate: number;
  endDate: number;
}

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const editExpense = (id: string, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

const removeExpense = ({ id }) => ({
  type: "REMOVE_EXPENSE",
  id
});

const expensesReducerDefault: any = [];
const filtersStateDefault: filterStateType = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const expensesReducer = (
  state: any = expensesReducerDefault,
  action: ExpenseAction
) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const setTextFilter = (text: string = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

const setEndDate = (date: number = undefined) => ({
  type: "SET_END_DATE",
  date
});

const setStartDate = (date: number = undefined) => ({
  type: "SET_START_DATE",
  date
});

//Filters reducer
const filterReducer = (
  state: filterStateType = filtersStateDefault,
  action: FilterAction
) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date
      };
    default:
      return state;
  }
};

//get visible expenses  
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  })
};

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "rent", amount: 6100, createdAt: -2000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Food", amount: 500, createdAt: -1000 })
);

//store.dispatch(setTextFilter('rent'));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

 //store.dispatch(setStartDate(2000));
 //store.dispatch(setEndDate(200));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());

const demoState = {
  expenses: [
    {
      id: "fdfasdfasdf",
      description: "Rent",
      note: "This was a final payment",
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //date or amount
    startDate: undefined as any,
    endDate: undefined as any
  }
};
