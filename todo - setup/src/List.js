import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, editTodo, removeTodo }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, todo } = item;

        return (
          <article key={id} className="grocery-item">
            <p className="title">{todo}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => {
                  editTodo(id);
                }}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => {
                  removeTodo(id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
