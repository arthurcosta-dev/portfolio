const RepoDescription = ({ description, className = "" }) => (
  <p
    className={`${description ? "text-texto-suave" : "text-placeholder italic"} ${className}`}
  >
    {description ?? "Sem descrição ainda."}
  </p>
);

export default RepoDescription;
