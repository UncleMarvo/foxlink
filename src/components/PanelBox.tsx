import React from "react";

interface PanelBoxProps {
  title: string;
  children: React.ReactNode;
}

const PanelBox: React.FC<PanelBoxProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col border border-gray-300 bg-white rounded-lg shadow p-6 min-w-[220px] min-h-[120px]">
      <div className="text-sm font-semibold text-gray-700 mb-3">{title}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default PanelBox; 