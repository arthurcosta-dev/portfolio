import Skeleton from "../ui/Skeleton";
import { ROW_LAYOUT } from "./ProjectRow";

const ProjectRowSkeleton = () => (
  <div className={ROW_LAYOUT}>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="mt-2 h-6 w-full md:mt-0" />
    <Skeleton className="mt-2 h-5 w-1/3 md:mt-0 md:w-2/3" />
    <Skeleton className="mt-2 h-5 w-1/4 md:mt-0 md:ml-auto md:w-2/3" />
  </div>
);

export default ProjectRowSkeleton;
