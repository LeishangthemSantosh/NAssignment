export const extractDates = (question) => {
    const dateRegex = /\d{4}-\d{2}-\d{2}/g; // Match YYYY-MM-DD format
    const matches = question.match(dateRegex);

    if (!matches || matches.length === 0) return null;

    if (matches.length === 1) {
        return { date: matches[0] };
    } else if (matches.length === 2) {
        return { startDate: matches[0], endDate: matches[1] };
    }

    return null; // More than 2 dates found (optional case handling)
};