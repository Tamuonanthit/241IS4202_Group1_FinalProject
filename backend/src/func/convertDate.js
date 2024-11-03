const convertDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') {
        throw new Error('Giá trị ngày không hợp lệ hoặc không xác định.');
    }

    const parts = dateString.split('/');
    if (parts.length !== 3) {
        throw new Error('Định dạng ngày không hợp lệ. Vui lòng sử dụng dd/mm/yyyy.');
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        throw new Error('Định dạng ngày không hợp lệ. Vui lòng sử dụng dd/mm/yyyy.');
    }

    const date = new Date(year, month, day);
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        throw new Error('Ngày không hợp lệ.');
    }

    return date;
};

module.exports = convertDate;
