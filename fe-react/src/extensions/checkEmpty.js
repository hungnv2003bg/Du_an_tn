export const checkEmpty = (data) => {
    if (!data) {
        return false;
    }
    if (data.trim().length === 0) {
        return false;
    }
    return true
}