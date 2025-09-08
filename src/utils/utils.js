export const formatTime = (totalMinutes) => {
    if (totalMinutes < 0) {
        return "Invalid time";
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
        return `${hours} hrs ${minutes} mins`;
    } else if (hours > 0) {
        return `${hours} hrs`;
    } else {
        return `${minutes} mins`;
    }
};