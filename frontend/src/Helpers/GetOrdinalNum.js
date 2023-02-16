export const getOrdinalNum = (d) => {
    const dString = String(d);
    const last = +dString.slice(-2);
    if (last > 3 && last < 21) return d+'th';
    switch (last % 10) {
        case 1: return d+"st";
        case 2: return d+"nd";
        case 3: return d+"rd";
        default: return d+"th";
    }
}