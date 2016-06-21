import Node from "./node";

export default class Block extends Node {
	constructor () {
		super();
		
		this.type = Node.Block;
		this.body = [];
	}
}
