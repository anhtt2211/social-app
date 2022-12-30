import { Block, BlockTypeEnum } from 'types';

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  const renderContent = (block: Block) => {
    switch (block.type) {
      case BlockTypeEnum.BIGGER_HEADER:
        return <BodyBiggerHeader block={block} />;
      case BlockTypeEnum.SMALL_HEADER:
        return <BodySmallerHeader block={block} />;
      case BlockTypeEnum.PARAGRAPH:
        return <BodyParagraph block={block} />;
      case BlockTypeEnum.IMAGE:
        return <BodyImage block={block} />;
      case BlockTypeEnum.QUOTE:
        return <BodyQuote block={block} />;
      default:
        break;
    }
  };

  return (
    <div className="px-2">
      {blocks.map((block: any) => (
        <div key={block._id}>{renderContent(block)}</div>
      ))}
    </div>
  );
}

function BodyBiggerHeader({ block }: { block: Block }) {
  return <h4 className="text-3xl font-bold my-4">{block.data.text}</h4>;
}

function BodySmallerHeader({ block }: { block: Block }) {
  return <h4 className="text-2xl font-bold my-3">{block.data.text}</h4>;
}

function BodyParagraph({ block }: { block: Block }) {
  return (
    <div
      className="my-2 text-lg"
      dangerouslySetInnerHTML={{ __html: block.data.text! }}
    />
  );
}

function BodyImage({ block }: { block: Block }) {
  return (
    <div>
      <img
        src={block.data!.file!.url}
        alt=""
        className="rounded my-4 mx-auto"
      />
    </div>
  );
}

function BodyQuote({ block }: { block: Block }) {
  return (
    <div
      className="my-2"
      dangerouslySetInnerHTML={{ __html: block.data.text! }}
    />
  );
}
