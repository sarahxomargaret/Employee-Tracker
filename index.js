const inquirer = require("inquirer");
const Department = require("./lib/department");
const Role = require("./lib/role");
const Employee = require("./lib/employee");
const figlet = require("figlet");
const connection = require("./config/db");

// Questions
const main_menu = [
  {
    type: "list",
    name: "main_menu",
    message: "What would you like to do? (Scroll and choose 'EXIT' to exit)",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "EXIT",
    ],
  },
];


// prompt goes back to main menu unless they exit
let db;
async function init() {
  db = await connection;
  inquirer
    .prompt(main_menu)
    .then((main_menu_answer) => nextStep(main_menu_answer));
}

// switch/case for each main menu choice
async function nextStep(main_menu_answer) {
  const dept = new Department(db);
  const employee = new Employee(db);
  const role = new Role(db);
  let deptList = await dept.getList();
  let empList = await employee.getList();
  let roleList = await role.getList();

  switch (main_menu_answer.main_menu) {
    case "View All Employees":
      await employee.getTable();
      break;
    case "View All Roles":
      await role.getTable();
      break;
    case "View All Departments":
      await dept.getTable();
      break;
    case "Add Department":
      await addDepartment(dept);
      break;
    case "Add Employee":
      await addEmployee(employee, roleList, empList);
      break;
    case "Add Role":
      await addRole(role, deptList);
      break;
    case "Update Employee Role":
      await updateEmployeeRole(employee, empList, roleList);
      break;
    case "EXIT":
      process.exit();
  }
  init();
}

// add a new dept
async function addDepartment(dept) {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the name of the new department?",
      },
    ])
    .then((new_department_answer) => {
      dept.addDept(new_department_answer);
      console.log(
        `\nAdded ${new_department_answer.department_name} to the database.\n`
      );
    });
}

// add a new employee
async function addEmployee(employee, roleList, empList) {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name? ",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name? ",
      },
      {
        type: "list",
        name: "employee_role",
        message: "What is this employee's role? ",
        choices: roleList,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager? ",
        choices: empList,
      },
    ])
    .then((new_employee_answers) => {
      employee.addEmployee(new_employee_answers, empList, roleList);
      let fullName = `${new_employee_answers.first_name} ${new_employee_answers.last_name}`;
      console.log(`\nAdded ${fullName} to the database.\n`);
    });
}

// add a new role
async function addRole(role, deptList) {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "new_role",
        message: "What is the name of the new role? ",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role? (example: 100000) ",
      },
      {
        type: "list",
        name: "department",
        message: "Which department does this role belong to? ",
        choices: deptList,
      },
    ])
    .then((new_role_answers) => {
      role.addRole(new_role_answers, deptList);
      console.log(`\nAdded new role to the database.\n`);
    });
}

// update existing employee
async function updateEmployeeRole(employee, empList, roleList) {
  await inquirer
    .prompt([
      {
        type: "list",
        name: "update_employee",
        message: "Choose the employee below you would like to update: ",
        choices: empList,
      },
      {
        type: "list",
        name: "update_role",
        message: "Which role do you want to assign to the selected employee? ",
        choices: roleList,
      },
    ])
    .then((update_employee_answers) => {
      employee.updateEmployee(update_employee_answers, roleList);
      console.log(
        `\nUpdated ${update_employee_answers.update_employee}'s role.\n`
      );
    });
}


