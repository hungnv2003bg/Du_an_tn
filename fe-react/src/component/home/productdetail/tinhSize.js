export const tinhSize = (chieuCao, canNang) => {
    var size = ''
    if (chieuCao <= 165) {
        if (canNang <= 65) {
            return "M"
        }
        if (canNang > 65 && canNang < 70) {
            return "L"
        }
        if (canNang > 70 && canNang < 80) {
            return "XL"
        }
        if (canNang >= 90) {
            return "2XL"
        }
    }
    if (chieuCao >= 165 && chieuCao < 170) {
        if (canNang <= 65) {
            return "M"
        }
        if (canNang > 65 && canNang < 70) {
            return "L"
        }
        if (canNang > 70 && canNang < 80) {
            return "XL"
        }
        if (canNang >= 90 && canNang < 95) {
            return "3XL"
        }
        return "4XL"
    }
    if (chieuCao >= 170 && chieuCao < 175) {
        if (canNang <= 65) {
            return "M"
        }
        if (canNang > 65 && canNang < 70) {
            return "L"
        }
        if (canNang > 70 && canNang < 80) {
            return "XL"
        }
        if (canNang >= 90 && canNang < 95) {
            return "3XL"
        }
        return "4XL"
    }
    if (chieuCao >= 175 && chieuCao < 180) {
        if (canNang <= 65) {
            return "L"
        }
        if (canNang > 65 && canNang < 70) {
            return "L"
        }
        if (canNang > 70 && canNang < 80) {
            return "XL"
        }
        if (canNang >= 90 && canNang < 95) {
            return "3XL"
        }
        return "4XL"
    }
    if (chieuCao >= 180 && chieuCao < 185) {
        if (canNang <= 65) {
            return "L"
        }
        if (canNang > 65 && canNang < 70) {
            return "L"
        }
        if (canNang > 70 && canNang < 80) {
            return "XL"
        }
        if (canNang >= 90 && canNang < 95) {
            return "3XL"
        }
        return "4XL"
    }
    if (chieuCao >= 185 && chieuCao < 190) {
        if (canNang <= 65) {
            return "XL"
        }
        if (canNang > 65 && canNang < 70) {
            return "XL"
        }
        if (canNang > 70 && canNang < 80) {
            return "2XL"
        }
        if (canNang >= 90 && canNang < 95) {
            return "3XL"
        }
        return "4XL"
    }
    if (chieuCao >= 190) {
        if (canNang <= 65) {
            return "XL"
        }
        if (canNang > 65 && canNang < 70) {
            return "XL"
        }
        if (canNang > 70 && canNang < 80) {
            return "2XL"
        }
        if (canNang >= 90 && canNang < 95) {
            return "3XL"
        }
        return "4XL"
    }
    return "Không rõ";
}