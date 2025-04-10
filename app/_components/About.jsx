import React from 'react'

const About = () => {
  return (
    <div>
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image on the left */}
          <div className="md:w-1/2 w-full">
            <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
              <img
                src="/collage.png" // Replace with your real image path
                alt="Chef Bob and the restaurant"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
  
          {/* Story on the right */}
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Histoire</h2>
            <p className="text-gray-600 mb-6">
              Fondé en 1998 par le Chef Bob, notre restaurant vous propose une cuisine française traditionnelle revisitée
              avec des ingrédients locaux et de saison. Situé dans le cœur historique de Paris, notre établissement allie
              l'authenticité des recettes françaises à une touche de modernité.
            </p>
            <p className="text-gray-600 mb-8">
              Chaque plat est préparé avec passion et précision pour vous offrir une expérience gastronomique inoubliable.
            </p>
            <button className="bg-transparent hover:bg-amber-700 text-amber-700 hover:text-white border border-amber-700 px-6 py-2 rounded-md font-medium transition-colors duration-300">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  )
}

export default About