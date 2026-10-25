import { formatPhoneNumber } from './utils/phone';

// Test Cases for Different Countries
const tests = [
    {
        name: 'Madagascar Test (with leading zero)',
        raw: '0341022233',
        telCode: '+261',
        mask: '+261 ## ## ### ##'
    },
    {
        name: 'France Test (already spaced/messy)',
        raw: '06 12-34-56-78',
        telCode: '+33',
        mask: '+33 # ## ## ## ##'
    },
    {
        name: 'Australia Test (raw digits)',
        raw: '412345678',
        telCode: '+61',
        mask: '+61 # #### ####'
    }
];

console.log('>> Running Phone Formatter Tests...\n');

tests.forEach((t, index) => {
    const result = formatPhoneNumber(t.raw, t.telCode, t.mask);
    console.log(`Test ${index + 1}: ${t.name}`);
    console.log(`  Raw Input:  "${t.raw}"`);
    console.log(`  Formatted:  "${result}"\n`);
});
