import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders Title and author, not url', () => {
    const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: "62851bd0d7ef2dddb2b466a8",
        __v: 0
      }
  
     render(<Blog blog={newBlog} />)
  
    const element1 = screen.getByText("TDD harms architecture")
    const element2 = screen.getByText("Robert C. Martin")
    const element3 = screen.queryByText("http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html")
  
    expect(element1).toBeDefined()
    expect(element2).toBeDefined()
    expect(element3).toBeNull()
  })
  