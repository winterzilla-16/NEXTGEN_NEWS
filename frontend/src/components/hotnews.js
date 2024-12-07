import React, { useState, useEffect } from "react"
import axios from 'axios';

export const Hotnews = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/v1/hotnews/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto relative p-5 sm:p-0">
            <div className="grid grid-cols-1">
                <div className="w-full">
                <a href={`/read/${data[0]?.id}`}>
                    <img className="bg-cover text-center overflow-hidden w-full rounded-xl" src={data[0]?.thumbnail} />
                </a>
                <div className="mt-3 text-center bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                    <div className="">
                        <a href={`/read/${data[0]?.id}`} className="text-md text-indigo-600 uppercase font-medium hover:text-gray-900 transition duration-500 ease-in-out">
                        {data[0]?.tags}
                    </a>
                    <a href={`/read/${data[0]?.id}`} className="block text-gray-900 mt-4 font-bold text-3xl mb-2 hover:text-indigo-600 transition duration-500 ease-in-out">
                        {data[0]?.titile}
                    </a>
                    </div>
                </div>
                </div>
              
            </div>
</div>
 )

}
