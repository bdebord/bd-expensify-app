import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import React from "react";
import { shallow } from "enzyme";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
 setTextFilter = jest.fn();
 sortByDate = jest.fn();
 sortByAmount = jest.fn();
 setStartDate = jest.fn();
 setEndDate = jest.fn();

 wrapper = shallow(
  <ExpenseListFilters
   filters={filters}
   setTextFilter={setTextFilter}
   sortByDate={sortByDate}
   sortByAmount={sortByAmount}
   setStartDate={setStartDate}
   setEndDate={setEndDate}
  />
 );
});

test("should render ExpenseListFilter correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilter with alt data correctly", () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
});

test("should handle text change correctly", () => {
    const value = 'bill';
    wrapper.find('input').simulate('change', {
        target: { value }
        });
    expect(setTextFilter).toHaveBeenCalledWith('bill');
});

test("should handle sortByDate correctly", () => {
    const value = 'date';
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target: { value }
        });
    expect(sortByDate).toHaveBeenCalled();
});

test("should handle sortByAmount correctly", () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value }
        });
    expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date change correctly", () => {
    const startDate = altFilters.startDate;
    const endDate = altFilters.endDate;
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate})
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});


