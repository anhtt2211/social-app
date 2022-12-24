import { DATE_FORMAT } from 'constant';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { User, Comment } from 'types';

export function ArticleComment({
  comment: {
    id,
    body,
    createdAt,
    author: { username, image },
  },
  slug,
  index,
  user,
}: {
  comment: Comment;
  slug: string;
  index: number;
  user: User;
}) {
  return (
    <div className="border-1 border-solid rounded mt-3">
      <div className="p-4">
        <p>{body}</p>
      </div>
      <div className="bg-[#f5f5f5] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to={`/profile/${username}`}>
            <img src={image || undefined} className="rounded-full w-6 h-6" />
          </Link>
          &nbsp;
          <Link
            className="text-green text-xs font-light"
            to={`/profile/${username}`}
          >
            {username}
          </Link>
          <span className="text-[#bbb] text-sm">
            {moment(createdAt).format(DATE_FORMAT)}
          </span>
        </div>

        <span className=" text-[#373a3c] text-base cursor-pointer">
          <i
            className="ion-trash-a"
            aria-label={`Delete comment ${index + 1}`}
            //   onClick={() => onDeleteComment(slug, id)}
          ></i>
        </span>
      </div>
    </div>
  );
}
