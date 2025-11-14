import { AlertCircle, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Error",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8 fade-in">
      <Alert variant="destructive" className="max-w-2xl border-2 shadow-2xl">
        <AlertCircle className="h-6 w-6" />
        <AlertTitle className="text-2xl font-bold mb-2">{title}</AlertTitle>
        <AlertDescription className="mt-4">
          <p className="text-base leading-relaxed mb-6">{message}</p>
          {onRetry && (
            <Button
              variant="outline"
              size="lg"
              onClick={onRetry}
              className="border-2 hover:bg-destructive/10 hover:border-destructive transition-all"
              aria-label="Retry loading products"
            >
              <RefreshCcw className="mr-2 h-5 w-5" />
              <span className="font-semibold">Try Again</span>
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
