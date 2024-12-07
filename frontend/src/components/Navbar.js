import React from 'react'
import { NavLink } from "react-router-dom"



// เมื่อกดไปแล้วจะมีขีดสีแดง แสดงถึงการเลือกหัวข้อ
// หากเอา cursor ไปวางก็จะขึ้น hover สีแดง
export const Navbar = () => {
    const token = localStorage.getItem('accessToken');
    const activanavbarpc = ' text-red-600 border-b-2 border-red-600 ';
    const nonactivepc = ' hover:border-b-2 hover:border-red-600 hover:pb-2px hover:text-red-600 ';
    let logoutbtn = ' hidden font-bold cursor-pointer py-[4px] hover:border-b-2 hover:border-red-600 hover:pb-2px hover:text-red-600 ';
    if (token) {
        logoutbtn = ' font-bold cursor-pointer py-[4px] hover:border-b-2 hover:border-red-600 hover:pb-2px hover:text-red-600';
    }

    return (
        <div className="relative flex grow flex-col items-center mx-auto md:w-[1500px] w-auto bg-[orange]">
          <div className="sticky inset-x-0 top-0 left-0 z-100 flex w-full flex-col items-center justify-center bg-bg-a-10">
            <div className="flex md:h-[96px] h-[60px] md:w-[1200px] w-full items-center md:px-[20px] px-6">
              <a href="/">
                <img
                  alt="News"
                  aria-hidden="true"
                  loading="lazy"
                  className="w-8 mt-1 md:mt-0 md:w-40"
                  style={{ color: "transparent" }}
                  src="https://i.pinimg.com/originals/26/91/f2/2691f2fa1a0f078f5f274edf7fea6763.png"
                />
              </a>
              <div className="hidden md:block ml-[42px] flex-1 items-center space-x-[32px]">
              <NavLink to={"/"} className={({ isActive }) => isActive ? activanavbarpc:nonactivepc}>
              <span className="font-bold cursor-pointer py-[4px] text-white" style={{ WebkitTextStroke: '1px black' }}>
                    HOME
                  </span>
              </NavLink>
                <NavLink to={"/courtside"} className={({ isActive }) => isActive ? activanavbarpc:nonactivepc}>
                  <span className="font-bold cursor-pointer py-[4px] text-white" style={{ WebkitTextStroke: '1px black' }}>
                    COURTSIDE
                  </span> 
                </NavLink>
                <a href="/logout"><span className={logoutbtn}>
                  ออกจากระบบ
                  </span></a>
              </div>
              <div className="mr-[24px] w-[200px] hidden md:block">
                <form
                  className="relative flex h-[34px] w-full items-center rounded-full border border-gray-300 px-[12px]"
                  id="pc-search-modal-root-id"
                >
                  <div className="flex w-full items-center">
                    <input
                      className="font-bold flex-1 bg-transparent text-el-60 outline-none placeholder:text-el-40 disabled:text-el-35"
                      maxLength={50}
                      placeholder="ค้นหาข่าว"
                      size={1}
                      defaultValue=""
                    />
                  </div>
                  <a>
                    <img
                      aria-hidden="true"
                      width={24}
                      height={24}
                      decoding="async"
                      data-nimg={1}
                      className="active:opacity-30 cursor-pointer"
                      style={{ color: "transparent" }}
                      src="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.1991 6.74703C12.865 4.4131 9.08077 4.4131 6.74668 6.74703C4.41256 9.08098 4.41256 12.8651 6.74668 15.199C8.90131 17.3535 12.2917 17.5192 14.6364 15.696L17.9384 18.9978L18.999 17.9371L15.6969 14.6353C17.5194 12.2908 17.3535 8.90121 15.1991 6.74703ZM7.8073 7.80772C9.55561 6.05953 12.3902 6.05953 14.1385 7.80772C15.8868 9.55588 15.8868 12.3902 14.1385 14.1383C12.3902 15.8865 9.55561 15.8865 7.8073 14.1383C6.05902 12.3902 6.05902 9.55588 7.8073 7.80772Z' fill='%23222222'/%3e %3c/svg%3e"
                    />
                  </a>
                </form>
              </div>
              <div className="block md:hidden ml-[42px] flex-1 items-center space-x-[32px]" />
              <div className="md:mr-[16px] mr-[1px] flex shrink-0 items-center justify-end md:space-x-[24px] space-x-[15px]">
                <button>
                  <img
                    aria-hidden="false"
                    width={24}
                    height={24}
                    className="active:opacity-30 cursor-pointer under-foldable-front:h-[18px] under-foldable-front:w-[18px] md:hidden block"
                    style={{ color: "transparent" }}
                    src="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.3973 2C5.75958 2 2 5.76053 2 10.3994C2 15.0382 5.75958 18.7988 10.3973 18.7988C12.4249 18.7988 14.2847 18.0799 15.7358 16.8831L20.9139 22L22 20.9267L16.8212 15.8091C18.0525 14.3477 18.7945 12.4602 18.7945 10.3994C18.7945 5.76053 15.0349 2 10.3973 2ZM3.52678 10.3994C3.52678 6.60396 6.6028 3.52716 10.3973 3.52716C14.1917 3.52716 17.2678 6.60396 17.2678 10.3994C17.2678 14.1948 14.1917 17.2716 10.3973 17.2716C6.6028 17.2716 3.52678 14.1948 3.52678 10.3994Z' fill='%23222222'/%3e %3c/svg%3e"
                  />
                </button>
                <a href='/dashboard' className="md:pr-[16px] pr-[1px]">
                  <img
                    aria-hidden="true"
                    width={24}
                    height={24}
                    decoding="async"
                    data-nimg={1}
                    className="active:opacity-30"
                    style={{ color: "transparent" }}
                    src="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.0009 2C9.23899 2 7 4.23898 7 7.00091C7 9.76285 9.23899 12.0018 12.0009 12.0018C14.7629 12.0018 17.0018 9.76285 17.0018 7.00091C17.0018 4.23898 14.7629 2 12.0009 2ZM8.5 7.00091C8.5 5.06741 10.0674 3.5 12.0009 3.5C13.9344 3.5 15.5018 5.06741 15.5018 7.00091C15.5018 8.93441 13.9344 10.5018 12.0009 10.5018C10.0674 10.5018 8.5 8.93441 8.5 7.00091Z' fill='%23222222'/%3e %3cpath d='M8.75 14C5.02208 14 2 17.0221 2 20.75V21.9953H3.5V20.75C3.5 17.8505 5.85051 15.5 8.75 15.5H15.2527C18.1522 15.5 20.5027 17.8505 20.5027 20.75V21.9953H22.0027V20.75C22.0027 17.0221 18.9807 14 15.2527 14H8.75Z' fill='%23222222'/%3e %3c/svg%3e"
                  />
                </a>
              </div>
            </div>
            <div className="block md:hidden w-full" id="tab-depth-1">
              <div className="relative flex h-[44px] w-full bg-bg-a-10">
                <div className="absolute top-0 left-0 h-full w-full border-b border-solid border-line-20 bg-transparent" />
                <div className="flex h-full w-full space-x-[24px] overflow-x-scroll px-[15px] scrollbar-hide">
                  <div className="relative flex items-center justify-center shrink-0">
                    <a className="z-10 shrink-0" href="/">
                      <div className="flex cursor-pointer select-none items-center justify-center pt-[11px] px-[4px] border-b-[2px] border-black pb-[8px]">
                        <div className="relative flex max-w-full">
                          <span className="inline-block whitespace-nowrap text-center font-bold">
                            หน้าหลัก
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="relative flex items-center justify-center shrink-0">
                    <NavLink to={"/hotnews"} className="z-10 shrink-0">
                      <div className="flex cursor-pointer select-none items-center justify-center pt-[11px] pb-[10px] px-[4px]">
                        <div className="relative flex max-w-full">
                          <span className="inline-block whitespace-nowrap text-center font-bold text-gray-500">
                            ข่าวเด่น
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )

}