# project-algoGenerator
Unit6 task & Unit8 additional task

## About
This app allows the user to explore different algorithms from a dropdown menu.
On selection, they are provided with information about the algo as well as the ability to run the algorithm.

## To Run on Local Machine
To run, install dependencies in bock Frontend and Backend folders using `npm install` in the terminal.  
To start server, `npm run dev` from the backend folder.

## To add new algo files
format algorithm as an object and export as default.
Function object should contain the following info:

    const functionName = {
      id: '1' 
      name: 'function name here',
      description: 'provide a description of required arguments and what function does',
      args: an array containing all the expected arguments in order and what datatype they should be e.g ['number', 'number', 'boolean'],
      funcBody: 'your function goes here'
    }

    export { functionName as default }
