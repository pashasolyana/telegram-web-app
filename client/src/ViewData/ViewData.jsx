import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import axios from "axios";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};



const ViewData = ({ data, setData }) => {
	const [errors, setErrors] = React.useState(null);
	const [values, setValues] = React.useState(null);

	const formik = useFormik({
		initialValues: {
			newValue: '',
		},
		onSubmit: async (_values, { resetForm }) => {
			try {
				await axios.put(
					`http://localhost:5000/api/update/${values.id}`,
					{
						'value': _values.newValue,
					},
				);
				const response = await axios.get(
					`http://localhost:5000/api/abonent/${values.abonentId}`,
				);

				setValues(null);
				setData(response.data.counters);
				resetForm();
			} catch (error) {
				console.error(error);
				setValues(null);
				setErrors(error);
			}
		},
	});

	return (
		<Container>
			<Box justifyContent={"center"} width="100%" display={"flex"}>
				<Typography variant="h4">Абонент #{data[0].abonentId}</Typography>
			</Box>
			<List>
				{data &&
					data.map((i) => (
						<ListItem
							key={i.id}
							disableGutters
							secondaryAction={
								<IconButton onClick={() => setValues({ ...i })}>
									<EditIcon color="primary" />
								</IconButton>
							}
						>
							<ListItemText primary={`№${i.id}. Показания: ${i.value}`} />
						</ListItem>
					))}
			</List>
			<Box justifyContent={"center"} width="100%" display={"flex"}>
				<Button
					mt={2}
					variant="outlined"
					color="error"
					onClick={() => setData(null)}
				>
					Выйти
				</Button>
			</Box>
			{values && (
				<Modal
					open={!!values}
					onClose={() => setValues(null)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box
						sx={style}
						display="flex"
						flexDirection={"column"}
						rowGap={"20px"}
					>
						<form onSubmit={formik.handleSubmit}>
							<Typography variant="h6" component="h2">
								Введите новые показания
							</Typography>
							<TextField
								id={values.id}
								name="newValue"
								fullWidth
								size="small"
								variant="outlined"
								onChange={formik.handleChange}
								value={formik.values.newValue}
								InputProps={{ inputProps: { min: 0, max: 10 } }}
								label="Показания"
							/>
							<Box
								justifyContent={"flex-end"}
								width="100%"
								columnGap={"10px"}
								display={"flex"}
							>
								<Button
									mt={2}
									variant="contained"
									color="primary"
									type="submit"
								>
									Сохранить
								</Button>
								<Button
									mt={2}
									variant="outlined"
									color="error"
									onClick={() => setValues(null)}
								>
									Отмена
								</Button>
							</Box>
						</form>
					</Box>
				</Modal>
			)}
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
		</Container>
	);
};

export default ViewData;
