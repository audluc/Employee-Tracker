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
        console.log(answers)
      connection.query("INSERT INTO department SET ?", {name: answers.name}, function (
        error,
        result
      ) {
        if (error) throw error;
        console.log ("department created")
        connection.end()
      });
    });
}
