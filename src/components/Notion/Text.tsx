export default function Text({ title }: { title: any }) {
  if (!title) {
    return null;
  }

  return title.map((value: {
    annotations: {
      bold: boolean;
      code: boolean;
      color: string;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
    };
    text: {
      content: string;
      link?: { url: string };
    };
  }) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    const isLink = text.link;

    if (!bold && !code && !italic && !strikethrough && !underline && color === "default") {
      // If there are no formatting annotations, render plain text
      return isLink ? (
        <a
          className="font-bold relative transition-[unset] opacity-100 bg-origin-border bg-no-repeat bg-[50%_100%] border-b-[0.1rem] text-primary hover:text-secondary"
          href={text.link!.url} key={text.content}>
          {text.content}
        </a>
      ) : (
        <>{text.content}</>
      );
    }

    return isLink ? (
      <a
        className="font-bold relative transition-[unset] opacity-100 bg-origin-border bg-no-repeat bg-[50%_100%] border-b-[0.1rem] text-primary hover:text-secondary"
        href={text.link!.url} key={text.content}
      >
        {text.content}
      </a>
    ) : (
      <span
        className={`
          ${bold ? "font-bold" : ""}
          ${code ? "font-mono" : ""}
          ${italic ? "italic" : ""}
          ${strikethrough ? "line-through" : ""}
          ${underline ? "underline" : ""}
        `}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.content}
      </span>
    );
  });
}
