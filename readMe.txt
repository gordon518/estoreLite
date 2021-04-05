======Run app guide=========

1. Extract this rar file to a folder, for example: c:\tmp, so the working folder is c:\tmp\estore.

2. Install mysql database 5.5 or above, keep the username and password default(username:root,password:null) for mysql.

3. Run the file of estore.sql in the c:\tmp\estore\doc folder, for example:
mysql -h localhost -u root -p < C:\tmp\estore\doc\estore.sql

4. Install node.

5. Open cmd window, run the following command to start the node app:
cd c:\tmp\store
node ./

6. Open web browser, such as firefox,chrome,IE. Go to the URL of http:\\localhost:8080 to show login page, input "aa" as username and "11" as password to login.

======Other documents==========

1. The file of setupGuide.rtf describes how to setup the smartweb framework to develop.

2. The URL of https://github.com/gordon518/smartweb describes the features of the smartweb framework.