import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import { useEffect } from "react";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const [todoDirty, setTodoDirty] = useState(false);
  const [todoError, setTodoError] = useState("The string must not be empty");
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    setTodo(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 100) {
      setTodoError(
        "The string must be longer than 3 and less than 100 characters"
      );
      if (!e.target.value) {
        setTodoError("The string must not be empty");
      }
    } else {
      setTodoError("");
    }
  };

  useEffect(() => {
    if (todoError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [todoError]);

  const add = () => {
    props.addTodo({
      id: Math.floor(Math.random() * 1000),
      item: todo,
      completed: false,
    });
    setTodo("");
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "text":
        setTodoDirty(true);
        break;
    }
  };

  return (
    <div>
      <div className="addTodos">
        <input
          onBlur={(e) => blurHandler(e)}
          type="text"
          name="text"
          onChange={(e) => handleChange(e)}
          className="todo-input"
          value={todo}
        />
        <motion.button
          disabled={!formValid}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => add()}
          className="add-btn"
        >
          <GoPlus />
        </motion.button>
        <br />
      </div>
      {(todoDirty && todoError) && <div className='error'>{todoError}</div>}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
