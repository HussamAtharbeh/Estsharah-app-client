import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, ArrowLeft } from 'lucide-react';
import '../../styles/pagesStyle/vistorsStyle/Blog.css';
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
useEffect(() => {
  const getPosts = async () => {
    try {
      const response = await axios.get(
        'https://gnews.io/api/v4/search',
        {
          params: {
            q: 'الأردن',
            lang: 'ar',
            country: 'jo',
            max: 10,
            apikey: 'f075f73908e663b14cc19581c666fd5e'
          }
        }
      );

      setPosts(response.data.articles);
      setLoading(false);
    } catch (error) {
      setError('حدث خطأ أثناء جلب المقالات');
      setLoading(false);
    }
  };

  const timer = setTimeout(getPosts, 1500);

  return () => clearTimeout(timer);
}, []);
if (loading) {
  return (
    <div className="blog-page">
      <div className="blog-header">
        <span className="section-subtitle">المدونة</span>
        <h1>المدونة القانونية</h1>
        <p>جاري تحميل المقالات...</p>
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className="blog-page">
      <div className="blog-header">
        <span className="section-subtitle">المدونة</span>
        <h1>المدونة القانونية</h1>
        <p>{error}</p>
      </div>
    </div>
  );
}

return (
  <div className="blog-page">
    <div className="blog-header">
      <span className="section-subtitle">المدونة</span>
      <h1>المدونة القانونية</h1>
      <p>أحدث المقالات والأخبار والتحديثات القانونية التي تهمك.</p>
    </div>

    <div className="blog-container">
      <div className="blog-grid">
        {posts.map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-image-wrapper">
              <img
                src={post.image}
                alt={post.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              <span className="blog-category">
                أخبار قانونية
              </span>
            </div>

            <div className="blog-content">
              <div className="blog-date">
                <Calendar size={15} />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('ar-JO')}
                </span>
              </div>

              <h3>{post.title}</h3>

              <p>{post.description}</p>

              <span className="blog-source">
                {post.source?.name}
              </span>

              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                اقرأ المزيد
                <ArrowLeft size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default Blog;