import { Link } from 'react-router-dom'

export default function Blogs(props) {
    return(<div>
        {props.blogs.map((blog) => {
            return(
            <article key={blog._id}>
                <h3>{blog.title}</h3>
                <Link to={`/blog/${blog._id}`}>This the link to the Show Page of {`${blog._id}`}</Link>
            </article>)
        })}
    </div>)
}