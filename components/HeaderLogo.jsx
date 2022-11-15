import React from 'react'

const HeaderLogo = ({text}) => {
    return (
        <div className="flex text-center w-full flex-col">
            <div className="flex text-center w-full flex-col">
                <div className="text-4xl mb-4 font-semibold" >
                    Upi<span className="text-[#00b9f5]">Pay</span>
                </div>
                <p className="text-xl font-medium">{text}</p>
            </div>
        </div>
    )
}

export default HeaderLogo