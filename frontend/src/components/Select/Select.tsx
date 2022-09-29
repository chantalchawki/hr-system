const Select = (props: any) => {
  return (
    <select
      value={props.value}
      onChange={props.onChange}
      style={{ margin: "5px", border: "1px solid black", borderRadius: "5px" }}
    >
      <option>Annual</option>
      <option>Sick</option>
    </select>
  );
};

export default Select;
