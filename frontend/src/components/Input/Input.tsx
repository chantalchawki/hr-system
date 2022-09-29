import "./styles.css";

const Input = (props: any) => {
  return (
    <div className="input-container">
      <label>{props.label}</label>
      <input
        className="input"
        value={props.value}
        type={props.type}
        onClick={props.onClick}
        onChange={props.onChange}
        readOnly={props.readonly}
      ></input>
    </div>
  );
};

export default Input;
