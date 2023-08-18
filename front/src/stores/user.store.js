import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

const store = (set) => ({
  user: null,
  isAutenticated: false,
  setUser: (user) => set({ user, isAutenticated: true }),
  setLogout: () => set({ user: null, isAutenticated: false })
})

export const useUserStore = create(persist(devtools(store), { name: 'user' }))
