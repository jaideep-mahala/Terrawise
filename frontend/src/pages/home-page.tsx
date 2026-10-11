import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogFeed from '@/components/blog-feed';
import PostCard from '@/components/post-card';
import Post from '@/types/post-type';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import Header from '@/layouts/header-layout';
import { sampleTours } from '@/constants/sample-tours';
function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_PATH + '/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Static tour examples replace the empty state when the API has no posts,
  // so the landing page always shows images instead of blank skeleton blocks.
  const displayedPosts: Post[] = posts.length > 0 ? posts : sampleTours;

  return (
    <div className="w-full cursor-default bg-light dark:bg-dark">
      <Header />
      <div className="mx-4 md:mx-8 lg:mx-16">
        <BlogFeed />
        <h1 className="cursor-text pb-4 text-xl font-semibold dark:text-dark-primary sm:pb-0">
          All Posts
        </h1>
        <div className="flex flex-wrap">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => <PostCardSkeleton key={index} />)
            : displayedPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
