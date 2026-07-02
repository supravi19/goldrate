export interface City {
  id: string;
  name: string;
  state: string;
  premium: number; // Premium over base price in INR
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
}

export const indiaCities: City[] = [
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', premium: 0, region: 'West' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', premium: -20, region: 'West' },
  { id: 'delhi', name: 'New Delhi', state: 'Delhi', premium: 10, region: 'North' },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', premium: -30, region: 'South' },
  { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', premium: -20, region: 'South' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', premium: -15, region: 'South' },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', premium: 20, region: 'East' },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', premium: -10, region: 'West' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', premium: -5, region: 'North' },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', premium: 5, region: 'North' },
];

export const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];
