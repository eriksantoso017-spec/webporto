"use client";

import React, { createContext, useContext, useState } from "react";

// ===== BUTTON =====
export const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "font-medium transition-all duration-200 rounded-lg inline-flex items-center justify-center";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-current hover:bg-opacity-10",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    default: "px-4 py-2",
    icon: "p-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        sizes[size]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// ===== CARD =====
export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3 className={`text-xl font-bold ${className}`} {...props}>
      {children}
    </h3>
  );
};

// ===== TABS =====
const TabsContext = createContext();

export const Tabs = ({
  children,
  defaultValue,
  value,
  onValueChange,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalValue;
  const setActiveTab = onValueChange || setInternalValue;

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className = "" }) => {
  return (
    <div className={`flex space-x-2 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ children, value, className = "" }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 font-medium transition-all duration-200 border-b-2 ${
        isActive
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-600 hover:text-blue-600"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value, className = "" }) => {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return <div className={`mt-4 ${className}`}>{children}</div>;
};
