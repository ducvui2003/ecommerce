'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CommentRequest } from '@/types/comment.type';
import { PageReq } from '@/types/api.type';
import { useCreateCommentMutation, useGetCommentsByProductQuery } from '@/features/comment/comment.api';

interface ProductCommentProps {
  productId: number;
}

const ProductComment: React.FC<ProductCommentProps> = ({ productId }) => {
  const [comment, setComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [page, setPage] = useState(1);
  const size = 10;


  const {
    data: commentsData,
    error,
    isLoading,
    refetch,
  } = useGetCommentsByProductQuery({
    productId,
    req: { page, size }
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <section className="bg-white py-8 antialiased lg:py-16 dark:bg-gray-900">
      <div className="mx-auto w-full px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
            Bình luận ({commentsData?.items?.length || 0})
          </h2>
        </div>

        <form className="mb-6">
          <div className="mb-4 rounded-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Viết bình luận
            </label>
            <textarea
              id="comment"
              rows={6}
              className="w-full border-0 px-0 text-sm text-gray-900 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Viết bình luận..."
              value={comment}
              onChange={handleCommentChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isPosting}>
              {isPosting ? 'Đang gửi...' : 'Bình luận'}
            </Button>
          </div>
        </form>

        {isLoading ? (
          <p className="text-gray-500 dark:text-gray-400">Đang tải bình luận...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400">Lỗi khi tải bình luận</p>
        ) : (
          {commentsData?.totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Trang {page + 1} / {commentsData.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                >
                  Trước
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page + 1 >= commentsData.totalPages}
                >
                  Sau
                </Button>
              </div>
            </div>
          )}

          </div>
    </section>
  );
};

export default ProductComment;
