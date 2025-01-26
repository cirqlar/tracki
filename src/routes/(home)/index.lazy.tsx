import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import reactLogo from "@/assets/react.svg";
import "./App.css";

export const Route = createLazyFileRoute("/(home)/")({
	component: Index,
});

function greet_inner(name: string) {
	return `Hello, ${name}! You've been greeted from JS!`;
}

async function greet(name: string) {
	if (import.meta.env.VITE_WITHOUT_TAURI) {
		return greet_inner(name);
	} else {
		return (await invoke("greet", { name })) as string;
	}
}

function Index() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");

	async function handleGreet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await greet(name));
	}

	return (
		<main className="container">
			<h1 className="bg-amber-600">Welcome to Tauri + React</h1>

			<div className="row">
				<a href="https://vitejs.dev" target="_blank">
					<img
						src="/vite.svg"
						className="logo vite"
						alt="Vite logo"
					/>
				</a>
				<a href="https://tauri.app" target="_blank">
					<img
						src="/tauri.svg"
						className="logo tauri"
						alt="Tauri logo"
					/>
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<p>Click on the Tauri, Vite, and React logos to learn more.</p>

			<form
				className="row"
				onSubmit={(e) => {
					e.preventDefault();
					handleGreet();
				}}
			>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
			</form>
			<p>{greetMsg}</p>
		</main>
	);
}
