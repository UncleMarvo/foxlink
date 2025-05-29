// Avatar.tsx - Reusable avatar component with fallback
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface AvatarProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
}

/**
 * Avatar component that displays a user image and falls back to a default avatar if the image fails to load.
 * - src: user image URL (can be null/undefined)
 * - fallbackSrc: fallback image (default: /avatars/default.png)
 * - All other props are passed to Next.js Image
 */
const Avatar: React.FC<AvatarProps> = ({ src, alt, fallbackSrc = "/avatars/default.png", ...props }) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  );
};

export default Avatar; 