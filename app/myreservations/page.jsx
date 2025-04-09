"use client"
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, getFirestore, doc, deleteDoc  } from 'firebase/firestore';
import app from "../../config/FirebaseConfig.js";
import { useAuth } from '@clerk/nextjs';
import { Calendar, Clock, Users, MapPin, Trash2, Phone, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button.tsx';
import { useRouter } from 'next/navigation';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId, isSignedIn, isLoaded } = useAuth();
    const db=getFirestore(app)
  useEffect(() => {
    const fetchReservations = async () => {
      if (!isLoaded || !isSignedIn) return;
      
      try {
        setLoading(true);
        // Query reservations for the current user
        const reservationsRef = collection(db, 'BookedSlots');
        const q = query(reservationsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        
        const reservationsList = [];
        querySnapshot.forEach((doc) => {
          reservationsList.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        // Sort by date (most recent first)
        reservationsList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReservations(reservationsList);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("Failed to load your reservations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId, isSignedIn, isLoaded]);

 
const handleCancelReservation = async (reservationId) => {
  try {
    const confirmed = window.confirm("Are you sure you want to cancel this reservation?");
    if (!confirmed) return;

    await deleteDoc(doc(db, "BookedSlots", reservationId));

    // Remove the reservation from state
    setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    toast.success("Reservation cancelled successfully.");
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    toast.error("Failed to cancel reservation. Please try again.");
  }
};

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Determine reservation status
  const getReservationStatus = (reservation) => {
    const today = new Date();
    const reservationDate = new Date(reservation.date);
    
    if (reservation.status === 'cancelled') return 'cancelled';
    if (reservationDate < today) return 'completed';
    return 'upcoming';
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
          <h2 className="text-2xl font-bold text-amber-500 mb-4">Sign In Required</h2>
          <p className="text-white mb-6">Please sign in to view your reservations.</p>
          <button className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    );
  }
  const router=useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      <div className="container mx-auto max-w-5xl">
      <Button className=" hidden md:flex text-black relative bg-amber-100 mb-7"
    onClick={()=>router.replace('/dashboard')}
    >
      <ArrowLeft />
      Go Back
    </Button>
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Reservations</h1>
          <p className="text-gray-300">View and manage your table reservations at Bob's Restaurant</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-lg p-4 text-white">
            {error}
          </div>
        ) : reservations.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 text-center">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-amber-600/20 mb-4">
              <Calendar size={24} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Reservations Found</h3>
            <p className="text-gray-300 mb-6">You haven't made any reservations yet. Would you like to reserve a table?</p>
            <button className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
              Reserve a Table Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((reservation) => {
              const status = getReservationStatus(reservation);
              
              let statusColor = "bg-amber-500";
              if (status === 'completed') statusColor = "bg-green-500";
              if (status === 'cancelled') statusColor = "bg-red-500";
              
              return (
                <div 
                  key={reservation.id} 
                  className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-300 shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className={`inline-block w-3 h-3 rounded-full ${statusColor} mr-2`}></span>
                          <span className="text-gray-300 text-sm font-medium capitalize">
                            {status} Reservation
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Table for {reservation.guests}</h3>
                      </div>
                      <div className="bg-amber-500/10 px-3 py-1 rounded-full">
                        <span className="text-amber-400 font-medium">#{reservation.id.substring(0, 6)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <Calendar size={18} className="text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-white">{formatDate(reservation.date)}</span>
                      </div>
                      <div className="flex items-start">
                        <Clock size={18} className="text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-white">{reservation.time}</span>
                      </div>
                      <div className="flex items-start">
                        <Users size={18} className="text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-white">{reservation.guests} {reservation.guests > 1 ? 'Guests' : 'Guest'}</span>
                      </div>
                      {reservation.specialRequest && (
                        <div className="bg-white/5 p-3 rounded-lg mt-3">
                          <p className="text-gray-300 text-sm">"{reservation.specialRequest}"</p>
                        </div>
                      )}
                    </div>
                    
                    {status === 'upcoming' && (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 flex items-center justify-center px-4 py-2 bg-transparent border border-amber-500 text-amber-500 rounded-lg hover:bg-amber-500/10 transition-colors">
                          <Phone size={16} className="mr-2" />
                          Contact
                        </button>
                        <button 
                          onClick={() => handleCancelReservation(reservation.id)}
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Cancel
                        </button>
                      </div>
                    )}

                    {status === 'completed' && (
                      <button className="w-full px-4 py-2 bg-transparent border border-green-500 text-green-500 rounded-lg hover:bg-green-500/10 transition-colors">
                        Book Again
                      </button>
                    )}

                    {status === 'cancelled' && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-gray-300 text-sm">This reservation was cancelled.</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;