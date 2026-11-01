import { formatDate } from "../../utils/formatDate";
import Button from "../ui/Button";
import Tag from "../ui/Tag";
import TextLink from "../ui/TextLink";

const MessageRow = ({ message, isUpdating, onSetAnswered }) => (
  <li className="border-borda border-t py-5 md:py-6">
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h3 className="text-lg font-medium [overflow-wrap:anywhere]">
        {message.name}
      </h3>
      <p className="text-texto-suave text-sm">
        {formatDate(message.created_at)}
      </p>
    </div>
    <TextLink
      href={`mailto:${message.email}`}
      className="text-[15px] [overflow-wrap:anywhere]"
    >
      {message.email}
    </TextLink>
    <p className="text-texto-2 mt-2 max-w-[70ch] text-base leading-normal [overflow-wrap:anywhere] whitespace-pre-wrap">
      {message.message}
    </p>
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        disabled={isUpdating}
        onClick={() =>
          onSetAnswered({ id: message.id, answered: !message.answered })
        }
        className="h-11 px-5 text-[15px]"
      >
        {message.answered ? "Desmarcar" : "Marcar como respondida"}
      </Button>
      {message.answered && <Tag>Respondida</Tag>}
    </div>
  </li>
);

export default MessageRow;
