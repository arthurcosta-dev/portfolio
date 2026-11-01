import Skeleton from "../ui/Skeleton";
import { ROW_LAYOUT } from "./ProjectRow";

const ProjectRowSkeleton = () => (
  <div className={ROW_LAYOUT}>
    <div className="flex items-baseline justify-between gap-3 md:contents">
      <Skeleton className="h-6 w-3/5 md:w-3/4" />
      <Skeleton className="h-4 w-20 md:order-last md:ml-auto md:h-5" />
    </div>
    <Skeleton className="mt-2 h-[22px] w-full md:mt-0 md:h-6" />
    <Skeleton className="mt-2 h-4 w-1/4 md:mt-0 md:h-5 md:w-2/3" />
  </div>
);

export default ProjectRowSkeleton;
