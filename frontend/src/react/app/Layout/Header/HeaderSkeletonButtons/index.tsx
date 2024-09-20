import { Skeleton } from "@/react/_components/ui/skeleton";

export const HeaderSkeletonButtons = () => {
  return (
    <div className="header-skeleton-buttons">
      <Skeleton className="skeleton-button" />
      <Skeleton className="skeleton-button" />
    </div>
  );
};
