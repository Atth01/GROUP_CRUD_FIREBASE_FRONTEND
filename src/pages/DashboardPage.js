import React from "react";
import Layout from '../components/layout/Layout';

function DashboardPage({ onLogout, userEmail }) {
    return (
        <Layout onLogout={onLogout} userEmail={userEmail} />
    );
}

export default DashboardPage;
