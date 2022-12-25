import { Fragment } from 'react';

import { useAppSelector } from 'app/hooks';
import { store } from 'app/store';
import { favoriteArticleReq } from '../article.slice';
import { ArticlePreview } from './ArticlePreview';

export const ArticleList = () => {
  const { articles } = useAppSelector((state) => state.article);

  return (
    <Fragment>
      <div className="px-2">
        {articles.length === 0 ? (
          <div className="mt-6">No articles are here... yet</div>
        ) : (
          <>
            {articles.map((article) => (
              <ArticlePreview
                key={article.slug}
                article={article}
                onFavoriteArticle={onFavoriteArticle}
              />
            ))}
          </>
        )}
      </div>
    </Fragment>
  );
};

function onFavoriteArticle({
  slug,
  favorited,
}: {
  slug: string;
  favorited: boolean;
}) {
  store.dispatch(favoriteArticleReq({ slug, favorited }));
}
