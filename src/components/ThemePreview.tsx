import React from 'react';

interface ThemePreviewProps {
  colors: {
    background: string;
    border: string;
    text: string;
  };
  isSelected: boolean;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ colors, isSelected }) => {
  if (isSelected) {
    colors.border = '#000000';
  }

  return (
    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent" style={{ borderColor: colors.border }}>
      <div className="space-y-2 rounded-sm p-2" style={{ backgroundColor: colors.background }}>
        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-2 w-full rounded-lg bg-[#ecedef]" style={{ backgroundColor: colors.text }} />
          <div className="h-2 w-full rounded-lg bg-[#ecedef]" style={{ backgroundColor: colors.text }} />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" style={{ backgroundColor: colors.text }} />
          <div className="h-2 w-full rounded-lg bg-[#ecedef]" style={{ backgroundColor: colors.text }} />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" style={{ backgroundColor: colors.text }} />
          <div className="h-2 w-full rounded-lg bg-[#ecedef]" style={{ backgroundColor: colors.text }} />
        </div>
      </div>
    </div>
  );
};

export default ThemePreview; 