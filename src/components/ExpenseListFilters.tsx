import * as React from "react";
import { connect } from "react-redux";
import {
 setTextFilter,
 sortByAmount,
 sortByDate,
 setStartDate,
 setEndDate
} from "../actions/filters";
import { DateRangePicker } from "react-dates";
import uuid from "uuid";

export class ExpenseListFilters extends React.Component<
 {
  filters;
  dispatch?;
  setStartDate;
  setEndDate;
  setTextFilter;
  sortByDate;
  sortByAmount;
 },
 { calenderFocused }
> {
 state = {
  calenderFocused: undefined,
  startDateID: '1',
  endDateID: '1'
 };

 onDatesChange = ({ startDate, endDate }) => {
  this.props.setStartDate(startDate);
  this.props.setEndDate(endDate);
 };
 onFocusChange = (calenderFocused) => {
  this.setState(() => ({ calenderFocused }));
 };
 onTextChange = (e) => {
  this.props.setTextFilter(e.target.value);
 };
 onSortChange = (e) => {
  if (e.target.value == "date") {
   this.props.sortByDate();
  } else if (e.target.value == "amount") {
   this.props.sortByAmount();
  }
 };
 render() {
  return (
   <div>
    <input
     type='text'
     value={this.props.filters.text}
     onChange={this.onTextChange}
    />
    <select onChange={this.onSortChange}>
     <option value='date'>Date</option>
     <option value='amount'>Amount</option>
    </select>
    <DateRangePicker
     startDate={this.props.filters.startDate}
     startDateId={this.state.startDateID}
     endDate={this.props.filters.endDate}
     onDatesChange={this.onDatesChange}
     focusedInput={this.state.calenderFocused}
     onFocusChange={this.onFocusChange}
     endDateId={this.state.endDateID}
     showClearDates={true}
     numberOfMonths={1}
     isOutsideRange={() => false}
    />
   </div>
  );
 }
}

const mapStateToProps = (state: any) => ({
 filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
 setTextFilter: (text) => dispatch(setTextFilter(text)),
 sortByDate: () => dispatch(sortByDate()),
 sortByAmount: () => dispatch(sortByAmount()),
 setStartDate: (startDate) => dispatch(setStartDate(startDate)),
 setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(ExpenseListFilters);
