import React from "react";

const Button = ({ children, style, onClick, ...props }) => {
  // default styles
  const baseStyle = {
    backgroundColor: "#2563eb",      // blue background
    color: "#ffffff",                // white text
    padding: "0.5rem 1rem",          // spacing
    border: "none",                  // remove default border
    borderRadius: "0.375rem",        // rounded corners
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  };

  // local hover effect
  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#1e40af"; // darker blue
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#2563eb"; // original blue
  };

  return (
    <button
      style={{ ...baseStyle, ...style }} // allow overrides from props
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
