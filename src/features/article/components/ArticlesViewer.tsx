import { Fragment } from 'react';

import { useAppSelector } from 'app/hooks';
import { store } from 'app/store';
import { changeTab } from 'pages/home-page/homeSlice';
import { ETab } from 'types';
import { loadGlobalArticlesRequest, loadYourFeedsReq } from '../articleSlice';
import { ArticleList } from './ArticleList';

export const ArticlesViewer = ({}: {}) => {
  const { tab } = useAppSelector((state) => state.home);
  const { isLoading } = useAppSelector((state) => state.article);
  const tabs = [ETab.GlobalFeed, ETab.YourFeed];

  return (
    <Fragment>
      <ArticleTabSet tabs={tabs} selectedTab={tab} onTabChange={onTabChange} />
      {isLoading ? (
        <div className="mt-6">Loading articles...</div>
      ) : (
        <ArticleList />
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

  if (tab === ETab.GlobalFeed) {
    store.dispatch(loadGlobalArticlesRequest({}));
  }
  if (tab === ETab.YourFeed) {
    store.dispatch(loadYourFeedsReq({}));
  }
}
