import React from "react";

interface StatBoxProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatBox: React.FC<StatBoxProps> = ({ title, value, icon }) => {
  return (
    <div className="flex flex-col items-start justify-center border border-gray-300 bg-white rounded-lg shadow p-6 min-w-[160px] min-h-[100px]">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span>{title}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
};

export default StatBox; 