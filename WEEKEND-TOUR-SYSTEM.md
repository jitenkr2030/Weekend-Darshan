# Automatic Weekend Tour Generation System

## 🎯 **Problem Solved**

Your app now **automatically shows upcoming tours for every weekend**! No more manual date updates or hardcoded schedules.

## ✅ **What's New**

### 🗓️ **Dynamic Weekend Detection**
- **Automatic Saturday Detection**: Finds next 12 Saturdays automatically
- **Holiday Integration**: Detects major Indian holidays (Diwali, Holi, etc.)
- **Smart Pricing**: Increases prices 20-30% for holiday weekends
- **Real-time Generation**: Always shows current and future weekends

### 🎪 **Tour Generation Features**
- **4 Tour Types**: Rajasthan, Braj Yatra, Ganga Yatra, Vaishno Devi
- **48 Total Tours**: 12 weekends × 4 tour types
- **Dynamic Dates**: From current week through 12 weeks ahead
- **Special Events**: Holiday weekends get special branding and pricing

## 🚀 **How It Works**

### **Automatic Weekend Calculation**
```javascript
// Finds next 12 Saturdays automatically
getUpcomingWeekends(new Date(), 12)
```

### **Holiday Detection**
- **Diwali Weekend**: +30% pricing, special branding
- **Holi Weekend**: +30% pricing, festive theme
- **Other Holidays**: +20% pricing, enhanced experience

### **Smart Pricing**
| Tour Type | Regular Price | Holiday Price |
|-----------|---------------|---------------|
| Rajasthan | ₹2,000 | ₹2,600 |
| Braj Yatra | ₹1,800 | ₹2,340 |
| Ganga Yatra | ₹2,100 | ₹2,730 |
| Vaishno Devi | ₹3,500 | ₹4,550 |

## 📊 **API Endpoints**

### **Refresh Weekend Tours**
```bash
POST /api/refresh-weekend-tours
```
- Clears existing trips
- Generates new tours for next 12 weekends
- Updates pricing based on holidays
- Returns generation statistics

### **Enhanced Seed API**
```bash
POST /api/seed
```
- Creates base data (temples, routes, users)
- Automatically calls weekend tour generation
- One-command complete setup

## 🎨 **User Experience**

### **What Users See**
- **Current Weekend**: "This Saturday - Feb 14, 2026"
- **Upcoming Weekends**: "Next Saturday - Feb 21, 2026"
- **Holiday Weekends**: "Diwali Special Weekend - Nov 1, 2026"
- **Always Fresh**: Tours automatically update as weekends pass

### **Tour Examples**
```
🔱 Premium Combo - Khatu Shyam ji + Salasar Balaji + Mandawa
   Saturday, Feb 14, 2026 - Monday, Feb 16, 2026
   Price: ₹2,000 per person

🕉️ Braj Yatra Special - Mathura + Vrindavan + Agra (Taj Mahal)
   Saturday, Feb 21, 2026 - Monday, Feb 23, 2026
   Price: ₹1,800 per person

🌊 Ganga Yatra - Diwali Special Weekend
   Saturday, Nov 1, 2026 - Monday, Nov 3, 2026
   Price: ₹2,730 per person (30% holiday premium)
```

## 🔧 **Technical Implementation**

### **Core Files Added**
- `src/lib/weekend-tours.ts` - Weekend calculation utilities
- `seed-weekend-tours.ts` - Dynamic tour generation script
- `src/app/api/refresh-weekend-tours/route.ts` - Manual refresh endpoint

### **Key Features**
- **Holiday Detection**: Checks 9+ major Indian holidays
- **Price Optimization**: Dynamic pricing based on demand
- **Date Validation**: Ensures tours are always in the future
- **Error Handling**: Graceful fallbacks for missing data

## 📈 **Benefits**

### **For Users**
✅ **Always Current**: See upcoming weekends automatically  
✅ **Holiday Specials**: Special tours during festive periods  
✅ **Fair Pricing**: Regular prices, premium for holidays  
✅ **Easy Planning**: 12 weeks of options visible  

### **For Admins**
✅ **Zero Maintenance**: No manual date updates needed  
✅ **Automatic Updates**: System refreshes itself  
✅ **Demand Pricing**: Maximize revenue during holidays  
✅ **One-Click Refresh**: Manual refresh available anytime  

## 🎮 **How to Use**

### **Automatic (Recommended)**
The system works automatically - no action needed!

### **Manual Refresh**
```bash
# Refresh all weekend tours
curl -X POST https://your-domain.com/api/refresh-weekend-tours

# Complete reseed (base data + weekend tours)
curl -X POST https://your-domain.com/api/seed
```

### **Check System Status**
```bash
curl https://your-domain.com/api/refresh-weekend-tours
```

## 📊 **Current Status**

### **Local Development** ✅
- **48 tours generated** across 12 weekends
- **Dynamic pricing** working
- **Holiday detection** active
- **API endpoints** functional

### **Production** ✅
- **Deployed to Vercel**
- **Weekend tours visible**
- **Automatic generation** ready
- **User-facing** working

## 🎉 **Result**

Your WeekendDarshan app now shows:
- **Every upcoming weekend** automatically
- **Holiday special tours** with enhanced pricing
- **12 weeks of tour options** at all times
- **Zero manual maintenance** required

**Users will always see current and future weekend tours, making booking planning effortless!** 🚌✨