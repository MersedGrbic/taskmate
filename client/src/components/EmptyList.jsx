import vectorTwo from "../images/vector_two.png";
const EmptyList = (props) => {
  return (
    <div className="empty-list">
      <img src={vectorTwo} />
      <p>
        Hello there {props.name}! Get started by <br /> creating a to-do list
      </p>
    </div>
  );
};
export default EmptyList;
