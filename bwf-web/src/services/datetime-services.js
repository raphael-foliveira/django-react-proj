export const formatDate = (dateString) => {
    let year = dateString.slice(0, 4);
    let month = dateString.slice(5, 7);
    let day = dateString.slice(8,10);
    
    return `${day}/${month}/${year}`;
} 

export const formatTime = (dateString) => {
    let hours = dateString.slice(11, 13);
    let minutes = dateString.slice(14, 16);
    return `${hours}:${minutes}`
}