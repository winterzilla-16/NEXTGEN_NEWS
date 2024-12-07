import React, { useState, useEffect } from "react"
import axios from 'axios';
import { useParams } from "react-router-dom";


export const Read = () => {

    const param = useParams()
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/v1/news/id/${param.id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (

        <div className="">
            <p className="text-4xl font-bold">{data.titile}</p>
            <img src={data.thumbnail} className="w-full rounded-xl mt-5" />

            <p className="font-bold mt-6 text-xl">รายละเอียดข่าว: <span className="text-red-600">{data.author?.first_name} {data.author?.last_name}</span></p>

            <div className="px-2 py-12 font-light whitespace-normal indent-8">

                <p className="text-xl font-semibold">{data.content}</p>

            </div>

        </div>
        

    )

}