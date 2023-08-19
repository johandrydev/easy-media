import { Navigate, Route, Routes } from 'react-router-dom'
import { MyPost } from '../pages/my-post/MyPost'
// import { JournalPage } from "../pages/JournalPage"

export const EasyAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MyPost />} />
      {/* <Route path="/" element={ <JournalPage /> } /> */}

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
