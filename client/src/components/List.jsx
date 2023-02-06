import trashcanSvg from "../images/trashcan.svg";
import editSvg from "../images/edit.svg";
const List = (props) => {
  return (
    <div className="list">
      <div className="btn-edit-wrapper">
        <button onClick={() => props.deleteTask(props.id)}>
          <img src={trashcanSvg} />
        </button>
        <button
          onClick={() => props.updateTaskForm(props.id, props.name, props.task)}
        >
          <img src={editSvg} />
        </button>
      </div>
      <p className="list-title">{props.name}</p>
      <p className="list-text">{props.task}</p>
    </div>
  );
};
export default List;
