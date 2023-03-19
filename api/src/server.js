"use strict";

const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();

const connection = mysql.createConnection({
	host: "192.168.20.5",
	user: "root",
	password: "123456",
	database: "todo_list",
});

const corsOpts = {
	origin: "*",

	methods: ["GET", "POST", "PUT", "DELETE"],

	allowedHeaders: ["Content-Type"],
};

connection.connect((error) => {
	if (error) throw error;
	console.log("Connected to the MySQL database");
});

app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Welcome to the Todo List API");
});

app.get("/api/todo", (req, res) => {
	connection.query("SELECT * FROM todo", (error, results) => {
		if (error) throw error;
		res.send(results);
	});
});

// Add a new todo item
app.post("/api/todo", (req, res) => {
	const task = req.body.task;
	connection.query(
		"INSERT INTO todo (task) VALUES (?)",
		[task],
		(error, results) => {
			if (error) throw error;
			res.send(results);
		}
	);
});

// Mark a todo item as done
app.put("/api/todo/:id", (req, res) => {
	const id = req.params.id;
	const done = req.body.done;
	connection.query(
		"UPDATE todo SET done=? WHERE id=?",
		[done, id],
		(error, results) => {
			if (error) throw error;
			res.send(results);
		}
	);
});

// Delete a todo item
app.delete("/api/todo/:id", (req, res) => {
	const id = req.params.id;
	connection.query("DELETE FROM todo WHERE id=?", [id], (error, results) => {
		if (error) throw error;
		res.send(results);
	});
});

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
