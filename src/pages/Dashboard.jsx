import { useState } from "react";
import { useMediaQuery } from "@mui/material";

import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import ConversionCard from "../components/ConversionCard";
import TeamTable from "../components/TeamTable";
import SalesChart from "../components/SalesChart";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

import { Briefcase } from "iconsax-react";
import { Profile2User } from "iconsax-react";

export default function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="main-content">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="container-fluid px-4">
          {/* STATS */}
          <div className="row g-4 mt-2">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <StatCard
                title="Total Leads"
                value="1,250"
                icon={<Profile2User size="28" variant="Bold" color="#5948DB" />}
                gradient="linear-gradient(180deg, rgba(89, 72, 219, 0.5) 0%, rgba(255, 255, 255, 0) 100%)"
              />
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <StatCard
                title="Active Deals"
                value="136"
                icon={<Briefcase size="28" variant="Bold" color="#2DC8A8" />}
                gradient="linear-gradient(180deg, rgba(45, 200, 168, 0.5) 0%, rgba(255, 255, 255, 0) 100%)"
              />
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <StatCard
                title="Closed Deals"
                value="136"
                icon={<Briefcase size="28" variant="Bold" color="#FE8084" />}
                gradient="linear-gradient(180deg, rgba(254, 128, 132, 0.5) 0%, rgba(255, 255, 255, 0) 100%)"
              />
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <StatCard
                title="Monthly Revenue"
                value="45,000"
                icon={
                  <PaymentsOutlinedIcon
                    sx={{ color: "#E0A100", fontSize: 28 }}
                  />
                }
                gradient="linear-gradient(180deg, rgba(224, 161, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%)"
              />
            </div>
          </div>

          {/* MIDDLE */}
          <div className="row g-4 mt-4">
            <div className="col-md-3">
              <ConversionCard />
            </div>

            <div className="col-md-9">
              <div className="card sales-card">
                <div className="card-header sales-header">
                  <h6>Sales Reports</h6>
                  <div className="sales-filter">
                    Monthly <i className="bi bi-chevron-down"></i>
                  </div>
                </div>

                <div className="sales-chart">
                  <SalesChart />
                </div>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="row mt-4">
            <div className="col-12">
              <TeamTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
