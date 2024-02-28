import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ShowPage from './pages/ShowPage/ShowPage'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'

export default function App(){
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')

    const signUp = async (credentials) => {
        try {
           const response  =  await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
           })
           const data = await response.json()
           setUser(data.user)
           setToken(data.token)
           localStorage.setItem('token', data.token)
           localStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
           console.error(error) 
        }
    }
    // this function will need to be a prop passed to the LoginForm via AuthPage
    const login = async (credentials) => {

        try {
        // https://i.imgur.com/3quZxs4.png
        // Step 1 is complete here once someone fills out the loginForm
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()
        // Step 3
        const tokenData = data.token 
        localStorage.setItem('token', tokenData)
        setToken(tokenData)
        // the below code is additional to the core features of authentication
        // You need to decide what additional things you would like to accomplish when you
        // set up your stuff
        const userData = data.user
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        } catch (error) {
            console.error(error)
        }    
    }

    // Create we need token authentication in order to verify that someone can make a blog
    // Plus identify who is making the blog
    const createBlog = async (blogData, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }

    }

    // Read we don't need token authentication to see the blogPosts
    const getAllBlogs = async () => {
        try {
            const response = await fetch('/api/blogs')
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    } 
    const getIndividualBlog = async (id) => {
        try {
            const response = await fetch(`/api/blogs/${id}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error) 
        }
    }
    // Update
    const updateBlog = async (newBlogData, id, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newBlogData)
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }

    }

    // Delete
    const deleteBlog = async (id, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }


    return(
        <div className={styles.App}>
            {/*
               Get all Blog Posts when the component Mounts
               Create an individual Blogs
            */}
            <Routes>
                <Route path="/" 
                element={
                <HomePage 
                    user={user} 
                    token={token} 
                    setToken={setToken}
                    setUser={setUser}
                    getAllBlogs={getAllBlogs}
                    createBlog={createBlog}
                />}></Route>
                <Route path="/register" 
                element={
                <AuthPage 
                    setUser={setUser} 
                    setToken={setToken} 
                    signUp={signUp}
                    login={login}
                />}></Route>
                <Route path="/blog/:id" 
                element={
                <ShowPage 
                    user={user} 
                    token={token} 
                    setToken={setToken}
                    setUser={setUser}
                    getIndividualBlog={getIndividualBlog}
                    deleteBlog={deleteBlog}
                    updateBlog={updateBlog}
                />}></Route>
            </Routes>

        </div>
    )
}