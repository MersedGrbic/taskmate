import logoSvg from "../images/shape.svg";
const RenderForm = (props) => {
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
          className="form__field"
          type="text"
          name="name"
          onChange={props.handleChange}
        />
        <label className="form__label" htmlFor="name">
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
          onChange={props.handleChange}
        />
        <label className="form__label" htmlFor="name">
          New list description
        </label>
      </div>
      <div className="form_button">
        <button onClick={props.displayInput}>Cancel</button>
        <button className="purple_btn" onClick={props.submitTask}>
          Create
        </button>
      </div>
    </div>
  );
};
export default RenderForm;
