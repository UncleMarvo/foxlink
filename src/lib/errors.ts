// Custom error classes for standardized error severity
// Use these to throw errors with a known severity in your API routes

export class CriticalError extends Error {
  severity: 'critical' = 'critical';
  constructor(message: string) {
    super(message);
    this.name = 'CriticalError';
  }
}

export class AppError extends Error {
  severity: 'error' = 'error';
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export class WarningError extends Error {
  severity: 'warning' = 'warning';
  constructor(message: string) {
    super(message);
    this.name = 'WarningError';
  }
} 