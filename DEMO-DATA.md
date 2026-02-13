# Demo Data Documentation

## 🎯 Overview

The Weekend Darshan application comes with comprehensive demo data to showcase all features and provide a realistic user experience.

## 📊 Demo Data Included

### 🛕 Temples (14 Total)

**Rajasthan Tour:**
- Khatu Shyam Ji (Khatu, Rajasthan)
- Salasar Balaji (Salasar, Rajasthan)  
- Mandawa Fort (Mandawa, Rajasthan)

**Braj Yatra Tour:**
- Shri Krishna Janmabhoomi Temple (Mathura, UP)
- Banke Bihari Ji Temple (Vrindavan, UP)
- ISKCON Temple Vrindavan (Vrindavan, UP)
- Prem Mandir (Vrindavan, UP)
- Taj Mahal (Agra, UP)

**Ganga Yatra Tour:**
- Har Ki Pauri (Haridwar, Uttarakhand)
- Laxman Jhula (Rishikesh, Uttarakhand)
- Ram Jhula (Rishikesh, Uttarakhand)
- Neelkanth Mahadev Temple (Near Rishikesh, Uttarakhand)

**Vaishno Devi Tour:**
- Vaishno Devi Temple (Katra, Jammu & Kashmir)
- Banganga (Katra, Jammu & Kashmir)

### 🛣️ Routes (4 Total)

- **Rajasthan Route**: Delhi → Delhi (750km, 32 hours)
- **Braj Yatra Route**: Delhi → Delhi (450km, 31 hours)
- **Ganga Yatra Route**: Delhi → Delhi (550km, 34 hours)
- **Vaishno Devi Route**: Delhi → Delhi (650km, 38 hours)

### 🚌 Trips (10 Total)

**Main Tours (4):**
1. **Premium Combo: Khatu Shyam ji + Salasar Balaji + Mandawa**
   - Price: ₹2,000 per seat
   - Advance: ₹500
   - Bus: Premium AC Push-Back
   - Duration: Weekend trip

2. **Braj Yatra: Mathura + Vrindavan + Agra**
   - Price: ₹1,800 per seat
   - Advance: ₹400
   - Bus: Luxury AC Semi-Sleeper
   - Duration: Weekend trip

3. **Ganga Yatra: Haridwar + Rishikesh + Neelkanth**
   - Price: ₹2,100 per seat
   - Advance: ₹500
   - Bus: Deluxe AC Push-Back
   - Duration: Weekend trip

4. **Vaishno Devi Express: Katra**
   - Price: ₹3,500 per seat
   - Advance: ₹1,000
   - Bus: Premium AC Volvo Sleeper
   - Duration: Weekend trip

**Additional Dates (6):**
- Future dates for the first 2 tours
- Spaced across February and March 2025

### 👥 Users (3 Total)

1. **Admin User**
   - Mobile: 9876543210
   - Email: admin@weekenddarshan.com
   - Role: Admin
   - Status: Verified

2. **Test User 1 (Rahul Sharma)**
   - Mobile: 9876543211
   - Email: user1@example.com
   - Role: User
   - Status: Verified

3. **Test User 2 (Priya Patel)**
   - Mobile: 9876543212
   - Email: user2@example.com
   - Role: User
   - Status: Verified

### 📝 Bookings (2 Total)

1. **Rahul Sharma's Booking**
   - Trip: Khatu Shyam ji + Salasar Balaji
   - Passengers: 2
   - Status: CONFIRMED
   - Payment: ADVANCE_PAID

2. **Priya Patel's Booking**
   - Trip: Braj Yatra
   - Passengers: 2
   - Status: CONFIRMED
   - Payment: ADVANCE_PAID

### ⚙️ Settings (5 Total)

- CONTACT_PHONE: +91-9876543210
- CONTACT_EMAIL: info@weekenddarshan.com
- WHATSAPP_NUMBER: +91-9876543210
- COMPANY_NAME: Weekend Darshan
- WEBSITE_URL: https://weekend-darshan.vercel.app

### 📬 Notifications (2 Total)

1. **Booking Confirmation** (Sent to Rahul Sharma)
2. **Trip Reminder** (Pending for Priya Patel)

## 🚀 How to Use Demo Data

### For Local Development:

```bash
# 1. Install dependencies
bun install

# 2. Set up environment variables (see SETUP.md)

# 3. Push database schema
bun run db:push

# 4. Seed demo data
bun run db:seed
```

### For Production (Vercel):

1. **Set up environment variables** in Vercel dashboard
2. **Deploy the application** 
3. **Seed data** using the `/api/seed` endpoint or run seed script

## 🎨 Features Demonstrated

### ✅ User Features:
- User registration and authentication
- Trip browsing and filtering
- Booking management
- Payment processing (demo)
- Booking history

### ✅ Admin Features:
- Trip management
- User management
- Booking oversight
- Reports and analytics
- Settings configuration

### ✅ Business Logic:
- Real-time seat availability
- Pricing calculations
- Cancellation policies
- Multi-city itineraries
- Boarding point management

## 📱 Sample User Journey

1. **Browse Trips**: Users see 4 main tour options with multiple dates
2. **View Details**: Each trip shows comprehensive information
3. **Make Booking**: Select seats, provide passenger details
4. **Payment**: Process advance payment (demo)
5. **Confirmation**: Receive booking confirmation and QR code
6. **Manage Bookings**: View booking history and details

## 🔧 Customization

### Adding New Temples:
```typescript
await prisma.temple.create({
  data: {
    name: 'Temple Name',
    description: 'Description',
    city: 'City',
    state: 'State',
    image: '/images/temples/temple.jpg',
    isActive: true,
  },
})
```

### Creating New Trips:
```typescript
await prisma.trip.create({
  data: {
    routeId: route.id,
    templeId: temple.id,
    title: 'Trip Title',
    description: 'Trip description',
    departureDate: new Date(),
    returnDate: new Date(),
    // ... other fields
  },
})
```

## 📈 Scaling the Demo Data

The current demo data is optimized for:
- **Development**: Quick to load and test
- **Demos**: Realistic but manageable
- **Testing**: Covers all major features

For production, you can:
- Add more temple destinations
- Create more frequent trip dates
- Expand to new regions
- Add more user types and roles

## 🎉 Benefits

This comprehensive demo data provides:
- **Realistic user experience** from day one
- **Complete feature demonstration**
- **Easy testing and development**
- **Professional presentation** for stakeholders
- **Solid foundation** for production data