import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  /**
   * useRef Hook
   */
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  /* useState Hook
  useState Hook always returns an array with exactly two elements
  and with this syntax (array de-structuring), we're pulling these elements
  out and we store them in separate constants, the first element of that array is the
  current state snapshot and every time this component re-renders, which is for example, 
  it does when the status is updated this [enteredUsername] will hold the latest state snapshot
  and [setEnteredUsername] on the other hand holds a function which we can call,
  to change that state and to then trigger such a render cycle.
   */
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");

  // ErrorModal useState(); Hook
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    // Vaildation
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input 💥",
        message: "Please enter a valid name and age (non-empty values) 😱",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age 💥",
        message: "Please enter a valid age ( > 0) 😱",
      });
      return;
    }

    // addUserHandler which passed through props from the App.js file
    props.onAddUser(enteredName, enteredUserAge);

    /* please do consider NOT to do this in the future because this is not a good
    practice to manipulate the DOM you should let React do all the heavy lifting
    and manipulate the DOM for you, which in our case here we want to clear the 
    inputs after being added, but we are doing this now only to practice useRef Hook
    */
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";

    // resetting input fields back to empty
    // setEnteredUsername("");
    // setEnteredAge("");
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

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
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
