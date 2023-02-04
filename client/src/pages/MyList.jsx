import React from "react";
import axios from "axios";
import plusSvg from "../images/plus_icon.svg";
import logoSvg from "../images/shape.svg";
import vectorTwo from "../images/vector_two.png";
import "animate.css";
import { useAuth0 } from "@auth0/auth0-react";
import trashcanSvg from "../images/trashcan.svg";
import editSvg from "../images/edit.svg";

const MyList = () => {
  const [newList, setNewList] = React.useState(false);
  const { user } = useAuth0();
  const [data, setData] = React.useState([]);
  const [fetchData, setFetchData] = React.useState(false);
  const [createList, setCreateList] = React.useState({
    user: user.email,
    name: "",
    task: "",
  });
  const [isUpdating, setIsUpdating] = React.useState("");
  const PORT = 3500;
  React.useEffect(() => {
    axios
      .get(`http://localhost:${PORT}/api/items/${user.email}`)
      .then((res) => {
        const userData = res.data;
        setData(userData);
      });
    console.log("render");
  }, [fetchData]);

  const handleChange = (event) => {
    setCreateList((prevListData) => {
      return {
        ...prevListData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const deleteTask = async (id) => {
    const res = await axios.delete(`http://localhost:${PORT}/api/item/${id}`);
    const newList = data.filter((item) => item._id !== id);
    setData(newList);
  };
  const cancelUpdate = () => {
    setIsUpdating("");
    setCreateList({
      user: user.email,
      name: "",
      task: "",
    });
  };
  const updateTaskForm = (id, name, task) => {
    setIsUpdating(id);
    setCreateList({
      user: user.email,
      name: name,
      task: task,
    });
  };
  const updateTask = async (id) => {
    const res = await axios.put(
      `http://localhost:${PORT}/api/item/${id}`,
      createList
    );
    await setFetchData((prevState) => !prevState);
    setIsUpdating("");
    setCreateList({
      user: user.email,
      name: "",
      task: "",
    });
  };
  const submitTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:${PORT}/api/item`, {
        user: createList.user,
        name: createList.name,
        task: createList.task,
      });

      setFetchData((prevState) => !prevState);
      setCreateList({
        user: user.email,
        name: "",
        task: "",
      });

      displayInput();
    } catch (error) {
      console.log(error);
    }
  };
  const emptyList = (
    <div className="empty-list">
      <img src={vectorTwo} />
      <p>
        Hello there {user.name}! Get started by <br /> creating a to-do list
      </p>
    </div>
  );
  const displayInput = () => {
    setNewList((prevState) => !prevState);
  };
  const displayText = () => {
    if (newList) {
      return (
        <div className="input-wrapper">
          <div className="input-logo">
            <img src={logoSvg} />
          </div>
          <h3>Create new list</h3>
          <div className="form__group field">
            <input
              required=""
              placeholder="Name"
              class="form__field"
              type="text"
              name="name"
              onChange={handleChange}
            />
            <label className="form__label" for="name">
              New list name
            </label>
          </div>
          <div className="form__group field">
            <input
              required=""
              placeholder="Name"
              className="form__field"
              type="text"
              name="task"
              onChange={handleChange}
            />
            <label className="form__label" for="name">
              New list description
            </label>
          </div>
          <div className="form_button">
            <button onClick={displayInput}>Cancel</button>
            <button className="purple_btn" onClick={submitTask}>
              Create
            </button>
          </div>
        </div>
      );
    } else {
      if (data.length < 1) {
        return emptyList;
      } else {
        return (
          <div className="list-wrapper">
            {data.map((el) => {
              if (isUpdating === el._id) {
                return (
                  <div className="list">
                    <div className="form__group field">
                      <input
                        required=""
                        placeholder="Name"
                        class="form__field"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={createList.name}
                      />
                    </div>
                    <div className="form__group field">
                      <input
                        required=""
                        placeholder="Name"
                        className="form__field"
                        type="text"
                        name="task"
                        onChange={handleChange}
                        value={createList.task}
                      />
                    </div>
                    <div className="form_button">
                      <button onClick={() => cancelUpdate()}>Cancel</button>
                      <button
                        className="purple_btn"
                        onClick={() => updateTask(el._id)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                );
              }
              return (
                <div className="list">
                  <div className="btn-edit-wrapper">
                    <button onClick={() => deleteTask(el._id)}>
                      <img src={trashcanSvg} />
                    </button>
                    <button
                      onClick={() => updateTaskForm(el._id, el.name, el.task)}
                    >
                      <img src={editSvg} />
                    </button>
                  </div>
                  <p className="list-title">{el.name}</p>
                  <p className="list-text">{el.task}</p>
                </div>
              );
            })}
          </div>
        );
      }
    }
  };

  return (
    <div className="tasklist">
      <div className="header">
        <h1>My List</h1>
      </div>
      {!newList && (
        <button className="btn" onClick={displayInput}>
          <img className="add-svg" src={plusSvg} />
          New List
        </button>
      )}
      {displayText()}
    </div>
  );
};
export default MyList;