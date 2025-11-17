function History({}) {
	return (
		<div className="history" id="history">
			<h2>History</h2>

			<div className="timeline">
				<Point year={1918}>
					The Women's Institute (WI) choir was established in 1918, marking the beginning of organized
					choral music in Kingsclere.
				</Point>
				<Point year={1922}>
					‘The Kingsclere Choral Society’, was formed in the 1922 by the addition of
					men’s voices to the WI choir.
				</Point>
				<Point year={1925}>
					100 years ago, the annual membership subscription was just 3 shillings - £10.84 in today's money.
				</Point>
				<Point year={1992}>The group registered as a charity with the aim to promote the public's education and appreciation of music through the preservation of Choir Concerts.</Point>
				<Point year={2025}>
					The group meets every Monday (7.30pm to 9.15pm) at the Fieldgate Centre, Field Gate Drive, Kingsclere, RG20 5SQ.
				</Point>
			</div>

			{/*<p>The choir, formally called ‘The Kingsclere Choral Society’, was formed in the 1922 by the addition of*/}
			{/*	men’s voices to the WI choir. The name has now been changed to reflect a new style of choir and*/}
			{/*	repertoire which appeals to a wider audience. The choir visits a variety of local venues, performing*/}
			{/*	music from the 15th-21st centuries; from unison singing to Close harmony; from Bach to Beatles; from*/}
			{/*	Offenbach to ‘Often in the West End’.</p>*/}

			{/*<p>Much has changed in our 100 year history, (in 1925 the annual subscription was 3/-, 15p), but the*/}
			{/*	spirit and enthusiasm of the choir has not. Enjoyment of singing is all that is required to join and*/}
			{/*	meet new members of all ages are always very welcome.</p>*/}

			{/*<p>We meet at the Fieldgate Centre on the edge of Kingsclere village, Foxes Lane, Kingsclere, RG20 5SQ*/}
			{/*	every Monday throughout the year 7.30pm to 9.15pm.*/}
			{/*	There’s ample parking available at the Centre is disabled access friendly although do alert us ahead*/}
			{/*	of your visit of any special access needs so we can be sure of making you welcome.</p>*/}

			{/*<p>We love singing and know you will to : drop in if you are at all interested.</p>*/}
		</div>
	)
}

function Point({year, children}) {
	return (
		<div className="point">
			<div className="date">
				<h1>{year}</h1>
			</div>
			<div className="text">
				{children}
			</div>
			<div className="line"></div>
			<div className="circle"> </div>
		</div>
	)
}