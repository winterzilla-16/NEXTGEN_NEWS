import React, { useState, useEffect } from "react"
import axios from 'axios';

export const Courtside = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/v1/courtside')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return( 
        <div className="container mx-auto px-4 py-5 ">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">COURTSIDE NEARBY</h1>
            <div className="text-xl font-bold text-gray-800 mb-5">ข่าวกีฬาที่น่าสนใจ</div>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {data.map((news) => (
                <div className="rounded-lg overflow-hidden shadow-lg">
                    <a href={`/read/${news.id}`}>
                    <img
                        className="w-full"
                        src={news.thumbnail}
                        alt="big ben and sunset"
                    />
                    </a>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{news.titile}</div>
                        <p className="text-gray-700 truncate text-base">
                        {news.content}
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {news.tags}
                        </span>
                    </div>
                </div>
            ))}
            </div>
        </div>

     )

}