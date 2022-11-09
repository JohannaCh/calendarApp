
export const CalendarEventBox = ({event}) => {
    const {title, user} = event;

    return (
        <>
            <strong>{title}</strong>
            &nbsp;
            <span>- {user.name}</span>
        </>
    )
};