import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const EmployeeList = () => {
  const[loading,setloading]=useState(true);
  const [employees,setEmployees]=useState(null);

  useEffect(()=>{
   const  fetchData = async () => {
    setloading(true);
      try{
const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      }
      catch(error) {
        console.log(error);
      }
      setloading(false);
    };
    fetchData();
  },[]);

  const deleteEmployee = (e,id) =>{
    e.preventDefault();
    EmployeeService.deleteEmployeeById(id)
        .then(() => {
          if(employees){
         setEmployees((prevElement)=>{
          return prevElement.filter((employee) => employee.id !== id);
         })
        }
        })
  };


  const editEmployee = (e,id) =>{
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  }


  const navigate = useNavigate();
  return (
      <div className="container mx-auto my-8">
        <div>
          <button 
          onClick={()=>navigate("/addEmployee")} className="bg-slate-600 hover:bg-blue-700 mx-40 my-12 font-semibold px-20 py-2 rounded text-white">
            Add Employee 🧑‍💻
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mx-40">
          <table className="shadow">
            <thead className="bg-slate-600">
              <tr>
                <th className="px-6 py-3 uppercase tracking-wide">Name</th>
                <th className="px-6 py-3 uppercase tracking-wide">Phone</th>
                <th className="px-6 py-3 uppercase tracking-wide">Email</th>
                 <th className="px-6 py-3 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            {!loading &&(
            <tbody >
              {employees.map((employee) => (
              <tr className='group hover:bg-slate-700'>
                <td className="text-white px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="text-white px-6 py-4 whitespace-nowrap">{employee.phone}</td>
                <td className="text-white px-6 py-4 whitespace-nowrap">{employee.email}</td>
                <td className='text-left px-6 py-4 whitespace-nowrap'>
                <a onClick={(e,id)=> editEmployee(e,employee.id)} className='hover:bg-green-500 hover:cursor-pointer'> Edit ✏️ </a>
                <a onClick={(e,id)=> deleteEmployee(e,employee.id)} className='hover:bg-red-500 hover:cursor-pointer'> Delete 🗑️ </a>
                </td>
               </tr>
              ))}
            </tbody>
            )} 
          </table>
        </div>
      </div>
  )
}

export default EmployeeList