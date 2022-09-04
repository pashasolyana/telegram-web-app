import React from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

function InputForm({ setData }) {
	const [errors, setErrors] = React.useState(null);
	const formik = useFormik({
		initialValues: {
			abonentNum: "",
		},
		onSubmit: async (values) => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/abonent/${values.abonentNum}`,
				);

				// alert(JSON.stringify(values, null, 2));
				setData(response.data.counters);
			} catch (error) {
				console.error(error);
				setErrors(error);
			}
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid
				className="full_height"
				container
				spacing={2}
				justifyContent="center"
				alignItems="center"
			>
				<Grid item xs>
					<TextField
						name="abonentNum"
						onChange={formik.handleChange}
						value={formik.values.abonentNum}
						fullWidth
						size="small"
						variant="outlined"
						type="number"
						InputProps={{ inputProps: { min: 0, max: 9999 } }}
						label="Номер абонента"
						required
						error={
							formik.touched.abonentNum && Boolean(formik.errors.abonentNum)
						}
						helperText={formik.touched.abonentNum && formik.errors.abonentNum}
					/>
				</Grid>
				<Grid item>
					<Button type="submit" variant="contained">
						Получить
					</Button>
				</Grid>
				<Snackbar
					open={!!errors}
					autoHideDuration={6000}
					onClose={() => setErrors(null)}
				>
					<Alert
						onClose={() => setErrors(null)}
						severity="error"
						sx={{ width: "100%" }}
					>
						{errors?.message}
					</Alert>
				</Snackbar>
			</Grid>
		</form>
	);
}

export default InputForm;
