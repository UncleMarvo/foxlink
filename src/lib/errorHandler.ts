// Centralized error handler for reporting errors with severity
// Sends error details to a webhook (e.g., n8n or any other system)

interface ErrorDetails {
  error: Error;
  endpoint: string;
  method?: string;
  severity?: 'critical' | 'error' | 'warning' | 'info';
  additionalContext?: Record<string, any>;
}

export async function reportError({
  error,
  endpoint,
  method,
  severity,
  additionalContext,
}: ErrorDetails) {
  // Prefer explicit severity, else use error.severity, else default to 'error'
  const errorSeverity =
    severity ||
    (error as any).severity ||
    'error';

  // Log error locally for debugging
  console.error(`[${errorSeverity.toUpperCase()}] Error in ${endpoint}:`, error);

  // Only report to webhook in production
  if (process.env.NODE_ENV === 'production' && process.env.ERROR_WEBHOOK_URL) {
    try {
      const errorDetails = {
        timestamp: new Date().toISOString(),
        endpoint,
        method,
        severity: errorSeverity,
        errorMessage: error.message,
        errorStack: error.stack,
        additionalContext,
        environment: process.env.NODE_ENV,
      };

      await fetch(process.env.ERROR_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorDetails),
      });
    } catch (webhookError) {
      // Don't let webhook errors affect the application
      console.error('Failed to report error to webhook:', webhookError);
    }
  }
} 