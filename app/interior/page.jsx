"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, MapPin, Coffee, Music, ThumbsUp, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function RestaurantInterior() {
  const [activeImage, setActiveImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedView, setExpandedView] = useState(false);

  const interiorImages = [
    { id: 1, url: '/interior/interior2.jpg', alt: 'Main dining area with elegant table settings', title: 'Main Dining Area' },
    { id: 2, url: '/interior/interior3.jpg', alt: 'Private dining room with chandelier', title: 'Private Dining' },
    { id: 3, url: '/interior/interior5.jpg', alt: 'Bar area with premium spirits display', title: 'Bar & Lounge' },
    { id: 4, url: '/interior/interior4.jpg', alt: "Chef's table with kitchen view", title: "Chef's Table" },
    { id: 5, url: '/interior/interior6.jpg', alt: 'Outdoor terrace seating with city views', title: 'Outdoor Terrace' },
    { id: 6, url: '/interior/interior7.jpg', alt: 'Wine cellar with premium selection', title: 'Wine Cellar' },
    { id: 7, url: '/interior/interior8.jpg', alt: 'Cocktail lounge with ambient lighting', title: 'Cocktail Lounge' }
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

The carefully designed acoustics ensure conversation flows easily even when we're at capacity. Every detail, from our hand-selected tableware to our custom upholstery, has been chosen to create a memorable dining atmosphere that complements our exceptional cuisine.

Our newly added outdoor terrace offers breathtaking city views and provides the perfect setting for al fresco dining during pleasant weather. The wine cellar features an extensive collection of local and international wines, carefully selected to pair perfectly with our menu offerings.`;

  const shortDescription = description.split('\n')[0];

  const nextImage = () => setActiveImage((prev) => (prev === interiorImages.length - 1 ? 0 : prev + 1));
  const prevImage = () => setActiveImage((prev) => (prev === 0 ? interiorImages.length - 1 : prev - 1));
  const toggleExpandedView = () => setExpandedView(!expandedView);
 const router=useRouter()
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
       
       <Button className=" hidden md:flex text-white relative left-33 "
          onClick={()=>router.replace('/dashboard')}
          >
            <ArrowLeft />
            Go Back
          </Button>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">Explore Our Space</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto my-4 rounded-full"></div>
          <p className="text-lg text-gray-600">Step into the warmth and elegance of Bob's Restaurant.</p>
        </div>

        <div className={`grid grid-cols-1 ${expandedView ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-10`}>
          {/* Image Carousel */}
          <div className="relative">
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              style={{ height: expandedView ? '500px' : 'auto' }}
              onClick={toggleExpandedView}
            >
              <div className={expandedView ? "w-full h-full" : "aspect-video"}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={interiorImages[activeImage].id}
                    src={interiorImages[activeImage].url}
                    alt={interiorImages[activeImage].alt}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="absolute w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <div className="absolute inset-0 flex justify-between items-center px-4 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow backdrop-blur transition hover:scale-110"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow backdrop-blur transition hover:scale-110"
                >
                  <ArrowRight size={20} />
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpandedView();
                }}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow"
              >
                <X size={20} className={`transition-transform ${expandedView ? 'rotate-45' : 'rotate-0'}`} />
              </button>

              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <h3 className="text-xl font-semibold">{interiorImages[activeImage].title}</h3>
                <p className="text-sm">{interiorImages[activeImage].alt}</p>
              </div>
            </div>

            {!expandedView && (
              <div className="flex space-x-3 overflow-x-auto mt-4 pb-1">
                {interiorImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-transform ${
                      activeImage === index ? 'border-amber-500 scale-105' : 'border-transparent hover:scale-105 opacity-70'
                    }`}
                  >
                    <img src={img.url} alt="Thumb" className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description and Features */}
          {!expandedView && (
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur rounded-2xl border border-gray-200 shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">The Experience</h3>
                <p className="text-gray-700">
                  {showFullDescription ? description : shortDescription}
                </p>
                {!showFullDescription && (
                  <button
                    onClick={() => setShowFullDescription(true)}
                    className="mt-3 text-amber-500 hover:text-amber-600 font-medium flex items-center gap-1 transition"
                  >
                    Read more <ArrowRight size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interiorFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-gray-100 shadow-sm hover:shadow-md transition backdrop-blur"
                  >
                    <div className="text-amber-500">{feature.icon}</div>
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-100/50 border border-amber-200 p-6 rounded-2xl shadow-lg text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Reserve Your Table</h3>
                <p className="text-gray-600 text-sm mb-4">Indulge in fine dining, made unforgettable.</p>
                <button className="px-5 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 shadow hover:shadow-lg transition">
                  Reserve Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
