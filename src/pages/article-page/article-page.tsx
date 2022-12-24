import moment from 'moment';
import { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { store } from 'app/store';
import { DATE_FORMAT } from 'constant';
import {
  loadArticleRequest,
  resetArticle,
} from 'features/article/articleSlice';
import { CommentSection } from 'features/article/components/CommentSection';
import { TagList } from 'features/article/components/TagList';
import { Article } from 'types';

const comments = [
  {
    id: 39272,
    createdAt: '2022-12-24T06:22:00.023Z',
    updatedAt: '2022-12-24T06:22:00.023Z',
    body: 'abcd',
    author: {
      username: 'abcdxyz.wata',
      bio: null,
      image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
      following: false,
    },
  },
];
const commentSection = {
  comments,
};

interface Params {
  slug: string;
}

export const ArticlePage = () => {
  const { slug } = useParams<Params>();
  const { article } = useAppSelector((state) => state.article);

  useEffect(() => {
    load(slug);

    return () => {
      store.dispatch(resetArticle());
    };
  }, [slug]);

  return (
    <div className="space-y-8 pb-10">
      <ArticlePageBanner article={article} />
      <div className="container mx-auto space-y-8">
        <div className="space-y-4">
          <div
            className=" whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          <TagList tagList={article.tagList} />
          <div className="border-1 border-solid h-[1px]" />
        </div>

        <ArticleMeta article={article} />

        <CommentSection
          user={article.author}
          article={article}
          commentSection={commentSection}
        />
      </div>
    </div>
  );
};

function ArticlePageBanner({ article }: { article: Article }) {
  return (
    <div className="w-screen bg-[#333] text-white">
      <div className="container mx-auto space-y-18 py-6">
        <h1 className="text-4xl font-bold">{article.title}</h1>

        <ArticleMeta article={article} />
      </div>
    </div>
  );
}

function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="mt-8">
      <div className="flex space-x-2">
        <ArticleAuthorInfo article={article} />

        {/* <OwnerArticleMetaActions
          article={article}
          //   deletingArticle={deletingArticle}
        /> */}
        <NonOwnerArticleMetaActions
          article={article}
          //   submittingFavorite={submittingFavorite}
          //   submittingFollow={submittingFollow}
        />
      </div>
    </div>
  );
}

function ArticleAuthorInfo({
  article: {
    author: { username, image },
    createdAt,
  },
}: {
  article: Article;
}) {
  return (
    <Fragment>
      <div className="flex items-center space-x-3">
        <Link to={`/profile/${username}`}>
          <img src={image || undefined} className="rounded-full" />
        </Link>
        <div className="flex flex-col">
          <Link className="author" to={`/profile/${username}`}>
            <span className="font-medium">{username}</span>
          </Link>
          <span className="font-light text-xs">
            {moment(createdAt).format(DATE_FORMAT)}
          </span>
        </div>
      </div>
    </Fragment>
  );
}

function NonOwnerArticleMetaActions({
  article: {
    slug,
    favoritesCount,
    favorited,
    author: { username, following },
  },
  submittingFavorite,
  submittingFollow,
}: {
  article: Article;
  submittingFavorite?: boolean;
  submittingFollow?: boolean;
}) {
  return (
    <Fragment>
      <button
        // className={classObjectToClassName({
        //   btn: true,
        //   'btn-sm': true,
        //   'btn-outline-secondary': !following,
        //   'btn-secondary': following,
        // })}
        className="text-sm px-2 py-1 !ml-10 border-1 border-solid border-[#ccc] text-[#ccc] rounded"
        disabled={submittingFollow}
        // onClick={() => onFollow(username, following)}
      >
        <i className="ion-plus-round"></i>
        &nbsp; {(following ? 'Unfollow ' : 'Follow ') + username}
      </button>
      &nbsp;
      <button
        // className={classObjectToClassName({
        //   btn: true,
        //   'btn-sm': true,
        //   'btn-outline-primary': !favorited,
        //   'btn-primary': favorited,
        // })}
        disabled={submittingFavorite}
        className="text-sm px-2 py-1 border-1 border-solid border-green text-green rounded"
        // onClick={() => onclassName='text-sm'Favorite(slug, favorited)}
      >
        <i className="ion-heart"></i>
        &nbsp; {(favorited ? 'Unfavorite ' : 'Favorite ') + 'Article'}
        <span className="counter">({favoritesCount})</span>
      </button>
    </Fragment>
  );
}

function OwnerArticleMetaActions({
  article: { slug },
  deletingArticle,
}: {
  article: Article;
  deletingArticle?: boolean;
}) {
  return (
    <Fragment>
      <button className="btn btn-outline-secondary btn-sm">
        <i className="ion-plus-round"></i>
        &nbsp; Edit Article
      </button>
      &nbsp;
      <button
        className="btn btn-outline-danger btn-sm"
        disabled={deletingArticle}
        // onClick={() => onDeleteArticle(slug)}
      >
        <i className="ion-heart"></i>
        &nbsp; Delete Article
      </button>
    </Fragment>
  );
}

function load(slug: string) {
  store.dispatch(loadArticleRequest(slug));
}
