import React from 'react';

interface InfoCardProps {
  title?: string;
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'warning' | 'success' | 'info';
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, type = "default" }) => {
  const bgColors = {
    default: "bg-white dark:bg-gray-800",
    primary: "bg-primary/5 dark:bg-primary/20",
    warning: "bg-amber-50 dark:bg-amber-900/30",
    success: "bg-green-50 dark:bg-green-900/30",
    info: "bg-blue-50 dark:bg-blue-900/30",
  };
  
  return (
    <div className={`p-4 rounded-lg border ${bgColors[type]} 
                     ${type === "default" ? "border-gray-200 dark:border-gray-700" : 
                       `border-${type}-100 dark:border-${type}-800`}`}>
      {title && <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>}
      {children}
    </div>
  );
};

export default InfoCard;