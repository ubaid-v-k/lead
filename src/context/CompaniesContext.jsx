import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CompaniesContext = createContext();

export function CompaniesProvider({ children }) {
    /* ================= DATA ================= */
    const INIT_DATA = [
        {
            id: 1,
            name: "ClientEdge",
            domain: "clientedge.com",
            owner: "Jane Cooper",
            phone: "078 5432 8505",
            industry: "Legal Services",
            type: "Public",
            city: "Toronto",
            country: "Canada",
            employees: "50-100",
            revenue: "1M-5M",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "Active",
        },
        {
            id: 2,
            name: "Relatia",
            domain: "relatia.net",
            owner: "Wade Warren",
            phone: "077 5465 8785",
            industry: "Healthcare",
            type: "Private",
            city: "Amsterdam",
            country: "Netherlands",
            employees: "100-200",
            revenue: "5M-10M",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "Active",
        },
        {
            id: 3,
            name: "TrustSphere",
            domain: "trustsphere.io",
            owner: "Brooklyn Simmons",
            phone: "070 4531 9507",
            industry: "Real Estate",
            type: "Private",
            city: "Bangalore",
            country: "India",
            employees: "10-50",
            revenue: "<1M",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "Inactive",
        },
        {
            id: 4,
            name: "SalesTrail",
            domain: "salestrail.co",
            owner: "Leslie Alexander",
            phone: "078 2824 3334",
            industry: "Financial Advisory",
            type: "Public",
            city: "Zurich",
            country: "Switzerland",
            employees: "500+",
            revenue: "50M+",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "Active",
        },
        {
            id: 5,
            name: "PipelineIQ",
            domain: "pipelineiq.com",
            owner: "Jenny Wilson",
            phone: "079 8761 9681",
            industry: "Retail & E-commerce",
            type: "Private",
            city: "Austin",
            country: "USA",
            employees: "200-500",
            revenue: "10M-50M",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "On Hold",
        },
        {
            id: 6,
            name: "Syncfolio",
            domain: "syncfolio.net",
            owner: "Guy Hawkins",
            phone: "078 5432 8505",
            industry: "Logistics & Supply Chain",
            type: "Public",
            city: "Dubai",
            country: "UAE",
            employees: "1000+",
            revenue: "100M+",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "Active",
        },
        {
            id: 7,
            name: "CustoLogic",
            domain: "custologic.org",
            owner: "Robert Fox",
            phone: "077 5465 8785",
            industry: "Marketing Agencies",
            type: "Private",
            city: "Singapore",
            country: "Singapore",
            employees: "50-100",
            revenue: "2M-5M",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "Active",
        },
        {
            id: 8,
            name: "EngageWare",
            domain: "engageware.edu",
            owner: "Cameron Williamson",
            phone: "078 2824 3334",
            industry: "Education Technology",
            type: "Non-Profit",
            city: "Cape Town",
            country: "South Africa",
            employees: "100-200",
            revenue: "5M-10M",
            created: "Apr 8, 2025 2:35 PM GMT+5:30",
            status: "Inactive",
        },
    ];

    const [companies, setCompanies] = useState(INIT_DATA);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Still keep status colors if needed for filters or future use
    const STATUS_COLORS = {
        Active: { bg: "#d1fae5", color: "#059669" },
        Inactive: { bg: "#fee2e2", color: "#dc2626" },
        "On Hold": { bg: "#ffedd5", color: "#ea580c" },
    };

    const addCompany = (company) => {
        const newCompany = {
            ...company,
            id: Date.now(),
            created: new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            }) + " GMT+5:30",
        };
        setCompanies([newCompany, ...companies]);
        toast.success("Company created successfully");
    };

    const updateCompany = (id, updatedData) => {
        setCompanies(companies.map((c) => (c.id === id ? { ...c, ...updatedData } : c)));
        toast.success("Company updated successfully");
    };

    const deleteCompany = (id) => {
        setCompanies(companies.filter((c) => c.id !== id));
    };

    const getCompany = (id) => {
        return companies.find((c) => c.id.toString() === id.toString());
    };

    return (
        <CompaniesContext.Provider
            value={{
                companies,
                addCompany,
                updateCompany,
                deleteCompany,
                getCompany,
                STATUS_COLORS,
                loading,
            }}
        >
            {children}
        </CompaniesContext.Provider>
    );
}

export function useCompanies() {
    return useContext(CompaniesContext);
}
