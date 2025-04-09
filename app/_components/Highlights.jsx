import React from 'react'

const Highlights = () => {
  return (
    <div>
           <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Spécialités</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Découvrez les plats qui ont fait notre renommée, préparés avec amour et des ingrédients de première qualité.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dish 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 w-full bg-[url('/api/placeholder/400/300')] bg-cover bg-center"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Bœuf Bourguignon</h3>
                <p className="text-gray-600 mb-4">Mijoté avec des légumes de saison et un vin rouge d'exception</p>
                <p className="text-amber-700 font-bold">24€</p>
              </div>
            </div>
            
            {/* Dish 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 w-full bg-[url('/api/placeholder/400/300')] bg-cover bg-center"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Coq au Vin</h3>
                <p className="text-gray-600 mb-4">Notre spécialité préparée selon la recette traditionnelle</p>
                <p className="text-amber-700 font-bold">22€</p>
              </div>
            </div>
            
            {/* Dish 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 w-full bg-[url('/api/placeholder/400/300')] bg-cover bg-center"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tarte Tatin</h3>
                <p className="text-gray-600 mb-4">Dessert classique français avec des pommes caramélisées</p>
                <p className="text-amber-700 font-bold">9€</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300">
              Voir tout le menu
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Highlights