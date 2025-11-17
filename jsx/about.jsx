function About({}) {
	const committeeMembers = [
		{name: "Jessica Craker", position: "Chairperson"},
		{name: "Trish Le Flufy", position: "Secretary"},
		{name: "Mandy Larby", position: "Treasurer"},
		{name: "Hazel O'Leary", position: "Musical Director"},
		{name: "Helen Follett", position: "Events Coordinator"},
		{name: "Michelle Mader", position: "Publicity Coordinator"},
		{name: "George March", position: "Choir Liaison"},
		{name: "Val H", position: "Music Librarian"},
		{name: "Vanessa H", position: "Music Librarian"},
	];

	const isMobile = mobileCheck()
	// test
	return (
		<div id={"about"} className={`about snap ${isMobile ? "mobile" : ""}`}>
			<h1 className={"title"}>About Kingsclere Singers</h1>
			<div className="spiel">
				<p>
					Kingsclere Singers is a group of people who are passionate about music and singing.
					We meet most Mondays at the Fieldgate Centre, Field Gate Drive, Kingsclere, RG20 5SQ.
				</p>
				<p>
					We love singing and know you will to - drop in if you are at all interested.
				</p>
			</div>

			<div className="committee">
				<h2>Committee</h2>
				<div className="members">
					{committeeMembers.map((member, index) => (
						<CommitteeMember
							key={index}
							name={member.name}
							position={member.position}
							image={"img/profile_picture.webp"}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

function CommitteeMember({name, position, image}) {
	return (
		<div className="member">
			<div className="image">
				<img src={image} alt={name}/>
			</div>
			<div className="text">
				<h3>{name}</h3>
				<h4>{position}</h4>
			</div>
		</div>
	)
}