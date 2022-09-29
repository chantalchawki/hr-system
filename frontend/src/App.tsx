import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";
import Sheet from "./components/Sheet/Sheet";
import moment from "moment";

let employeeId = "632b909a6df3b78c873d3356";

function App() {
  const [annualLeave, setAnnualLeave] = useState(0);
  const [sickLeave, setSickLeave] = useState(0);
  const [vaccationType, setVaccationType] = useState("annual");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);

  const handleChange = async (event: any) => {
    setEndDate(event.target.value);
    const vaccationDuration = await calculateDuration(
      startDate,
      event.target.value
    );
    setDuration(vaccationDuration);
  };

  const handleSelect = (event: any) => {
    setVaccationType(event.target.value);
  };

  const handleClick = async () => {
    try {
      const res = await axios.put(`/employees/${employeeId}`, {
        type: vaccationType.toLowerCase(),
        count: duration,
      });
      console.log(res.data);
      if (res.data && res.data.data) {
        setAnnualLeave(res.data.data.annualLeave);
        setSickLeave(res.data.data.sickLeave);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDuration = async (
    start: string,
    end: string
  ): Promise<number> => {
    let startVaccation = moment(start);
    let endVaccation = moment(end);

    console.log("startVaccation", startVaccation);
    console.log("endVaccation", endVaccation);

    if (endVaccation.isBefore(startDate)) {
      return -1;
    }

    let total = 0;
    
    while (startVaccation <= endVaccation) {
      console.log("start day number", startVaccation.day());
      console.log("end day number", endVaccation.day());
      if (startVaccation.day() !== 5 && startVaccation.day() !== 6) {
        total++;
      }
      startVaccation = moment(startVaccation).add(1, "days");
    }
    console.log("total", total);
    return total;
  };

  return (
    <div className="App">
      <Sheet title="Select vacation type">
        <Select value={vaccationType} onChange={handleSelect}></Select>
      </Sheet>
      <Sheet title="Create request details">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Input
            type="date"
            label="start"
            onChange={(e: any) => setStartDate(e.target.value)}
          ></Input>
          <Input type="date" label="end" onChange={handleChange}></Input>
        </div>
        <Input type="text" label="days" readonly value={duration}></Input>
        <button
          className="input"
          style={{ width: "100px" }}
          onClick={handleClick}
        >
          Submit
        </button>
      </Sheet>
      <Sheet title="Vacation balance">
        <table>
          <tr>
            <th>Type</th>
            <th>Balance</th>
          </tr>
          <tr>
            <th>Annual</th>
            <td>{annualLeave}</td>
          </tr>
          <tr>
            <th>Sick</th>
            <td>{sickLeave}</td>
          </tr>
        </table>
      </Sheet>
    </div>
  );
}

export default App;
