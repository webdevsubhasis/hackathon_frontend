import React from "react";
import { motion } from "framer-motion";

export default function WorkflowCard({ item }) {
  const {
    step,
    title,
    description,
    icon: Icon,
    tag,
    tagIcon: TagIcon,
    color,
  } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
      }}
      whileHover={{
        y: -10,
      }}
      className="workflow-card"
    >
      {/* Card */}

      <div
        className="workflow-card-inner"
        style={{
          border: `1px solid ${color.border}`,
        }}
      >
        {/* Step Badge */}

        <div
          className="workflow-step"
          style={{
            background: color.primary,
            boxShadow: `0 0 20px ${color.glow}`,
          }}
        >
          {step}
        </div>

        {/* Glow */}

        <div
          className="workflow-glow"
          style={{
            background: color.glow,
          }}
        />

        {/* Icon */}

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          transition={{
            duration: 0.25,
          }}
          className="workflow-icon"
          style={{
            background: `linear-gradient(135deg,
              ${color.secondary},
              ${color.primary})`,
            boxShadow: `0 0 35px ${color.glow}`,
          }}
        >
          <Icon
            size={42}
            color="#fff"
          />
        </motion.div>

        {/* Title */}

        <h3 className="workflow-title">
          {title}
        </h3>

        {/* Divider */}

        <div
          className="workflow-divider"
          style={{
            background: color.primary,
          }}
        />

        {/* Description */}

        <p className="workflow-description">
          {description}
        </p>

        {/* Bottom Tag */}

        <div
          className="workflow-tag"
          style={{
            background: color.bg,
            border: `1px solid ${color.border}`,
            color: color.text,
          }}
        >
          <TagIcon size={15} />

          <span>
            {tag}
          </span>
        </div>

        {/* Bottom Decoration */}

        <div className="workflow-bottom">

          <div
            className="workflow-dot"
            style={{
              background: color.primary,
              boxShadow: `0 0 15px ${color.glow}`,
            }}
          />

        </div>
      </div>
    </motion.div>
  );
}