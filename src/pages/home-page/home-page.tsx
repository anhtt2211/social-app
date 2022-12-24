import { ArticlesViewer } from 'features/article/components/ArticlesViewer';

export const HomePage = () => {
  const tags = [
    'implementations',
    'welcome',
    'introduction',
    'codebaseShow',
    'ipsum',
    'qui',
    'et',
    'quia',
    'cupiditate',
    'deserunt',
  ];
  return (
    <div>
      {renderBanner()}

      <div className="container mx-auto mt-6">
        <div className="flex flex-wrap">
          <div className="flex-[0_0_75%] max-w-[75%] px-4">
            <ArticlesViewer />
          </div>

          <div className="flex-[0_0_25%] max-w-[25%] px-4">
            <HomeSidebar tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

function renderBanner() {
  return (
    <div className="w-screen bg-green text-white text-center shadow-y">
      <div className="py-12 space-y-4">
        <h1 className="text-2xl font-bold">ReactJS Boilerplate</h1>
        <p className="text-lg">A place to share your knowledge.</p>
      </div>
    </div>
  );
}

function HomeSidebar({ tags }: { tags: string[] }) {
  return (
    <div className="bg-[#f3f3f3] rounded-md p-3 break-normal space-y-2">
      <p>Popular Tags</p>

      {tags.length > 0 ? (
        <div className="block ">
          {tags.map((tag) => (
            <a
              key={tag}
              href="#"
              className="px-2 rounded-3xl text-[#fff] text-sm py-1 bg-[#818a91] mr-1 inline-block mb-1"
              // onClick={() => onTabChange(`# ${tag}`)}
            >
              {tag}
            </a>
          ))}
        </div>
      ) : (
        <span>Loading tags...</span>
      )}
    </div>
  );
}
