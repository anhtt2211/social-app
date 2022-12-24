export function TagList({ tagList }: { tagList: string[] }) {
  return (
    <ul className="max-w-[50%] text-xs">
      {tagList.map((tag) => (
        <li
          key={tag}
          className="p-1 mr-1 text-center font-light border-solid border-1 border-[#ddd] rounded-xl inline-block"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
