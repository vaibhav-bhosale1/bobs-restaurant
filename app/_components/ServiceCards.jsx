"use client"
import { useState } from 'react';
import { Calendar, Home, Utensils, Umbrella, Cloud } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import resevation from '../../public/reservation.jpg'
import { useRouter } from 'next/navigation';

export default function ServiceCards() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router=useRouter()
  const services = [
    {
      id: 1,
      title: "Restaurant Booking",
      description: "Reserve your table with just a few clicks. Special occasions or casual dining, we've got you covered.",
      icon: <Calendar size={24} />,
      image:resevation,
      path:"/booking",
      color: "bg-amber-600"
    },
    {
      id: 2,
      title: "Our Interior",
      description: "Experience our warm, inviting atmosphere with modern design and comfortable seating arrangements.",
      icon: <Home size={24} />,
      image: "/interior.jpg",
      path:"/interior",
      color: "bg-red-600"
    },
    {
      id: 3,
      title: "Menu Selection",
      description: "Browse our diverse menu featuring chef's specials, seasonal items, and signature cocktails.",
      icon: <Utensils size={24} />,
      image: "/menu1.jpg",
      path:"/menu",
      color: "bg-emerald-600"
    },
    {
      id: 4,
      title: "Outdoor Service",
      description: "Enjoy al fresco dining in our beautifully arranged patio area with stunning views.",
      icon: <Umbrella size={24} />,
      image: "/exterior.jpg",
      path:"/outdoor-services",
      color: "bg-blue-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover what makes Bob's Restaurant special. From our exceptional dining experience to our carefully crafted atmosphere.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
        
            <div 
              key={service.id}
              className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 group"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={()=>router.replace(`${service.path}`)}
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <Image
                 src={service.image}
                 alt={service.title}
                 height={300}
                 width={300}
                 className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              </div>
              
              <div 
                className={`absolute top-0 left-0 w-12 h-12 ${service.color} flex items-center justify-center text-white rounded-br-lg`}
              >
                {service.icon}
              </div>
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className={`px-4 py-2 rounded-md text-white ${service.color} hover:opacity-90 transition-opacity`}>
                  Learn More
                </button>
              </div>
              
              {hoveredCard === service.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-red-600"></div>
              )}
            </div>
        
          ))}
        </div>
      </div>
    </section>
  );
}