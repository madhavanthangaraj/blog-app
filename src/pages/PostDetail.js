import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './postdetial.css';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    console.log('Current Post ID:', id);

    // Expanded posts data with more comprehensive content
    const posts = [
        {
            id: '1',
            title: 'How to Start Blogging in 2025',
            image: '/path/to/blog-start-image.jpg',
            author: 'Sarah Johnson',
            date: 'January 15, 2025',
            shortDescription: 'Learn the essential steps to launch your blogging journey in the digital age.',
            content: `
                <h3>Introduction to Blogging in 2025</h3>
                <p>Blogging remains a powerful platform for personal expression and professional growth. In 2025, the blogging landscape continues to evolve, offering exciting opportunities for aspiring writers.</p>
                
                <h4>Key Steps to Start Your Blog</h4>
                <ul>
                    <li>Choose a compelling niche</li>
                    <li>Select the right blogging platform</li>
                    <li>Create high-quality, engaging content</li>
                    <li>Build your online presence</li>
                </ul>

                <p>Whether you're looking to share your passion, build a personal brand, or generate income, blogging offers endless possibilities.</p>
            `
        },
        {
            id: '2',
            title: 'Top 10 Writing Tips for Beginners',
            image: '/path/to/writing-tips-image.jpg',
            author: 'Michael Thompson',
            date: 'February 1, 2025',
            shortDescription: 'Discover proven strategies to improve your writing skills and become a confident writer.',
            content: `
                <h3>Mastering the Art of Writing</h3>
                <p>Writing is a skill that can be learned and refined with practice. Here are ten essential tips to help you become a better writer:</p>
                
                <ol>
                    <li><strong>Write Consistently</strong>: Practice makes perfect</li>
                    <li><strong>Read Widely</strong>: Expand your horizons</li>
                    <li><strong>Find Your Voice</strong>: Develop a unique style</li>
                    <li><strong>Edit Ruthlessly</strong>: Refine your work</li>
                </ol>

                <p>Remember, every great writer started exactly where you are now.</p>
            `
        },
        {
            id: '3',
            title: 'The Future of Tech Blogging',
            image: '/path/to/tech-blogging-image.jpg',
            author: 'Alex Rodriguez',
            date: 'March 10, 2025',
            shortDescription: 'Explore the emerging trends and technologies shaping the tech blogging landscape.',
            content: `
                <h3>Tech Blogging in the Digital Era</h3>
                <p>Technology continues to revolutionize how we create, consume, and share content. Tech blogging in 2025 is more dynamic and interactive than ever before.</p>
                
                <h4>Emerging Trends</h4>
                <ul>
                    <li>AI-powered content creation</li>
                    <li>Immersive multimedia experiences</li>
                    <li>Real-time collaboration tools</li>
                    <li>Personalized content delivery</li>
                </ul>

                <p>Stay ahead of the curve by embracing innovation and continuous learning.</p>
            `
        }
    ];

    useEffect(() => {
        console.log('PostDetail Component Mounted');
        console.log('Available Post IDs:', posts.map(p => p.id));
        
        try {
            // Find the post matching the ID
            const foundPost = posts.find((p) => p.id === id);
            
            if (foundPost) {
                console.log('Post Found:', foundPost);
                setPost(foundPost);
                setError(null);
            } else {
                console.error(`No post found with ID: ${id}`);
                setError('Post not found');
                // Redirect to home or show error
                navigate('/home', { replace: true });
            }
        } catch (err) {
            console.error('Error finding post:', err);
            setError('An error occurred while loading the post');
        }
    }, [id, navigate]);

    if (error) {
        return (
            <div className="error-container">
                <h2>Oops! Something went wrong</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/home')}>Back to Home</button>
            </div>
        );
    }

    if (!post) {
        return <div>Loading post details...</div>;
    }

    return (
        <div className="post-detail-container">
            <div className="post-header">
                <h1>{post.title}</h1>
                <div className="post-meta">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                </div>
            </div>

            <div className="post-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="post-actions">
                <Link to="/home" className="back-button">Back to Home</Link>
            </div>
        </div>
    );
};

export default PostDetail;
