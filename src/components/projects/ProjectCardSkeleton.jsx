import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

const LargeSkeleton = ({ className }) => (
  <Card
    className={`rounded-card-lg flex min-h-[400px] flex-col gap-4 p-5 lg:min-h-0 lg:gap-5 lg:p-8 ${className}`}
  >
    <Skeleton className="h-10 w-3/5 lg:h-12" />
    <Skeleton className="h-16 w-full max-w-[540px]" />
    <Skeleton className="h-7 w-1/2" />
    <div className="mt-auto flex flex-col gap-3 pt-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-11 w-1/2" />
    </div>
  </Card>
);

const SmallSkeleton = ({ className }) => (
  <Card
    variant="outline"
    className={`rounded-card-md flex min-h-[168px] flex-col justify-between gap-4 p-[22px] lg:p-7 ${className}`}
  >
    <div>
      <Skeleton className="h-8 w-3/5" />
      <Skeleton className="mt-3 h-11 w-full" />
    </div>
    <Skeleton className="h-5 w-full" />
  </Card>
);

const ProjectCardSkeleton = ({ size = "small", className = "" }) =>
  size === "large" ? (
    <LargeSkeleton className={className} />
  ) : (
    <SmallSkeleton className={className} />
  );

export default ProjectCardSkeleton;
