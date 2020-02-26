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
            message: "Input screenshot url."
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
            name: "Usage",
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


function githubGet(answers) {
    const username = answers.username;
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
        let profileImg = res.data.avatar_url;
        let email = res.data.email;
        let gitArr = [`${email}`,`${profileImg}`];
        return gitArr;
    })
}

async function init() {

    try {

        const answers = await promptUser();

        const gitArr = await githubGet(answers);

        const README = generateReadMe(answers, gitArr);

        await writeFileAsync("README.md", README);
    } catch (err) {
        console.log(err);
    }

};

init()



// https://img.shields.io/github/last-commit/sldelay/README_generator-

