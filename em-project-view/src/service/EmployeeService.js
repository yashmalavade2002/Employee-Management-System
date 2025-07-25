import axios from 'axios';
const EMPLOYEE_SAPI_BASE_URL = "http://localhost:8080/employees"
class EmployeeService{
    SaveEmployee(employee) {
        return axios.post(EMPLOYEE_SAPI_BASE_URL, employee);
    }

    getEmployees() {
        return axios.get(EMPLOYEE_SAPI_BASE_URL);
    }

    getEmployeeById(id) {
        return axios.get(EMPLOYEE_SAPI_BASE_URL + "/ "+id);
    }

     deleteEmployeeById(id) {
        return axios.delete(EMPLOYEE_SAPI_BASE_URL + "/ "+id);
    }

     updateEmployee(employee,id) {
        return axios.put(EMPLOYEE_SAPI_BASE_URL + "/ "+id, employee);
    }
}

export default new EmployeeService();