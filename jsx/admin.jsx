if (window.location.pathname === "/admin" || window.location.pathname === "/singers/admin.html") {
	const adminApp = document.getElementById('admin_app');
	const adminAppRoot = ReactDOM.createRoot(adminApp);
	adminAppRoot.render(
		<Admin></Admin>
	);
}

// TODO:
// add and remove committee members
// add and remove committee categories
// sort backend for save with git commit as backup method
// git ignore env.json
// add new images for committee members

function Admin({}) {
	const [content, setContent] = React.useState(null);
	const [eventsContent, setEventsContent] = React.useState(null);
	const [editingEventIndex, setEditingEventIndex] = React.useState(null);
	const [status, setStatus] = React.useState('');
	const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);

	React.useEffect(() => {
		fetch("/content.json")
			.then(response => response.json())
			.then(data => setContent(data))
			.catch(err => console.error("Failed to load content:", err));

		fetch("/events.json")
			.then(response => response.json())
			.then(data => setEventsContent(data))
			.catch(err => console.error("Failed to load events:", err));
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
		setHasUnsavedChanges(true);
	};

	const handleEventChange = (e) => {
		const { name, value } = e.target;
		const newEventsContent = {
			...eventsContent,
			events: [...eventsContent.events]
		};

		const event = {
			...newEventsContent.events[editingEventIndex],
			start: {
				...newEventsContent.events[editingEventIndex].start
			},
			attachments: [
				...(newEventsContent.events[editingEventIndex].attachments || [])
			]
		};

		if (name === "dateTime") {
			event.start.dateTime = value;
		} else if (name === "posterUrl") {
			if (value) {
				event.attachments = [{ fileUrl: value }];
			} else {
				event.attachments = [];
			}
		} else {
			event[name] = value;
		}

		newEventsContent.events[editingEventIndex] = event;
		setEventsContent(newEventsContent);
		setHasUnsavedChanges(true);
	};

	const addEvent = () => {
		const newEventsContent = {
			...eventsContent,
			events: [
				...eventsContent.events,
				{
					status: "confirmed",
					summary: "New Event",
					start: {
						dateTime: new Date().toISOString().slice(0, 16)
					},
					location: "",
					description: "",
					attachments: []
				}
			]
		};

		setEventsContent(newEventsContent);
		setEditingEventIndex(newEventsContent.events.length - 1);
		setHasUnsavedChanges(true);
	};

	const removeEditingEvent = () => {
		if (editingEventIndex === null) return;

		const newEventsContent = {
			...eventsContent,
			events: eventsContent.events.filter((event, index) => index !== editingEventIndex)
		};

		setEventsContent(newEventsContent);
		setEditingEventIndex(null);
		setHasUnsavedChanges(true);
	};

	const formatEventDateForList = (dateTime) => {
		if (!dateTime) return "No date set";

		const date = new Date(dateTime);

		if (isNaN(date.getTime())) {
			return dateTime;
		}

		return date.toLocaleString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	};

	const getDateTimeInputValue = (dateTime) => {
		if (!dateTime) return "";

		return dateTime.slice(0, 16);
	};

	const addCommitteeMember = (category) => {
		const newContent = {
			...content,
			committeeMembers: {
				...content.committeeMembers,
				[category]: [
					...content.committeeMembers[category],
					{
						name: "New Member",
						position: "",
						img: ""
					}
				]
			}
		};

		setContent(newContent);
		setHasUnsavedChanges(true);
	};

	const removeCommitteeMember = (category, memberIndex) => {
		const newContent = {
			...content,
			committeeMembers: {
				...content.committeeMembers,
				[category]: content.committeeMembers[category].filter((member, index) => index !== memberIndex)
			}
		};

		setContent(newContent);
		setHasUnsavedChanges(true);
	};

	const handleSave = async e => {
		e.preventDefault();

		// const useTotp = window.confirm(
		// 	"Choose verification method:\n\nOK = Authenticator code\nCancel = Password"
		// );

		const useTotp = false;

		const credentials = {};

		if (useTotp) {
			const totpToken = window.prompt("Enter your 6-digit authenticator code:");

			if (!totpToken) {
				setStatus('Save cancelled.');
				setTimeout(() => setStatus(''), 3000);
				return;
			}

			credentials.totp_token = totpToken.replace(/\D/g, '').slice(0, 6);
		} else {
			const password = window.prompt("Enter admin password:");

			if (!password) {
				setStatus('Save cancelled.');
				setTimeout(() => setStatus(''), 3000);
				return;
			}

			credentials.password = password;
		}

		setStatus('Saving...');

		try {
			const response = await fetch('/admin/save', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...credentials,
					content,
					eventsContent
				})
			});
			if (response.ok) {
				setStatus('Changes saved successfully!');
				setHasUnsavedChanges(false);
				setTimeout(() => setStatus(''), 3000);
			} else if (response.status === 403) {
				setStatus('Authentication failed.');
			} else {
				setStatus('Error saving content.');
			}
		} catch (err) {
			setStatus('Server error.');
		}
	};

	if (!content || !eventsContent) return <div className="admin">Loading content...</div>;

	const editingEvent = editingEventIndex !== null ? eventsContent.events[editingEventIndex] : null;

	return (
		<div className="admin">
			<h1 className="admin-title">Content Management</h1>
			<form onSubmit={handleSave} className="admin-form">

				<section>
					<h2>Details</h2>
					<div className="admin-row">
						<div className="admin-field">
							<label>Rehearsal Details</label>
							<input name="rehearsalDetails" type="text" value={content.rehearsalDetails} onChange={handleChange} />
						</div>
					</div>
				</section>

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
					<h2>Events</h2>

					<div className="admin-events-list">
						{eventsContent.events.map((event, eventIndex) => (
							<button
								type="button"
								className="admin-event-row"
								key={eventIndex}
								onClick={() => setEditingEventIndex(eventIndex)}
							>
								<span>{event.summary || "Untitled event"}</span>
								<span>{formatEventDateForList(event.start && event.start.dateTime)}</span>
							</button>
						))}
					</div>

					<button type="button" className="admin-add-btn" onClick={addEvent}>
						Add Event
					</button>
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
							<div className="admin-category-header">
								<h3>{category}</h3>
								<button
									type="button"
									className="admin-add-btn"
									onClick={() => addCommitteeMember(category)}
								>
									Add Member
								</button>
							</div>
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
										<div className="admin-input-preview">
											<input
												name={`committeeMembers.${category}[${mIdx}].img`}
												value={member.img}
												onChange={handleChange}
											/>
											{member.img && (
												<img
													src={member.img}
													className="admin-image-preview"
													alt="Preview"
												/>
											)}
										</div>
									</div>
									<div className="admin-committee-actions">
										<button
											type="button"
											className="admin-delete-btn"
											onClick={() => removeCommitteeMember(category, mIdx)}
										>
											<span className="material-symbols-outlined">delete</span>
										</button>
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

				{hasUnsavedChanges && (
					<div className="admin-unsaved-overlay">
						<div>
							<strong>Unsaved changes</strong>
							<span>Your updates have not been saved yet.</span>
						</div>
						<button type="submit" className="admin-save-btn">Save All Changes</button>
					</div>
				)}
			</form>

			<ImageLibrary />

			{editingEvent && (
				<div className="admin-modal-backdrop">
					<div className="admin-modal">
						<div className="admin-modal-header">
							<h2>Edit Event</h2>
							<button type="button" onClick={() => setEditingEventIndex(null)}>
								Close
							</button>
						</div>

						<div className="admin-field">
							<label>Event Name</label>
							<input
								name="summary"
								value={editingEvent.summary || ""}
								onChange={handleEventChange}
							/>
						</div>

						<div className="admin-field">
							<label>Date and Time</label>
							<input
								name="dateTime"
								type="datetime-local"
								value={getDateTimeInputValue(editingEvent.start && editingEvent.start.dateTime)}
								onChange={handleEventChange}
							/>
						</div>

						<div className="admin-field">
							<label>Status</label>
							<select
								name="status"
								value={editingEvent.status || "confirmed"}
								onChange={handleEventChange}
							>
								<option value="confirmed">Confirmed</option>
								<option value="cancelled">Cancelled</option>
							</select>
						</div>

						<div className="admin-field">
							<label>Location</label>
							<input
								name="location"
								value={editingEvent.location || ""}
								onChange={handleEventChange}
							/>
						</div>

						<div className="admin-field">
							<label>Description</label>
							<textarea
								name="description"
								value={editingEvent.description || ""}
								onChange={handleEventChange}
								rows="8"
								className="admin-textarea"
							/>
						</div>

						<div className="admin-field">
							<label>Poster Image URL</label>
							<input
								name="posterUrl"
								value={
									editingEvent.attachments &&
									editingEvent.attachments.length
										? editingEvent.attachments[0].fileUrl
										: ""
								}
								onChange={handleEventChange}
								placeholder="/img/poster1.webp"
							/>
						</div>

						<div className="admin-modal-actions">
							<button type="button" className="admin-delete-btn" onClick={removeEditingEvent}>
								Delete Event
							</button>
							<button type="button" className="admin-save-btn" onClick={() => setEditingEventIndex(null)}>
								Done
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

// ... existing code ...

function ImageLibrary({}) {
	const [images, setImages] = React.useState([]);
	const [selectedImage, setSelectedImage] = React.useState(null);
	const [status, setStatus] = React.useState('');
	const [isUploading, setIsUploading] = React.useState(false);

	React.useEffect(() => {
		loadImages();
	}, []);

	const loadImages = () => {
		fetch("/admin/images")
			.then(response => response.json())
			.then(data => {
				setImages(data.images || []);
			})
			.catch(err => {
				console.error("Failed to load images:", err);
				setImages([]);
				setStatus("Could not load images.");
			});
	};

	const uploadImage = async (e) => {
		const file = e.target.files[0];

		if (!file) return;

		const password = window.prompt("Enter admin password to upload image:");

		if (!password) {
			setStatus("Upload cancelled.");
			e.target.value = "";
			setTimeout(() => setStatus(""), 3000);
			return;
		}

		const formData = new FormData();
		formData.append("password", password);
		formData.append("image", file);

		setIsUploading(true);
		setStatus("Uploading image...");

		try {
			const response = await fetch("/admin/images/upload", {
				method: "POST",
				body: formData
			});

			if (!response.ok) {
				setStatus("Image upload failed.");
				e.target.value = "";
				setIsUploading(false);
				return;
			}

			await response.json();

			setStatus("Image uploaded successfully.");
			e.target.value = "";

			loadImages();

			setTimeout(() => setStatus(""), 3000);
		} catch (err) {
			console.error("Image upload failed:", err);
			setStatus("Server error while uploading image.");
			e.target.value = "";
		}

		setIsUploading(false);
	};

	const copyImageLink = async (link) => {
		try {
			await navigator.clipboard.writeText(link);
			setStatus("Image link copied.");
			setTimeout(() => setStatus(""), 3000);
		} catch (err) {
			setStatus("Could not copy link. Select and copy it manually.");
			setTimeout(() => setStatus(""), 3000);
		}
	};

	return (
		<section className="admin-section image-library">
			<h2>Image Library</h2>

			<div className="admin-upload-area">
				<label className={`admin-upload-label ${isUploading ? "disabled" : ""}`}>
					<span className="material-symbols-outlined">upload</span>
					{isUploading ? "Uploading..." : "Upload New Image"}
					<input
						type="file"
						accept="image/*"
						onChange={uploadImage}
						disabled={isUploading}
					/>
				</label>

				<button
					type="button"
					className="admin-add-btn"
					onClick={loadImages}
					disabled={isUploading}
				>
					Refresh Images
				</button>
			</div>

			{status && (
				<p className="admin-status">{status}</p>
			)}

			<div className="admin-image-grid">
				{images.length ? images.map((image) => (
					<button
						type="button"
						className="admin-image-card"
						key={image.path}
						onClick={() => setSelectedImage(image)}
					>
						<img src={image.url} alt={image.filename} />
						<span>{image.filename}</span>
					</button>
				)) : (
					<p>No images found.</p>
				)}
			</div>

			{selectedImage && (
				<div className="admin-modal-backdrop">
					<div className="admin-modal admin-image-modal">
						<div className="admin-modal-header">
							<h2>{selectedImage.filename}</h2>
							<button type="button" onClick={() => setSelectedImage(null)}>
								Close
							</button>
						</div>

						<img
							className="admin-full-image"
							src={selectedImage.url}
							alt={selectedImage.filename}
						/>

						<div className="admin-field">
							<label>Image path to use in admin fields</label>
							<div className="admin-copy-row">
								<input
									readOnly
									value={selectedImage.path}
									onFocus={(e) => e.target.select()}
								/>
								<button
									type="button"
									className="admin-add-btn"
									onClick={() => copyImageLink(selectedImage.path)}
								>
									Copy
								</button>
							</div>
						</div>

						<div className="admin-field">
							<label>Direct image URL</label>
							<div className="admin-copy-row">
								<input
									readOnly
									value={selectedImage.url}
									onFocus={(e) => e.target.select()}
								/>
								<button
									type="button"
									className="admin-add-btn"
									onClick={() => copyImageLink(selectedImage.url)}
								>
									Copy
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}