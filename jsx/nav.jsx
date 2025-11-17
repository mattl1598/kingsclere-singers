function Nav({}) {
	function handleClick(e) {
		console.log(e.target);
		console.log(document.getElementById(e.target.dataset.sectionId));
		document.getElementById(e.target.dataset.sectionId).scrollIntoView();
	}

	return (
		<nav>
			<div className="link" data-section-id={"home"} onClick={handleClick}><span data-section-id={"home"}>Home</span></div>
			<div className="link" data-section-id={"events"} onClick={handleClick}><span data-section-id={"events"}>Events</span></div>
			<div className="link" data-section-id={"about"} onClick={handleClick}><span data-section-id={"about"}>About</span></div>
		</nav>
	)
}