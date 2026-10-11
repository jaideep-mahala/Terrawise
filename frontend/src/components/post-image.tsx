import { useEffect, useState } from 'react';
import fallbackImage from '@/assets/terrawisebg.webp';

interface PostImageProps {
  src?: string;
  alt: string;
  className?: string;
}

/**
 * Renders a post cover image and guarantees the slot is never left empty.
 * - Falls back to a bundled image when `src` is missing/blank.
 * - Swaps to the bundled image when the remote image fails to load.
 */
export default function PostImage({ src, alt, className }: PostImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const resolvedSrc = !src || !src.trim() || failed ? fallbackImage : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
      data-testid="postimage"
    />
  );
}
