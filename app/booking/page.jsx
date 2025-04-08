"use client"
import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Check, X, AlertCircle, Info, Utensils } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';
import { createRoot } from 'react-dom/client';

import 'firebase/firestore';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '../../config/FirebaseConfig'
import { useUser } from '@clerk/nextjs';

const db=getFirestore(app)
const bookedSlotsCollection = collection(db, 'BookedSlots');
const firebaseService = {
    saveReservation: async (reservationData) => {
        try {
          const docRef = await addDoc(bookedSlotsCollection, reservationData);
          console.log('Reservation saved with ID:', docRef.id);
          return { id: docRef.id };
        } catch (error) {
          console.error('Error saving reservation:', error);
          throw error;
        }
      },
    
      getReservations: async (date, timeSlot) => {
        try {
          const q = query(
            bookedSlotsCollection,
            where('date', '==', date),
            where('timeSlot', '==', timeSlot)
          );
    
          const snapshot = await getDocs(q);
    
          const bookedTables = [];
          snapshot.forEach(doc => {
            const reservation = doc.data();
            bookedTables.push(reservation.tableId);
          });
    
          return bookedTables;
        } catch (error) {
          console.error('Error fetching reservations:', error);
          throw error;
        }
      }
};

export default function ReservationBookingSystem() {
  const { user, isLoaded } = useUser();
  const [showReservationFor, setShowReservationFor] = useState(false);
  const [reservationFor, setReservationFor] = useState(''); // 'self' or 'someone'
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  // Existing state variables
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedTable, setSelectedTable] = useState(null);
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookedTables, setBookedTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [reservationId, setReservationId] = useState('');
  
  // Show the popup when the component mounts and user data is loaded
  useEffect(() => {
    if (isLoaded) {
      setShowReservationFor(true);
    }
  }, [isLoaded]);

  // Restaurant sections
  const sections = ['Main Dining', 'Window Area', 'Bar Seating', 'Outdoor Patio'];
  const [activeSection, setActiveSection] = useState('Main Dining');

  // Available time slots
  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  // Table data with positions for visualization
  const tables = {
    'Main Dining': [
      { id: 'table1', section: 'Main Dining', seats: 2, shape: 'circle', position: { x: 20, y: 30 }, size: { width: 40, height: 40 } },
      { id: 'table2', section: 'Main Dining', seats: 4, shape: 'rect', position: { x: 100, y: 30 }, size: { width: 60, height: 40 } },
      { id: 'table3', section: 'Main Dining', seats: 6, shape: 'rect', position: { x: 200, y: 30 }, size: { width: 80, height: 40 } },
      { id: 'table4', section: 'Main Dining', seats: 8, shape: 'rect', position: { x: 100, y: 120 }, size: { width: 100, height: 50 } },
    ],
    'Window Area': [
      { id: 'table5', section: 'Window Area', seats: 2, shape: 'circle', position: { x: 30, y: 40 }, size: { width: 40, height: 40 } },
      { id: 'table6', section: 'Window Area', seats: 2, shape: 'circle', position: { x: 100, y: 40 }, size: { width: 40, height: 40 } },
      { id: 'table7', section: 'Window Area', seats: 4, shape: 'rect', position: { x: 170, y: 40 }, size: { width: 60, height: 40 } },
      { id: 'table8', section: 'Window Area', seats: 4, shape: 'rect', position: { x: 100, y: 120 }, size: { width: 60, height: 40 } },
    ],
    'Bar Seating': [
      { id: 'table9', section: 'Bar Seating', seats: 1, shape: 'circle', position: { x: 30, y: 40 }, size: { width: 30, height: 30 } },
      { id: 'table10', section: 'Bar Seating', seats: 1, shape: 'circle', position: { x: 80, y: 40 }, size: { width: 30, height: 30 } },
      { id: 'table11', section: 'Bar Seating', seats: 1, shape: 'circle', position: { x: 130, y: 40 }, size: { width: 30, height: 30 } },
      { id: 'table12', section: 'Bar Seating', seats: 1, shape: 'circle', position: { x: 180, y: 40 }, size: { width: 30, height: 30 } },
      { id: 'table13', section: 'Bar Seating', seats: 2, shape: 'rect', position: { x: 100, y: 100 }, size: { width: 60, height: 40 } },
    ],
    'Outdoor Patio': [
      { id: 'table14', section: 'Outdoor Patio', seats: 2, shape: 'circle', position: { x: 40, y: 40 }, size: { width: 40, height: 40 } },
      { id: 'table15', section: 'Outdoor Patio', seats: 4, shape: 'rect', position: { x: 120, y: 40 }, size: { width: 60, height: 40 } },
      { id: 'table16', section: 'Outdoor Patio', seats: 6, shape: 'rect', position: { x: 210, y: 40 }, size: { width: 80, height: 40 } },
      { id: 'table17', section: 'Outdoor Patio', seats: 4, shape: 'rect', position: { x: 40, y: 120 }, size: { width: 60, height: 40 } },
      { id: 'table18', section: 'Outdoor Patio', seats: 6, shape: 'rect', position: { x: 140, y: 120 }, size: { width: 80, height: 40 } },
    ]
  };
  
  // Get today's date in YYYY-MM-DD format for minimum date selection
  const today = new Date().toISOString().split('T')[0];
  
  // Fetch booked tables when date and time change
  useEffect(() => {
    if (date && timeSlot) {
      fetchBookedTables();
    }
  }, [date, timeSlot]);
  
  const fetchBookedTables = async () => {
    if (!date || !timeSlot) return;
    
    setIsLoading(true);
    try {
      const bookedTablesData = await firebaseService.getReservations(date, timeSlot);
      setBookedTables(bookedTablesData);
      
      // If user had selected a table that's now shown as booked, deselect it
      if (selectedTable && bookedTablesData.includes(selectedTable)) {
        setSelectedTable(null);
      }
    } catch (error) {
      console.error('Error fetching booked tables:', error);
      setBookingError('Unable to check table availability. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  
  const handleTableSelection = (tableId) => {
    // Don't allow selection of booked tables
    if (bookedTables.includes(tableId)) return;
    
    setSelectedTable(tableId);
    setBookingStep(2);
  };
  
  const completeReservation = async () => {
    if (!date || !timeSlot || !selectedTable) {
      setBookingError('Please complete all required fields');
      return;
    }
  
    // If reserving for someone else, validate guest details
    if (reservationFor === 'someone' && (!guestName || !guestPhone)) {
      setBookingError('Please provide guest name and phone number');
      return;
    }
  
    setIsLoading(true);
    setBookingError('');
  
    try {
      // Double check availability before confirming
      const latestBookedTables = await firebaseService.getReservations(date, timeSlot);
      
      // If table has been booked by someone else in the meantime
      if (latestBookedTables.includes(selectedTable)) {
        setBookingError('Sorry, this table was just booked by someone else. Please select another table.');
        setSelectedTable(null);
        setBookingStep(1);
        setBookedTables(latestBookedTables);
        setIsLoading(false);
        return;
      }
      
      // Find table info
      let tableInfo = null;
      Object.values(tables).forEach(sectionTables => {
        const found = sectionTables.find(t => t.id === selectedTable);
        if (found) tableInfo = found;
      });
  
      // Get current timestamp
      const timestamp = new Date().toISOString();
      
      // Create reservation object with fallback values
      const reservation = {
        userId: user?.id || 'guest', // Provide fallback for userId
        userName: reservationFor === 'self' 
          ? user?.fullName || 'Guest' 
          : guestName || 'Guest',
        userEmail: reservationFor === 'self' 
          ? user?.emailAddresses[0]?.emailAddress || '' // Use empty string instead of undefined
          : '',
        userPhone: reservationFor === 'self' 
          ? user?.primaryPhoneNumber?.phoneNumber || '' // Use empty string instead of undefined
          : guestPhone || '',
        tableId: selectedTable,
        tableSection: tableInfo?.section || '',
        tableSeats: tableInfo?.seats || 0,
        date,
        timeSlot,
        guests,
        specialRequests: specialRequests || '', // Ensure this isn't undefined
        status: 'confirmed',
        createdAt: timestamp,
        reservedBy: user?.id || 'guest', // Track who made the reservation
        reservationFor: reservationFor // 'self' or 'someone'
      };
  
      // Validate required fields
      if (!reservation.userName || !reservation.tableId || !reservation.date || !reservation.timeSlot) {
        throw new Error('Missing required reservation fields');
      }
  
      // Save to Firebase
      const result = await firebaseService.saveReservation(reservation);
      
      // Success!
      setReservationId(result.id);
      setBookingSuccess(true);
    } catch (error) {
      console.error('Error completing reservation:', error);
      setBookingError(error.message || 'Failed to complete your reservation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetBooking = () => {
    setDate('');
    setTimeSlot('');
    setGuests(2);
    setSelectedTable(null);
    setSpecialRequests('');
    setBookingStep(1);
    setBookingError('');
    setBookingSuccess(false);
    setReservationId('');
    setShowReservationFor(false);
    setReservationFor('');
    setGuestName('');
    setGuestPhone('');
  };
  
  
  const handleReservationForSubmit = () => {
    if (!reservationFor) {
      setBookingError('Please select who the reservation is for');
      return;
    }
    setShowReservationFor(false);
  };

  // ... (keep all the existing helper functions like isTableAvailable, isTableSuitable, getTableColor, renderTableShape, formatDate)
  const isTableAvailable = (tableId) => {
    return !bookedTables.includes(tableId);
  };
  
  const isTableSuitable = (tableSeats) => {
    // Tables should accommodate the guests without too much extra space
    return tableSeats >= guests && tableSeats <= Math.max(guests + 2, guests * 1.5);
  };
  
  const getTableColor = (table) => {
    if (!isTableAvailable(table.id)) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed'; // Booked
    }
    if (selectedTable === table.id) {
      return 'bg-green-600 text-white ring-4 ring-green-300'; // Selected
    }
    if (isTableSuitable(table.seats)) {
      return 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'; // Available and suitable
    }
    return 'bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer'; // Available but not ideal size
  };
  
  const renderTableShape = (table) => {
    const isAvailable = isTableAvailable(table.id);
    const isSelected = selectedTable === table.id;
    const baseClasses = `${getTableColor(table)} transition-all duration-300 flex items-center justify-center text-sm font-medium`;
    
    if (table.shape === 'circle') {
      return (
        <div 
          className={`${baseClasses} rounded-full`}
          style={{ 
            left: `${table.position.x}px`, 
            top: `${table.position.y}px`,
            width: `${table.size.width}px`, 
            height: `${table.size.height}px`,
            position: 'absolute'
          }}
          onClick={() => isAvailable && handleTableSelection(table.id)}
        >
          {table.seats}
        </div>
      );
    } else {
      return (
        <div 
          className={`${baseClasses} rounded-lg`}
          style={{ 
            left: `${table.position.x}px`, 
            top: `${table.position.y}px`,
            width: `${table.size.width}px`, 
            height: `${table.size.height}px`,
            position: 'absolute'
          }}
          onClick={() => isAvailable && handleTableSelection(table.id)}
        >
          {table.seats}
        </div>
      );
    }
  };




  const generateReceipt = async () => {
    if (!reservationId) {
      console.error('Missing reservation ID');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
  
      // ===== STYLING CONSTANTS =====
      const primaryColor = [139, 69, 19]; // Brown
      const secondaryColor = [80, 40, 10]; // Dark brown
      const textColor = [0, 0, 0]; // Black
      const lightColor = [245, 245, 220]; // Beige background
      const lineHeight = 8;
      let yPosition = 20;
  
      // ===== BACKGROUND =====
      pdf.setFillColor(...lightColor);
      pdf.rect(0, 0, 210, 297, 'F');
  
      // ===== HEADER =====
      pdf.setFontSize(24);
      pdf.setTextColor(...primaryColor);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Bob's Fine Dining", 105, yPosition, { align: 'center' });
      yPosition += 10;
  
      pdf.setFontSize(12);
      pdf.setTextColor(...textColor);
      pdf.setFont('helvetica', 'normal');
      pdf.text('123 Gourmet Street, Foodville', 105, yPosition, { align: 'center' });
      yPosition += 5;
      pdf.text('Tel: (555) 123-4567 • www.bobsfinedining.com', 105, yPosition, { align: 'center' });
      yPosition += 15;
  
      // ===== TITLE =====
      pdf.setFontSize(18);
      pdf.setTextColor(...secondaryColor);
      pdf.setFont('helvetica', 'bold');
      pdf.text('RESERVATION CONFIRMATION', 105, yPosition, { align: 'center' });
      yPosition += 15;
  
      // ===== DIVIDER LINE =====
      pdf.setDrawColor(...primaryColor);
      pdf.setLineWidth(0.5);
      pdf.line(50, yPosition, 160, yPosition);
      yPosition += 10;
  
      // ===== QR CODE =====
      const container = document.createElement('div');
      const root = createRoot(container);
      root.render(<QRCodeCanvas value={reservationId} size={200} level="H" includeMargin={true} />);
      
      await new Promise((resolve) => setTimeout(resolve, 150));
      const canvas = container.querySelector('canvas');
      const qrCodeData = canvas?.toDataURL('image/png');
      
      if (qrCodeData) {
        pdf.addImage(qrCodeData, 'PNG', 75, yPosition, 60, 60);
      }
      yPosition += 70;
  
      // ===== RESERVATION DETAILS =====
      const getSafeValue = (value, fallback = '--') => 
        value !== null && value !== undefined && value !== '' ? value : fallback;
  
      const reservationName = reservationFor === 'self'
        ? getSafeValue(user?.fullName, 'Guest')
        : getSafeValue(guestName, 'Guest');
  
      const formattedDate = date ? formatDate(date) : '--';
      const reservationTime = getSafeValue(timeSlot);
      const guestCount = getSafeValue(guests);
  
      // Details container
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(40, yPosition - 5, 130, 50, 3, 3, 'F');
      pdf.setDrawColor(200, 200, 200);
      pdf.roundedRect(40, yPosition - 5, 130, 50, 3, 3, 'D');
  
      // Details content
      pdf.setFontSize(12);
      pdf.setTextColor(...textColor);
      pdf.setFont('helvetica', 'bold');
      
      const details = [
        { label: 'CONFIRMATION #:', value: getSafeValue(reservationId) },
        { label: 'DATE:', value: formattedDate },
        { label: 'TIME:', value: reservationTime },
        { label: 'GUESTS:', value: guestCount },
        { label: 'NAME:', value: reservationName },
      ];
  
      details.forEach(({ label, value }) => {
        pdf.text(label, 45, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(value, 100, yPosition);
        pdf.setFont('helvetica', 'bold');
        yPosition += lineHeight;
      });
  
      yPosition += 10;
  
      // ===== SPECIAL REQUESTS =====
      if (specialRequests) {
        pdf.setFont('helvetica', 'bold');
        pdf.text('SPECIAL REQUESTS:', 45, yPosition);
        yPosition += lineHeight;
        
        pdf.setFont('helvetica', 'normal');
        const splitText = pdf.splitTextToSize(specialRequests, 120);
        pdf.text(splitText, 45, yPosition);
        yPosition += (splitText.length * lineHeight);
      }
  
      yPosition += 15;
  
      // ===== FOOTER =====
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'italic');
      pdf.text('Thank you for your reservation!', 105, yPosition, { align: 'center' });
      yPosition += 5;
      pdf.text('Please arrive 5-10 minutes early', 105, yPosition, { align: 'center' });
      yPosition += 5;
      pdf.text('Present this QR code at check-in', 105, yPosition, { align: 'center' });
      yPosition += 10;
  
      // ===== POLICIES =====
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.setFont('helvetica', 'normal');
      pdf.text('We hold reservations for 15 minutes past the booked time.', 105, yPosition, { align: 'center' });
      yPosition += 4;
      pdf.text('Cancellations must be made at least 2 hours in advance.', 105, yPosition, { align: 'center' });
  
      // ===== FINAL DIVIDER =====
      pdf.setDrawColor(...primaryColor);
      pdf.setLineWidth(0.3);
      pdf.line(50, yPosition + 5, 160, yPosition + 5);
  
      // ===== SAVE PDF =====
      pdf.save(`Bob's_Reservation_${reservationId}.pdf`);
  
    } catch (error) {
      console.error('Error generating PDF:', error);
      setBookingError('Failed to generate receipt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Not specified';
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return 'Invalid date';
      
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return dateObj.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Not specified';
    }
  };


  return (
    <section className="py-16 bg-gray-50">
      {/* Reservation For Popup */}
      {showReservationFor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Who is this reservation for?</h3>
            
            <div className="space-y-4 mb-6">
              <button
                onClick={() => setReservationFor('self')}
                className={`w-full p-4 border-2 rounded-lg text-left flex items-center ${
                  reservationFor === 'self' 
                    ? 'border-red-600 bg-red-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border mr-3 ${
                  reservationFor === 'self' 
                    ? 'border-red-600 bg-red-600' 
                    : 'border-gray-400'
                }`}></div>
                <div>
                  <h4 className="font-medium">Myself</h4>
                  <p className="text-sm text-gray-600">Use my account details for the reservation</p>
                </div>
              </button>
              
              <button
                onClick={() => setReservationFor('someone')}
                className={`w-full p-4 border-2 rounded-lg text-left flex items-center ${
                  reservationFor === 'someone' 
                    ? 'border-red-600 bg-red-50' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border mr-3 ${
                  reservationFor === 'someone' 
                    ? 'border-red-600 bg-red-600' 
                    : 'border-gray-400'
                }`}></div>
                <div>
                  <h4 className="font-medium">Someone else</h4>
                  <p className="text-sm text-gray-600">I'm making this reservation for another person</p>
                </div>
              </button>
            </div>
            
            {reservationFor === 'someone' && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Guest Full Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter guest's full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Guest Phone Number</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter guest's phone number"
                    required
                  />
                </div>
              </div>
            )}
            
            {bookingError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                {bookingError}
              </div>
            )}
            
            <button
              onClick={handleReservationForSubmit}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      {/* Rest of the reservation booking system */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Reserve Your Table</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your preferred date, time, and table to enjoy your dining experience at Bob's Restaurant.
          </p>
        </div>

        {bookingSuccess ? (
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg relative 
                before:absolute before:inset-0 before:bg-[url('/crumbled-paper.png')] 
                before:opacity-30 before:bg-cover before:pointer-events-none">
  
  {/* Restaurant header */}
  <div className="text-center mb-6 border-b-2 border-amber-200 pb-4">
    <h2 className="text-3xl font-bold text-amber-900 font-serif">Bob's Fine Dining</h2>
    <p className="text-amber-700">123 Gourmet Street, Foodville</p>
  </div>

  {/* Receipt title */}
  <div className="text-center mb-8">
    <h3 className="text-2xl font-bold text-amber-800 underline decoration-amber-300">
      RESERVATION RECEIPT
    </h3>
  </div>

  {/* QR Code */}
  <div className="flex justify-center mb-8 p-4 bg-white/80 rounded-lg border border-amber-200">
  
  <QRCodeSVG 
      value={reservationId} 
      size={128}
      level="H"
      includeMargin={true}
      className="border-4 border-amber-100 p-2"
    />
  </div>

  {/* Reservation details */}
  <div className="mb-8 space-y-4 text-amber-900">
    <div className="flex justify-between border-b border-amber-100 pb-2">
      <span className="font-bold">Confirmation #:</span>
      <span className="font-mono">{reservationId}</span>
    </div>
    <div className="flex justify-between border-b border-amber-100 pb-2">
      <span className="font-bold">Date:</span>
      <span>{formatDate(date)}</span>
    </div>
    <div className="flex justify-between border-b border-amber-100 pb-2">
      <span className="font-bold">Time:</span>
      <span>{timeSlot}</span>
    </div>
    <div className="flex justify-between border-b border-amber-100 pb-2">
      <span className="font-bold">Guests:</span>
      <span>{guests}</span>
    </div>
    <div className="flex justify-between">
      <span className="font-bold">Name:</span>
      <span>{reservationFor === 'self' ? user?.fullName : guestName}</span>
    </div>
  </div>

  {/* Footer */}
  <div className="text-center text-sm text-amber-700 italic">
    <p>Thank you for your reservation!</p>
    <p>Please arrive 5-10 minutes early</p>
    <p>Present this receipt or QR code at check-in</p>
  </div>

  {/* Buttons */}
  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
    <button
      onClick={resetBooking}
      className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
    >
      Make Another Reservation
    </button>
    <button
      onClick={generateReceipt}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Download Receipt
    </button>
  </div>
</div>

        ) :(
            <div className="max-w-5xl mx-auto">
              {bookingStep === 1 ? (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold mb-4">Step 1: Select Date, Time & Table</h3>
                    
                    {bookingError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
                        <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                        {bookingError}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="mb-4">
                          <label className="block text-gray-700 font-medium mb-2">Date</label>
                          <div className="relative">
                            <input
                              type="date"
                              min={today}
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              required
                            />
                            <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 font-medium mb-2">Time</label>
                          <div className="relative">
                            <select
                              value={timeSlot}
                              onChange={(e) => setTimeSlot(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                              required
                            >
                              <option value="">Select a time</option>
                              {timeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                            <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 font-medium mb-2">Number of Guests</label>
                          <div className="relative">
                            <select
                              value={guests}
                              onChange={(e) => setGuests(parseInt(e.target.value))}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                            >
                              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                              ))}
                            </select>
                            <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Restaurant Section</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {sections.map(section => (
                            <button
                              key={section}
                              className={`px-4 py-2 rounded-lg border transition-colors ${
                                activeSection === section
                                  ? 'bg-red-600 text-white border-red-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                              onClick={() => setActiveSection(section)}
                            >
                              {section}
                            </button>
                          ))}
                        </div>
                        
                        <div className="mb-2 flex justify-between items-center">
                          <span className="font-medium text-gray-700">Available Tables</span>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
                              <span>Available</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
                              <span>Booked</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 rounded-lg p-4 h-52 relative overflow-hidden">
                          {date && timeSlot ? (
                            isLoading ? (
                              <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
                              </div>
                            ) : (
                              <>
                                {tables[activeSection].map(table => renderTableShape(table))}
                                
                                {/* Section indicator */}
                                <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-medium">
                                  {activeSection}
                                </div>
                              </>
                            )
                          ) : (
                            <div className="flex flex-col h-full justify-center items-center text-gray-500">
                              <Info size={24} className="mb-2" />
                              <p>Select a date and time to see available tables</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-2 text-sm text-gray-600 flex items-center">
                          <Info size={14} className="mr-1" />
                          <span>Numbers indicate how many guests can be seated at each table</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => selectedTable && setBookingStep(2)}
                        disabled={!selectedTable}
                        className={`px-6 py-2 rounded-lg flex items-center ${
                          selectedTable 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Continue</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold mb-4">Step 2: Complete Your Reservation</h3>
                    
                    {bookingError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
                        <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                        {bookingError}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="bg-gray-50 rounded-lg p-6 mb-4">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Calendar size={16} className="mr-2 text-red-600" />
                            Reservation Details
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date:</span>
                              <span className="font-medium">{formatDate(date)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Time:</span>
                              <span className="font-medium">{timeSlot}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Guests:</span>
                              <span className="font-medium">{guests}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Table:</span>
                              <span className="font-medium">{
                                // Find the table info
                                (() => {
                                  let tableInfo = null;
                                  Object.values(tables).forEach(sectionTables => {
                                    const found = sectionTables.find(t => t.id === selectedTable);
                                    if (found) tableInfo = found;
                                  });
                                  return tableInfo ? `${tableInfo.section} (${tableInfo.seats} seats)` : selectedTable;
                                })()
                              }</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-6">
                          <label className="block text-gray-700 font-medium mb-2">Special Requests (Optional)</label>
                          <textarea
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder="Allergies, special occasions, preferred seating arrangement, etc."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent h-32"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-6 flex items-start">
                      <Utensils size={16} className="mr-2 mt-1 flex-shrink-0" />
                      <span>
                        By completing this reservation, you agree to our cancellation policy. We hold your table for 15 minutes past your reservation time. Please call us if you're running late.
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => setBookingStep(1)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Back
                      </button>
                      
                      <button
                        onClick={completeReservation}
                        disabled={isLoading}
                        className={`px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center ${
                          isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                            Processing...
                          </>
                        ) : (
                          'Complete Reservation'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }