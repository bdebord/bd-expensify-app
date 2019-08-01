import filtersReducer from "../../reducers/filters";
import moment from "moment";

test("should setup default filter values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
});

test('should set sortBy text filter', () => {
    const text = 'test';
    const action = {type: 'SET_TEXT_FILTER', text};
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe('test');
});

test('should set sortBy startDate filter', () => {
    const date = moment(1);
    const action = {type: 'SET_START_DATE', date};
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toStrictEqual(moment(1));
});

test('should set sortBy endDate filter', () => {
    const date = moment(100);
    const action = {type: 'SET_END_DATE', date};
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toStrictEqual(moment(100));
});


