export const formatDateTime = (dateString) => {
    if (!dateString) return "Date unavailable";

    return new Date(dateString).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

export const formatDateTimeForInput = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);

    return localDate.toISOString().slice(0, 16);
};