import bcrypt from 'bcryptjs'

import User from '@/models/User'
import { signAccessToken, signRefreshToken } from '@/lib/jwt'
import { connectDB } from '@/lib/db'

export const authService = {
  async signup({
    username,
    email,
    password,
  }: {
    username: string
    email: string
    password: string
  }) {
    await connectDB()

    const existing = await User.findOne({ email })
    if (existing) throw new Error('Email already exists')

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashed })

    return { id: user._id, email: user.email, username: user.username }
  },

  async login({ email, password }: { email: string; password: string }) {
    await connectDB()

    const user = await User.findOne({ email })
    if (!user) throw new Error('Invalid credentials')

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new Error('Invalid credentials')
    }

    const token = signAccessToken({ userId: user._id })
    const refresh = signRefreshToken({ userId: user._id })

    return {
      user: { id: user._id, email: user.email, username: user.username },
      token,
      refresh,
    }
  },
}
