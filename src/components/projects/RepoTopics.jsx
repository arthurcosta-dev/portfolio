import Tag from "../ui/Tag";

const RepoTopics = ({ topics = [], limit }) =>
  topics.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {topics.slice(0, limit).map((topic) => (
        <Tag key={topic}>{topic}</Tag>
      ))}
    </div>
  );

export default RepoTopics;
