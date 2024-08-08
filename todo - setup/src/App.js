import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const App = () => {
  const getLS = () => {
    if (localStorage.getItem("list")) {
      return JSON.parse(localStorage.getItem("list"));
    } else return [];
  };
  const [name, setName] = useState("");
  const [alert, setAlert] = useState({ msg: "", type: "", show: false });
  const [list, setList] = useState(getLS());
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const hendleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setAlert({
        msg: "Niste nista unijeli",
        type: "danger",
        show: true,
      });
    } else if (!editing) {
      setList((prevState) => {
        return [...prevState, { id: new Date().toString(), todo: name }];
      });
      setAlert({
        msg: "Uspjesno ste dodali zadatak",
        type: "success",
        show: true,
      });
    } else if (editing) {
      const specTodo = list.find((item) => {
        return item.id === editID;
      });
      setList(
        list.map((item) => {
          if (item.id === editID) return { ...item, todo: name };
          return item;
        })
      );
      setAlert({
        msg: `Uspjesno ste izmijenili naziv ${specTodo} u naziv ${name}`,
        type: "success",
        show: true,
      });
    }
    setTimeout(() => {
      setAlert({ msg: "", type: "", show: false });
    }, 2000);
    setName("");
    setEditing(false);
    setEditID(null);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const editTodo = (id) => {
    const specTodo = list.find((item) => {
      return item.id === id;
    });
    setName(specTodo.todo);
    setEditing(true);
    setEditID(id);
  };
  const removeTodo = (id) => {
    setList(
      list.filter((item) => {
        return item.id !== id;
      })
    );
    setAlert({
      msg: "Uspjesno ste obrisali zadatak",
      type: "success",
      show: true,
    });
    setTimeout(() => {
      setAlert({ msg: "", type: "", show: false });
    }, 2000);
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={hendleSubmit}>
        {alert.show ? <Alert {...alert}></Alert> : ""}
        <h3>Todo Lista</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Unesite zadatak"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <button type="submit" className="submit-btn">
            {editing ? "uredi" : "posalji"}
          </button>
        </div>
      </form>
      {list.length > 0 ? (
        <div className="grocery-container">
          <List items={list} editTodo={editTodo} removeTodo={removeTodo}></List>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default App;
