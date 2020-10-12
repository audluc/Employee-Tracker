const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees",
});
connection.connect(function (error) {
  if (error) throw error;
  start();
});
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What do you want to do?",
        choices: [
          "view all employees",
          "add employee",
          "remove employee",
          "view department",
          "add department",
          "remove department",
          "view roles",
          "add role",
          "remove role",
          "quit",
        ],
      },
    ])
    .then(function (answers) {
      switch (answers.options) {
        case "add department":
          return addDepartment();
        case "view department":
          return viewDepartment();
        case "add role":
          return addRole();
        case "view roles":
          return viewRole();
        case "view all employees":
          return viewAllEmployees();
        case "add Employee":
          return addEmployee();
        default:
          return process.exit();
      }
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "deparment name",
        name: "name",
      },
    ])
    .then(function (answers) {
      console.log(answers);
      connection.query(
        "INSERT INTO department SET ?",
        { name: answers.name },
        function (error, result) {
          if (error) throw error;
          console.log("department created");
          connection.end();
        }
      );
    });
}
function viewDepartment() {
  connection.query("SELECT * FROM department", function (error, result) {
    if (error) throw error;
    console.table(result);
    connection.end();
  });
}
function addRole() {
  connection.query("SELECT * FROM department", function (error, result) {
    if (error) throw error;
    const departments = result.map(function (dep) {
      return { value: dep.id, name: dep.name };
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your title",
          name: "title",
        },
        {
          type: "input",
          message: "What is your salary",
          name: "salary",
        },
        {
          type: "list",
          choices: departments,
          message: "What is your department ID?",
          name: "department_id",
        },
      ])
      .then(function (answers) {
        console.log(answers);
        connection.query("INSERT INTO role SET ?", answers, function (
          error,
          result
        ) {
          if (error) throw error;
          console.log("role created");
          connection.end();
        });
      });
  });
}
function viewRole() {
  connection.query(
    "SELECT * FROM role LEFT JOIN department ON role.department_id = department.id",
    function (error, result) {
      if (error) throw error;
      console.table(result);
      connection.end();
    }
  );
}
function addEmployee() {
  connection.query("SELECT * FROM employee", function (error, result) {
    if (error) throw error;
    const employee = result.map(function (emp) {
      return { value: emp.role, name: emp.name };
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your first name?",
          name: "first_name",
        },
        {
          type: "input",
          message: "What is your last name?",
          name: "last_name",
        },
        {
          type: "input",
          message: "What is your role?",
          name: "role",
        },
      ])
      .then(function (answers) {
        console.log(answers);
        connection.query("INSERT INTO employee SET ?", answers, function (
          error,
          result
        ) {
          if (error) throw error;
          console.log("employee created");
          connection.end();
        });
      });
  });
}
function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (error, result) {
    if (error) throw error;
    console.table(result);
    connection.end();
  });
}
