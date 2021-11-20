import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "./App.css";

const initalState = {
  appState: "Zaczynamy",
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "appState/change":
      return { ...state, appState: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

function PageSelector() {
  const pages = [
    "Zaczynamy",
    "O tobie",
    "Ocena powietrza",
    "Energetyka i Ogrzewanie",
    "Transport",
    "Podsumowanie",
  ];
  const selector = (state) => pages.findIndex((e) => e === state.appState);
  const doneId = useSelector(selector);
  const dispatch = useDispatch();
  const jsx = pages.map((p, id) => {
    const className = id > doneId ? "toBeDone" : "";
    const event = { type: "appState/change", payload: p };
    return (
      <button onClick={() => dispatch(event)}>
        <h4 key={p} className={className}>
          {p}
        </h4>
      </button>
    );
  });
  return <div className="PageSelector">{jsx}</div>;
}

function Questionare() {
  return (
    <main id="quest">
      <PageSelector />
    </main>
  );
}

function App() {
  return <Questionare />;
}

export { App, store };
