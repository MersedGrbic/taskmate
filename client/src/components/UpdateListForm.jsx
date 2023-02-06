const updateListForm = (props) => {
  return (
    <div className="list">
      <div className="list-form">
        <div className="form__group field">
          <input
            required=""
            placeholder="Name"
            className="form__field"
            type="text"
            name="name"
            onChange={props.handleChange}
            value={props.valueName}
          />
        </div>
        <div className="form__group field">
          <input
            required=""
            placeholder="Name"
            className="form__field"
            type="text"
            name="task"
            onChange={props.handleChange}
            value={props.valueTask}
          />
        </div>
        <div className="update-btn">
          <button onClick={() => props.cancelUpdate()}>Cancel</button>
          <button
            className="purple_btn"
            onClick={() => props.updateTask(props.id)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
export default updateListForm;
