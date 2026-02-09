import React from "react";
import { Box, Typography, TextField } from "@mui/material";

/**
 * Standardized Input Component
 * 
 * @param {string} label - Label text displayed above the input
 * @param {boolean} required - Show red asterisk
 * @param {object} props - Props passed to TextField
 */
export default function AppInput({ label, required, sx, ...props }) {
    return (
        <Box>
            {label && (
                <Typography variant="subtitle2" fontWeight={600} color="#1e293b" mb={1}>
                    {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
                </Typography>
            )}
            <TextField
                fullWidth
                variant="outlined"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        "& fieldset": { borderColor: "#e2e8f0" },
                        "&:hover fieldset": { borderColor: "#cbd5e1" },
                        "&.Mui-focused fieldset": { borderColor: "#5B4DDB" },
                    },
                    ...sx,
                }}
                {...props}
            />
        </Box>
    );
}
