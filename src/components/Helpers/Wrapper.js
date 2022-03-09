// This basically an empty component
// This dirty trick is done to avoid wrapping every component with a <div></div> (so called (div soup)) HTML
// Element/Tag or any other HTML Element/Tag because with the return you can only return one
// Element not more than that, again The requirement just is, that there must be one root element

const Wrapper = (props) => {
  return props.children;
};

export default Wrapper;
