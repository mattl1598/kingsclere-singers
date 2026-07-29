if (window.location.pathname === "/admin") {
	const adminApp = document.getElementById('admin_app');
	const adminAppRoot = ReactDOM.createRoot(adminApp);
	adminAppRoot.render(
		<Admin></Admin>
	);
}

function Admin({}) {
	const [content, setContent] = React.useState(null);
	const [status, setStatus] = React.useState('');

	React.useEffect(() => {
		fetch("/content.json")
			.then(response => response.json())
			.then(data => setContent(data))
			.catch(err => console.error("Failed to load content:", err));
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		let newContent = { ...content };

		// Handle nested paths like "fb.link" or "committeeMembers.Committee[0].name"
		const keys = name.split(/[.[\]]+/).filter(Boolean);
		let current = newContent;

		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (key.match(/^\d+$/)) {
				current = current[parseInt(key)];
			} else {
				current = current[key];
			}
		}

		const lastKey = keys[keys.length - 1];
		current[lastKey] = value;
		setContent(newContent);
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setStatus('Saving...');
		try {
			const response = await fetch('/api/content', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(content)
			});
			if (response.ok) {
				setStatus('Changes saved successfully!');
				setTimeout(() => setStatus(''), 3000);
			} else {
				setStatus('Error saving content.');
			}
		} catch (err) {
			setStatus('Server error.');
		}
	};

	if (!content) return <div className="admin">Loading content...</div>;

	return (
		<div className="admin">
			<h1 className="admin-title">Content Management</h1>
			<form onSubmit={handleSave} className="admin-form">
				<section className="admin-section">
					<h2>About Us</h2>
					<textarea 
						name="about" 
						value={content.about} 
						onChange={handleChange} 
						className="admin-textarea"
						rows="8"
						placeholder="Enter the about description..."
					/>
				</section>

				<section className="admin-section">
					<h2>Social Media</h2>
					<div className="admin-row">
						<div className="admin-field">
							<label>Facebook Link</label>
							<input name="fb.link" type="text" value={content.fb.link} onChange={handleChange} />
						</div>
						<div className="admin-field">
							<label>Facebook Display Text</label>
							<input name="fb.text" type="text" value={content.fb.text} onChange={handleChange} />
						</div>
					</div>

					<div className="admin-row">
						<div className="admin-field">
							<label>Email Address</label>
							<input name="email.address" type="email" value={content.email.address} onChange={handleChange} />
						</div>
					</div>
				</section>

				<section className="admin-section">
					<h2>Committee Members</h2>
					{Object.keys(content.committeeMembers).map((category => (
						<div className="admin-category" key={category}>
							<h3>{category}</h3>
							{content.committeeMembers[category].map((member, mIdx) => (
								<div className="admin-row" key={mIdx}>
									<div className="admin-field">
										<label>Name</label>
										<input 
											name={`committeeMembers.${category}[${mIdx}].name`} 
											value={member.name} 
											onChange={handleChange} 
										/>
									</div>
									<div className="admin-field">
										<label>Position</label>
										<input 
											name={`committeeMembers.${category}[${mIdx}].position`} 
											value={member.position || ''} 
											onChange={handleChange} 
										/>
									</div>
									<div className="admin-field">
										<label>Image Path</label>
										<input 
											name={`committeeMembers.${category}[${mIdx}].img`} 
											value={member.img} 
											onChange={handleChange} 
										/>
									</div>
								</div>
							))}
						</div>
					)))}
				</section>

				<div className="admin-actions">
					<button type="submit" className="admin-save-btn">Save All Changes</button>
					{status && <p className="admin-status">{status}</p>}
				</div>
			</form>
		</div>
	)
}