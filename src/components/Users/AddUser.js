import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  /* useState Hook
  useState Hook always returns an array with exactly two elements
  and with this syntax (array de-structuring), we're pulling these elements
  out and we store them in separate constants, the first element of that array is the
  current state snapshot and every time this component re-renders, which is for example, 
  it does when the status is updated this [enteredUsername] will hold the latest state snapshot
  and [setEnteredUsername] on the other hand holds a function which we can call,
  to change that state and to then trigger such a render cycle.
   */
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const addUserHandler = (event) => {
    event.preventDefault();

    // Vaildation
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }
    if (+enteredAge < 1) {
      return;
    }

    // addUserHandler which passed through props from the App.js file
    props.onAddUser(enteredUsername, enteredAge);

    // resetting input fields back to empty
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  return (
    <div>
      <ErrorModal
        title="An error occured!"
        message="Somthing went wrong!"
      ></ErrorModal>
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
