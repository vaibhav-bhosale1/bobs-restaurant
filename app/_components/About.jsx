import React from 'react'

const About = () => {
  return (
    <div>
         <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <div className="h-full w-full bg-[url('/api/placeholder/600/400')] bg-cover bg-center"></div>
              </div>
            </div>
            <div className="md:w-1/2">
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