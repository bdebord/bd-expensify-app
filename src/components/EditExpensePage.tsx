import * as React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component<
 { editExpense; removeExpense; expense?; history?; dispatch; match; params; },
 {}
> {
 onSubmit = (expense) => {
  this.props.editExpense(this.props.expense.id, expense);
  this.props.history.push("/");
 };
 onClick = (e) => {
  this.props.removeExpense({ id: this.props.expense.id });
  this.props.history.push("/");
 };
 render() {
  return (
   <div>
    <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
    <button onClick={this.onClick}>Remove Item</button>
   </div>
  );
 }
}

// const EditExpensePage = (props: any) => {
//  console.log(props);
//  return (
//   <div>
//    <ExpenseForm
//     expense={props.expense}
//     onSubmit={(expense) => {
//      props.dispatch(editExpense(props.match.params.id, expense));
//      props.history.push("/");
//     }}
//    />
//    <button
//     onClick={(e) => {
//      props.dispatch(removeExpense({ id: props.expense.id }));
//      props.history.push("/");
//     }}
//    >
//     Remove Item
//    </button>
//   </div>
//  );
// };

const mapStateToProps = (state, props) => {
 return {
  expense: state.expenses.find(
   (expense) => expense.id === props.match.params.id
  )
 };
};

// for testing purposes
const mapDispatchToProps = (dispatch) => ({
 editExpense: (id, expense) => dispatch(editExpense(id, expense)),
 removeExpense: (id) => dispatch(removeExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
