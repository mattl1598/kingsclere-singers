function Events({}) {
	const [eventsJson, setEventsJson] = React.useState([])
	const [events, setEvents] = React.useState([])
	const [current, setCurrent] = React.useState(0);

	const calendarID = "5ed625756269cf77deab7070dd37ddc88d865b92dab32ebfc77eb0ff0bd7e8ac@group.calendar.google.com"
	const apiKey = "AIzaSyCxXc28FCub4QScbrWUkaL9Ml13xx2qJl4"

	const count = events.length;

	const isMobile = mobileCheck()

	const prev = () => setCurrent(i => Math.max(0, i - 1));
	const next = () => setCurrent(i => Math.min(count - 1, i + 1));

	React.useEffect(() => {
		fetch(
			`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?key=${apiKey}`
		).then(
			response => response.json()
		).then(
			(data) => {
				console.log(data)
				let tempEvents = []
				data.items.forEach((event, i) => {
					if (event.status === "confirmed" && new Date(event.start.dateTime) > Date.now() ) {
						tempEvents.push(event)
					}
				})
				tempEvents.sort((a, b) => {return a.start.dateTime.localeCompare(b.start.dateTime)})
				setEventsJson(tempEvents)
			}
		)
	}, [])

	React.useEffect(() => {
		let tempEvents = []
		eventsJson.forEach((event, i) => {
			tempEvents.push(<Event event={event} apiKey={apiKey} index={i} key={i} isMobile={isMobile}/>)
		})
		setEvents(tempEvents)
	}, [eventsJson])

	React.useEffect(() => {
		if (events.length) {
			document.querySelector(`#event_${current}`).scrollIntoView({behavior: "smooth", container: "nearest"})
		}
	}, [current])

	return (
		<div id={"events"} className={`snap ${isMobile ? "mobile" : ""}`}>
			<h1 className="title">
				Upcoming Events
			</h1>
			<div className="events">
				{events}
			</div>
			<div className="buttons">
				<div className="button left" onClick={prev}>
					<span className="material-symbols-outlined">
						arrow_back
					</span>
				</div>
				<div className="button right" onClick={next}>
					<span className="material-symbols-outlined">
						arrow_forward
					</span>
				</div>
			</div>
		</div>
	)
}

function Event({event, apiKey, index, isMobile}) {
	const imgRef = React.useRef(null)
	function getAttachmentUrl(driveUrl) {
		let idIndex = driveUrl.lastIndexOf("id=")
		let fileID = driveUrl.substring(idIndex + 3)
		return `https://content.googleapis.com/drive/v3/files/${fileID}?key=${apiKey}&alt=media&source=downloadUrl`
	}

	function onLoad() {
		imgRef.current.style.aspectRatio = `${imgRef.current.naturalWidth}/${imgRef.current.naturalHeight}`;
	}

	function Poster() {
		if (isMobile) {
			return (
				<div className="poster">
					<img src={getAttachmentUrl(event.attachments[0].fileUrl)} alt={`Poster for ${event.summary}`}/>
					{/*<img onLoad={onLoad} ref={imgRef} src={"/img/poster1.webp"} alt={`Poster for ${event.summary}`}/>*/}
				</div>
			)
		} else {
			return (
				<img src={getAttachmentUrl(event.attachments[0].fileUrl)} alt={`Poster for ${event.summary}`}/>
				// <img onLoad={onLoad} ref={imgRef} src={"/img/poster1.webp"} alt={`Poster for ${event.summary}`}/>
			)
		}
	}

	return (
		<div className={`event ${isMobile ? "mobile" : ""}`} id={`event_${index}`}>
			<div className="content">
				<div className="title">
					<h1>{event.summary}</h1>
				</div>
				<div className="time">
					<h2>{formatDateWithOrdinal(event.start.dateTime)}</h2>
				</div>

				{
					event.location ?
					<div className="location">
						<a
							href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
							target={"_blank"}
						>
							<h3>{event.location.split(", ")[0]}</h3>
						</a>
					</div> : null
				}

				<div className="description">
					<Markdown content={event.description}></Markdown>
				</div>
			</div>
			{
				event.attachments.length ?
					Poster()
				:
					<React.Fragment></React.Fragment>
			}
		</div>
	)
}