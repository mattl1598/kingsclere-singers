const app = document.getElementById('app');
const appRoot = ReactDOM.createRoot(app);
appRoot.render(
	<App></App>
);

function App({}) {
	const [content, setContent] = React.useState(null)

	React.useEffect(() => {
		fetch("/content.json").then(response => response.json()).then(data => {
			setContent(data)
		})
	}, [])

	if (!content) return <div className="loading">Loading...</div>

	return (
		<React.Fragment>
			<div className={`title_card snap ${mobileCheck() ? "mobile" : ""}`} id="home">
				<div className={"group_photo"}><img src="/img/photo.jpg" alt="group photo"/></div>
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
					{/*<h1 style={{filter: "url(#smooth-outline)"}}>Kingsclere Singers</h1>*/}
					{/*<img className={"logo"} src={"/img/logo.svg"}></img>*/}
					<div className="logo">
						<img className={"logo"} src={"/img/logoA.svg"}></img>
						<img className={"logo"} src={"/img/logoB.svg"}></img>
					</div>
					<h2 style={{filter: "url(#smooth-outline)"}}>{content.rehearsalDetails}</h2>
					<div className="contact">
						<a href={content.fb.link} className={"facebook"} target={"_blank"}>
							<Icon icon={content.fb.icon}></Icon>
							<span className="linkText">{content.fb.text}</span>
						</a>
						<a href={`mailto:${content.email.address}`} className={"email"} target={"_blank"}>
							<Icon>{content.email.icon}</Icon>
							<span className="linkText">{content.email.address}</span>
						</a>
					</div>
				</div>
				<Nav></Nav>
			</div>
			<Events></Events>
			<About content={content}></About>
		</React.Fragment>
	)
}
