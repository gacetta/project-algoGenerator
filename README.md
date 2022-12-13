# project-algoGenerator
Unit6 task

## About
This app allows the user to explore different algorithms from a dropdown menu.
On selection, they are provided with information about the algo as well as the ability to run the algorithm.

## To Run on Local Machine
To run, install dependencies using `npm install` in the terminal.  
Then `npm run dev-server` will open the app in a new window in your browser to test.

## To add new algo files
format algorithm as an object and export as default.
Function object should contain the following info:

const functionName = {
  name: 'function name here',
  description: 'provide a description of required arguments and what function does',
  args: an array containing all the expected arguments in order and what datatype they should be e.g ['number', 'array', 'boolean'],
  funcBody: 'your function goes here'
}

export { functionName as default }