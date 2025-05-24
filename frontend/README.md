# Getting Started with Create React App

Step 1: Open the Main folder where you want to create your react app

Step 2: Run the command \
    ```npx create-create-app <appname>```

Step 3: This creates a folder with the app name.Move to that folder using command\
        ``` cd <folder/appname>```

Step 4: Incase of any version conflicts run the below commands:\
        ```npm install react@18 react-dom@18``` \
        ```npm install react@^18.0.0 react-dom@^18.0.0```

Step 5: Start creating components in the src.

Step 6: Install required dependencies.

Step 7: HAPPY CODING :)



## INSTALLING DEPENDENCIES:

1. REACT BOOTSTRAP \
Cannot be done using CDN links...like we do for Plain Bootstrap\
so use the following command:\
```npm install react-bootstrap bootstrap```\
While react-bootstrap gives you the components, you still need to include Bootstrap’s CSS so that these components are styled correctly.\
So in the App.js Include:\
  ```import 'bootstrap/dist/css/bootstrap.min.css';```

2. If required:\
```npm install web-vitals``

3. REACT-ROUTER-DOM
```npm install react-router-dom``` \
if error or warning
```npm install react-router-dom@6```

4. To send and receive requests from backend
  ```npm i axios```

5. To send SMS messages to a particular parent,
        ```npm i twilio```

6. To display Dat and Time in reqyired Format (DD-MM-YYYY  and IST Time)
        ```npm intall moment```
        ```npm install moment-timezone```

============================================================================

## Running Frontend and Backend
1. Start backend
