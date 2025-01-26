export const formatDate = (date) => {
    const options={
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }
    return date.toLocaleDateString('en-US',  options);
}