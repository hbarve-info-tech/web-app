**Mayash Webapp**

This webapp is based on Node.js.

Technologies we are using:

1. **For Front-end**.

    a. **Design**:
    
        1. Material Design Lite.
        
    b. **Development**:
    
        1. React.js: For displaying data.
        2. Redux.js: For storing data of website in browser.
        3. Webpack v2.x: for bundling
        4. Babel: for converting ES6 Javascript to ES5 Javascript.
        

2. **For Back-end**:

    a. **Server**:
    
        1. Hapi.js
        2. Hapi's plugins for adding features
        3. Hapi-auth-jwt2
        
    b. **Database**:
    
        1. Google's Datastore: As this database is a google's service, we recommand you not to use the production 
            database for development purpose. So you need to install Datastore in your system locally.
        
        2. For Caching:
        
            These type of databases stores data temporarily.


3. For development Purpose:

    a. To install all the dependencies to your system.
    
        npm install
        
    b. To run Datastore database locally.
        
        **Note**: You need to configure datastore locally in your system to run it.
    
        npm run dev:db
        
    c. To run Sever in development configuration.
    
        npm run dev:server
    
    d. To build and run front-ent(client-side) part.
    
        npm run dev:client
    
    e. To run Redux dev server.
    
        npm run dev:redux


**Note**: run '2' to '4' common on separate terminal.



4. File Structure:

    This section will give you a brief introduction about how our code has 
    been modularize.
    
    a. app.yaml
    
        this file contains all the setting related to Google's app engine.
        Please don't modify it without admin permission.
        
    b. .babelrc
    
        This file contain settings related to transpiling ES6 JavaScript to
        ES5 JS.
        
    c. .eslint
    
        this file contains all the coding pattern guideline.
        
    d. webpack folder
        
        This folder contains configuration files for development and production of client side code.
        
    e. test
    
        In this folder we will add all the test that are required to test whole code.
        
    f. src
    
        This folder contains all the source code of our website, including server and client.
       
       1. server:
       
                this folder contains all the code related to server.
                
       2. client:
       
                This folder contains all the code of client side.(Means react.js, redux.js)
                
       3. lib:
                
       
       3. lib
       4. template
    
        
