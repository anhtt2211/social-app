import { DATE_FORMAT } from 'constant';
import { CommentSection } from 'features/article/components/CommentSection';
import { TagList } from 'features/article/components/TagList';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Article } from 'types';
import { redirect } from 'utils';

const article = {
  slug: 'If-we-quantify-the-alarm-we-can-get-to-the-FTP-pixel-through-the-online-SSL-interface!-120863',
  title:
    'If we quantify the alarm, we can get to the FTP pixel through the online SSL interface!',
  description:
    'Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut cupiditate est facere omnis possimus. Tenetur similique nemo illo soluta molestias facere quo. Ipsam totam facilis delectus nihil quidem soluta vel est omnis.',
  body: 'Quia quo iste et aperiam voluptas consectetur a omnis et.\\nDolores et earum consequuntur sunt et.\\nEa nulla ab voluptatem dicta vel. Temporibus aut adipisci magnam aliquam eveniet nihil laudantium reprehenderit sit.\\nAspernatur cumque labore voluptates mollitia deleniti et. Quos pariatur tenetur.\\nQuasi omnis eveniet eos maiores esse magni possimus blanditiis.\\nQui incidunt sit quos consequatur aut qui et aperiam delectus.\\nPraesentium quas culpa.\\nEaque occaecati cumque incidunt et. Provident saepe omnis non molestiae natus et.\\nAccusamus laudantium hic unde voluptate et sunt voluptatem.\\nMollitia velit id eius mollitia occaecati repudiandae. Voluptatum tempora voluptas est odio iure odio dolorem.\\nVoluptatum est deleniti explicabo explicabo harum provident quis molestiae. Sed dolores nostrum quis. Aut ipsa et qui vel similique sed hic a.\\nVoluptates dolorem culpa nihil aut ipsam voluptatem. Cupiditate officia voluptatum.\\nTenetur facere eum distinctio animi qui laboriosam.\\nQuod sed voluptatem et cumque est eos.\\nSint id provident suscipit harum odio et. Facere beatae delectus ut.\\nPossimus voluptas perspiciatis voluptatem nihil sint praesentium.\\nSint est nihil voluptates nesciunt voluptatibus temporibus blanditiis.\\nOfficiis voluptatem earum sed. Deserunt ab porro similique est accusamus id enim aut suscipit.\\nSoluta reprehenderit error nesciunt odit veniam sed.\\nDolore optio qui aut ab.\\nAut minima provident eius repudiandae a quibusdam in nisi quam.',
  tagList: ['rerum', 'maiores', 'omnis', 'quae'],
  createdAt: '2022-12-09T13:46:24.264Z',
  updatedAt: '2022-12-09T13:46:24.264Z',
  favorited: false,
  favoritesCount: 84,
  author: {
    username: 'Anah Benešová',
    bio: null,
    image: 'https://api.realworld.io/images/demo-avatar.png',
    following: false,
  },
};
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
export const ArticlePage = () => {
  return (
    <div className="space-y-8 pb-10">
      {ArticlePageBanner()}
      <div className="container mx-auto space-y-8">
        <div className="space-y-4">
          <div
            className=" whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          <TagList tagList={article.tagList} />
          <div className="border-1 border-solid h-[1px]" />
        </div>

        <ArticleMeta />

        {/* comment */}
        <CommentSection
          user={article.author}
          article={article}
          commentSection={commentSection}
        />
      </div>
    </div>
  );
};

function ArticlePageBanner() {
  return (
    <div className="w-screen bg-[#333] text-white">
      <div className="container mx-auto space-y-18 py-6">
        <h1 className="text-4xl font-bold">{article.title}</h1>

        <ArticleMeta />
      </div>
    </div>
  );
}

function ArticleMeta() {
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
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => redirect(`editor/${slug}`)}
      >
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
