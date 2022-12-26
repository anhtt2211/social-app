import { Fragment } from 'react';

import { useAppSelector } from 'app/hooks';
import { store } from 'app/store';
import { changeTab } from 'pages/home-page/home.slice';
import { Article, TabEnum } from 'types';
import { loadGlobalArticlesRequest, loadYourFeedsReq } from '../article.slice';
import { ArticleList } from './ArticleList';

interface Props {
  articles: readonly Article[];
  tabs: string[];
  isLoading: boolean;
}

export const ArticlesViewer = ({ articles, isLoading, tabs }: Props) => {
  const { tab } = useAppSelector((state) => state.home);

  return (
    <Fragment>
      <ArticleTabSet tabs={tabs} selectedTab={tab} onTabChange={onTabChange} />
      {isLoading ? (
        <div className="mt-6 px-2">Loading articles...</div>
      ) : (
        <ArticleList articles={articles} />
      )}
    </Fragment>
  );
};

function ArticleTabSet({
  tabs,
  selectedTab,
  onTabChange,
}: {
  tabs: string[];
  selectedTab: string;
  onTabChange?: (tab: string) => void;
}) {
  return (
    <div className="mb-[-1.5px]">
      <ul className="">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            tab={tab}
            active={tab === selectedTab}
            onClick={() => onTabChange && onTabChange(tab)}
          />
        ))}
      </ul>
    </div>
  );
}

function Tab({
  tab,
  active,
  onClick,
}: {
  tab: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <li className="p-2 inline-block">
      <a
        className={`text-[#aaa] py-2 ${
          active && 'font-medium !text-green border-b-2 !border-green'
        }`}
        href="#"
        onClick={(ev) => {
          ev.preventDefault();
          onClick && onClick();
        }}
      >
        {tab}
      </a>
    </li>
  );
}

function onTabChange(tab: string) {
  store.dispatch(changeTab(tab));

  if (tab === TabEnum.GlobalFeed) {
    store.dispatch(loadGlobalArticlesRequest({}));
  }
  if (tab === TabEnum.YourFeed) {
    store.dispatch(loadYourFeedsReq({}));
  }
}
