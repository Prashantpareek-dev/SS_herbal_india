// Location and delivery zone data for Indian pin codes
// Delivery zones: Metro (1-2 days), Tier-1 (2-4 days), Tier-2 (4-6 days), Tier-3 (5-8 days)

export const deliveryZones = {
  METRO: {
    name: 'Metro',
    minDays: 1,
    maxDays: 2,
    shippingCost: 0, // Free shipping for metro
    color: 'green'
  },
  TIER1: {
    name: 'Tier-1 City',
    minDays: 2,
    maxDays: 4,
    shippingCost: 50,
    color: 'blue'
  },
  TIER2: {
    name: 'Tier-2 City',
    minDays: 4,
    maxDays: 6,
    shippingCost: 75,
    color: 'yellow'
  },
  TIER3: {
    name: 'Tier-3/Rural',
    minDays: 5,
    maxDays: 8,
    shippingCost: 100,
    color: 'orange'
  }
};

// Sample pin code to zone mapping (representative sample)
export const pinCodeZones = {
  // Delhi NCR - Metro
  '110001': 'METRO', '110002': 'METRO', '110003': 'METRO', '110005': 'METRO',
  '110006': 'METRO', '110007': 'METRO', '110008': 'METRO', '110009': 'METRO',
  '122001': 'METRO', '201301': 'METRO', '201305': 'METRO',
  
  // Mumbai - Metro
  '400001': 'METRO', '400002': 'METRO', '400003': 'METRO', '400004': 'METRO',
  '400005': 'METRO', '400051': 'METRO', '400052': 'METRO', '400053': 'METRO',
  '400601': 'METRO', '400602': 'METRO', '400703': 'METRO',
  
  // Bangalore - Metro
  '560001': 'METRO', '560002': 'METRO', '560003': 'METRO', '560004': 'METRO',
  '560005': 'METRO', '560025': 'METRO', '560029': 'METRO', '560034': 'METRO',
  '560037': 'METRO', '560066': 'METRO', '560068': 'METRO',
  
  // Hyderabad - Metro
  '500001': 'METRO', '500003': 'METRO', '500004': 'METRO', '500016': 'METRO',
  '500018': 'METRO', '500028': 'METRO', '500029': 'METRO', '500032': 'METRO',
  
  // Pune - Tier-1
  '411001': 'TIER1', '411002': 'TIER1', '411003': 'TIER1', '411004': 'TIER1',
  '411005': 'TIER1', '411006': 'TIER1', '411007': 'TIER1', '411008': 'TIER1',
  
  // Chennai - Tier-1
  '600001': 'TIER1', '600002': 'TIER1', '600003': 'TIER1', '600004': 'TIER1',
  '600005': 'TIER1', '600006': 'TIER1', '600007': 'TIER1', '600008': 'TIER1',
  
  // Kolkata - Tier-1
  '700001': 'TIER1', '700002': 'TIER1', '700003': 'TIER1', '700004': 'TIER1',
  '700005': 'TIER1', '700006': 'TIER1', '700007': 'TIER1', '700016': 'TIER1',
  
  // Ahmedabad - Tier-1
  '380001': 'TIER1', '380002': 'TIER1', '380004': 'TIER1', '380005': 'TIER1',
  '380006': 'TIER1', '380007': 'TIER1', '380008': 'TIER1', '380009': 'TIER1',
  
  // Jaipur - Tier-2
  '302001': 'TIER2', '302002': 'TIER2', '302003': 'TIER2', '302004': 'TIER2',
  '302005': 'TIER2', '302006': 'TIER2', '302012': 'TIER2', '302015': 'TIER2',
  
  // Lucknow - Tier-2
  '226001': 'TIER2', '226002': 'TIER2', '226003': 'TIER2', '226004': 'TIER2',
  '226005': 'TIER2', '226010': 'TIER2', '226016': 'TIER2', '226020': 'TIER2',
  
  // Chandigarh - Tier-2
  '160001': 'TIER2', '160002': 'TIER2', '160003': 'TIER2', '160004': 'TIER2',
  '160009': 'TIER2', '160012': 'TIER2', '160015': 'TIER2', '160017': 'TIER2',
  
  // Indore - Tier-2
  '452001': 'TIER2', '452002': 'TIER2', '452003': 'TIER2', '452004': 'TIER2',
  '452005': 'TIER2', '452006': 'TIER2', '452007': 'TIER2', '452008': 'TIER2',
  
  // Bhopal - Tier-2
  '462001': 'TIER2', '462002': 'TIER2', '462003': 'TIER2', '462004': 'TIER2',
  '462010': 'TIER2', '462011': 'TIER2', '462016': 'TIER2', '462022': 'TIER2',
  
  // Smaller cities and towns - Tier-3
  '301001': 'TIER3', '302021': 'TIER3', '305001': 'TIER3', '311001': 'TIER3',
  '321001': 'TIER3', '324001': 'TIER3', '333001': 'TIER3', '341001': 'TIER3',
  '342001': 'TIER3', '344001': 'TIER3', '360001': 'TIER3', '361001': 'TIER3'
};

// Get zone by pin code
export const getZoneByPinCode = (pinCode) => {
  const zone = pinCodeZones[pinCode];
  return zone ? deliveryZones[zone] : deliveryZones.TIER3; // Default to Tier-3 if not found
};

// Validate Indian pin code (6 digits)
export const validatePinCode = (pinCode) => {
  const pattern = /^[1-9][0-9]{5}$/;
  return pattern.test(pinCode);
};

// Get estimated delivery date
export const getEstimatedDeliveryDate = (pinCode) => {
  if (!validatePinCode(pinCode)) {
    return null;
  }
  
  const zone = getZoneByPinCode(pinCode);
  const today = new Date();
  const minDate = new Date(today);
  const maxDate = new Date(today);
  
  minDate.setDate(today.getDate() + zone.minDays);
  maxDate.setDate(today.getDate() + zone.maxDays);
  
  return {
    zone: zone.name,
    minDate: minDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    maxDate: maxDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    minDays: zone.minDays,
    maxDays: zone.maxDays,
    shippingCost: zone.shippingCost
  };
};

// Major cities for autocomplete
export const majorCities = [
  { name: 'Delhi', pinCodes: ['110001', '110006', '110007', '110008'] },
  { name: 'Mumbai', pinCodes: ['400001', '400051', '400052', '400601'] },
  { name: 'Bangalore', pinCodes: ['560001', '560025', '560029', '560034'] },
  { name: 'Hyderabad', pinCodes: ['500001', '500003', '500016', '500028'] },
  { name: 'Pune', pinCodes: ['411001', '411002', '411003', '411004'] },
  { name: 'Chennai', pinCodes: ['600001', '600002', '600003', '600004'] },
  { name: 'Kolkata', pinCodes: ['700001', '700002', '700003', '700004'] },
  { name: 'Ahmedabad', pinCodes: ['380001', '380002', '380004', '380005'] },
  { name: 'Jaipur', pinCodes: ['302001', '302002', '302003', '302004'] },
  { name: 'Lucknow', pinCodes: ['226001', '226002', '226003', '226004'] }
];
