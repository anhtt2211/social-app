import { Block, BlockTypeEnum } from 'types';

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="px-2">
      {blocks.map((block: Block) => (
        <div key={block.id}>{renderContent(block)}</div>
      ))}
    </div>
  );
}

const renderContent = (block: Block) => {
  switch (block.type) {
    case BlockTypeEnum.BIGGER_HEADER:
      return <BiggerHeader text={block.data.text!} />;
    case BlockTypeEnum.SMALL_HEADER:
      return <SmallerHeader text={block.data.text!} />;
    case BlockTypeEnum.PARAGRAPH:
      return <Paragraph text={block.data.text!} />;
    case BlockTypeEnum.IMAGE:
      return <Image url={block.data.file?.url!} />;
    case BlockTypeEnum.QUOTE:
      return <Quote text={block.data.text!} />;
    default:
      break;
  }
};

function BiggerHeader({ text }: { text: string }) {
  return <h4 className="text-3xl font-bold my-4">{text}</h4>;
}

function SmallerHeader({ text }: { text: string }) {
  return <h4 className="text-2xl font-bold my-3">{text}</h4>;
}

function Paragraph({ text }: { text: string }) {
  return (
    <div className="my-2 text-lg" dangerouslySetInnerHTML={{ __html: text }} />
  );
}

function Image({ url }: { url: string }) {
  return (
    <div>
      <img src={url} alt="" className="rounded my-4 mx-auto" />
    </div>
  );
}

function Quote({ text }: { text: string }) {
  return <div className="my-2" dangerouslySetInnerHTML={{ __html: text }} />;
}
