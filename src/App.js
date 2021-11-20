import React from "react";
import { createStore } from "redux";
import "./App.css";

const reducer = () => {
  return {};
};
const store = createStore(reducer);
function App() {
  return (
    <div>
      <p>im working :D</p>
    </div>
  );
}

export { App, store };
