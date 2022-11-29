const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");

// start sequence of prompts
function init() {
  inquirer
    .prompt([
      {
        name: "managerName",
        type: "input",
        message: "What is the managers name?",
      },
      {
        name: "managerID",
        type: "input",
        message: "What is the managers id?",
      },
      {
        name: "managerEmail",
        type: "input",
        message: "What is the managers email?",
      },
      {
        name: "managerOffice",
        type: "input",
        message: "What is the managers office number?",
      },
      {
        name: "role",
        type: "list",
        message: "Who else will be on the team?",
        choices: ["Engineer", "Intern", "No more employees"],
      },
    ])
    .then((manager) => {
      // create a new Manager object to store the info in and either add more team members or create the html file.
      let newMember = new Manager(
        manager.managerName,
        manager.managerID,
        manager.managerEmail,
        manager.managerOffice
      );
      // all team member class objects will be stored in an array
      let members = [newMember];
      if (manager.role != "No more employees") {
        getMember(manager.role.toLowerCase(), members);
      } else {
        createPage(members);
      }
    });
}

// this function will add a new employee to the array members and use the role given to them
function getMember(role, members) {
  let team = members;
  let info;
  // determin what info is relavent to the employees role for the prompt
  if (role == "engineer") {
    info = "github";
  } else {
    info = "school";
  }
  inquirer
    .prompt([
      {
        name: "employeeName",
        type: "input",
        message: "What is the their name?",
      },
      {
        name: "employeeID",
        type: "input",
        message: `What is the ${role}'s id?`,
      },
      {
        name: "employeeEmail",
        type: "input",
        message: `What is the ${role}'s email?`,
      },
      {
        name: "employeeInfo",
        type: "input",
        message: `What is the ${role}'s ${info}?`,
      },
      {
        name: "role",
        type: "list",
        message: "Who else will be on the team?",
        choices: ["Engineer", "Intern", "No more employees"],
      },
    ])
    .then((member) => {
      // init new member variable and determin the type of employee object to create
      let newMember;
      if (role == "engineer") {
        newMember = new Engineer(
          member.employeeName,
          member.employeeID,
          member.employeeEmail,
          member.employeeInfo
        );
        members.push(newMember);
      } else if (role == "intern") {
        newMember = new Intern(
          member.employeeName,
          member.employeeID,
          member.employeeEmail,
          member.employeeInfo
        );
        team.push(newMember);
      }
      // either create the html page or add another employee
      if (member.role == "No more employees") {
        createPage(team);
      } else {
        getMember(member.role.toLowerCase(), team);
      }
    });
}

// create an index.html according the users input
function createPage(members) {
  let employees = members;
  console.log(members);
  let cards = "";

  var aboveCardTemplate = `<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Team Profile Generator</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<body>
    <header>
        <nav class="navbar bg-dark">
            <div class="container-fluid d-flex justify-content-center">
                <span class="navbar-brand mb-0 h1 p-3 text-light">My Team</span>
            </div>
        </nav>
    </header>

    <div class="container text-center">
        <div class="row justify-content-center m-5">`;

  var belowCardTemplate = `\n
        </div>
    </div>


    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossorigin="anonymous"></script>
</body>

</html>`;

  for (let i = 0; i < employees.length; i++) {
    let newName = employees[i].name;
    let newRole = employees[i].getRole();
    let newID = employees[i].id;
    let newEmail = employees[i].email;

    let newInfo = "";

    if (newRole == "Manager") {
      newInfo = `Office Number: ${employees[i].officeNumber}`;
    } else if (newRole == "Engineer") {
      newInfo = `GitHub: <a href="https://github.com/${employees[i].github}" class="card-link">${employees[i].github}</a>`;
    } else if (newRole == "Intern") {
      newInfo = `School: ${employees[i].school}`;
    } else {
      break;
    }
    let cardTemplate = `\n            <div class="col-4">
                <div class="card bg-dark" style="width: 18rem;">
                    <div class="card-body text-light">
                        <h5 class="card-title">${newName}</h5>
                        <h5 class="card-title">${newRole}</h5>
                    </div>
                    <ul class="list-group list-group-flush bg-light">
                        <li class="list-group-item">ID: ${newID}</li>
                        <li class="list-group-item">Email: <a href="mailto: ${newEmail}" class="card-link">${newEmail}</a></li>
                        <li class="list-group-item">${newInfo}</li>
                    </ul>
                </div>
            </div>`;
    cards = cards + cardTemplate;
  }
  let newPage = aboveCardTemplate + cards + belowCardTemplate;
  fs.writeFile("./src/index.html", newPage, (err) =>
    err ? console.error(err) : console.log("success!")
  );
}

init();
