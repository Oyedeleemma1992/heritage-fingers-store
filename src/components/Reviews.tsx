import React, { useState, useEffect } from 'react';
import { Star, MessageCircle } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const DEFAULT_REVIEWS: Review[] = [
  { id: '1', name: 'Sarah J.', rating: 5, comment: 'Amazing quality! The palm oil is so authentic.', date: new Date().toISOString() },
  { id: '2', name: 'Michael O.', rating: 4, comment: 'Fast delivery, good packaging. Will order again.', date: new Date().toISOString() }
];

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('heritage_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_REVIEWS;
  });

  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    localStorage.setItem('heritage_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      name,
      rating,
      comment,
      date: new Date().toISOString()
    };

    setReviews([newReview, ...reviews]);
    setName('');
    setComment('');
    setRating(5);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mt-16">
      <div className="flex items-center mb-8">
        <MessageCircle className="w-8 h-8 text-[#C96B3B] mr-3" />
        <h2 className="font-serif text-3xl font-bold text-[#183C2B]">Customer Reviews</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Submit Review Form */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit">
          <h3 className="font-bold text-[#171717] mb-6">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#183C2B]"
                placeholder="Jane Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#183C2B]"
                placeholder="Tell us what you think..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#183C2B] text-white font-medium rounded-lg hover:bg-[#11331e] transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic">No reviews yet. Be the first to leave one!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-[#171717] text-lg">{review.name}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
