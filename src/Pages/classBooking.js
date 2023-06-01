import { useEffect, useState } from "react"
import "../style/classBooking.css"
const ClassBooking = () => {
    const [scheduleClasses, setScheduleClasses] = useState([]);
    const [userBooking, setUserBooking] = useState([]);
    const [bookedClasses, setBookedClasses] = useState([])
    const startDate = new Date();
    let schedule = [];
    let currentDate;
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    function getSchedule() {
        for (let i = 1; i < 60; i++) {
            currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
            let dd = currentDate.getDate();
            dd = String(dd).padStart(2, "0");
            let mm = currentDate.getMonth() < 12 ? currentDate.getMonth() + 1 : 1;
            mm = String(mm).padStart(2, "0");
            let yy = currentDate.getFullYear();
            let scheduleValue = getDayName(new Date(`${yy}-${mm}-${dd}`));
            if (scheduleValue?.dayName === "Monday") {
                schedule.push({ ...scheduleValue, className: "Python", date: `${dd}/${mm}/${yy}`, dayName: scheduleValue?.dayName, time: "4pm", AvailaibleSeat: getRandomInt(5, 15) })
            } else if (scheduleValue?.dayName === "Wednesday") {
                schedule.push({ ...scheduleValue, className: "Java", date: `${dd}/${mm}/${yy}`, dayName: scheduleValue?.dayName, time: "5pm", AvailaibleSeat: getRandomInt(5, 15) })
            } else if (scheduleValue?.dayName === "Friday") {
                schedule.push({ ...scheduleValue, className: "HTML", date: `${dd}/${mm}/${yy}`, dayName: scheduleValue?.dayName, time: "9pm", AvailaibleSeat: getRandomInt(5, 15) })
            } else if (scheduleValue?.dayName === "Saturday") {
                schedule.push({ ...scheduleValue, className: "HTML", date: `${dd}/${mm}/${yy}`, dayName: scheduleValue?.dayName, time: "9pm", AvailaibleSeat: getRandomInt(5, 15) })
            }
        }
        function getDayName(date = new Date(), locale = 'en-US') {
            return { dayName: date.toLocaleDateString(locale, { weekday: 'long' }) };
        }
        setScheduleClasses(schedule)
    }
    function hasExceededBookingLimit(bookings, newBooking, i) {
        const now = new Date(newBooking);
        const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay()));
        const count = bookings.reduce((acc, booking) => {
            const bookingDate = new Date(booking);
            return bookingDate >= weekStart && bookingDate <= weekEnd ? acc + 1 : acc;
        }, 1);
        if (count <= 3) {
            const ScheduleClasses = Promise.all(scheduleClasses?.map((data, ind) => i === ind ? { ...data, AvailaibleSeat: data?.AvailaibleSeat - 1 } : data)).then((data) => { setScheduleClasses(data); return data }).then((data) => { let val = data?.find((data, ind) => ind === i ? data : null); return val }).then((val) => {
                setBookedClasses([...bookedClasses, val])
            })
            return true;
        } else {
            return false;
        }
    }
    const BookSeat = (i) => {
        let value = scheduleClasses?.find((data, ind) => ind === i ? data : null);
        const inputDate = value?.date;
        const parts = inputDate?.split('/');
        const reversedDate = parts?.reverse()?.join('-');
        if (hasExceededBookingLimit(userBooking, reversedDate, i)) {
            setUserBooking([...userBooking, reversedDate]);
            alert('Booking successful.');
        } else {
            alert('You can only book a maximum of 3 classes per week.');
        }
    }
    useEffect(() => {
        getSchedule()
    }, [scheduleClasses.length === 0]);
    bookedClasses.filter((AllClasses) => console.log(AllClasses))
    return (
        <>
            <div className="container">
                <div className="Free-seat-left-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <p style={{ color: "#172269" }}>Class Schedule</p>
                    <p style={{ color: "#172269" }} >Free Seat Left<span style={{ color: "#e7702d", paddingLeft: "2px" }}>{getRandomInt(15, 5)}</span></p>
                </div>
                <table className="booking_table" cellPadding="0" cellSpacing="0">
                    <tr className="booking_table_header_row">
                        <th className="booking_headng">
                            Class Name
                        </th>
                        <th className="booking_headng">
                            Date
                        </th>
                        <th className="booking_headng">
                            Week Days
                        </th>
                        <th className="booking_headng">
                            Time
                        </th>
                        <th className="booking_headng">
                            Availaibility
                        </th>
                        <th className="booking_headng">
                        </th>
                    </tr>
                    {
                        scheduleClasses?.map((data, index) => {
                            return (
                                <>
                                    <tr className="booking_table_row">
                                        <td className="booking_table_data">{data?.className}</td>
                                        <td className="booking_table_data">{data?.date}</td>
                                        <td className="booking_table_data">{data?.dayName}</td>
                                        <td className="booking_table_data">{data?.time}</td>
                                        <td className="booking_table_data">{data?.AvailaibleSeat}</td>
                                        <td>
                                            <button onClick={() => { BookSeat(index) }} className="book_app_button" disabled={data?.AvailaibleSeat === 0 ? true : false}>{data?.AvailaibleSeat !== 0 ? "Book Now" : "Full"}</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}

export default ClassBooking;