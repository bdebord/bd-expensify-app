import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const ExpenseListItem = (
  { id, description, amount, createdAt },
  props
) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3> {description}</h3>
    </Link>

    <p>
      Amount: {amount} created - {createdAt}
    </p>
  </div>
);

export default connect()(ExpenseListItem);
