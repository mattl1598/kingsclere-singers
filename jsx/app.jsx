const app = document.getElementById('app');
const appRoot = ReactDOM.createRoot(app);
appRoot.render(
	<App></App>
);

function App({}) {
	return (
		<React.Fragment>
			<div className={`title_card snap ${mobileCheck() ? "mobile" : ""}`} id="home">
				<div><img src="/img/photo.jpg" alt="group photo"/></div>
				<div className="text">
					<svg width="0" height="0">
						<defs>
							<filter id="smooth-outline" x="-20%" y="-20%" width="140%" height="140%">

								<feMorphology in="SourceAlpha" operator="dilate" radius="2" result="thicken"/>

								<feGaussianBlur in="thicken" stdDeviation="0.8" result="soft"/>

								<feComposite in="soft" in2="SourceAlpha" operator="out" result="outline"/>
								<feMerge>
									<feMergeNode in="outline"/>
									<feMergeNode in="SourceGraphic"/>
								</feMerge>
							</filter>
						</defs>
					</svg>
					<h1 style={{filter: "url(#smooth-outline)"}}>Kingsclere Singers</h1>
					<h2 style={{filter: "url(#smooth-outline)"}}>Monday Nights 7.30pm at Kingsclere Fieldgate Centre</h2>
				</div>
				<Nav></Nav>
			</div>
			<Events></Events>
			<About></About>
			{/*<History></History>*/}
		</React.Fragment>
	)
}
