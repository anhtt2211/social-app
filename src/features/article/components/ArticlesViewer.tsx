import React, { Fragment, useState } from 'react';
import { ArticleList } from './ArticleList';

export enum ETab {
  YourFeed = 'Your feed',
  GlobalFeed = 'Global feed',
}

export const ArticlesViewer = ({}: {}) => {
  const [selectedTab, setSelectedTab] = useState<string>(ETab.GlobalFeed);
  const tabs = [ETab.GlobalFeed, ETab.YourFeed];

  const onTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <Fragment>
      <ArticleTabSet
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={onTabChange}
      />
      <ArticleList />
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
