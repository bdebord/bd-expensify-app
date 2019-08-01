import * as React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.map(expense => (
      <ExpenseListItem key={expense.id} {...expense} />
    ))}
    {props.expenses.length}
  </div>
);

const mapStateToProps = (state: any) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseList);
