function About({content}) {
	const committeeMembers = content.committeeMembers;
	const isMobile = mobileCheck()

	return (
		<div id={"about"} className={`about snap ${isMobile ? "mobile" : ""}`}>
			<h1 className={"title"}>About Kingsclere Singers</h1>
			<div className="spiel">
				<Markdown content={content.about} />
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