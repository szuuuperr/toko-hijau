import { Star, ThumbsUp } from 'lucide-react';

export function ProductReviews() {
  const reviews = [
    {
      id: 1,
      name: 'Siti Nurhaliza',
      rating: 5,
      date: '2 hari yang lalu',
      comment: 'Kualitas tas sangat bagus! Bahannya tebal dan kuat. Cocok banget buat belanja harian. Penjual juga fast respon dan pengiriman cepat. Recommended!',
      helpful: 24,
      verified: true,
      image: null,
    },
    {
      id: 2,
      name: 'Budi Santoso',
      rating: 5,
      date: '5 hari yang lalu',
      comment: 'Tas nya bagus banget, bahan berkualitas. Jahitannya rapi dan kuat. Sudah saya pakai beberapa kali untuk belanja ke pasar dan supermarket, masih kokoh. Worth it!',
      helpful: 18,
      verified: true,
      image: null,
    },
    {
      id: 3,
      name: 'Dewi Lestari',
      rating: 4,
      date: '1 minggu yang lalu',
      comment: 'Produk sesuai deskripsi. Ukurannya pas, cukup muat banyak. Cuma warnanya sedikit lebih gelap dari foto, tapi overall bagus kok.',
      helpful: 12,
      verified: false,
      image: null,
    },
    {
      id: 4,
      name: 'Ahmad Fadli',
      rating: 5,
      date: '2 minggu yang lalu',
      comment: 'Sangat puas dengan pembelian ini. Tas nya kuat dan eco-friendly. Ikut berkontribusi untuk lingkungan sambil dapat produk berkualitas. Terima kasih TokoHijau!',
      helpful: 15,
      verified: true,
      image: null,
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 124, percentage: 80 },
    { stars: 4, count: 25, percentage: 16 },
    { stars: 3, count: 5, percentage: 3 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 0 },
  ];

  return (
    <div>
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
        <div className="text-center md:text-left">
          <div className="flex items-end justify-center md:justify-start gap-2 mb-3">
            <span className="text-5xl font-bold text-gray-900">4.8</span>
            <span className="text-2xl text-gray-600 mb-2">/5</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= 4.8
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-300 text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">Berdasarkan 156 ulasan</p>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-12">{item.stars} ★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-gray-200 last:border-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {review.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">{review.name}</span>
                  {review.verified && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {review.comment}
                </p>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Membantu ({review.helpful})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-all">
          Muat Lebih Banyak Ulasan
        </button>
      </div>
    </div>
  );
}
