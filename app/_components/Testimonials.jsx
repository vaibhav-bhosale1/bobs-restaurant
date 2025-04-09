import React from 'react'

const Testimonials = () => {
  return (
    <div>
          <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ce que disent nos clients</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">La satisfaction de nos clients est notre priorité</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-amber-400">
                  ★★★★★
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Une expérience culinaire incroyable ! Les plats sont raffinés et le service impeccable."
              </p>
              <p className="font-medium text-gray-800">— Sophie Martin</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-amber-400">
                  ★★★★★
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Le meilleur restaurant français de la région. L'ambiance est chaleureuse et authentique."
              </p>
              <p className="font-medium text-gray-800">— Pierre Dubois</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-amber-400">
                  ★★★★☆
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Des saveurs qui vous transportent directement en France. Je recommande vivement !"
              </p>
              <p className="font-medium text-gray-800">— Marie Laurent</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials