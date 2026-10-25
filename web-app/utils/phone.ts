/**
 * Formats a raw phone input according to the country's mask stored in the database.
 * @param rawInput - Raw phone input from user (e.g., "341022233" or "0341022233")
 * @param telCode - Country dial code (e.g., "+261")
 * @param formatMask - Format mask from database (e.g., "+261 ## ## ### ##")
 */
export function formatPhoneNumber(rawInput: string, telCode: string, formatMask: string): string {
    // 1. Strip all non-digit characters
    let digitsOnly = rawInput.replace(/\D/g, '');

    // 2. Remove country dial code digits from the front if user included it
    const codeDigits = telCode.replace(/\D/g, '');
    if (digitsOnly.startsWith(codeDigits)) {
        digitsOnly = digitsOnly.slice(codeDigits.length);
    }

    // 3. Strip leading zero if provided (e.g., local "034..." -> "34...")
    if (digitsOnly.startsWith('0')) {
        digitsOnly = digitsOnly.slice(1);
    }

    // 4. Fill digits into the template mask
    let digitIndex = 0;
    let formattedNumber = '';

    for (let i=0; i<formatMask.length; i++) {
        const char = formatMask[i];

        if (char === '#') {
            if (digitIndex < digitsOnly.length) {
                formattedNumber += digitsOnly[digitIndex];
                digitIndex++;
            } else {
                break; // Stop if no more digits supplied
            }
        } else {
            formattedNumber += char;
        }
    }

    return formattedNumber.trim();
}
