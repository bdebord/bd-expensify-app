import * as React from "react";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

const now = moment();
console.log(now.format("MMM Do, YYYY"));

export default class ExpenseForm extends React.Component<{ onSubmit, expense? }, {description: string, note: string, amount: string, createdAt: any, focused: boolean, validationError: string}> {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense? props.expense.description : "",
      note: props.expense? props.expense.note : "",
      amount: props.expense? (props.expense.amount/ 100).toString() :  "",
      createdAt: props.expense? moment(props.expense.createdAt) : moment(),
      focused: false,
      validationError: undefined
      // description: "",
      // note:  "",
      // amount:   "",
      // createdAt: moment(),
      // focused: false,
      // validationError: undefined
    };
  }
 

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ focused }));
  };
  onSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        validationError: "Please enter a description and amount."
      }));
    } else {
      this.setState(() => ({ validationError: undefined }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.validationError && <p>{this.state.validationError}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt} // momentPropTypes.momentObj or null
            onDateChange={this.onDateChange} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
            numberOfMonths={1}
            isOutsideRange={day => false}
          />
          <textarea
            placeholder="add a note"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button>Add expense</button>
        </form>
      </div>
    );
  }
}
