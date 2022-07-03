function berekenKortingspercentage(totaalprijs, vouchercode) {
    if (!vouchercode || isNaN(vouchercode) || vouchercode.toString().length !== 10) {
        return 0
    } else if (vouchercode % 2 === 0 && totaalprijs >= 350) {
        return 10;
    } else {
        return 5
    }
}

export default berekenKortingspercentage;