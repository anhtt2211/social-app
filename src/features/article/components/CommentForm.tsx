import React, { useRef } from 'react';
import { User } from 'types';

export function CommentForm({
  user: { image },
  slug,
  commentBody,
  onCommentChange,
  onPostComment,
}: {
  user: User;
  slug: string;
  commentBody: string;
  onCommentChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPostComment: (slug: string, body: string, ev: React.FormEvent) => void;
}) {
  return (
    <form
      className="border-1 border-solid rounded"
      onSubmit={(event) => onPostComment(slug, commentBody, event)}
    >
      <div className="pt-4 pl-4">
        <textarea
          className="w-full outline-none"
          placeholder="Write a comment..."
          rows={3}
          onChange={onCommentChange}
          value={commentBody}
        />
      </div>

      <div className="bg-[#f5f5f5] p-4 flex justify-between items-center">
        <img src={image || undefined} className="rounded-full w-8 h-8" />
        <button className="bg-green text-white text-sm font-semibold py-1 px-2 rounded">
          Post Comment
        </button>
      </div>
    </form>
  );
}
