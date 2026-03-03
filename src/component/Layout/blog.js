import './blog.css';
import blog4 from '../../img/blog4.jpg';
import blog5 from '../../img/blog5.png';
import blog6 from '../../img/blog6.png';
import blog7 from '../../img/blog7.png';
import { NavLink } from 'react-router-dom';
const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "How to Meal Prep for Gaining Weight (Recipes & Tips)",
      excerpt: "Are you looking to gain weight and muscle mass but you're finding it hard to stick to your goals? Sure, you could hi...",
      image: blog4,
      tag: "Meal Prep",
      author: "Kevin Curry",
      date: "December 5, 2023",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg" 
    },
    {
      id: 2,
      title: "Intermittent Fasting Keto: Faster Fat Loss Guide",
      excerpt: "If you've ever wondered what happens when you mix intermittent fasting...",
      image: blog5,
      tag: "Hacks",
      date: "August 25, 2025"
    },
    {
      id: 3,
      title: "Foods to Avoid While Intermittent Fasting",
      excerpt: "A lot of people start intermittent fasting with one question in mind: ...",
      image: blog6,
      tag: "Hacks",
      date: "August 18, 2025"
    },
    {
      id: 4,
      title: "Complete Intermittent Fasting Guide for Beginners",
      excerpt: "Intermittent fasting's gotten a lot of attention lately, and for good ...",
      image: blog7,
      tag: "How To",
      date: "August 15, 2025"
    }
  ];
  const featuredBlog = blogs[0];
  const recentBlogs = blogs.slice(1, 4);

  return (
    <section className="blog-section">
      <div className="blog-container">
        <h2 className="section-title">Latest Blogs</h2>
        <NavLink to={`/blog/${featuredBlog.id}`} className="blog-card featured-card">
          <div className="featured-image-wrapper">
            <img src={featuredBlog.image} alt={featuredBlog.title} />
          </div>
          <div className="featured-content">
            <span className="blog-tag">{featuredBlog.tag}</span>
            <h3 className="blog-title large">{featuredBlog.title}</h3>
            <p className="blog-excerpt">{featuredBlog.excerpt}</p>
            <div className="blog-meta">
              <img src={featuredBlog.avatar} alt={featuredBlog.author} className="author-avatar" />
              <div className="meta-text">
                <span className="author-name">{featuredBlog.author}</span>
                <span className="post-date">{featuredBlog.date}</span>
              </div>
            </div>
          </div>
        </NavLink>
        <div className="recent-blogs-grid">
          {recentBlogs.map((blog) => (
            <NavLink to={`/blog/${blog.id}`} key={blog.id} className="blog-card vertical-card">
              <div className="vertical-image-wrapper">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="vertical-content">
                <span className="blog-tag">{blog.tag}</span>
                <h3 className="blog-title medium">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <span className="post-date simple">{blog.date}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="view-all-container">
        <button className="btn-explore">Explore our latest blogs →</button>
      </div>
    </section>
  );
};
export default BlogSection;