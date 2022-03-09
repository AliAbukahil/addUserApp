import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
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

  // ErrorModal useState(); Hook
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    // Vaildation
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input 💥",
        message: "Please enter a valid name and age (non-empty values) 😱",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age 💥",
        message: "Please enter a valid age ( > 0) 😱",
      });
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

  const errorHandler = () => {
    // to set it from an object to null, null is treated as a falsy value
    setError(null);
  };

  return (
    <Wrapper>
      {/* checking if there is an error and if it is, with that AND operator,
       we output error model, otherwise if error would be undefined nothing would
        be rendered here for this line  {error && (
        <ErrorModal title={props.title} message={props.message}></ErrorModal>
      )}  */}

      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onHandleError={errorHandler}
        />
      )}
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
    </Wrapper>
  );
};

export default AddUser;
