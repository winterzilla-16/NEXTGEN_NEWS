import React from "react"

export const Logout = () => {

    localStorage.removeItem("accessToken")
    window.location.href = "/";




}