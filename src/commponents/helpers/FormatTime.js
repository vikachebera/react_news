export const formatTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = (now.getTime() - date.getTime()) / 1000;

    if (seconds < 60) {
        return `${Math.floor(seconds)}s ago`;
    }
    if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}m ago`;
    }
    if (seconds < 86400) {
        return `${Math.floor(seconds / 3600)}h ago`;
    }

    const day = Math.floor(seconds / 86400);
    return day === 1 ? `${day} day ago` : `${day} days ago`;
};
