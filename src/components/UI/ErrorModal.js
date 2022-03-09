import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

// Working with Portals
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHandleError} />;
};

// Working with Portals
const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p className={classes.message}>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onHandleError}>Okay</Button>
      </footer>
      {props.children}
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    /**
     * Working with Portals
     * createPortal takes two arguments:
     * 1st is your react node that should be rendered in our case here <Backdrop /> and important here it wants JSX syntax
     * which is react syntax
     * 2nd argument is a pointer to that container in the real DOM (<div><div/>) where this element should
     * be renderd in and in my case, and to that container (<div><div/>) element  we use the DOM API which is
     * document.getElementById("backdrop-root"), so with this we get access to a real HTML DOM elements, a DOM node here.
     * This is done with the DOM API which provided by the browser, it has NOTHING to do with react syntax.
     */
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHandleError={props.onHandleError} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onHandleError={props.onHandleError}
        />,
        document.getElementById("over-lay-root")
      )}
    </Fragment>
  );
};

export default ErrorModal;
