import { useAppSelector } from 'app/hooks';
import { Fragment } from 'react';

import { ArticlePreview } from './ArticlePreview';

export const ArticleList = () => {
  const { articles } = useAppSelector((state) => state.article);

  return (
    <Fragment>
      <div className="px-2">
        {articles.map((article) => (
          <ArticlePreview key={article.slug} article={article} />
        ))}
      </div>
    </Fragment>
  );
};
