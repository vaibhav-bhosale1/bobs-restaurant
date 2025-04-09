"use client"
import { useState, useEffect } from 'react';
import { Sun, Moon, CloudRain, Wind, Umbrella, Leaf, Cloud, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function OutdoorService() {
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [weatherIcon, setWeatherIcon] = useState(<Sun size={24} />);
  const [currentWeather, setCurrentWeather] = useState('sunny');
  const router=useRouter();
  // Simulate weather changes
  useEffect(() => {
    const weatherTypes = ['sunny', 'cloudy', 'rainy', 'windy'];
    const weatherIcons = {
      'sunny': <Sun size={24} />,
      'cloudy': <Cloud size={24} />,
      'rainy': <CloudRain size={24} />,
      'windy': <Wind size={24} />
    };
    
    const interval = setInterval(() => {
      const newWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      setCurrentWeather(newWeather);
      setWeatherIcon(weatherIcons[newWeather]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Toggle time of day for visual effect
  const toggleTimeOfDay = () => {
    setTimeOfDay(timeOfDay === 'day' ? 'night' : 'day');
  };

  const outdoorFeatures = [
    {
      title: "Garden Patio",
      description: "Surrounded by lush plants and herbs from our garden, our main patio offers a serene dining experience.",
      image: "/outdoor/outdoor5.jpg",
    },
    {
      title: "Rooftop Terrace",
      description: "Enjoy stunning city views from our exclusive rooftop terrace, perfect for sunset cocktails.",
      image: "/outdoor/outdoor2.jpg",
    },
    {
      title: "Private Cabanas",
      description: "For more intimate gatherings, our private cabanas offer a secluded outdoor dining option.",
      image: "/outdoor/outdoor1.jpg",
    }
  ];

  const seasonalEvents = [
    {
      title: "Summer BBQ Series",
      description: "Every weekend, our chefs prepare special BBQ dishes with seasonal ingredients.",
      season: "Summer",
      icon: <Sun size={20} />
    },
    {
      title: "Fall Harvest Dinners",
      description: "Celebrating autumn's bounty with farm-to-table meals featuring local produce.",
      season: "Fall",
      icon: <Leaf size={20} />
    },
    {
      title: "Winter Chalets",
      description: "Heated outdoor chalets create a cozy atmosphere for winter dining.",
      season: "Winter",
      icon: <Moon size={20} />
    },
    {
      title: "Spring Garden Parties",
      description: "Welcome the new season with special events in our blooming garden.",
      season: "Spring",
      icon: <Umbrella size={20} />
    }
  ];

  return (
    <div>
   
    <section className={`py-16 transition-colors duration-1000 ${
      timeOfDay === 'day' ? 'bg-blue-50' : 'bg-gray-900 text-white'
    }`}>
      <div className="container mx-auto px-4">
      <Button className=" hidden md:flex text-white relative   "
    onClick={()=>router.replace('/dashboard')}
    >
      <ArrowLeft />
      Go Back
    </Button>
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-3 mb-3">
            <h2 className="text-4xl font-bold">Outdoor Service</h2>
            <button 
              onClick={toggleTimeOfDay}
              className={`p-2 rounded-full transition-colors ${
                timeOfDay === 'day' 
                  ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                  : 'bg-blue-900 text-blue-300 hover:bg-blue-800'
              }`}
            >
              {timeOfDay === 'day' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className={`w-24 h-1 mx-auto mb-6 ${timeOfDay === 'day' ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
          <p className={`max-w-2xl mx-auto ${timeOfDay === 'day' ? 'text-gray-600' : 'text-gray-300'}`}>
            Experience the beauty of al fresco dining in our carefully designed outdoor spaces.
          </p>
          
          <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full ${
            timeOfDay === 'day' ? 'bg-white shadow-sm' : 'bg-gray-800'
          }`}>
            <span className="mr-2">Current Weather:</span>
            <span className={timeOfDay === 'day' ? 'text-amber-600' : 'text-blue-400'}>
              {weatherIcon}
            </span>
            <span className="ml-2 capitalize">{currentWeather}</span>
          </div>
        </div>

        {/* Outdoor Spaces Carousel */}
        <div className="mb-16 relative overflow-hidden rounded-xl shadow-xl">
          <div className="flex overflow-x-auto snap-x hide-scrollbar">
            {outdoorFeatures.map((feature, index) => (
              <div 
                key={index}
                className="min-w-full sm:min-w-[80%] md:min-w-[60%] lg:min-w-[40%] p-2 snap-center"
              >
                <div className={`h-full rounded-xl overflow-hidden ${
                  timeOfDay === 'day' ? 'bg-white' : 'bg-gray-800'
                } shadow-lg transition transform hover:-translate-y-1`}>
                  <div className="relative">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-64 object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      timeOfDay === 'day' 
                        ? 'from-black/50 to-transparent' 
                        : 'from-black/70 to-transparent'
                    }`}></div>
                    <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                      {feature.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className={timeOfDay === 'day' ? 'text-gray-600' : 'text-gray-300'}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {outdoorFeatures.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === 0 
                    ? (timeOfDay === 'day' ? 'bg-blue-600' : 'bg-blue-400') 
                    : (timeOfDay === 'day' ? 'bg-gray-300' : 'bg-gray-600')
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Seasonal Events */}
        <div className="mb-12">
          <h3 className={`text-2xl font-bold mb-8 text-center ${
            timeOfDay === 'day' ? '' : 'text-white'
          }`}>
            Seasonal Outdoor Events
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalEvents.map((event, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-6 transition-transform hover:scale-105 ${
                  timeOfDay === 'day' 
                    ? 'bg-white shadow-md hover:shadow-lg' 
                    : 'bg-gray-800 shadow-md shadow-gray-900 hover:shadow-lg hover:shadow-gray-900'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  timeOfDay === 'day' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900 text-blue-300'
                }`}>
                  {event.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                <p className={`mb-3 ${timeOfDay === 'day' ? 'text-gray-600' : 'text-gray-300'}`}>
                  {event.description}
                </p>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  timeOfDay === 'day' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-blue-900 text-blue-300'
                }`}>
                  {event.season}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className={`px-8 py-4 rounded-lg shadow-lg transition-transform hover:scale-105 ${
            timeOfDay === 'day' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' 
              : 'bg-gradient-to-r from-blue-400 to-purple-600 text-white'
          }`}>
            <span className="flex items-center justify-center">
              <Umbrella size={20} className="mr-2" />
              <span className="font-medium" onClick={()=>router.replace('/booking')}>Reserve Outdoor Seating</span>
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
    </div>
  );
}