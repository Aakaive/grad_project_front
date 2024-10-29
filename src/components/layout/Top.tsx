'use client';

import LogoutButton from "../common/ButtonLogin/Buttons/LogoutButton";
import LoginoutButton from "../common/ButtonLogin/LoginoutButton";
import SiteLogo from "../common/others/SiteLogo";

const Top = () => {
    return (
       <div className="top-0 sticky w-full h-[40px] bg-[rgb(245,245,247)] border-[1px] ">
            <div className="w-full h-full flex justify-between items-center">
                <div>
                    <SiteLogo />
                </div>
                <div className="">
                    <LoginoutButton />
                </div>
            </div>
       </div> 
    );
};

export default Top;