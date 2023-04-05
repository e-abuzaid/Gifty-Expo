export const addAndSortByDate = (events) => {
    for (let i=0; i<events.length; i++) {
        const now = new Date();
        const [day, month, year] = events[i].date.split('/');
        const date = new Date(year, month - 1, day);
        const isAfterToday = date.getMonth() > now.getMonth() || (date.getMonth() === now.getMonth() && date.getDate() > now.getDate());
        if (!isAfterToday) {
            const updatedDate = new Date(now.getFullYear() + 1, month - 1, day);
            const timeLeft =  updatedDate.getTime() - now.getTime()
            const days = Math.floor( timeLeft / (1000 * 60 * 60 * 24));
            events[i].timeRemaining = days
        } else {
            const updatedDate = new Date(now.getFullYear(), month - 1, day);
            const timeLeft =  updatedDate.getTime() - now.getTime()
            const days = Math.floor( timeLeft / (1000 * 60 * 60 * 24));
            events[i].timeRemaining = days
        }
    }
    events.sort((a, b) => a.timeRemaining - b.timeRemaining)
    return events
}

export const calculateAge = (person) => {
    const now = new Date();
    const [day, month, year] = person?.dob.split('/');
    const birthday = new Date(year, month - 1, day);
    const age = now.getTime() - birthday.getTime()
    const years = Math.floor( age / (1000 * 60 * 60 * 24 * 365.25))
    return years
}

export const calculateTimeRemaining = (myDate) => {
    const now = new Date();
    const [day, month, year] = myDate.split('/');
    const date = new Date(year, month - 1, day);
    const isAfterToday = date.getMonth() > now.getMonth() || (date.getMonth() === now.getMonth() && date.getDate() > now.getDate());
    if (!isAfterToday) {
        const updatedDate = new Date(now.getFullYear() + 1, month - 1, day);
        const timeLeft =  updatedDate.getTime() - now.getTime()
        const days = Math.floor( timeLeft / (1000 * 60 * 60 * 24));
        return days;
    } else {
        const updatedDate = new Date(now.getFullYear(), month - 1, day);
        const timeLeft =  updatedDate.getTime() - now.getTime()
        const days = Math.floor( timeLeft / (1000 * 60 * 60 * 24));
        return days;
    }
}


