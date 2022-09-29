import "./Sheet.css";

const Sheet = (props: any) => {
  return (
    <div className="container">
      <label>{props.title}</label>
      {props.children}
    </div>
  );
};

export default Sheet;
