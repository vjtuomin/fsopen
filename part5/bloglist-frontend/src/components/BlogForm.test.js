import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const addBlog = jest.fn()
 
    render( <BlogForm createBlog={addBlog}/>)
  
    const input1 = screen.getByPlaceholderText('insert title')
    const input2 = screen.getByPlaceholderText('insert author')
    const input3 = screen.getByPlaceholderText('insert url')
    const sendButton = screen.getByText('save')
 
    await userEvent.type(input1, 'testi' )
    await userEvent.type(input2, 'testiAuthor')
    await userEvent.type(input3, 'testi.com' )
    await userEvent.click(sendButton)
   
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('testi' )
    expect(addBlog.mock.calls[0][0].author).toBe('testiAuthor' )
    expect(addBlog.mock.calls[0][0].url).toBe('testi.com' )
  })