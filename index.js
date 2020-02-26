const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios")

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?"
        },
        {
            type: "input",
            name: "screenshot",
            message: "Input screenshot path."
        },
        {
            type: "input",
            name: "project",
            message: "What is your project title?"
        },
        {
            type: "input",
            name: "description",
            message: "Please describe your project?"
        },
        {
            type: "confirm",
            name: "installationConfirm",
            message: "Is there an installation process?"
        }, {
            when: function (response) {
                return response;
            },
            type: "input",
            name: "installation",
            message: "What is the installation process?"
        },
        {
            type: "input",
            name: "usage",
            message: "What can this application be used for?"
        },
        {
            type: "list",
            name: "license",
            message: "Please select the license you would like to use.",
            choices: ["MIT", "Apache", "GPLv3"]
        },
        {
            type: "confirm",
            name: "contributeConfirm",
            message: "Are you interested in other developers contributing to your project?"
        }, {
            when: function (response) {
                return response;
            },
            type: "input",
            name: "contribute",
            message: "How would you like contributions to be made?"
        },
        {
            type: "confirm",
            name: "testingConfirm",
            message: "Does this application require any testing?"
        }, {
            when: function (response) {
                return response;
            },
            type: "input",
            name: "testing",
            message: "Please explain how to run the tests"
        }
    ]);
}

// let email;
// let profileImg;

// function githubGet(answers) {
//     const username = answers.username;
//     const queryUrl = `https://api.github.com/users/${username}`;

//     axios.get(queryUrl).then((res) => {
//         profileImg = res.data.avatar_url;
//         email = res.data.email;
//         return profileImg, email
//     })

//     return {
//         email: email,
//         img: profileImg
//        }

// };

function generateReadMe(answers, gitObj) {
    return `
![last commit](https://img.shields.io/github/last-commit/sldelay/README_generator-)
# ${answers.project}
${answers.description}
![alt text](${answers.screenshot})
## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [Licensing](#Licensing)
- [Contribution](#Contribution)
- [Testing](#Testing)
- [Questions](#Questions)
## Installation 
${answers.installation}
## Usage
${answers.usage}
## Licensing
${answers.license}
## Contribution
${answers.contribute}
## Testing
${answers.testing}
## Questions
${gitObj.contact}
![alt txt](${gitObj.img})
    `
}

async function init() {

    try {

        const answers = await promptUser();

        const username = answers.username;
        const queryUrl = `https://api.github.com/users/${username}`;

        const gitObj = await axios.get(queryUrl).then((res) => {
            profileImg = res.data.avatar_url;
            email = res.data.email;
            return {
                contact: email,
                img: profileImg
            }
        })

        // const gitObj = await githubGet(answers);

        const README = await generateReadMe(answers, gitObj);

        await writeFileAsync("README.md", README);

        console.log("Successfully wrote to README.md");
    } catch (err) {
        console.log(err);
    }

};

init()



