import expensesReducer from "../../reducers/expenses";
import expenses from '../fixtures/expenses'


test("should setup default state", () => {
    const state = expensesReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual([]);
  });

  test("should remove expense by id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[0].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ expenses[1], expenses[2] ]);
  });

  test("should not remove expenses if id not found", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: '1234232322'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses);
  });

  test("should add a new expense ", () => {
    const newExpenses = {
        id: '4',
        description: 'electric bill',
        note: '',
        amount: 2995,
        createdAt: 0
    };
    const action = {
        type: "ADD_EXPENSE",
        expense: newExpenses
    };
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[1], expenses[2], newExpenses ]);
  });


  test("should edit an expense ", () => {
    const amount = 29995;
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[1].id,
        updates: {     
            amount 
        }
    };
    const state = expensesReducer(expenses, action)
    expect(state[1].amount).toBe(amount);
  });

  test("should not edit an expense with a bad id ", () => {
    const amount = 29995;
    const action = {
        type: "EDIT_EXPENSE",
        id: '99999999999999',
        updates: {     
            amount 
        }
    };
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses);
  });
  

  