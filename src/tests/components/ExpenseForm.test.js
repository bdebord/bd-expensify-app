import ExpenseForm from '../../components/ExpenseForm';
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import moment from 'moment';


test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with data', () => {
    const wrapper = shallow(<ExpenseForm expense={ expenses[1] }/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('form').simulate('submit', {preventDefault: () => {} });
    expect(wrapper.state('validationError').length).toBeGreaterThan(0);
});

test('should set description on input change', () => {
    const value = 'New Description'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {target: {value}});
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on input change', () => {
    const value = 'New Note'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').at(0).simulate('change', {target: {value}});
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount with a valid input', () => {
    const value = '22.22'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {target: {value}});
    expect(wrapper.state('amount')).toBe(value);
});

test('should set amount with a bad data', () => {
    const value = 'abcde'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {target: {value}});
    expect(wrapper.state('amount')).toBe('');
});


test('should call onSubmit prop for valid submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {preventDefault: () => {} });
    expect(wrapper.state('error')).toBe(undefined);
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    });
});

test('should call onDateChange prop for valid submission', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should call onFocusChange prop for valid submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused: true});
    expect(wrapper.state('focused')).toEqual(true);
});

