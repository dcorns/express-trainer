#Express/Mongo Trainer
Use each successive branch to walk through the steps require to build a MEN stack with CRUD
Start with branch men0
####men0
Initialize package.json and install node dependencies.
npm init (use defaults or be more specific if you choose)
npm install --save body-parser express mongoose
####men1
Build a very basic express server that responds to a request for /; using only the express package.
####men2
Now serves a static index.html in response to a request for /.
####men3
Add express routing
####men4
Add mongodb with mongoose and manual api testing
####men5
Add CRUD
#####Testing CRUD using PostMan
Make a simple request for all users by placing `http://localhost:3000/users` in the postman address bar, selecting get for the request type and then click send. To test adding a user, select post for the request type and open the raw view of body. Put something like `{"username": "Mark Twain"}` in the raw body window. Set the address to `http://localhost:3000/users`. Add the following header pairs and then click send: Content-Type: Application/json, Content-Length: 40. For Update, Read, and Delete, run the view all users test so you can select one of the _ids of what is returned. Use the id after the users path `http://localhost:3000/users/_id` like so for each request. Obviously save delete for last. Use get request to return the user that has the id. For update provide the same raw body date used for adding a user, but use a different name so you can see the change after the update. To delete, simply make the delete request leaving everything else the same.