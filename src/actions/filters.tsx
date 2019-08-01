
export const setTextFilter = (text: string = "") => ({
    type: "SET_TEXT_FILTER",
    text
  });
  
  export const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
  });
  
  export const sortByDate = () => ({
    type: "SORT_BY_DATE"
  });
  
  export const setEndDate = (date: number = undefined) => ({
    type: "SET_END_DATE",
    date
  });
  
  export const setStartDate = (date: number = undefined) => ({
    type: "SET_START_DATE",
    date
  });
  