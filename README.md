# Let's creat the project:-

    There is some notes about the apllication in this project we are doing the crud opertaion.

    All the data collection in store in cloude storage.

-   We are creating a templets.
-   First you have to run this in cmd.
    -  express --view=ejs filename
  
##    After this folder is created with the all necceseires files.

    -  After install the npm

    -  After write this in cmd to start the server.
        - SET DEBUG=project:* & npm start
    
    - Go on the browser and check that localhost is running or not.
    
    - Now install the mongoose package.

## Step to creat the application.

    - 1. Creat file named module -> Creat new js file employee.
        
    - 2. In this file require the mongoose -> also creat the employee schema and exports.
    
    - 3. go to route folder -> index.js import the employee file. 
  

## For a upload a file you have to  insert a new module called multer

    - This package is helps you to show a images in your application.
    - To install this package go to cmd and install the package use to npm install multer.(in index.js file)
    - After you have to require the multer package.
    - With the help of this you are able to show images in your browser.
    - You have to specify the path below the multer line.
    - Means which file has done the process of uploading the file.
    - Here we have a spciafic file of uploading the images called fileupload.ejs
    - This path command is used for uploading the file like jpg,zip,pdf etc.

## Creat a new folder named Upload.

    - we are creating this folder beacuse when you upload a file it temporary store in browser memerory.
    - You need a specific container to hold all of this file.
    - so we are creating this folder.
    - In main index file write this command to store this all uploded file.
  
  ```js
            
            router.use(express.static(__dirname+"./public/"));
            var Storage= multer.diskStorage({
            destination:"./public/upload/",
            filename:(req,file,cb)=>{
                cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
            }
            });
            // Define middleware
            var upload = multer({ storage: Storage}).single('file');
  ```

  ## In this project i make the login validation.
    
    - When you are open the application it will give you massage "Please login first".
    - you have to pass this address to login **http://localhost:3000/login**.
    - Than you are able to login in application.
    - After you just have to write localhost:3000/ and press enter
    - And boom you now aple to insert update and delete the record.
    - To logout just write this line in url **localhost:3000/logout**