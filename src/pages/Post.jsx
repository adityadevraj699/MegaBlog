import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

  return post ? (
    <div className="py-12 bg-gray-100">
      <Container>
        {/* Blog Header */}
        <div className="w-full max-w-4xl mx-auto mb-10 rounded-lg overflow-hidden bg-white shadow-lg">
          {/* Fixed Image Size */}
          <div className="w-full h-64 overflow-hidden relative p-4 ">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-contain "
            />
          </div>

          {/* Blog Content */}
          <div className="p-8">
            {/* Blog Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              {post.title}
            </h1>

            

            {/* Blog Text Content */}
            <div className="prose prose-lg max-w-none text-gray-700">
              {parse(post.content)}
            </div>
          </div>
        </div>

        {/* Author Actions */}
        {isAuthor && (
          <div className="flex justify-end max-w-4xl mx-auto space-x-4">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-green-500"
                className="hover:bg-green-600 text-white"
              >
                Edit Post
              </Button>
            </Link>
            <Button
              bgColor="bg-red-500"
              className="hover:bg-red-600 text-white"
              onClick={deletePost}
            >
              Delete Post
            </Button>
          </div>
        )}
      </Container>
    </div>
  ) : null;
}
