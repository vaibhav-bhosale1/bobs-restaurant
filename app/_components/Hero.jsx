import React from 'react'

const Hero = () => {
  return (
    <div>
<section className="relative h-screen">
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 z-0"></div>

  {/* Background Image */}
  <div className="relative h-full w-full bg-[url('/hero.jpg')] bg-cover bg-center z-10">
    <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
      
      {/* Content Box */}
      <div className="bg-amber-200 bg-opacity-60 p-8 rounded-xl shadow-xl max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 drop-shadow-lg">
          Welcome to Restaurant Bob
        </h1>
        <p className="text-lg md:text-xl text-white mb-6 leading-relaxed drop-shadow-md">
          Discover an authentic French gastronomic experience in the heart of Paris
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md font-medium text-lg transition">
            Book a table
          </button>
          <button className="bg-white hover:bg-gray-100 text-amber-700 px-6 py-3 rounded-md font-medium text-lg transition">
            See the menu
          </button>
        </div>
      </div>

    </div>
  </div>
</section>

    </div>
  )
}

export default Hero