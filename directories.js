const input = `CREATE fruits
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
LIST`;

class Node {
  constructor(itemName) {
    this.itemName = itemName;
    this.children = [];
    this.parent = null;
  }
  addChild(child) {
    this.children.push(child);
  }

  findChild(childName) {
    return this.children.find((child) => child.itemName === childName);
  }

  addParent(parent) {
    this.parent = parent;
  }
}

class System {
  constructor() {
    this.root = new Node("root");
    this.commandLogs = [];
  }

  addLog(log) {
    this.commandLogs.push(log);
  }

  searchNodes(segments) {
    let current = this.root;
    for (let segment of segments) {
      //check if child of currrent node
      let childNode = current.findChild(segment);
      if (childNode) {
        current = childNode;
      } else {
        console.log(
          `Could not perform operation. ${segment} is not a child of ${current.itemName}`
        );
        return;
      }
    }
    return current;
  }

  organizeDirectories(commandStr) {
    const commandList = commandStr.split("\n");
    for (let i = 0; i < commandList.length; i++) {
      this.determineOperation(commandList[i]);
    }
  }

  determineOperation(command) {
    //handle empty string
    //handle if split command length is 1, and is not list, the coommand is not complete give an example of correct format
    const splitCommand = command.split(" ");
    const operation = splitCommand[0].toLowerCase();
    switch (operation) {
      case "create":
        this.createItem(splitCommand[1]);
        break;
      case "move":
        this.moveItem(splitCommand[1], splitCommand[2]);
        break;
      case "delete":
        this.deleteItem(splitCommand[1]);
        break;
      case "list":
        this.listSystemTree();
        break;
      default:
        console.log(
          `The command ${operation} does not exist. Please begin with a valid command. (CREATE, MOVE, DELETE, LIST)`
        );
    }
  }

  createItem(itemPath) {
    //separate name of new item from path to create
    const splitPath = itemPath.split("/");
    const itemName = splitPath.pop();
    const segments = splitPath;

    let currentNode;
    if (segments.length === 0) {
      const newNode = new Node(itemName);
      newNode.addParent(this.root);
      this.root.addChild(newNode);
      this.addLog(`CREATE ${itemPath}`);
      return;
    } else {
      currentNode = this.searchNodes(segments);
    }

    const newItem = new Node(itemName);
    newItem.addParent(currentNode);
    currentNode.addChild(newItem);
    this.addLog(`CREATE ${itemPath}`);
  }
  moveItem(itemPath, destinationPath) {
    const item = this.searchNodes(itemPath.split("/"));
    const destination = this.searchNodes(destinationPath.split("/"));

    const index = item.parent.children.indexOf(item);
    item.parent.children.splice(index, 1);
    item.parent = destination;
    destination.addChild(item);
    this.addLog(`MOVE ${itemPath} ${destinationPath}`);
  }

  deleteItem(itemPath) {
    const splitPath = itemPath.split("/");
    let currentNode;

    this.addLog(`DELETE ${itemPath}`);
    currentNode = this.searchNodes(splitPath);

    if (!currentNode) {
      this.addLog(`Cannot delete ${itemPath} - fruits does not exist`);
      return;
    }
    //remove currentNode from its parent's children
    const index = currentNode.parent.children.indexOf(currentNode);
    currentNode.parent.children.splice(index, 1);

    currentNode.parent = null;
    currentNode.children = null;
  }

  listSystemTree() {
    this.addLog(`LIST`);
    const printTree = (node, indent = "") => {
      if (node.itemName !== "root") {
        node.children &&
          node.children.sort((a, b) => a.itemName.localeCompare(b.itemName));
        this.addLog(`${indent}${node.itemName}`);
      }
      for (const child of node.children) {
        printTree(child, indent + " ");
      }
    };
    printTree(this.root);
  }

  printLogs() {
    const logStr = this.commandLogs.join("\n");
    console.log(logStr);
    return logStr;
  }
}

const createSystem = (input) => {
  const newSystem = new System();
  newSystem.organizeDirectories(input);
  newSystem.printLogs();
};

createSystem(input);
