import React, { createContext, useContext, useState } from "react";

const TicketsContext = createContext();

const INIT_TICKETS = [
    {
        id: 1,
        title: "Payment Failure Issue",
        status: "Waiting on contact",
        source: "Chat",
        description: "Description goes here",
        owner: "Jane Cooper",
        priority: "High",
        created: "Apr 8, 2025 2:35 PM",
    },
    {
        id: 2,
        title: "Product Inquiry",
        status: "Waiting on us",
        source: "Email",
        description: "Customer asking about bulk pricing",
        owner: "Wade Warren",
        priority: "Medium",
        created: "Apr 8, 2025 2:35 PM",
    },
    {
        id: 3,
        title: "Subscription Upgrade",
        status: "New",
        source: "Chat",
        description: "Wants to upgrade to Enterprise plan",
        owner: "Brooklyn Simmons",
        priority: "High",
        created: "Apr 8, 2025 2:35 PM",
    },
    {
        id: 4,
        title: "Refund Request - Order #456",
        status: "New",
        source: "Phone",
        description: "Item arrived damaged",
        owner: "Leslie Alexander",
        priority: "Low",
        created: "Apr 8, 2025 2:35 PM",
    },
    {
        id: 5,
        title: "Pricing Clarification",
        status: "Closed",
        source: "Chat",
        description: "Clarification on hidden fees",
        owner: "Jenny Wilson",
        priority: "Medium",
        created: "Apr 8, 2025 2:35 PM",
    },
    {
        id: 6,
        title: "Login Not Working",
        status: "Waiting on us",
        source: "Phone",
        description: "Password reset email not delivering",
        owner: "Guy Hawkins",
        priority: "Critical",
        created: "Apr 9, 2025 2:35 PM",
    },
    {
        id: 7,
        title: "Feature Request: Reports",
        status: "Waiting on contact",
        source: "Phone",
        description: "Wants custom PDF reports",
        owner: "Robert Fox",
        priority: "High",
        created: "Apr 8, 2025 2:35 PM",
    },
    {
        id: 8,
        title: "SLA Violation Complaint",
        status: "Closed",
        source: "Chat",
        description: "Response time exceeded 24h",
        owner: "Cameron Williamson",
        priority: "Medium",
        created: "Apr 8, 2025 2:35 PM",
    },
];

export const TicketsProvider = ({ children }) => {
    const [tickets, setTickets] = useState(INIT_TICKETS);

    const addTicket = (ticket) => {
        const newTicket = {
            ...ticket,
            id: Date.now(),
            created: new Date().toLocaleString()
        };
        setTickets([newTicket, ...tickets]);
    };

    const updateTicket = (id, updatedData) => {
        setTickets(tickets.map((t) => (t.id === id ? { ...t, ...updatedData } : t)));
    };

    const deleteTicket = (id) => {
        setTickets(tickets.filter((t) => t.id !== id));
    };

    const getTicket = (id) => {
        return tickets.find((t) => t.id.toString() === id.toString());
    };

    return (
        <TicketsContext.Provider value={{ tickets, addTicket, updateTicket, deleteTicket, getTicket }}>
            {children}
        </TicketsContext.Provider>
    );
};

export const useTickets = () => {
    const context = useContext(TicketsContext);
    if (!context) {
        throw new Error("useTickets must be used within a TicketsProvider");
    }
    return context;
};
