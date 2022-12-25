import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Article } from 'types';
import { btnOutlintPrimary, btnPrimary, DATE_FORMAT } from 'constant';
import { TagList } from './TagList';

export const ArticlePreview = ({
  article: {
    createdAt,
    favorited,
    favoritesCount,
    slug,
    title,
    description,
    tagList,
    author: { image, username },
  },
  onFavoriteArticle,
}: {
  article: Article;
  isSubmitting?: boolean;
  onFavoriteArticle: ({
    slug,
    favorited,
  }: {
    slug: string;
    favorited: boolean;
  }) => void;
}) => {
  return (
    <div className="py-6 border-t-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to={`/profile/${username}`}>
            <img src={image || undefined} className="rounded-full" />
          </Link>
          <div className="flex flex-col">
            <Link
              to={`/profile/${username}`}
              className="text-green font-medium"
            >
              {username}
            </Link>
            <span className="text-xs text-[#bbb]">
              {moment(createdAt).format(DATE_FORMAT)}
            </span>
          </div>
        </div>
        <button
          className={`p-1 px-2 rounded ${
            favorited ? btnPrimary : btnOutlintPrimary
          }`}
          aria-label="Toggle Favorite"
          onClick={() => onFavoriteArticle({ slug, favorited })}
        >
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <a href={`/#/article/${slug}`} className="mt-12 space-y-2">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <p className="font-light text-[#999]">{description}</p>
        <div className="flex items-center justify-between text-xs text-[#bbb]">
          <span>Read more...</span>
          <TagList tagList={tagList} />
        </div>
      </a>
    </div>
  );
};
