// Accurate AD <-> BS date conversion using bikram-sambat-js
import BikramSambat, { ADToBS, BSToAD } from 'bikram-sambat-js';

const adMonths = [
  'January','February','March','April','May','June','July','August','September','October','November','December'
];
const bsMonths = [
  'Baisakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'
];


export function adToBs(adYear: string, adMonth: string, adDate: string): string {
  const monthNum = adMonths.indexOf(adMonth) + 1;
  if (!monthNum) return 'Invalid month';
  try {
    const adStr = `${adYear}-${monthNum.toString().padStart(2, '0')}-${adDate.padStart(2, '0')}`;
    const bsStr = ADToBS(adStr); // e.g. '2082-05-22'
    if (!bsStr || typeof bsStr !== 'string') return 'Conversion not available';
    const [bsYear, bsMonthNum, bsDay] = bsStr.split('-');
    return `${Number(bsDay)} ${bsMonths[Number(bsMonthNum) - 1]} ${bsYear}`;
  } catch {
    return 'Conversion not available';
  }
}

export function bsToAd(bsYear: string, bsMonth: string, bsDate: string): string {
  const monthNum = bsMonths.indexOf(bsMonth) + 1;
  if (!monthNum) return 'Invalid month';
  try {
    const bsStr = `${bsYear}-${monthNum.toString().padStart(2, '0')}-${bsDate.padStart(2, '0')}`;
    const adStr = BSToAD(bsStr); // e.g. '2025-09-07'
    if (!adStr || typeof adStr !== 'string') return 'Conversion not available';
    const [adYear, adMonthNum, adDay] = adStr.split('-');
    return `${Number(adDay)} ${adMonths[Number(adMonthNum) - 1]} ${adYear}`;
  } catch {
    return 'Conversion not available';
  }
}
