export function sign(value, otherValue) {
    if (Number(value) < Number(otherValue)) {
        return('-')
    } else {
        return('+')
    }
}