if(typeof require != 'undefined') {
    Command = require('./command-node.js');
    CommandPath = require('./command-path.js');
}

class CommandTree {
    constructor() {
        this._rootCmdNode = undefined;
        this._currentCmdNode = undefined;
        this._lastCmdNode = undefined;
    }

    Clean(){
        this._rootCmdNode = undefined;
        this._currentCmdNode = undefined;
        this._lastCmdNode = undefined;
    }

    _insert(current, parent, command) {

        if(current == undefined) {
            current =  new CommandNode(command);
            if(parent != undefined) {
                current = new CommandNode(command);
                parent.AddChild(current);   
            }

            this._currentCmdNode = current; 
            return current;
        }

        parent = current;
        if(current.Children().length != 0){
            current = current.ChildTopNode(); 
        }
        else {
            current = undefined;
        }

        current = this._insert(current, parent, command);
        
        return parent == current.Parent()? parent:current;    
    }

    Insert(command){
        this._rootCmdNode = this._insert(this._rootCmdNode,this._rootCmdNode,command );
        if(this._currentCmdNode == undefined) {
            this._currentCmdNode = this._rootCmdNode;
        }
        this._lastCmdNode = this._currentCmdNode;
        return this._currentCmdNode;
    }

    Search(current, key){
        if(current == undefined){
            return undefined;
        }

        if(current.getKey() == key){
            return current.Command();
        }
        
        current.getChildren().forEach((node) => {
            this.Search(node,key);
        },this);
                
        return undefined;
    }


    MoveUp(){
        let current = undefined;

        if((this._currentCmdNode == undefined)){
            if(this._rootCmdNode == undefined){
                console.error("Command Tree is Emty: Game is not Started");
                return undefined;
            }
            else{
                this._currentCmdNode = this._rootCmdNode;
            }
        }

        if( this._currentCmdNode.Key() === this._currentCmdNode.Parent().Key()){
            current = this._currentCmdNode;
            this._currentCmdNode = undefined;
            return current.Command();
        }
        else{
            current = this._currentCmdNode;
            this._currentCmdNode = this._currentCmdNode.Parent();
            return current.Command();
        }
    }

    NextBranchNode(current){
        if(current == current.Parent()){
            return current;
        }

        if(current.Children.length > 1){
            return current.Children()
        }

        this.nextBranchNode(current.Parent());
    }

    /**
     * TODO:// extensive support 
     * @returns 
     */

     MoveDown(){
        let current=undefined;
        if((this._currentCmdNode == undefined)){
            if(this._rootCmdNode == undefined){
                console.error("Command Tree is Emty: Game is not Started");
                return undefined;
            }
            else if(this._lastCmdNode != undefined){
                console.error("Redo Not Possible");
                return undefined;
            }
            else{
                this._currentCmdNode = this._rootCmdNode;
                return this._currentCmdNode.Command();
            }
        }

        if(this._currentCmdNode == this._lastCmdNode){
            current = this._currentCmdNode;
            this._currentCmdNode = undefined;
            return current.Command();
        }
        else{
            current = this._currentCmdNode;
            this._currentCmdNode = this._currentCmdNode.ChildTopNode();
            return current.Command();
        }
    }

    isEmpty() {
        return this.isAtRoot() && this.isAtLeaf();
    }

    isAtRoot() {
        return this._currentCmd === this._rootCmdNode;
    }

    isAtLeaf() {
        return this._currentCmd.getChildren().length === 0;
    }


    Root(){
        return this._rootCmdNode;
    }

    RootKey(){
        return this._rootCmdNode.Key();
    }

    Current(){
        return this._currentCmdNode;
    }

    CurrentKey(){
        return this._currentCmdNode.Key();
    }

    CommandSequences(startKey, endKey){
       
    }

    Flush(){
        this._rootCmdNode = undefined;
        this._currentCmdNode = undefined;
    }

/*
    moveDown(command) {
        if (this.isEmpty()) {
            throw new Error("History is empty");
        }

        if (this.isAtLeaf()) {
            throw new Error("Current command has no children");
        }

        if (this._currentCmd.getChildren().find(c => c._id === command._id) === undefined) {
            throw new Error("Current command has no child:" + command);
        }

        this._currentCmd = command;
    }

    insertAndMoveDown(command) {
        this._currentCmd.getChildren().push(command);
        command.setParent(this._currentCmd);
        this.moveDown(command);
    }
   

    getById(commandId) {
        return this._depthFirstSearch(commandId, this.getRoot(), []);
    }

    getPathToCommand(destination) {
        if (destination === null || destination === undefined) {
            throw new Error("destination is null or undefined");
        }

        let depthFirstStart = this._currentCmd;
        let undosNecessary = 0;
        let ignoreCommands = [];

        let result = this._depthFirstSearchGetCommandPath(destination, depthFirstStart, new CommandPath(this._currentCmd), ignoreCommands);

        while (result === null) {
            ignoreCommands.push(depthFirstStart);
            depthFirstStart = depthFirstStart.Parent();
            if (depthFirstStart === null) throw new Error("No command found: " + destination);

            undosNecessary++;

            result = this._depthFirstSearchGetCommandPath(destination, depthFirstStart, new CommandPath(this._currentCmd), ignoreCommands);
        }

        result.setNumOfUndoCommands(undosNecessary);
        return result;
    }

    _depthFirstSearch(id, currentCommand, ignoreCommands) {
        if (ignoreCommands.some(c => c === currentCommand)) {
            return null;
        }

        if (currentCommand.getId() === id) {
            return currentCommand;
        }

        let foundCommand = null;
        currentCommand.getChildren().forEach(command => {
            let result = this._depthFirstSearch(id, command, ignoreCommands);
            if (!(result === null)) {
                foundCommand = command;
                return true;
            }
            return false;
        });

        return foundCommand;
    }

    _depthFirstSearchGetCommandPath(destination, currentCommand, commandPath, ignoreCommands) {
        if (ignoreCommands.some(c => c === currentCommand)) {
            return null;
        }

        if (currentCommand === destination) {
            return commandPath;
        }

        let foundPath = null;
        currentCommand.getChildren().some(command => {
            commandPath.addRedoCommand(command);
            let result = this._depthFirstSearchGetCommandPath(destination, command, commandPath, ignoreCommands);
            if (!(result === null)) {
                foundPath = result;
                return true;
            }
            commandPath.removeRedoCommand(command);
            return false;
        });

        return foundPath;
    }
    */
}

if(typeof module != 'undefined') {
    module.exports = CommandHistoryTree;
}
