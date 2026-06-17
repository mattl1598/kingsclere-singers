function About({}) {
	const committeeMembers = {"Committee": [
		{name: "Jessica Craker", position: "Chairperson", img: "img/Jess_Craker.jpg"},
		{name: "Trish Le Flufy", position: "Secretary", img: "img/trish.jpg"},
		{name: "Mandy Larby", position: "Treasurer", img: "img/mandy.jpg"},
		{name: "Helen Follett", position: "Events Coordinator", img: "img/helen.jpg"},
		{name: "Michelle Mader", position: "Publicity Coordinator", img: "img/michelle.jpg"},
		{name: "George March", position: "Choir Liaison", img: "img/george.jpg"},
		// {name: "Val H", position: "Music Librarian"},
		// {name: "Vanessa H", position: "Music Librarian"},
	],
	"Musical Directors": [
		{name: "Hazel O'Leary", img: "img/Hazel_OLeary.jpg"},
		{name: "Jessica Craker", img: "img/Jess_Craker.jpg"},
	],
	"Accompanist": [
		{"name": "Paul Freeman", img: "img/paul.jpg"},
	]};

	const isMobile = mobileCheck()
	// test2
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
				{
					Object.keys(committeeMembers).map((committee, index) => {
						return (
							<React.Fragment key={index}>
								<h2>{committee}</h2>
								<div className="members">
									{committeeMembers[committee].map((member, index2) => (
										<CommitteeMember
											key={index2}
											name={member.name}
											position={member.position}
											image={member.img}
										/>
									))}
								</div>
							</React.Fragment>
						)
					})
				}
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
				{
					position ? <h4>{position}</h4> : null
				}
			</div>
		</div>
	)
}