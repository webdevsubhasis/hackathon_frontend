import React from "react";
import { motion } from "framer-motion";

import workflowData from "./workflowData";
import WorkflowCard from "./WorkflowCard";

export default function Workflow() {
  // ===========================
  // Split workflow into 2 rows
  // ===========================

  const topRow = workflowData.slice(0, 4);

  const bottomRow = [...workflowData.slice(4)].reverse();

  return (
    <section id="workflow" className="workflow-section">
      {/* Background Glow */}

      <div className="workflow-background"></div>

      <div className="workflow-container">
        {/* ======================================
                    HEADING
        ======================================= */}

        <motion.div
          className="workflow-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="workflow-badge">✨ AI Recruitment Workflow</div>

          <h2>Intelligent End-to-End Hiring Pipeline</h2>

          <p>
            RecruitIQ AI automates every stage of recruitment — from Resume
            Upload and AI Resume Parsing to ATS Analysis, AI Voice Interviews,
            Candidate Evaluation, Recruiter Dashboard and Intelligent Hiring
            Recommendations.
          </p>
        </motion.div>

        {/* ======================================
                  WORKFLOW GRID
        ======================================= */}

        <div className="workflow-grid">
          {/* ==========================
                 TOP ROW
          ========================== */}

          <div className="workflow-row">
            {topRow.map((item, index) => (
              <div key={item.id} className="workflow-cell">
                <WorkflowCard item={item} />

                {/* Horizontal Connector */}

                {index !== topRow.length - 1 && (
                  <div className="workflow-arrow-right">
                    <span className="workflow-line"></span>

                    <span className="workflow-chevron">►</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* ======================================
                  CENTER CONNECTOR
          ======================================= */}

          <div className="workflow-middle">
            <svg
              className="workflow-curve"
              viewBox="0 0 120 90"
              preserveAspectRatio="none"
            >
              <path
                d="M12 0
   C12 20,72 15,72 45
   C72 70,108 68,108 90"
                className="workflow-path"
              />
            </svg>

            <div className="workflow-vertical-arrow">▼</div>
          </div>

          {/* ======================================
                  BOTTOM ROW
          ======================================= */}

          <div className="workflow-row workflow-row-bottom">
            {bottomRow.map((item, index) => (
              <div key={item.id} className="workflow-cell">
                <WorkflowCard item={item} />

                {/* Left Connector */}

                {index !== bottomRow.length && (
                  <div className="workflow-arrow-left">
                    <span className="workflow-chevron">◄</span>

                    <span className="workflow-line"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ======================================
                  WORKFLOW SUMMARY
        ======================================= */}

        <motion.div
          className="workflow-summary"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="workflow-summary-card">
            <h3>Intelligent End-to-End Recruitment</h3>

            <p>
              Resume Upload • AI Resume Parsing • ATS Match Score • AI Voice
              Interview • AI Evaluation • PDF Report • Recruiter Dashboard •
              Hiring Recommendation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
