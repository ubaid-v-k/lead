import React, { useState } from "react";
import AppInput from "../../components/form/AppInput";
import AppSelect from "../../components/form/AppSelect";
import {
    Box,
    Stack,
    Typography,
    IconButton,
    Button,
    Drawer,
    InputAdornment,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const STATUS = ["New", "Open", "In Progress", "Lost", "Bad Info"];

// Simple Flag Icon Component (Mocking the India flag from design)
const FlagIcon = () => (
    <img
        src="https://flagcdn.com/w20/in.png"
        srcSet="https://flagcdn.com/w40/in.png 2x"
        width="24"
        alt="India"
        style={{ borderRadius: "2px" }}
    />
);

export default function CreateLead({ open, onClose, onSave, editData }) {
    const [form, setForm] = useState(editData || {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        title: "",
        owner: "",
        status: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(form);
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 500,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                {/* HEADER */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    px={3}
                    py={3}
                    sx={{ borderBottom: "1px solid #e2e8f0" }}
                >
                    <Typography variant="h6" fontWeight={700} color="#1e293b">
                        {editData ? "Edit Lead" : "Create Lead"}
                    </Typography>
                    <IconButton onClick={onClose} size="small" sx={{ color: "#64748b" }}>
                        <CloseIcon />
                    </IconButton>
                </Stack>

                {/* BODY */}
                <Box px={3} py={4} sx={{ flex: 1, overflowY: "auto" }}>
                    <Stack spacing={3}>
                        {/* Email */}
                        <AppInput
                            label="Email"
                            required
                            placeholder="Enter"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon sx={{ color: "#94a3b8" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* First Name */}
                        <AppInput
                            label="First Name"
                            required
                            placeholder="Enter"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                        />

                        {/* Last Name */}
                        <AppInput
                            label="Last Name"
                            required
                            placeholder="Enter"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                        />

                        {/* Phone Number */}
                        <AppInput
                            label="Phone Number"
                            required
                            placeholder="Enter"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={0.5}
                                            sx={{
                                                cursor: "pointer",
                                                paddingRight: "8px",
                                                borderRight: "1px solid #e2e8f0",
                                                marginRight: "8px",
                                            }}
                                        >
                                            <FlagIcon />
                                            <KeyboardArrowDownIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                                        </Stack>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Job Title */}
                        <AppInput
                            label="Job Title"
                            placeholder="Enter"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                        />

                        {/* Contact Owner */}
                        <AppSelect
                            label="Contact Owner"
                            name="owner"
                            value={form.owner}
                            onChange={handleChange}
                            placeholder="Choose"
                        >
                            <MenuItem value="Jane Cooper">Jane Cooper</MenuItem>
                            <MenuItem value="Wade Warren">Wade Warren</MenuItem>
                            <MenuItem value="Brooklyn Simmons">Brooklyn Simmons</MenuItem>
                        </AppSelect>

                        {/* Lead Status */}
                        <AppSelect
                            label="Lead Status"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            placeholder="Choose"
                            options={STATUS}
                        />
                    </Stack>
                </Box>

                {/* FOOTER */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    px={3}
                    py={3}
                    sx={{ borderTop: "1px solid #e2e8f0" }}
                >
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            width: "48%",
                            borderColor: "#e2e8f0",
                            color: "#64748b",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "15px",
                            padding: "10px",
                            borderRadius: "8px",
                            "&:hover": { borderColor: "#cbd5e1", backgroundColor: "#f8fafc" },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            width: "48%",
                            backgroundColor: "#5B4DDB",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "15px",
                            padding: "10px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(91, 77, 219, 0.2)",
                            "&:hover": { backgroundColor: "#4f46e5" },
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
}
