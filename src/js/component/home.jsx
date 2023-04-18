import React, { useState, useEffect } from "react";
const HEADERS = { "Content-Type": "application/json" }
const URL = "https://assets.breatheco.de/apis/fake/todos/user/bill"


//create your first component
const Home = () => {

	const [state, setState] = useState([]);
	const [load, setLoad] = useState(false);

	

	const getData = async () => {
		try {
			setLoad(true)
			const response = await fetch (URL, {method: "GET"});
			const data = await response.json();
			setState(data);
			setLoad(false);
		}catch(err){
			console.log("error", err)
		}

	}

	useEffect(() => {
		getData()
	},[]);

	const addNewTodo = async () => {
		try {
			setLoad(true)
			const body = [...state, { label: "newTodo", done: false }]
			const response = await fetch(URL, { method: "PUT", body: JSON.stringify(body), headers: HEADERS });
			console.log(response);
			await getData();
			setLoad(false);
		}catch(err){
			console.log("error", err)
		}
	}

	const deleteTodo = async (indice) => {
		try {

			const newState = state.filter ((elem, index) => {return indice !== index})

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
			{load ? <div>Loading...</div> : state.map((todo)=> <div key={todo.label}> {todo.label} <button onClick={deleteTodo}>delete</button></div> )}
			<button onClick={addNewTodo}>Add task</button>
			
		</div>
	);
};

export default Home;
