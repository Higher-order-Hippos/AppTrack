const emailConfig = require('./emailConfig');
const nodemailer = require('nodemailer'); // npm package for sending emails
const Users = require('../users/userModel.js');
const path = require('path');

const transporter = nodemailer.createTransport({ // create connection to emails through
  host: 'smtp.gmail.com',
  secureConnection: true,
  auth: {
    user: emailConfig.email_user,
    pass: emailConfig.email_pass
  }
});

const templates = { // each function will return a object filled with user varables that will represent the email template
  newApp: (user ,appInfo) => ( // called in newSend fn below
    {
      from: '"AppTrak" <' + emailConfig.email_user + '>',
      to: user.username + ' <' + emailConfig.email_user + '>',
      subject: 'New Application Created',
      html: `<table><tr><td><img src="cid:unique@appTrak.ee" width="300" height="230" style="display: block;"/></td></tr><br />
            <tr><td><b style="font-size: 125%;">Dear `+user.username+`,</b></td></tr><br /><br />
            <tr><td><b style="font-size: 125%;">You created a new application for `+ appInfo.role +` at `+ appInfo.companyName +`!</b></td></tr>
            <tr><td><h2 style="color: #025FE8">Application ID:<b style="color: #656765">` + appInfo._id + `</b></h2></td></tr>
            <tr><td><p style="font-size: 125%;"><a href="apptrakk.herokuapp.com">Click here to view open applications.</a></p></td></tr></table>`,
      attachments: [{ // add image to email
        filename: 'appTrak.png',
        path: path.join(__dirname + '/image/appTrak.png'), 
        cid: 'unique@appTrak.ee' //same cid value as in the img src
      }]
    }
  ),

  closedApp: (user, appInfo) => ( // called by closedSend fn below
    {
      from: '"AppTrak" <' + emailConfig.email_user + '>',
      to: user.username + ' <' + emailConfig.email_user + '>',
      subject: 'Application Closed',
      html: `<table><tr><td><img src="cid:unique@appTrak.ee" width="300" height="230" style="display: block;"/></td></tr> 
            </tr><br /><tr><td><b style="font-size: 125%;">Dear `+user.username+`,</b></td></tr>
            <br /><br /><tr><td><b style="font-size: 125%;">You closed an application for `+appInfo.role+` at `+appInfo.companyName+`!</b></td></tr>
            <tr><td><h2 style="color: #025FE8">Application ID:<b style="color: #656765">`+appInfo._id+`</b></h2></td>
            <tr><td><p style="font-size: 125%;"><a href="apptrakk.herokuapp.com">Click here to view closed applications.</a></p></td></tr></table>`,
      attachments: [{
        filename: 'appTrak.png',
        path: path.join(__dirname + '/image/appTrak.png'),
        cid: 'unique@appTrak.ee' //same cid value as in the 
      }]
    }
  ),
  weeklyReminder: (username ,userEmail, numberOfApps) => (
    { // called by send fn below
      from: '"AppTrak" <' + emailConfig.email_user + '>',
      to: username + ' <' +  emailConfig.email_user + '>',
      subject: 'Weekly App Reminder',
      html: `<table><tr><td><img src="cid:unique@appTrak.ee" width="300" height="230" style="display: block;"/></td></tr>
            <tr><td><b style="font-size: 125%;">Dear `+username+`,</b></td></tr><br /><br />
            <tr><td><b style="font-size: 125%;">You have `+numberOfApps+` application\'s open!</b></td></tr>
            <tr><td><p style="font-size: 125%;"><a href="apptrakk.herokuapp.com">Click here to view all open applications.</a></p></td></tr></table>`,
      attachments: [{
        filename: 'appTrak.png',
        path: path.join(__dirname + '/image/appTrak.png'),
        cid: 'unique@appTrak.ee' //same cid value as in the 
      }]
    }
  ),
  deletedApp: (user, appInfo) => ( // takes user and appInfo object
    { // called by deletedSend fn below
      from: '"AppTrak" <' + emailConfig.email_user + '>', 
      to: user.username + ' <' +  emailConfig.email_user + '>',
      subject: 'Application Deleted', // email subject
      html: `<table><tr><td><img src="cid:unique@appTrak.ee" width="300" height="230" style="display: block;"/></td></tr>
            <tr><td><br /><b style="font-size: 125%;">Dear `+user.username+`,</b></td></tr><br /><br />
            <tr><td><b style="font-size: 125%;">You deleted an application for `+appInfo.role+` at `+appInfo.companyName+`!</b></td></tr>
            <tr><td><h2 style="color: #025FE8">Application ID:<b style="color: #656765">`+appInfo._id+`</b></h2></td></tr></table>`,
      attachments: [{
        filename: 'appTrak.png',
        path: path.join(__dirname + '/image/appTrak.png'),
        cid: 'unique@appTrak.ee' //same cid value as in the 
      }]
    }
  )
};

//default email template used for testing connection
// var testMailOptions = {
//   from: '"AppTrak" <' + emailConfig.email_user + '>',
//   to: '"AppTrak" <' + emailConfig.email_user + '>',
//   subject: 'Test',
//   html: '<h1 style="color: #025FE8">Application ID:<b style="color: #656765">TEST ID</b></h1><br /><b style="color: #6702FF">TESTING</b>'
// };

// all functions called by routes.js except send
const email = {
  send: (user, userApps) => { // fn is called by weeklyReminder fn in emailHelpers.js
    let options = templates.weeklyReminder(user.username, user.email, userApps.length); // set options to templates.weeklyReminder fn above. params = (username, emailAddress, numberofAppsOpen)
    transporter.sendMail(options, (error, info) => { // call transporter.sendMail with options and callback
      if(error) {
        return console.log('ERROR: ', error); // if error return and console log message
      }
      console.log('Weekly Reminder Message Sent to ' + user.username + ': ', info.response); // if successfull console log message
      transporter.close(); // close transporter
      return info.response; // return info to stop duplicate emails from sending
    });
  },
  newSend: (req, res) => {
    let user;
    Users.find({_id:req.body.data.userId}, (err, result) => { // search for user by userId passed in req
      user = result[0]; // set user to the user object that was returned from DB
      let options = templates.newApp(user, req.body.data); // set options to the returned object from templates.newApp fn above.
      transporter.sendMail(options, (err, info) => { // calls transporter.sendMail built-in fn passing in options and callback
        if(err) { return console.log('ERROR: ', err); } // if error return and console.log error
        console.log('NEW APP Message Sent: ', info.response); // if message sent successfully console log message
        transporter.close(); // close transporter
        res.send(info.response); // send info back to res to stop email from trying to send again
      })
    });
  },
  closedSend: (req, res) => {
    let user;
    Users.find({_id:req.body.data.userId}, (err, results) => { // search for userId passed in req
      user = results[0]; // set user to the user object returned from DB
      if(user) { // if user not undefined
        let options = templates.closedApp(user, req.body.data); // set options to object returned from templates.closedApp fn above
        transporter.sendMail(options, (err, info) => { // calls transporter.sendMail built-in fn passing in options and callback
          if(err) { return console.log('ERROR: ', err); }
          console.log('CLOSED APP Message Sent: ', info.response);
          transporter.close(); // close transporter
          res.send(info.response); // send info back to res to stop email from trying to send again
        });
      }
    });
  },
  deletedSend: (req, res) => {
    let app = req.body.data;
    let user;
    Users.find({_id:req.body.data.userId}, (err, result) => {
      if(err) {console.log("ERROR: ", err)}
      user = result[0];

      let options = templates.deletedApp(user, app); // set options to object returned from templates.deletedApps fn above
      transporter.sendMail(options, (err, info) => { // calls transporter.sendMail built-in fn passing in options and callback
        if(err) { return console.log('ERROR: ', err); } // if error return and console log error
        console.log('DELETED APP Message Sent: ', info.response); // if message sent successfully console log message
        transporter.close(); // closed transporter
        res.send(info.response); // send info back to res to stop email from trying to send again
      })
    });
  }
};
module.exports = email;
