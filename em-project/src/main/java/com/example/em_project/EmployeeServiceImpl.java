package com.example.em_project;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public String createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        return "Saved Successfully";
    }
     @Override
   public Employee readEmployee( Long id) {
    EmployeeEntity employeeEntity = employeeRepository.findById(id).orElse(null);
       Employee employee = new Employee();
         BeanUtils.copyProperties(employeeEntity,employee);
         return employee;
        
   }
    @Override
    public List<Employee> readEmployees() {
        List<EmployeeEntity> employeeList = employeeRepository.findAll();
        List<Employee> employees = new ArrayList<>();

        for (EmployeeEntity employeeEntity : employeeList) {
            Employee emp = new Employee();
            emp.setId(employeeEntity.getId());
            emp.setName(employeeEntity.getName());
            emp.setEmail(employeeEntity.getEmail());
            emp.setPhone(employeeEntity.getPhone());

            employees.add(emp);
        }

        return employees;
    }

   @Override
public boolean deleteEmployee(Long id) {
    EmployeeEntity emp = employeeRepository.findById(id).orElse(null);
    if (emp != null) {
        employeeRepository.delete(emp);
        return true;
    }
    return false;
}

   @Override
   public String updateEmployee(Long id, Employee employee) {
    EmployeeEntity existingEmployee = employeeRepository.findById(id).get();
    existingEmployee.setEmail(employee.getEmail());
    existingEmployee.setName(employee.getName());
    existingEmployee.setPhone(employee.getPhone());
    employeeRepository.save(existingEmployee);
    return "update Sucessfully";
   }

  
}
