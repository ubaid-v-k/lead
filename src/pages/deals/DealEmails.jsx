import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    Stack,
    IconButton,
    Collapse,
    Avatar,
    Divider,
} from "@mui/material";
import {
    KeyboardArrowDown as ArrowDownIcon,
    KeyboardArrowRight as ArrowRightIcon,
} from "@mui/icons-material";

import ComposeEmail from "./ComposeEmail";

const MOCK_EMAILS = [
    {
        id: 1,
        subject: "Contract Updates",
        from: "Maria Johnson",
        to: "Jane Cooper",
        date: "June 25, 2025 at 10:30AM",
        preview: "Hi Jane, I've updated the contract details...",
        content: `Hi Jane,

I've updated the contract details as we discussed yesterday. Please review the attached document and let me know if you have any questions.

Best regards,
Maria Johnson`,
    },
];

export default function DealEmails() {
    const [expanded, setExpanded] = useState({ 1: true });
    const [isComposeOpen, setComposeOpen] = useState(false);

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Box>
            <ComposeEmail open={isComposeOpen} onClose={() => setComposeOpen(false)} />

            {/* Header Row */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h6" fontWeight={700} color="#1e293b">
                    Emails
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setComposeOpen(true)}
                    sx={{
                        backgroundColor: "#5B4DDB",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                        padding: "8px 24px",
                        boxShadow: "0 4px 6px -1px rgba(91, 77, 219, 0.2)",
                        "&:hover": { backgroundColor: "#4f46e5" },
                    }}
                >
                    Create Email
                </Button>
            </Stack>

            {/* Group: June 2025 */}
            <Typography variant="subtitle2" fontWeight={700} color="#1e293b" mb={2}>
                June 2025
            </Typography>

            {MOCK_EMAILS.map((email) => (
                <Paper
                    key={email.id}
                    elevation={0}
                    sx={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        overflow: "hidden",
                        mb: 2,
                    }}
                >
                    {/* Email Header */}
                    <Box
                        onClick={() => toggleExpand(email.id)}
                        sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            backgroundColor: "#fff",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                            <IconButton size="small" sx={{ color: "#5B4DDB", p: 0, mt: 0.5 }}>
                                {expanded[email.id] ? (
                                    <ArrowDownIcon fontSize="small" />
                                ) : (
                                    <ArrowRightIcon fontSize="small" />
                                )}
                            </IconButton>

                            <Box>
                                <Typography variant="body2" fontWeight={600} color="#334155" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <span style={{ color: '#5B4DDB' }}>Logged Email - {email.subject}</span>
                                    <span style={{ fontWeight: 400, color: "#64748b" }}>by {email.from}</span>
                                </Typography>
                                {/* Show preview if collapsed */}
                                {!expanded[email.id] && (
                                    <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
                                        {email.preview}
                                    </Typography>
                                )}
                                {/* Show 'To' if expanded */}
                                {expanded[email.id] && (
                                    <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
                                        To {email.to}
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        <Typography variant="caption" color="#94a3b8" sx={{ whiteSpace: 'nowrap', ml: 2 }}>
                            {email.date}
                        </Typography>
                    </Box>

                    {/* Email Content */}
                    <Collapse in={expanded[email.id]}>
                        <Box sx={{ px: 5, pb: 4 }}>
                            <Typography
                                variant="body2"
                                color="#334155"
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: 1.6,
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                {email.content}
                            </Typography>
                        </Box>
                    </Collapse>
                </Paper>
            ))}
        </Box>
    );
}
