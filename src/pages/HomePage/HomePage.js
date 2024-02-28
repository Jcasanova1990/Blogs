import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateForm from '../../components/CreateForm/CreateForm';
import Blogs from '../../components/Blogs/Blogs';
import styles from './HomePage.module.scss'; // Import the styles

export default function HomePage(props) {
    const [blogs, setBlogs] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await props.getAllBlogs();
                setBlogs(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBlogs();

        // Check if token is present to determine whether to show create form
        if (localStorage.token) {
            setShowCreate(true);
        }
    }, [props.getAllBlogs]);

    useEffect(() => {
        if (localStorage.token && !props.token) {
            props.setToken(localStorage.getItem('token'));
        }
        if (localStorage.token && localStorage.user && !props.user) {
            props.setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    return (
        <div className={styles['home-page']}> {/* Apply the defined styles */}
            <h1>Welcome to Code Buddies Blog</h1>
            {showCreate ? <CreateForm user={props.user} createBlog={props.createBlog} token={props.token} /> : null}
            {blogs.length ? <Blogs blogs={blogs} /> : 'Sorry, our writers are lazy'}
            <Link to="/register">Register</Link>
        </div>
    );
}
