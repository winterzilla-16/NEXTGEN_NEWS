import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Sportnews } from "./hotnews";
import Swal from 'sweetalert2';


async function loginUser(users) {
    const userpass = {
        username: users.username,
        password: users.password
    }

    axios.post('http://127.0.0.1:8000/v1/auth/login', userpass)
      .then(function (response) {
        const res = response.data;
        localStorage.setItem('accessToken', res.access);
        console.log(response.data);
        Swal.fire({
            title: 'เข้าสู่ระบบเรียบร้อย',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        }).then(function(){
            window.location.href = "/dashboard";
        })
            
        
      })
      .catch(function (error) {
        Swal.fire({
            title: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
            icon: 'error',
            confirmButtonText: 'รับทราบ!',
        })

      });
   }


export const Signin = () => {



    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
          username,
          password
        });
    }
        

    return (
        <section className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-white border ">
          <div className="md:w-1/3 max-w-sm">
            <form noValidate onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">LOGIN</h2>
                <label className="block text-red-500 text-center mb-2">กรุณากรอกข้อมูลให้ครบท้วน</label>
                <input
                className="text-sm w-full px-4 py-2 border  -solid border-gray-300 rounded"
                type="text"
                placeholder="Username" onChange={e => setUserName(e.target.value)}
                />
                <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="password"
                placeholder="Password" onChange={e => setPassword(e.target.value)}
                />
                <div className="text-center md:text-left">
                <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-lg tracking-wider"
                    type="submit"
                >
                    เข้าสู่ระบบ
                </button>
                </div>
            </form>
            {/* <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
              ยังไม่มีบัญชีเหรอ{" "}
              <a
                className="text-red-600 hover:underline hover:underline-offset-4"
                href="/register"
              >
                สมัครเลย
              </a>
            </div> */}
          </div>
        </section>
      );
    

}