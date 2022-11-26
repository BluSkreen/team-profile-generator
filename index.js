const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");

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
      //   console.log(manager);
      let newMember = new Manager(manager.name, manager.id, manager.email, manager.officeNumber);
      let members = [newMember];
      if (manager.role != "No more employees") {
        getMember(manager.role.toLowerCase(), members);
      } else {
        createPage(members);
      }
    });
}

function getMember(role, members) {
  // let members = [];
  //    const count = members.length - 1;
  let team = members;
  let info;
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
      if (member.role == "No more employees") {
        createPage(team);
      } else {
        getMember(member.role.toLowerCase(), team);
      }
    });
}

function createPage(members) {
  console.log(members);
}

init();
