import { Navigate, Route, Routes } from 'react-router-dom'
import { AllPost } from '../pages/all-post/AllPost'
import { Navbar } from '../components/Navbar'
import { MyPost } from '../pages/my-post/MyPost'
import { CreatePost } from '../pages/create-post/CreatePost'

export const EasyAppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllPost />} />
        <Route path="/my-posts" element={<MyPost />} />
        <Route path="/create-post" element={<CreatePost />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
