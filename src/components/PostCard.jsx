import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const previewUrl = appwriteService.getFilePreview(featuredImage);

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
        <div className="relative w-full h-48 bg-gray-200">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-500">Image not available</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 truncate">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
