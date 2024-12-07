import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Signin } from "./signin"
import Swal from 'sweetalert2';

function checkauth() {

    const token = localStorage.getItem('accessToken');
    if (!token) {
        return false
    } else {
        return token
    }

}

async function DeleteNews(posts) {
    const post = {
        id_news: posts
    }

    axios.post('http://127.0.0.1:8000/v1/news/delete', post, { headers: {"Authorization" : `Bearer ${checkauth()}`} })
      .then(function (response) {
        const res = response.data;
        console.log(response.data);
        Swal.fire({
            title: 'ลบข่าวเรียบร้อย',
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

async function ConfirmDelete(e) {

    const data = e.target.getAttribute("idnews");
    console.log(data)

    Swal.fire({
        title: "แน่ใจแล้วใช่ไหม?",
        text: "ว่าจะลบข่าวนี้ออก!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบเลย"
      }).then((result) => {
        if (result.isConfirmed) {
            DeleteNews(data)
        }
      });

}

export const Dashboard = () => {
    
    
    const token = localStorage.getItem('accessToken');
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8000/v1/user/mynews", { headers: {"Authorization" : `Bearer ${token}`} })
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    if (!token) {
        return <Signin />
    }

    return (
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mb-12">
            <header className="px-5 py-4 border-b border-gray-100 relative">
                <h2 className="text-gray-800 text-xl">TOTAL NEWS</h2>
                <a href="/dashboard/add" class="absolute right-2 md:right-8 top-4 text-white bg-blue-600 px-6 text-lg rounded-lg">ADD NEWS</a>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                        <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">ID</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Title</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Thumbnail</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Action</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 ui-sortable">
                    {data.map((news) => (
                        <tr className="rowdata h-6 ui-sortable-handle">
                            <td className="p-2 whitespace-nowrap">
                                <p className="truncate md:w-full w-16 text-center">{news.id}</p>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                                <p className="truncate md:w-full w-16 text-center">{news.titile}</p>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                                <img src={news.thumbnail} className="w-24 mx-auto" />
                            </td>
                            <td className="p-2 whitespace-nowrap text-center">
                                <a href={`/dashboard/edit/${news.id}`} className="ml-1 text-md bg-blue-500 hover:bg-blue-600 rounded-md px-2 text-white">แก้ไขข่าว</a>
                                <button className="ml-1 text-md bg-red-500 hover:bg-red-600 rounded-md px-2 text-white" idnews={news.id} onClick={(e) => ConfirmDelete(e)}>ลบข่าว</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>

            </div>

            

    )

}