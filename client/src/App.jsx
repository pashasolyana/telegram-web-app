import React from "react";
import "./App.css";
import Container from "@mui/material/Container";
import InputForm from "./InputForm/InputForm";
import ViewData from "./ViewData/ViewData";

function App() {
	const [data, setData] = React.useState(null);

	// React.useEffect(() => console.log(data), [data]);

	return (
		<Container className="full_height" maxWidth="sm">
			{data ? (
				<ViewData data={data} setData={setData} />
			) : (
				<InputForm setData={setData} />
			)}
		</Container>
	);
}

export default App;
