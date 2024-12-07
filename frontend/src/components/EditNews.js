import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Signin } from "./signin"
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

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
        id_news: posts.idnews
    }

    axios.post('http://127.0.0.1:8000/v1/news/edit', post, { headers: {"Authorization" : `Bearer ${checkauth()}`} })
      .then(function (response) {
        const res = response.data;
        console.log(response.data);
        Swal.fire({
            title: 'แก้ไขข่าวเรียบร้อย',
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

export const EditNews = () => {

    checkauth()

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [tags, setTags] = useState();
    const [thumbnail, setThumbnail] = useState();
    const param = useParams()
    const idnews = param.id

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await Submit({
            title,content,tags,thumbnail,idnews
        });
    }

    
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/v1/news/id/${param.id}`)
            .then(response => {
                setData(response.data);
                setTitle(response.data.titile)
                setContent(response.data.content)
                setThumbnail(response.data.thumbnail)
                setTags(response.data.tags)
            })
            .catch(error => console.error(error));
    }, []);


    return (

        <form noValidate onSubmit={handleSubmit}>
            <p className="text-xl font-bold mb-4">แก้ไขข่าวของคุณ</p>
                <input
                className="text-lg w-full px-4 py-2 border border-solid border-gray-300 rounded mb-3"
                type="text"
                placeholder="หัวข้อข่าว" defaultValue={data.titile} onChange={e => setTitle(e.target.value)}
                />
                <textarea className="text-lg w-full px-4 py-2 border border-solid border-gray-300 rounded mb-3" defaultValue={data.content} placeholder="เนื้อหาข่าว" onChange={e => setContent(e.target.value)}>{data.content}</textarea>
                <input
                className="text-lg w-full px-4 py-2 border border-solid border-gray-300 rounded mb-3"
                type="text"
                placeholder="ภาพปกข่าว" defaultValue={data.thumbnail} onChange={e => setThumbnail(e.target.value)}
                />
                <input
                className="text-lg w-full px-4 py-2 border border-solid border-gray-300 rounded mb-3"
                type="text"
                placeholder="แท็ก" defaultValue={data.tags} onChange={e => setTags(e.target.value)}
                />
                <div className="text-center md:text-left">
                <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-lg tracking-wider"
                    type="submit"
                >
                    แก้ไขข่าว
                </button>
                </div>
            </form>

    )

}