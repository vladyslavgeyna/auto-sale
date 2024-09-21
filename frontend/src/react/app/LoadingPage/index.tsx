import { Loader2 } from "lucide-react";

export const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="spinner-wrapper">
        <Loader2 className="animate-spin loading-spinner" />
      </div>
    </div>
  );
};
