'use client';
import React, { useState } from 'react';

export function Tabs({ defaultValue, value, onValueChange, children }) {
  const isControlled = value !== undefined && onValueChange !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = isControlled ? value : internalValue;

  const setActiveTab = (newTab) => {
    if (isControlled) {
      onValueChange(newTab);
    } else {
      setInternalValue(newTab);
    }
  };

  const triggers = [];
  const content = [];

  function flattenChildren(children) {
  const result = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === React.Fragment) {
      result.push(...flattenChildren(child.props.children));
    } else {
      result.push(child);
    }
  });

  return result;
}

const flatChildren = flattenChildren(children);

flatChildren.forEach((child) => {
  if (!React.isValidElement(child)) return;
  handleTabChild(child);
});


function handleTabChild(child) {
  if (child.type.displayName === 'TabsTrigger') {
    triggers.push(
      React.cloneElement(child, {
        isActive: child.props.value === activeTab,
        onClick: () => setActiveTab(child.props.value),
      })
    );
  } else if (child.type.displayName === 'TabsContent') {
    if (child.props.value === activeTab) {
      content.push(child);
    }
  }
}



  return (
    <div>
      <div className="flex space-x-2 mb-4">{triggers}</div>
      <div>{content}</div>
    </div>
  );
}

export function TabsList({ children }) {
  return <div className="flex">{children}</div>;
}

export function TabsTrigger({ value, children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium ${
        isActive
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
      } transition`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div className="mt-2">{children}</div>;
}

// For internal usage in detection
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';
