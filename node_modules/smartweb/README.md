Setup Guide:

1. Assuming you¡¯ve already installed Node.js, create a directory to hold your application, and make that your working directory.
$ mkdir myapp
$ cd myapp

2. Use the npm init command to create a package.json file for your application. For more information on how package.json works, see Specifics of npm¡¯s package.json handling.
$ npm init
This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

entry point: (index.js)
Enter app.js, or whatever you want the name of the main file to be. If you want it to be index.js, hit RETURN to accept the suggested default file name.

3. Now install smartweb in the myapp directory and save it in the dependencies list. For example:
$ npm install smartweb --save

4. Create some folders for smartweb.
$ mkdir web
$ mkdir controller
$ mkdir view
The web folder is for htm or ejs files. The controller folder is for controller. The view folder is for ejs files.

5. Create the app.js file in the current folder. The file is as following:
var smart = require("smartweb");
smart.start(8080);

Developing Guide:
1. Create the file of ejs.js in the folder of controller as following:
var smart = require("smartweb");

module.exports = {
	get: function(req, res) {
		console.log("ejs:get() starting");
		var data={  
			names: ['foo', 'bar', 'baz']  
		};
		smart.showView(res, "list.ejs", data); //load list.ejs in the folder of view
	}
};

2. Create the file of list.ejs in the folder of view as following:
    <% if (names.length) { %>
      <ul>
        <% names.forEach(function(name){ %>
          <li foo='<%= name + "'" %>'><%= name %></li>
        <% }) %>
      </ul>
    <% } %>

3. Test the code:
(1) Change the folder to myapp, and run the following command:
$ node ./

(2) Open a web browser, such as IE, chrome, firefox. Try the address of http://localhost:8080/ejs.do. The url will call the controller of ejs.js, and show the view of list.ejs.
    In smartweb, the ".do" extention will call the controller, others will load the files in the folder of web.