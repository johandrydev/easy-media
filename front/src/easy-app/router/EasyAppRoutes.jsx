import { Navigate, Route, Routes } from 'react-router-dom'
import { AllPost } from '../pages/all-post/AllPost'
import { Navbar } from '../components/Navbar'
// import { JournalPage } from "../pages/JournalPage"

export const EasyAppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllPost />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
