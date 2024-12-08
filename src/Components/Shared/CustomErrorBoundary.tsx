import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CustomErrorBoundaryProps {
  children: ReactNode;
}

const CustomErrorBoundary = ({ children }: CustomErrorBoundaryProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="flex items-center flex-col">
          <DotLottieReact
            src="https://lottie.host/4995dfcf-813d-4c22-910a-06494a969b7a/lCn0gRVlVW.lottie"
            loop
            autoplay
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
