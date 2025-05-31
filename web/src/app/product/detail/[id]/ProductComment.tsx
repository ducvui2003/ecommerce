'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const ProductComment = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Thanh Bình',
      date: 'Feb. 8, 2025',
      text: 'Sản phẩm rất tốt, mình đã sử dụng và thấy hiệu quả rõ rệt. Cảm ơn shop đã cung cấp sản phẩm chất lượng!',
    },
    {
      id: 2,
      user: 'Brian',
      date: 'Feb. 12, 2025',
      text: 'Tôi đã sử dụng sản phẩm này và thấy rất hài lòng. Chất lượng tốt và giá cả hợp lý.',
    },
    {
      id: 3,
      user: 'Nguyễn Văn A',
      date: 'Mar. 12, 2025',
      text: 'Sản phẩm rất tốt, mình đã sử dụng và thấy hiệu quả rõ rệt. Cảm ơn shop đã cung cấp sản phẩm chất lượng!',
    },
  ]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment) {
      setComments([...comments, { id: comments.length + 1, user: 'You', date: new Date().toLocaleDateString(), text: comment }]);
      setComment('');
    }   
  };
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Bình luận ({comments.length})</h2>
        </div>
        <form className="mb-6" onSubmit={handlePostComment}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Viết bình luận..."
              value={comment}
              onChange={handleCommentChange}
              required
            />
          </div>
          <div className={"flex justify-end"}>
            <Button type="submit">Bình luận</Button>
          </div>

        </form>

        {comments.map((comment) => (
          <article key={comment.id} className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="profile" />
                  {comment.user}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime={comment.date} title={comment.date}>{comment.date}</time>
                </p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
            <div className="flex items-center mt-4 space-x-4">
              <Button type="button" className="flex items-center text-sm text-white hover:underline dark:text-gray-400 font-medium">
                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                </svg>
                Trả lời
              </Button>
              <Button
                type="button"
                className="flex items-center text-sm text-white hover:underline dark:text-gray-400 font-medium"
              >
                <svg
                  className="mr-1.5 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5.172a4 4 0 0 1 5.656 0L10 6.343l1.172-1.171a4 4 0 1 1 5.656 5.656L10 17.657l-6.828-6.829a4 4 0 0 1 0-5.656Z" />
                </svg>
                Thích
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductComment;
