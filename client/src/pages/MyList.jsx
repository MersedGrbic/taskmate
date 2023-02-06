import React from "react";
import axios from "axios";
import plusSvg from "../images/plus_icon.svg";
import "animate.css";
import { useAuth0 } from "@auth0/auth0-react";
import RenderForm from "../components/RenderForm";
import EmptyList from "../components/EmptyList";
import List from "../components/List";
import UpdateListForm from "../components/UpdateListForm";
// Custom hook to manage the my list page
const MyList = () => {
  // State to manage the list
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

  // Fetch the list data when the component renders
  React.useEffect(() => {
    axios
      .get(`http://localhost:${PORT}/api/items/${user.email}`)
      .then((res) => {
        const userData = res.data;
        setData(userData);
      });
  }, [fetchData]);

  // Handle the change of the input fields
  const handleChange = (event) => {
    setCreateList((prevListData) => {
      return {
        ...prevListData,
        [event.target.name]: event.target.value,
      };
    });
  };

  // Delete task from list
  const deleteTask = async (id) => {
    const res = await axios.delete(`http://localhost:${PORT}/api/item/${id}`);
    const newList = data.filter((item) => item._id !== id);
    setData(newList);
  };

  // Cancel the update of task
  const cancelUpdate = () => {
    setIsUpdating("");
    setCreateList({
      user: user.email,
      name: "",
      task: "",
    });
  };

  // Update the form with current task value
  const updateTaskForm = (id, name, task) => {
    setIsUpdating(id);
    setCreateList({
      user: user.email,
      name: name,
      task: task,
    });
  };

  // Update the task
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

  // Submit the task
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

  // Display the input form
  const displayInput = () => {
    setNewList((prevState) => !prevState);
  };

  // Display the text in the list
  const displayText = () => {
    if (newList) {
      return (
        <RenderForm
          handleChange={handleChange}
          displayInput={displayInput}
          submitTask={submitTask}
          conitnue
        />
      );
    } else {
      if (data.length < 1) {
        return <EmptyList name={user.name} />;
      } else {
        return (
          <div className="list-wrapper">
            {data.map((el) => {
              if (isUpdating === el._id) {
                return (
                  <UpdateListForm
                    key={el._id}
                    handleChange={handleChange}
                    valueName={createList.name}
                    valueTask={createList.task}
                    cancelUpdate={cancelUpdate}
                    updateTask={updateTask}
                    id={el._id}
                  />
                );
              }
              return (
                <List
                  key={el._id}
                  deleteTask={deleteTask}
                  updateTaskForm={updateTaskForm}
                  id={el._id}
                  name={el.name}
                  task={el.task}
                />
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
