# AppTrack

AppTrack helps job seekers keep track of multiple applications. Users can add new applications and review existing ones, adding further information on the interview process as it unfolds.

The mongo database is hosted on https://mlab.com. It currently contains one collection for applications ("positions") - and another for users.

**Here are some examples of added functionality which might serve AppTrack _well_**:

1 - **Completed Authentication**: Upon signup as of now, the new user's name and password are successfully stored to our MongoDB. However, the password is never hashed. In addition, though creating sessions upon signup worked for a time it no longer does, nor does Login for existing users. A user should have access to their own personal applications.

2 - **Spreadsheet Integration**: The database was structured to reflect a spreadsheet provided to all students upon graduating Hack Reactor. It is part of a document referred to as 'The Plan'. There are multiple npm modules which may allow for the easy populating of that spreadsheet by our database, allowing users to easily provide all data requested by the school in its original format.

3 - **To Dos / Suggested Actions**: Based on data such as the last contact with a given employer or the current active stage of any given application, AppTrack could suggest actions such as writing thank-you notes.

4 - **Job Search Api Integration**: Allow users to populate New Application forms using data from APIs such as Indeed.

5 - **Graphical Analytics**: Display application data to user in a way that most helps them modify their behavior for optimal results. For example - does one version of a resume tend to receive more response from employers?

6 - **Interview Tips**: Allow users to share tips on interviews for specific employers. For example, what type of code challenge was given?

[![Stories in Ready](https://badge.waffle.io/ooOysters/AppTrack.png?label=ready&title=Ready)](http://waffle.io/ooOysters/AppTrack)

Deployed on Heroku, take a look here: https://apptrakk.herokuapp.com
