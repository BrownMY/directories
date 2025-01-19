# Files Description

The `directories` file contains a class `System` that has several methods for handling a file system. The methods are:

- `createItem` - Creates a new item in the file system at the specified path.

- parameters:

- the path of the file to create (i.e. `'fruits/apples/fuji'`)

- `moveItem` - Move an item in the file system at the specified path, to another location.

- parameters:

- the path of the file to move (i.e. `'fruits/apples/fuji'`)

- destination path

- `deleteItem` - Deletes an item in the file system at the specified path.

- parameters:

- the path of the file to delete (i.e. `'fruits/apples/fuji'`)

- `listSystemTree` - (WIP) - Lists the current file structure.

- This method does not accept parameters

### Helper methods

- `addLog`

- `searchNodes`

- `organizeDirectories`

- `determineOperation`

# Input

The input should be a string or temporal literal of a command or several commands, separated by a new line. Each line must begin with a command.

Ex:

```



`CREATE fruits



CREATE vegetables



CREATE grains



CREATE fruits/apples



CREATE fruits/apples/fuji



LIST



CREATE grains/squash



MOVE grains/squash vegetables



CREATE foods



MOVE grains foods



MOVE fruits foods



MOVE vegetables foods



LIST



DELETE fruits/apples



DELETE foods/fruits/apples



LIST`



```

# OutPut

The application will print and return the logs of all operations made in the file system with the current input.

Ex:

```



CREATE fruits



CREATE vegetables



CREATE grains



CREATE fruits/apples



CREATE fruits/apples/fuji



LIST



fruits



apples



fuji



grains



vegetables



CREATE grains/squash



MOVE grains/squash vegetables



CREATE foods



MOVE grains foods



MOVE fruits foods



MOVE vegetables foods



LIST



foods



fruits



apples



fuji



grains



vegetables



squash



DELETE fruits/apples



Cannot delete fruits/apples - fruits does not exist



DELETE foods/fruits/apples



LIST



foods



fruits



grains



vegetables



squash



```

# Running the application:

Before running this application, paste your input into the `input` variable at the top of the file. See above in **Input** for acceptable syntax. Once this is done, you can run this application with the command:

`node directories.js`

# With more time:

- A more robust README with more details about the class methods.

- More detailed error handling at each operation method (checking for the right number of parameters, etc.)

- More clear comments for other devs that may work in this file.

- More cohesive naming conventions

- DRYing out the code, perhaps breaking methods into small, more specialized methods for cleaner code

- Proper sorting of the listed tree - making sure the sorting of child array is happening in the right place

- Allow user to run full script from command line.

- Adding Tests - Some that come to mind:

  - testing for correct inputs and outputs for all operations.

  - ie. `createItem` should have one input, while `moveItem` has 2.

  - handling empty inputs

  - checking that errors are displayed correctly

  - checking the hierarchy of structure - is it correct?

  - checking that moving items has prop data cleanup after

# Thoughts

I had a lot of fun with this challenge! Thanks for your time reviewing.
