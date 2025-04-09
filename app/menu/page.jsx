"use client"
import { useState, useEffect } from 'react';
import { ChevronDown, Heart, Clock, Fire } from 'lucide-react';

export default function RestaurantMenu() {
  const [activeCategory, setActiveCategory] = useState('Starters');
  const [visibleItems, setVisibleItems] = useState({});
  
  const categories = [
    'Starters', 
    'Main Course', 
    
    'Desserts', 
    'Drinks'
  ];
  
  const menuItems = {
    'Starters': [
      {
        id: 's1',
        name: 'Anchovy',
        description: 'Crispy risotto balls filled with wild mushrooms and truffle oil',
        price: '$12',
        image: '/menu/breakfast/ancovy.jpg',
        tags: ['popular', 'vegetarian'],
        preparationTime: '10 min'
      },
      {
        id: 's2',
        name: 'Bottarga',
        description: 'Fresh tuna with avocado, sesame oil, and won ton crisps',
        price: '$16',
        image: '/menu/breakfast/batarga.jpg',
        tags: ['spicy'],
        preparationTime: '15 min'
      },
      {
        id: 's3',
        name: 'Camargue',
        description: 'Tomato & basil, mushroom & truffle, and fig & prosciutto on artisan bread',
        price: '$14',
        image: '/menu/breakfast/camargue.jpg',
        tags: [],
        preparationTime: '12 min'
      }
    ],
    'Main Course': [
      {
        id: 'm1',
        name: 'GrillednBulls Rib',
        description: 'Tenderloin wrapped in mushroom duxelles and puff pastry',
        price: '$38',
        image: '/menu/maincourse/bullrib.jpeg',
        tags: ['popular', 'chef-special'],
        preparationTime: '30 min'
      },
      {
        id: 'm2',
        name: 'Grilled Duck Breast',
        description: 'Herb crusted lamb with rosemary jus and root vegetables',
        price: '$32',
        image: '/menu/maincourse/duckbreast.jpeg',
        tags: [],
        preparationTime: '25 min'
      },
      {
        id: 'm3',
        name: 'Roast Lamb Loin',
        description: 'Crispy duck leg with orange glaze and wild rice pilaf',
        price: '$29',
        image: '/menu/maincourse/lambloin.jpeg',
        tags: ['popular'],
        preparationTime: '28 min'
      },
      {
        id: 'm4',
        name: 'Duck confeti',
        description: 'Crispy duck leg with orange glaze and wild rice pilaf',
        price: '$29',
        image: '/menu/maincourse/ducktconfeti.jpg',
        tags: ['popular'],
        preparationTime: '28 min'
      }
    ],
    'Desserts': [
      {
        id: 'd1',
        name: 'Crème Brûlée',
        description: 'Classic vanilla custard with caramelized sugar crust',
        price: '$10',
        image: '/menu/desert/creme-brulee-.webp',
        tags: ['popular'],
        preparationTime: '15 min'
      },
      {
        id: 'd2',
        name: 'Chocolate Soufflé',
        description: 'Warm chocolate soufflé with vanilla bean ice cream',
        price: '$12',
        image: '/menu/desert/chocolate.jpeg',
        tags: ['chef-special'],
        preparationTime: '20 min'
      },
      {
        id: 'd3',
        name: 'Berry Panna Cotta',
        description: 'Silky vanilla panna cotta with mixed berry compote',
        price: '$9',
        image: '/menu/desert/berry.jpeg',
        tags: [],
        preparationTime: '12 min'
      }
    ],
    'Drinks': [
      {
        id: 'dr1',
        name: 'Signature Old Fashioned',
        description: 'Bourbon, house-made bitters, orange peel, and smoked sugar',
        price: '$14',
        image: '/menu/wine/wine1.jpeg',
        tags: ['popular', 'alcoholic'],
        preparationTime: '5 min'
      },
      {
        id: 'dr2',
        name: 'Botanical Spritz',
        description: 'Gin, elderflower liqueur, prosecco, and fresh herbs',
        price: '$12',
        image: '/menu/wine/wine2.jpeg',
        tags: ['alcoholic'],
        preparationTime: '7 min'
      },
      {
        id: 'dr3',
        name: 'Berry Kombucha Mocktail',
        description: 'House-fermented kombucha with mixed berries and mint',
        price: '$8',
        image: '/menu/wine/wine3.jpeg',
        tags: ['non-alcoholic'],
        preparationTime: '5 min'
      }
    ]
  };

  useEffect(() => {
    // Initialize visibility for first category
    const initialVisibility = {};
    categories.forEach(category => {
      initialVisibility[category] = {};
      menuItems[category].forEach((item, index) => {
        initialVisibility[category][item.id] = category === activeCategory;
      });
    });
    setVisibleItems(initialVisibility);
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Update visibility for animation
    const updatedVisibility = {...visibleItems};
    Object.keys(updatedVisibility).forEach(cat => {
      menuItems[cat].forEach(item => {
        updatedVisibility[cat][item.id] = cat === category;
      });
    });
    setVisibleItems(updatedVisibility);
  };

  const [favorites, setFavorites] = useState({});
  
  const toggleFavorite = (itemId) => {
    setFavorites(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getTagColor = (tag) => {
    switch(tag) {
      case 'popular': return 'bg-amber-500';
      case 'chef-special': return 'bg-purple-600';
      case 'vegetarian': return 'bg-green-500';
      case 'vegan': return 'bg-green-600';
      case 'spicy': return 'bg-red-500';
      case 'alcoholic': return 'bg-blue-500';
      case 'non-alcoholic': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Our Menu</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our chef's carefully crafted selections, featuring locally-sourced ingredients 
            and innovative culinary techniques.
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar">
          <div className="flex mx-auto space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-red-600 text-white font-medium shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[activeCategory].map((item, index) => (
            <div 
              key={item.id}
              className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform ${
                visibleItems[activeCategory] && visibleItems[activeCategory][item.id] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="relative h-48 overflow-hidden group">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 -translate-y-4"
                >
                  <Heart size={18} 
                    className={favorites[item.id] ? "fill-red-500 text-red-500" : "text-gray-600"}
                  />
                </button>
                
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                  {item.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`${getTagColor(tag)} text-white text-xs px-2 py-1 rounded-full`}
                    >
                      {tag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-xl font-semibold text-red-600">{item.price}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    {item.preparationTime}
                  </span>
                  
                  <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-red-600 text-white rounded-lg hover:from-amber-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
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
  );
}