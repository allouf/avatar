import React from 'react'

export default function Button({ title }) {

    return (
        <>
            <div className="flex items-center justify-center mr-6 md:ml-0 xl:mr-12 md:mr-8">
                <button className="hero_button relative text-xs xl:text-lg text-black opacity-80  Oxanium hover:bg-white hover:text-black border hover:border-transparent border-custom-blue transition-all duration-300  group">
                    {title}
                </button>
            </div>
        </>
        
    )
}
