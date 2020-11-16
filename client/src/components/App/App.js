import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [employee, setEmployee] = useState({
    name : '',
    age: 0,
    country: '',
    position: '',
    salary: 0,
  });

  const [employees, setEmployees] = useState([]);


  const handleChange = e => {
    const { name, value } = e.target;
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      [name] : value
    }));
  };

  const handleOnSubmit = () => {
    console.log({...employee});
    axios.post("http://localhost:3001/addemployee/", null, {params: employee})
      .then(res => {
        console.log(res.data);
      })
    setEmployee({name: '', age: 0, country: '', position: '', salary: 0});
  }

  const fetchEmployees = () => {
    axios.get("http://localhost:3001/getEmployee")
      .then (res => setEmployees(res.data));
    console.log(employees);
  }

  return (
    <div className="App">
      <div className="informations">
        <label>Name:</label>
        <input type="text" onChange = {handleChange} name="name" value={employee.name}/>
        <label>Age:</label>
        <input type="number" onChange = {handleChange} name="age" value={employee.age === 0 ? '' : employee.age}/>
        <label>Country:</label>
        <input type="text" onChange = {handleChange} name="country" value={employee.country}/>
        <label>Position:</label>
        <input type="text" onChange = {handleChange} name="position" value={employee.position}/>
        <label>Salary:</label>
        <input type="number" onChange = {handleChange} name="salary" value={employee.salary === 0 ? '' : employee.salary}/>
        <button onClick={handleOnSubmit}>Add Employee</button>
        <hr></hr>
        <button onClick={fetchEmployees}>Get all Employee</button>
        {
          employees.length > 0 ?
                  <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Country</th>
                      <th>Position</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                {
                  employees.length > 0 ?
                    employees.map((item, index) => {
                      if(item.age !== undefined && item.age != 0) {
                        return(
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.country}</td>
                            <td>{item.position}</td>
                            <td>{item.salary}</td>
                          </tr>
                        );
                      }
                    })
                  : null
                }
                </table> : null
        }

      </div>
    </div>
  );
}

export default App;
