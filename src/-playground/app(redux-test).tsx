import {
  createStore,
  combineReducers,
  Action,
  bindActionCreators,
  Store
} from "redux";

interface CustomAction extends Action {
    payload: {
        name?: string,
        amount?: number
    }
}

const createPolicy = (name: string, amount: number) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name,
      amount
    }
  };
};

const deletePolicy = (name: string) => ({
  type: "DELETE_POLICY",
  payload: {
    name
  }
});

const createClaim = (name: string, amount: number) => ({
  type: "CREATE_CLAIM",
  payload: {
    name,
    amount
  }
});

// REDUCERS
const crateClaimReducer = (state = [], action: CustomAction) => {
  switch (action.type) {
    case "CREATE_CLAIM":
      return [...state, action.payload];
    default:
      return state;
  }
};

const accounting = (amount = 100, action: CustomAction) => {
  switch (action.type) {
    case "CREATE_CLAIM":
      return amount - action.payload.amount;
    case "CREATE_POLICY":
      return amount + action.payload.amount;
    default:
      return amount;
  }
};

const policies = (policies = [], action: CustomAction) => {
  switch (action.type) {
    case "CREATE_POLICY":
      return [...policies, action.payload.name];
    case "DELETE_POLICY":
      return policies.filter(name => name !== action.payload.name);
    default:
      return policies;
  }
};

const store: Store = createStore(
  combineReducers({
    crateClaimReducer,
    accounting,
    policies
  })
);

const action = createPolicy('Alex', 20);

store.dispatch(action);
store.dispatch(createPolicy('Jim', 100));
store.dispatch(createPolicy('Bob', 80));

store.dispatch(createClaim('Alex', 50));

store.dispatch(deletePolicy('Bob'));

console.log(store.getState());