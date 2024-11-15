import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8'>
        <Container className='min-h-screen'>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost