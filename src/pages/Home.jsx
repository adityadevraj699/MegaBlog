import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-16 min-h-screen bg-white">
                <Container>
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold text-black mb-4">Login to read posts</h1>
                        <p className="text-xl text-black opacity-80">Please sign in to view the latest content.</p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-16 bg-gray-50">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
