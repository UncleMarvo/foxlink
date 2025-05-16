import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
  compact?: boolean;
  large?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  bordered = false,
  compact = false,
  large = false,
}) => {
  const cardClasses = [
    styles.card,
    bordered ? styles.bordered : '',
    compact ? styles.compact : '',
    large ? styles.large : '',
    className,
  ].filter(Boolean).join(' ');

  return <div className={cardClasses}>{children}</div>;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={`${styles.header} ${className || ''}`}>{children}</div>;
};

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return <h3 className={`${styles.title} ${className || ''}`}>{children}</h3>;
};

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
  return <p className={`${styles.description} ${className || ''}`}>{children}</p>;
};

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={`${styles.content} ${className || ''}`}>{children}</div>;
};

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return <div className={`${styles.footer} ${className || ''}`}>{children}</div>;
}; 