import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const LeadsContext = createContext();

export function LeadsProvider({ children }) {
    /* ================= DATA ================= */
    const INIT_DATA = [
        {
            id: 1,
            name: "Jane Cooper",
            email: "janecooper@gmail.com",
            phone: "078 5432 8505",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "New",
            owner: "Jane Cooper",
            title: "Salesperson",
            role: "Salesperson",
            firstName: "Jane",
            lastName: "Cooper",
            city: "New York",
        },
        {
            id: 2,
            name: "Wade Warren",
            email: "wadewarren@gmail.com",
            phone: "077 5465 8785",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "New",
            owner: "Wade Warren",
            title: "Developer",
            role: "Developer",
            firstName: "Wade",
            lastName: "Warren",
            city: "London",
        },
        {
            id: 3,
            name: "Brooklyn Simmons",
            email: "brooklynsimmons@gmail.com",
            phone: "070 4531 9507",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "New",
            owner: "Brooklyn Simmons",
            title: "Manager",
            role: "Manager",
            firstName: "Brooklyn",
            lastName: "Simmons",
            city: "Sydney",
        },
        {
            id: 4,
            name: "Leslie Alexander",
            email: "lesliealexander@gmail.com",
            phone: "078 2824 3334",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "New",
            owner: "Jane Cooper",
            title: "Designer",
            role: "Designer",
            firstName: "Leslie",
            lastName: "Alexander",
            city: "Tokyo",
        },
        {
            id: 5,
            name: "Jenny Wilson",
            email: "jennywilson@gmail.com",
            phone: "079 8761 9681",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "New",
            owner: "Wade Warren",
            title: "Director",
            role: "Director",
            firstName: "Jenny",
            lastName: "Wilson",
            city: "Paris",
        },
        {
            id: 6,
            name: "Guy Hawkins",
            email: "guyhawkins@gmail.com",
            phone: "078 5432 8505",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "New",
            owner: "Brooklyn Simmons",
            title: "Sales",
            role: "Sales",
            firstName: "Guy",
            lastName: "Hawkins",
            city: "Berlin",
        },
        {
            id: 7,
            name: "Robert Fox",
            email: "robertfox@gmail.com",
            phone: "077 5465 8785",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "New",
            owner: "Jane Cooper",
            title: "Marketing",
            role: "Marketing",
            firstName: "Robert",
            lastName: "Fox",
            city: "Toronto",
        },
        {
            id: 8,
            name: "Cameron Williamson",
            email: "cameronwilliamson@gmail.com",
            phone: "078 2824 3334",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "In Progress",
            owner: "Wade Warren",
            title: "HR",
            role: "HR",
            firstName: "Cameron",
            lastName: "Williamson",
            city: "DubaI",
        },
    ];

    const [leads, setLeads] = useState(INIT_DATA);
    const [loading, setLoading] = useState(true);

    // Simulate fetching data
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const STATUS_COLORS = {
        New: { bg: "#dbeafe", color: "#2563eb" },
        Open: { bg: "#d1fae5", color: "#059669" },
        "In Progress": { bg: "#ffedd5", color: "#ea580c" },
        Lost: { bg: "#fee2e2", color: "#dc2626" },
        "Bad Info": { bg: "#f3f4f6", color: "#6b7280" },
    };

    const addLead = (lead) => {
        const newLead = {
            ...lead,
            id: Date.now(),
            created: new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            }) + " GMT+5:30",
        };
        setLeads([newLead, ...leads]);
        toast.success("Lead created successfully");
    };

    const updateLead = (id, updatedData) => {
        setLeads(leads.map((lead) => (lead.id === id ? { ...lead, ...updatedData } : lead)));
        toast.success("Lead updated successfully");
    };

    const deleteLead = (id) => {
        setLeads(leads.filter((lead) => lead.id !== id));
        toast.success("Lead deleted successfully");
    };

    const getLead = (id) => {
        return leads.find((l) => l.id.toString() === id.toString());
    };

    return (
        <LeadsContext.Provider
            value={{
                leads,
                addLead,
                updateLead,
                deleteLead,
                getLead,
                loading,
                STATUS_COLORS,
            }}
        >
            {children}
        </LeadsContext.Provider>
    );
}

export function useLeads() {
    return useContext(LeadsContext);
}
