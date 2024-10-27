'use client';

import LogoutButton from "../common/LogoutButton";

const Top = () => {
    return (
       <div className="top sticky w-full">
            <div>
                <LogoutButton />
            </div>
       </div> 
    );
};

export default Top;