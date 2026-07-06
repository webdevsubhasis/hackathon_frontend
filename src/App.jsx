import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CandidateDashboard from './pages/CandidateDashboard.jsx';
import ResumeUpload from './pages/ResumeUpload.jsx';
import InterviewRoom from './pages/InterviewRoom.jsx';
import CandidateReport from './pages/CandidateReport.jsx';
import RecruiterDashboard from './pages/RecruiterDashboard.jsx';
import CandidateDetail from './pages/CandidateDetail.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/resume"
          element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <ResumeUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/interview/:interviewId"
          element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <InterviewRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/report"
          element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <CandidateReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/candidate/:id"
          element={
            <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
              <CandidateDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
