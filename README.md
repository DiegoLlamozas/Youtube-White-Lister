# Youtube-White-Lister

# Setting Up a Node.js and React Project with Visual Studio Code

This guide will walk you through the process of setting up a Node.js and React project on your machine, along with installing Visual Studio Code, a popular code editor.

## Step 1: Install Node.js and npm

1. Go to the Node.js website: [Node.js](https://nodejs.org/)
2. Download the LTS (Long Term Support) version suitable for your operating system.
3. Follow the installation instructions provided for your operating system.
4. Verify the installation by opening a terminal (or command prompt) and running:
    ```
    node -v
    npm -v
    ```

## Step 2: Install Visual Studio Code

1. Go to the Visual Studio Code website: [Visual Studio Code](https://code.visualstudio.com/)
2. Download the version suitable for your operating system.
3. Follow the installation instructions provided for your operating system.

## Step 3: Clone the GitHub Repository

1. Open a terminal (or command prompt).
2. Navigate to the directory where you want to clone the repository.
3. Use the `git clone` command followed by the URL of the GitHub repository:
    ```
    git clone <repository-url>
    ```
    Replace `<repository-url>` with the actual URL of the GitHub repository.

## Step 4: Navigate into the Project Directory

1. Use the `cd` command to change into the directory of the cloned repository:
    ```
    cd <repository-name>
    ```
    Replace `<repository-name>` with the name of the directory created during cloning.

## Step 5: Install Project Dependencies

1. Inside the project directory, run:
    ```
    npm install
    ```
    This command will install all the dependencies listed in the `package.json` file.

## Step 6: Start the Development Server

1. After installing dependencies, start the development server by running:
    ```
    npm start
    ```
    This command will start a local development server which will serve your React application.

## Step 7: Access the Application

1. Open a web browser and go to `http://localhost:3000` (unless specified otherwise in the project).
2. You should see your React application running locally.

That's it! You've successfully set up and run the GitHub project on your machine, along with installing Visual Studio Code.
