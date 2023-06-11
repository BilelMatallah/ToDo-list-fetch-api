import React, { useState, useEffect } from "react";
import AddTask from "./AddTask.jsx";
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
			const data = [...list, { label: newTask, done: false }]
			const response = await fetch(URL, { method: "PUT", body: JSON.stringify(data), headers: HEADERS });
			console.log(response);
			getData();
			setLoad(false);
		}catch(error){
			console.log("error", error)
		}
	}



	const deleteTodo = async (tarea) => {
		try {
			const newState = list.filter ((elem) => elem.label != tarea)
			setLoad(true)
			const response = await fetch(URL, { method: "PUT", body : JSON.stringify(newState), headers: HEADERS });
			console.log(response, 'hhhhh');
			await getData();
			setList(newState)
			setLoad(false);
		}catch(err){
			console.log("error", err)
		}
	}

	return (
		<div className="text-center">
			<div className="input-div">
				<input className="input" onChange={(e) => setNewTask(e.target.value)} type="text" placeholder="write down your task" />
				<AddTask addNewTask={addNewTask}/>
				{load ? <div className="spinner spinner-border m-5" role="status">
				</div>
				: list.map((task)=> <div className="card mt-3" key={task.label}> {task.label} <button className="btn btn-danger mt-1" onClick={ () => {deleteTodo(task.label)} }>delete</button></div> )}
			</div>
		</div>
	);
};

export default Home;
