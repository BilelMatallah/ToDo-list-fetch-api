import React, { useState, useEffect } from "react";
const HEADERS = { "Content-Type": "application/json" }
const URL = "https://assets.breatheco.de/apis/fake/todos/user/bill"


//create your first component
const Home = () => {

	const [list, setList] = useState([]);
	const [load, setLoad] = useState(false);
	const [newTask, setNewTask] = useState("");

	const getData = async () => {
		try {
			setLoad(true)
			const response = await fetch (URL, {method: "GET"});
			const data = await response.json();
			setList(data);
			setLoad(false);
		}catch(err){
			console.log("error", err)
		}

	}

	useEffect(() => {
		getData()
	},[]);

	const addNewTask = async () => {
		try {
			setLoad(true)
			const body = [...list, { label: newTask, done: false }]
			const response = await fetch(URL, { method: "PUT", body: JSON.stringify(body), headers: HEADERS });
			console.log(response);
			await getData();
			setLoad(false);
		}catch(err){
			console.log("error", err)
		}
	}

// "sacar el perro" = "tarea" 

	const deleteTodo = async (tarea) => {
		try {
			const newState = list.filter ((elem) => elem.label != tarea)
			setLoad(true)
			const response = await fetch(URL, { method: "PUT", body: JSON.stringify(newState), headers: HEADERS });
			console.log(response);
			getData();
			setLoad(false);
		}catch(err){
			console.log("error", err)
		}
	}

	return (
		<div className="text-center">
			{load ? <div>Loading...</div> : list.map((task)=> <div key={task.label}> {task.label} <button onClick={ () => {deleteTodo(task.label)} }>delete</button></div> )}
			<input className="input" onChange={(e) => setNewTask(e.target.value)} type="text" placeholder="write down your task" />
			<button onClick={addNewTask}>Add task</button>
		</div>
	);
};

export default Home;
