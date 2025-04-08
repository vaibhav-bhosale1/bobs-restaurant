"use client"
import { useState } from 'react';
import { Star, Users, MapPin, Coffee, Music, ThumbsUp } from 'lucide-react';

export default function RestaurantInterior() {
  const [activeImage, setActiveImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const interiorImages = [
    {
      id: 1,
      url: '/api/placeholder/1200/800',
      alt: 'Main dining area with elegant table settings',
      title: 'Main Dining Area'
    },
    {
      id: 2,
      url: '/api/placeholder/1200/800',
      alt: 'Private dining room with chandelier',
      title: 'Private Dining'
    },
    {
      id: 3,
      url: '/api/placeholder/1200/800',
      alt: 'Bar area with premium spirits display',
      title: 'Bar & Lounge'
    },
    {
      id: 4,
      url: '/api/placeholder/1200/800',
      alt: 'Chef\'s table with kitchen view',
      title: 'Chef\'s Table'
    }
  ];

  const interiorFeatures = [
    { icon: <Users size={20} />, text: 'Seating for 120 guests' },
    { icon: <Star size={20} />, text: 'Michelin-inspired ambiance' },
    { icon: <MapPin size={20} />, text: 'Prime downtown location' },
    { icon: <Coffee size={20} />, text: 'Lounge area for casual drinks' },
    { icon: <Music size={20} />, text: 'Live music on weekends' },
    { icon: <ThumbsUp size={20} />, text: 'Perfect for special occasions' }
  ];

  const description = `Bob's Restaurant offers a sophisticated yet comfortable dining environment designed to enhance your culinary experience. Our interior combines modern elegance with rustic warmth, featuring custom-crafted wood furnishings, ambient lighting, and thoughtfully curated artwork by local artists.

The main dining area provides an intimate atmosphere while our semi-private booths offer a more secluded experience. The chef's table gives guests an exclusive view of our kitchen in action. Our private dining room accommodates groups of up to 16 people with customizable settings for any occasion.

The carefully designed acoustics ensure conversation flows easily even when we're at capacity. Every detail, from our hand-selected tableware to our custom upholstery, has been chosen to create a memorable dining atmosphere that complements our exceptional cuisine.`;

  const shortDescription = description.split('\n')[0];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Our Interior</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Step inside and experience the warm, inviting atmosphere of Bob's Restaurant.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Gallery Viewer */}
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            {/* Main Image */}
            <div className="relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden">
              {interiorImages.map((image, index) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.alt}
                  className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                    activeImage === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{interiorImages[activeImage].title}</h3>
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex space-x-2 mt-4">
              {interiorImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`relative flex-1 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg transition-all ${
                    activeImage === index 
                      ? 'ring-2 ring-amber-600 opacity-100' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail for ${image.alt}`}
                    className="w-full h-full object-cover"
                  />
                  {activeImage === index && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Description and Features */}
          <div>
            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {showFullDescription ? description : shortDescription}
              </p>
              {!showFullDescription && (
                <button 
                  onClick={() => setShowFullDescription(true)}
                  className="text-amber-600 font-medium hover:underline mt-2 flex items-center"
                >
                  Read more
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {interiorFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="text-amber-600">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-md flex items-center justify-center space-x-2">
                <span>Book a Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}