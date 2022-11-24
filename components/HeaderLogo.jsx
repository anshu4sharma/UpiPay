const HeaderLogo = ({text}) => {
    return (
        <div className="flex text-center w-full flex-col">
            <div className="flex text-center w-full flex-col">
                <div className="text-2xl font-black" >
                    Upi<span className="text-[#07c1ff]">Pay</span>
                </div>
                <p className="text-xl font-medium">{text}</p>
            </div>
        </div>
    )
}

export default HeaderLogo