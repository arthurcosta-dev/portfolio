import { LANGUAGE_COLORS } from "../../utils/languageColors";

const RepoLanguage = ({ language }) =>
  language && (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        style={{ backgroundColor: LANGUAGE_COLORS[language] }}
        className="bg-texto-suave size-2.5 rounded-full"
      />
      {language}
    </span>
  );

export default RepoLanguage;
