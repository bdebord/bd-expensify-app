import {AddExpensePage}  from '../../components/AddExpensePage';
import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';


test('should render AddExpense page correctly', ()=> {
    const addExpense = jest.fn();
    const history = {push: jest.fn() };
    const wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
    expect(wrapper).toMatchSnapshot();
});


test('should handle onSubmit', ()=> {
    const addExpense = jest.fn();
    const history = {push: jest.fn() };
    const wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);

});