import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Signin } from "./signin"
import Swal from 'sweetalert2';

function checkauth() {

    const token = localStorage.getItem('accessToken');
    if (!token) {
        return <Signin />
    } else {
        return token
    }

}

async function Submit(posts) {
    const post = {
        title: posts.title,
        content: posts.content,
        thumbnail: posts.thumbnail,
        tags: posts.tags,
    }

    axios.post('http://127.0.0.1:8000/v1/news/add', post, { headers: {"Authorization" : `Bearer ${checkauth()}`} })
      .then(function (response) {
        const res = response.data;
        console.log(response.data);
        Swal.fire({
            title: 'เพิ่มข่าวเรียบร้อย',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
      })
      .catch(function (error) {
        Swal.fire({
            title: 'คุณไม่มีสิทธิ์',
            icon: 'error',
            confirmButtonText: 'รับทราบ!',
        })

      });
   }

export const AddNews = () => {

    checkauth()

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [tags, setTags] = useState();
    const [thumbnail, setThumbnail] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await Submit({
            title,content,tags,thumbnail
        });
    }

    return (

        <form noValidate onSubmit={handleSubmit}>
            <p className="text-xl font-bold mb-4">เพิ่มข่าวของคุณ</p>
                <input
                className="text-lg w-full px-4 py-2 border border-solid border-gray-300 rounded mb-3"
                type="text"
                placeholder="หัวข้อข่าว" onChange={e => setTitle(e.target.value)}
                />
                <textarea className="text-lg w-full px-4 py-2 border border-solid border-gray-300 rounded mb-3" placeholder="เนื้อหาข่าว" onChange={e => setContent(e.target.value)}></textarea>
                <input
                className="text-lg w-full px-4 py-2 border border-solid border-gray-300 rounded mb-3"
                type="text"
                placeholder="ภาพปกข่าว" onChange={e => setThumbnail(e.target.value)}
                />
                <input
                className="text-lg w-full px-4 py-2 border border-solid border-gray-300 rounded mb-3"
                type="text"
                placeholder="แท็ก" onChange={e => setTags(e.target.value)}
                />
                <div className="text-center md:text-left">
                <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-lg tracking-wider"
                    type="submit"
                >
                    เพิ่มข่าว
                </button>
                </div>
            </form>

    )

}