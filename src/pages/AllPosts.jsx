import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container,PostCard } from '../components'

function AllPosts() {
    const [posts,setPosts] = useState([])
    useEffect(() => {
      
    
     
    }, [])

    appwriteService.getAllPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    
  return (
    <div className='py-8 w-full'>
        <Container>
            <div className="flex flex-wrap">
                {
                    posts.map((post)=>(
                        <div key={post.$id} className='w-1/4 p-2'>
                            <PostCard post={post} />
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPosts