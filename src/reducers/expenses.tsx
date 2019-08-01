import { Action } from "redux";

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

const expensesReducerDefault: any = [];
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

export default expensesReducer;