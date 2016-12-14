const Apps = require('../applications/applicationModel.js');
const Users = require('../users/userModel.js');
const emails = require('./emailModel.js');

var weeklyReminderSender = () => { // fn called in server.js when server starts
  const reg = /\w+/; // regular expression that evaluates to any string containing letters and numbers
  let user; 
  let flag = false; // flag to determin if setIntervl should run inner function
  setInterval(() => {
    const date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    if(day === 2 && hour === 15 && !flag) { // if day is tuesday and hour is 3pm
      flag = true // set flag to true so wont be called again within the hour 
      Users.find({username:reg}, (err, data) => { // find user where username equals regEx.. will return all users
        let users = data; // set users to returned array
        for(let i = 0; i < users.length; i++) { // for each user in the DB
          Apps.find({userId:users[i].id}, (err, apps) => { // find all apps for that user
            let userApps = apps; // set userApps to array of returned applications
            if(userApps.length > 0) { // if the user has open applications
              emails.send(users[i], userApps); // call email.send function that is in emailModel.js passing in the user and array of their apps
            }
          });
        }
      });
    } else if(!(day === 2 && hour === 15)){ // if the day in not tuesday and the hour is not 3pm
      flag = false;
    }
  }, 1000 * 60 * 20); // run setInterval every 20 minutes
};
module.exports = weeklyReminderSender;