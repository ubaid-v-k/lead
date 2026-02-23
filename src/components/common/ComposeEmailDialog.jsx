import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
    CircularProgress,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";

// Extract base URL from window location to handle different environments, 
// or fallback to localhost mapping if not available
const API_URL = "http://localhost:8000/api";
const SESSION_KEY = "crm_user_token";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(SESSION_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default function ComposeEmailDialog({ open, onClose, leadId }) {
    // Pre-filled target email as requested by user
    const TARGET_EMAIL = "ferraricrm30@gmail.com";

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!subject.trim() || !message.trim()) {
            toast.error("Subject and Message are required");
            return;
        }

        setSending(true);

        try {
            const payload = {
                lead_id: leadId,
                to: TARGET_EMAIL,
                subject: subject,
                body: message,
            };

            const response = await api.post("/core/send-email/", payload);

            if (response.data.success || response.status === 200) {
                toast.success("Email sent successfully!");
                setSubject("");
                setMessage("");
                onClose();
            } else {
                toast.error("Failed to send email");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.detail || "An error occurred while sending the email");
        } finally {
            setSending(false);
        }
    };

    return (
        <Dialog open={open} onClose={() => !sending && onClose()} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", pb: 2 }}>
                <Typography variant="h6" fontWeight={700} color="#1e293b">
                    Send Tracked CRM Email
                </Typography>
                <IconButton onClick={onClose} disabled={sending} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="#64748b" fontWeight={600} mb={1}>
                        To:
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        value={TARGET_EMAIL}
                        InputProps={{ readOnly: true }}
                        sx={{ backgroundColor: "#f8fafc", "& .MuiInputBase-input": { color: "#64748b" } }}
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="#334155" fontWeight={600} mb={1}>
                        Subject <span style={{ color: "#ef4444" }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="CRM Lead Follow-up"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        disabled={sending}
                    />
                </Box>

                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="#334155" fontWeight={600} mb={1}>
                        Message <span style={{ color: "#ef4444" }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        placeholder="Hello, following up on our discussion..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={sending}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ borderTop: "1px solid #e2e8f0", p: 2 }}>
                <Button onClick={onClose} disabled={sending} sx={{ color: "#64748b", textTransform: "none", mr: 1 }}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSend}
                    disabled={sending}
                    sx={{
                        backgroundColor: "#5B4DDB",
                        textTransform: "none",
                        borderRadius: "6px",
                        px: 3,
                        "&:hover": { backgroundColor: "#4f46e5" }
                    }}
                >
                    {sending ? <CircularProgress size={24} color="inherit" /> : "Send Email"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
