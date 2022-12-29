/*
Some cheat-script I made for Dino Game
*/

if(typeof Runner == "undefined")throw new CustomException({n: "InvalidScriptExecution", m: "This script only works on dino game, you have no dino game instance running."})

class CustomException extends Error{
	constructor(mbt){
		if(!mbt)throw new Error("Expected object, got " + typeof mbt)
		if(!mbt.m || !mbt.n)throw new Error("Missing 2 required objects")
		super(mbt.m)
		this.name = mbt.n
		this.message = mbt.m
	}
}
const SAVE_STATE_GAMEOVER = Runner.instance_.gameOver

const ERR_CODE = {
	ARG_MISMATCH: 417,
	ARG_NULL: 622,
	UNDEFINED: -1
}

function throwErrCode(code, opt={head: "NullException", msg: "NoType"}){
	if(code == ERR_CODE.ARG_MISMATCH)throw new CustomException({n: "MismatchedArgument", m: opt.msg})
	else if(code == ERR_CODE.ARG_NULL)throw new CustomException({n: "MissingArgument", m: opt.msg})
	else{
		if(!opt.head)throwErrCode(ERR_CODE.ARG_NULL, {msg: "Missing Header Exception Argument"})
		if(!opt.msg)throwErrCode(ERR_CODE.ARG_NULL, {msg: "Missing Message Body Argument"})
		throw new CustomException({n: opt.head, m: opt.msg})
	}
}

let swGameOver = false
function switchLose(){
	if(swGameOver){
		Runner.instance_.gameOver = function(){}
		swGameOver = false
		alert("Save Mode is disabled (Death is now ceased)")
	}else{
		Runner.instance_.gameOver = SAVE_STATE_GAMEOVER
		swGameOver = true
		alert("Save Mode is enabled (Death is now possible)")
	}
}

function setDinoSpeed(){
	let getSpeed = prompt("Input Speed (Format Number): ")
	let parsed = parseInt(getSpeed)
	if(isNaN(parsed))throwErrCode(ERR_CODE.ARG_MISMATCH, {msg: "Failed to parse due to result being Not a Number (NaN)"});
	Runner.instance_.setSpeed(parsed)
}

let btnGO = document.createElement("button")
let btnCS = document.createElement("button")
btnGO.innerText = "Set Game Over"
btnCS.innerText = "Set Dino Speed"
btnGO.id = "change-game-over"
btnCS.id = "change-speed"
btnGO.style.cssText = "margin-top: -20%; margin-right: 25%;"
btnCS.style.cssText = "margin-top: -20%;"

btnGO.setAttribute("onClick", "javascript: switchLose();")
btnCS.setAttribute("onClick", "javascript: setDinoSpeed();")


const getMainApp = document.getElementById("main-frame-error")
const getApp = getMainApp.getElementsByClassName("runner-container")[0]
getMainApp.insertBefore(btnGO, getApp)
getMainApp.insertBefore(btnCS, getApp)