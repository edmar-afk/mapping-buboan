import React, { useState } from "react";import { Modal, Box, Button, Typography, TextField } from "@mui/material";import api from "../assets/api";import Swal from "sweetalert2";const style = {	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

function FeedBack() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [feedback, setFeedback] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/api/feedback/submit/", { name, feedback });
			setName("");
			setFeedback("");
			handleClose(); // ✅ close modal first
			Swal.fire({
				icon: "success",
				title: "Thank you!",
				text: "Your feedback has been submitted.",
				timer: 5000,
				showConfirmButton: false,
			});
        } catch (err) {
					handleClose(); // ✅ close modal first
					console.error(err);
					Swal.fire({
						icon: "error",
						title: "Oops!",
						text: "Failed to submit feedback. Please try again.",
					});
				}
	};
    
    
    

	return (
		<>
			<Button
				variant="contained"
				onClick={handleOpen}
				sx={{
					position: "fixed",
					bottom: 16,
					right: 16,
					zIndex: 99999,
				}}>
				Send Feedback
			</Button>

			<Modal
				open={open}
				onClose={handleClose}>
				<Box sx={style}>
					<Typography
						variant="h6"
						component="h2"
						mb={2}>
						Feedback to Government Officials
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label="Your Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							label="Your Feedback"
							multiline
							rows={4}
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							required
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 2 }}>
							Submit
						</Button>
					</form>
				</Box>
			</Modal>
		</>
	);
}

export default FeedBack;
