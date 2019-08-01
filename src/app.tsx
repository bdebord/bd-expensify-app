import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import AppRouter from "./routers/app-router";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter, setStartDate } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import "react-dates/lib/css/_datepicker.css";


const store = configureStore();
store.dispatch(addExpense({description: 'Water Bill', amount: 200, createdAt: 300}));
store.dispatch(addExpense({description: "Gas bill", amount: 1999}));
store.dispatch(addExpense({description: 'rent', amount: 5000, createdAt: 1000}));


const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);
console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById("app"));
