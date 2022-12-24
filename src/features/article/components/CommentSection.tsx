import { Fragment } from 'react';
import { Article, User, Comment } from 'types';
import { ArticleComment } from './ArticleComment';
import { CommentForm } from './CommentForm';

export function CommentSection({
  user,
  article,
  commentSection: { submittingComment, commentBody, comments },
}: {
  user: User;
  article: Article;
  commentSection?: any;
  //   commentSection?: CommentSectionState;
}) {
  return (
    <div className="flex flex-wrap">
      <div className="flex-[0_0_100%]">
        <CommentForm
          user={user}
          slug={article.slug}
          submittingComment={true}
          commentBody="abcdxyz"
        />

        {comments.length > 0 ? (
          <Fragment>
            {comments.map((comment: Comment, index: number) => (
              <ArticleComment
                key={comment.id}
                comment={comment}
                slug={article.slug}
                user={user}
                index={index}
              />
            ))}
          </Fragment>
        ) : (
          <div>Loading comments...</div>
        )}
      </div>
    </div>
  );
}
