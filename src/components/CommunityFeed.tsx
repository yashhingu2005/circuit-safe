import { useState } from 'react';
import { Heart, MessageCircle, Share, MapPin, Star, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  location: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  rating?: number;
}

const CommunityFeed = () => {
  const [posts] = useState<Post[]>([
    {
      id: '1',
      author: 'RiderMike82',
      avatar: '🏍️',
      time: '2h ago',
      location: 'Pacific Coast Highway',
      content: 'Just completed the most amazing coastal ride! Perfect weather and stunning views. Highly recommend this route for weekend adventures.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
      likes: 24,
      comments: 8,
      isLiked: false,
      rating: 5
    },
    {
      id: '2',
      author: 'SpeedDemon',
      avatar: '⚡',
      time: '4h ago',
      location: 'Mountain Pass Route 9',
      content: 'Watch out for loose gravel near mile marker 15. Took a small spill but bike and I are okay. Ride safe out there!',
      likes: 45,
      comments: 12,
      isLiked: true,
      rating: 3
    },
    {
      id: '3',
      author: 'CruiserQueen',
      avatar: '👑',
      time: '6h ago',
      location: 'Downtown Loop',
      content: 'New coffee shop discovered on Main Street - perfect pit stop for city rides. Great atmosphere and rider-friendly parking.',
      likes: 18,
      comments: 5,
      isLiked: false,
      rating: 4
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Routes', 'Safety', 'Social'];

  const handleLike = (postId: string) => {
    console.log(`Like post ${postId}`);
  };

  const handleComment = (postId: string) => {
    console.log(`Comment on post ${postId}`);
  };

  const handleShare = (postId: string) => {
    console.log(`Share post ${postId}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < rating ? 'text-warning fill-warning' : 'text-muted'} 
      />
    ));
  };

  return (
    <div className="pb-20 bg-gradient-hero min-h-screen">
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-high-contrast">Community</h1>
          <button className="map-control">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-6 mb-6">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200
                ${activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-foreground hover:bg-muted'
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-6 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="community-card">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-xl">
                  {post.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{post.author}</h3>
                  <div className="flex items-center space-x-2 text-sm text-foreground-secondary">
                    <span>{post.time}</span>
                    <span>•</span>
                    <MapPin size={14} />
                    <span>{post.location}</span>
                  </div>
                </div>
              </div>
              {post.rating && (
                <div className="flex space-x-1">
                  {renderStars(post.rating)}
                </div>
              )}
            </div>

            {/* Post Content */}
            <p className="text-foreground mb-3">{post.content}</p>

            {/* Post Image */}
            {post.image && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`
                    flex items-center space-x-2 touch-target px-2 py-1 rounded-lg transition-colors duration-200
                    ${post.isLiked ? 'text-destructive' : 'text-foreground-muted hover:text-destructive'}
                  `}
                >
                  <Heart size={20} className={post.isLiked ? 'fill-current' : ''} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={() => handleComment(post.id)}
                  className="flex items-center space-x-2 touch-target px-2 py-1 rounded-lg text-foreground-muted hover:text-primary transition-colors duration-200"
                >
                  <MessageCircle size={20} />
                  <span>{post.comments}</span>
                </button>
              </div>

              <button
                onClick={() => handleShare(post.id)}
                className="touch-target px-2 py-1 rounded-lg text-foreground-muted hover:text-accent transition-colors duration-200"
              >
                <Share size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="px-6 mt-6">
        <button className="w-full rider-button bg-muted/50 text-foreground hover:bg-muted">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default CommunityFeed;