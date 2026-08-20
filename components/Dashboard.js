import React, { useState } from "react";
import "./Dashboard.css";
// Imported from src/ folder (one level up from src/components/)
import scLogo from "../sc-logo.png";

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Loans");
  const [loanFilter, setLoanFilter] = useState("All");

  // Interactive EMI Calculator State (Amounts in ₹ INR)
  const [calcAmount, setCalcAmount] = useState(1500000); // ₹15 Lakhs
  const [calcTenure, setCalcTenure] = useState(36); // 36 Months
  const [calcRate, setCalcRate] = useState(8.75); // 8.75% p.a.

  const [loans] = useState([
    {
      id: "SC-HL-98210",
      type: "Home Loan (Floating)",
      accountNumber: "•••• 4892",
      totalAmount: 6500000, // ₹65 Lakhs
      outstandingAmount: 4820000, // ₹48.2 Lakhs
      interestRate: 8.45,
      nextEmiDate: "05 Sep 2026",
      emiAmount: 58240,
      status: "Active",
      progress: 26,
    },
    {
      id: "SC-PL-44102",
      type: "Personal Loan",
      accountNumber: "•••• 7731",
      totalAmount: 500000, // ₹5 Lakhs
      outstandingAmount: 180000, // ₹1.8 Lakhs
      interestRate: 10.75,
      nextEmiDate: "12 Sep 2026",
      emiAmount: 16300,
      status: "Active",
      progress: 64,
    },
    {
      id: "SC-AL-20911",
      type: "Auto Finance Loan",
      accountNumber: "•••• 1944",
      totalAmount: 1200000, // ₹12 Lakhs
      outstandingAmount: 0,
      interestRate: 8.85,
      nextEmiDate: "Fully Settled",
      emiAmount: 0,
      status: "Closed",
      progress: 100,
    },
  ]);

  // Indian Number Formatter (Lakhs / Crores)
  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // EMI Formula Calculation
  const calculateEmi = () => {
    const monthlyRate = calcRate / (12 * 100);
    const emi =
      (calcAmount * monthlyRate * Math.pow(1 + monthlyRate, calcTenure)) /
      (Math.pow(1 + monthlyRate, calcTenure) - 1);
    return isNaN(emi) ? 0 : Math.round(emi);
  };

  const filteredLoans = loans.filter((l) => {
    if (loanFilter === "Active") return l.status === "Active";
    if (loanFilter === "Closed") return l.status === "Closed";
    return true;
  });

  const totalOutstanding = loans.reduce(
    (acc, curr) => acc + curr.outstandingAmount,
    0,
  );
  const totalSanctioned = loans.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0,
  );
  const totalMonthlyEmi = loans.reduce(
    (acc, curr) => acc + (curr.status === "Active" ? curr.emiAmount : 0),
    0,
  );
  const overallRepaidPercentage = Math.round(
    ((totalSanctioned - totalOutstanding) / totalSanctioned) * 100,
  );

  return (
    <div className="sc-dashboard-wrapper">
      {/* Top Utility Bar */}
      <div className="sc-top-utility">
        <div className="sc-utility-container">
          <div className="utility-left-tags">
            <span className="utility-badge">Standard Chartered India</span>
            <span className="utility-badge-sub">Priority Banking</span>
          </div>
          <div className="utility-right-actions">
            <a href="#rates" className="utility-link">
              Interest Rates & Charges
            </a>
            <span className="utility-divider">|</span>
            <div className="sc-banking-dropdown">
              <span>Online Banking India</span>
              <span className="dropdown-arrow">▾</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sc-main-navbar">
        <div className="sc-nav-container">
          {/* Brand Header with Exact Logo Image */}
          <div className="sc-nav-brand">
            <img
              src={scLogo}
              alt="Standard Chartered"
              className="sc-brand-image-nav"
            />
            <div className="sc-brand-title-nav">
              <h2>standard</h2>
              <h2>chartered</h2>
            </div>
          </div>

          <ul className="sc-nav-menu">
            <li>
              <button
                type="button"
                className={`sc-nav-item ${activeNav === "Dashboard" ? "active" : ""}`}
                onClick={() => setActiveNav("Dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sc-nav-item ${activeNav === "Loans" ? "active" : ""}`}
                onClick={() => setActiveNav("Loans")}
              >
                Loans
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sc-nav-item ${activeNav === "Help" ? "active" : ""}`}
                onClick={() => setActiveNav("Help")}
              >
                Help & Support
              </button>
            </li>
          </ul>

          <div className="sc-nav-actions">
            <div className="sc-profile-badge">
              <span className="profile-initials">SV</span>
              <div className="profile-details">
                <span className="profile-name">Shreyansh Vishnoi</span>
                <span className="profile-tier">Priority Client</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Welcome Banner */}
      <section className="sc-dashboard-hero">
        <div className="sc-hero-glow"></div>
        <div className="sc-hero-inner">
          <div className="sc-accent-line">
            <span className="line-blue"></span>
            <span className="line-green"></span>
          </div>
          <div>
            <div className="hero-tag">SC Retail & Priority Assets</div>
            <h1>Loan Portfolio Overview</h1>
            <p>
              Track your sanctioned credit lines, view upcoming NACH auto-debit
              schedules, and simulate your EMIs.
            </p>
          </div>
        </div>
        <button
          className="sc-btn-glow"
          onClick={() => console.log("Redirecting to loan application...")}
        >
          <span>+ Apply for New Facility</span>
        </button>
      </section>

      {/* Main Container Grid */}
      <main className="sc-main-container">
        {/* Metric Cards Row */}
        <section className="sc-metrics-grid">
          <div className="sc-metric-card">
            <div className="metric-header">
              <span className="metric-label">Total Outstanding Balance</span>
              <span className="metric-pill pill-blue">Active</span>
            </div>
            <div className="metric-value">{formatINR(totalOutstanding)}</div>
            <div className="metric-progress-inline">
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${overallRepaidPercentage}%` }}
                ></div>
              </div>
              <span className="sub-text">
                {overallRepaidPercentage}% of total limit repaid
              </span>
            </div>
          </div>

          <div className="sc-metric-card">
            <div className="metric-header">
              <span className="metric-label">Upcoming Month Total EMI</span>
              <span className="metric-pill pill-green">Due 05 Sep</span>
            </div>
            <div className="metric-value">{formatINR(totalMonthlyEmi)}</div>
            <div className="metric-progress-inline">
              <span className="tag-safe">✓ NACH Mandate Active</span>
            </div>
          </div>

          <div className="sc-metric-card">
            <div className="metric-header">
              <span className="metric-label">CIBIL Score / Credit Health</span>
              <span className="metric-pill pill-navy">Prime Tier</span>
            </div>
            <div className="metric-value">
              785 <small className="score-max">/ 900</small>
            </div>
            <p className="metric-subtext">
              Pre-approved for instant top-up up to ₹25,00,000
            </p>
          </div>
        </section>

        {/* Dynamic Split Section */}
        <div className="sc-dashboard-split">
          {/* Left: Interactive Loans Table Card */}
          <section className="sc-section-card sc-table-container">
            <div className="section-card-header">
              <div>
                <h2>Your Loan Facilities</h2>
                <p>Status of all active, pending, and settled credit lines</p>
              </div>
              {/* Filter Pills */}
              <div className="filter-pill-group">
                {["All", "Active", "Closed"].map((filter) => (
                  <button
                    key={filter}
                    className={`filter-btn ${loanFilter === filter ? "active" : ""}`}
                    onClick={() => setLoanFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="sc-loans-table-wrapper">
              <table className="sc-loans-table">
                <thead>
                  <tr>
                    <th>Facility & Loan ID</th>
                    <th>Outstanding Balance</th>
                    <th>Next Monthly EMI</th>
                    <th>Repaid</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.map((loan) => (
                    <tr key={loan.id} className="loan-row">
                      <td>
                        <div className="loan-facility-cell">
                          <strong>{loan.type}</strong>
                          <span>
                            {loan.id} • {loan.accountNumber}
                          </span>
                        </div>
                      </td>
                      <td>
                        <strong className="balance-bold">
                          {formatINR(loan.outstandingAmount)}
                        </strong>
                        <span className="sanctioned-sub">
                          {formatINR(loan.totalAmount)} sanctioned
                        </span>
                      </td>
                      <td>
                        <div className="emi-cell">
                          <strong>
                            {loan.emiAmount > 0
                              ? formatINR(loan.emiAmount)
                              : "—"}
                          </strong>
                          <small>{loan.nextEmiDate}</small>
                        </div>
                      </td>
                      <td>
                        <div className="progress-container">
                          <div className="progress-bar-bg">
                            <div
                              className="progress-bar-fill"
                              style={{ width: `${loan.progress}%` }}
                            ></div>
                          </div>
                          <span>{loan.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`status-tag status-${loan.status.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Right: Live Interactive Loan Estimator */}
          <aside className="sc-section-card sc-simulator-card">
            <div className="simulator-header">
              <span className="simulator-badge">EMI Simulator</span>
              <h3>Quick Loan Calculator</h3>
              <p>Simulate monthly outflows for fresh retail lending.</p>
            </div>

            <div className="slider-control">
              <div className="slider-labels">
                <span>Principal Amount</span>
                <strong>{formatINR(calcAmount)}</strong>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="sc-range-slider"
              />
            </div>

            <div className="slider-control">
              <div className="slider-labels">
                <span>Tenure Duration</span>
                <strong>
                  {calcTenure} Months ({(calcTenure / 12).toFixed(1)} Yrs)
                </strong>
              </div>
              <input
                type="range"
                min="12"
                max="240"
                step="12"
                value={calcTenure}
                onChange={(e) => setCalcTenure(Number(e.target.value))}
                className="sc-range-slider"
              />
            </div>

            <div className="slider-control">
              <div className="slider-labels">
                <span>Interest Rate (% p.a.)</span>
                <strong>{calcRate}%</strong>
              </div>
              <input
                type="range"
                min="7.5"
                max="16.0"
                step="0.1"
                value={calcRate}
                onChange={(e) => setCalcRate(Number(e.target.value))}
                className="sc-range-slider"
              />
            </div>

            <div className="emi-result-box">
              <span>Estimated Monthly EMI</span>
              <div className="emi-result-amount">
                {formatINR(calculateEmi())}
                <small>/month</small>
              </div>
            </div>

            <button
              className="sc-btn-action-full"
              onClick={() => console.log("Redirecting to loan application...")}
            >
              Apply with this Quote →
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
