function berekenKortingspercentage(totaalprijs, vouchercode) {
    if (isNaN(vouchercode) || vouchercode.toString().length !== 10) {
        return 0
    } else if (vouchercode % 2 === 0) {
        return 10;
    } else {
        return 5
    }
}

export default berekenKortingspercentage;