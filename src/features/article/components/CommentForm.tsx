import { User } from 'types';

export function CommentForm({
  user: { image },
  commentBody,
  slug,
  submittingComment,
}: {
  user: User;
  commentBody: string;
  slug: string;
  submittingComment: boolean;
}) {
  return (
    <form
      className="border-1 border-solid rounded"
      // onSubmit={onPostComment(slug, commentBody)}
    >
      <div className="pt-4 pl-4">
        <textarea
          className="w-full outline-none"
          placeholder="Write a comment..."
          rows={3}
          // onChange={onCommentChange}
          // value={commentBody}
        />
      </div>

      <div className="bg-[#f5f5f5] p-4 flex justify-between items-center">
        <img src={image || undefined} className="rounded-full w-8 h-8" />
        <button
          className="bg-green text-white text-sm font-semibold py-1 px-2 rounded"
          disabled={submittingComment}
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}
