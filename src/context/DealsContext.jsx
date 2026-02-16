import React, { createContext, useContext, useState } from "react";

const DealsContext = createContext();

const INIT_DEALS = [
    {
        id: 1,
        name: "Website Revamp - Atlas Corp",
        stage: "Presentation Scheduled",
        closeDate: "Apr 8, 2025",
        owner: "Jane Cooper",
        amount: "$12,500",
        priority: "High",
        created: "Apr 8, 2025",
    },
    {
        id: 2,
        name: "Mobile App for FitBuddy",
        stage: "Qualified to Buy",
        closeDate: "Apr 8, 2025",
        owner: "Wade Warren",
        amount: "$25,000",
        priority: "Medium",
        created: "Apr 8, 2025",
    },
    {
        id: 3,
        name: "HR Software License - ZenoHR",
        stage: "Contract Sent",
        closeDate: "Apr 8, 2025",
        owner: "Brooklyn Simmons",
        amount: "$18,750",
        priority: "Low",
        created: "Apr 8, 2025",
    },
    {
        id: 4,
        name: "CRM Onboarding - NexTech",
        stage: "Closed Won",
        closeDate: "Apr 8, 2025",
        owner: "Leslie Alexander",
        amount: "$32,000",
        priority: "High",
        created: "Apr 8, 2025",
    },
    {
        id: 5,
        name: "Marketing Suite - QuickAdz",
        stage: "Appointment Scheduled",
        closeDate: "Apr 8, 2025",
        owner: "Jenny Wilson",
        amount: "$14,800",
        priority: "Medium",
        created: "Apr 8, 2025",
    },
    {
        id: 6,
        name: "Inventory Tool - GreenMart",
        stage: "Decision Maker Bought In",
        closeDate: "Apr 8, 2025",
        owner: "Guy Hawkins",
        amount: "$9,300",
        priority: "Low",
        created: "Apr 8, 2025",
    },
    {
        id: 7,
        name: "ERP Integration - BlueChip",
        stage: "Qualified to Buy",
        closeDate: "Apr 8, 2025",
        owner: "Robert Fox",
        amount: "$41,000",
        priority: "High",
        created: "Apr 8, 2025",
    },
    {
        id: 8,
        name: "Loyalty Program - FoodieFox",
        stage: "Closed Lost",
        closeDate: "Apr 8, 2025",
        owner: "Cameron Williamson",
        amount: "$11,000",
        priority: "Low",
        created: "Apr 8, 2025",
    },
];

export const DealsProvider = ({ children }) => {
    const [deals, setDeals] = useState(INIT_DEALS);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const addDeal = (deal) => {
        const newDeal = { ...deal, id: Date.now(), created: new Date().toLocaleDateString() };
        setDeals([newDeal, ...deals]);
    };

    const updateDeal = (id, updatedData) => {
        setDeals(deals.map((d) => (d.id === id ? { ...d, ...updatedData } : d)));
    };

    const deleteDeal = (id) => {
        setDeals(deals.filter((d) => d.id !== id));
    };

    const getDeal = (id) => {
        return deals.find((d) => d.id.toString() === id.toString());
    };

    return (
        <DealsContext.Provider value={{ deals, addDeal, updateDeal, deleteDeal, getDeal, loading }}>
            {children}
        </DealsContext.Provider>
    );
};

export const useDeals = () => {
    const context = useContext(DealsContext);
    if (!context) {
        throw new Error("useDeals must be used within a DealsProvider");
    }
    return context;
};
