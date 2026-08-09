import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
function About({
  content
}) {
  const committeeMembers = content.committeeMembers;
  const isMobile = mobileCheck();
  return /*#__PURE__*/_jsxDEV("div", {
    id: "about",
    className: `about snap ${isMobile ? "mobile" : ""}`,
    children: [/*#__PURE__*/_jsxDEV("h1", {
      className: "title",
      children: "About Kingsclere Singers"
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "spiel",
      children: /*#__PURE__*/_jsxDEV(Markdown, {
        content: content.about
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "committee",
      children: Object.keys(committeeMembers).map((committee, index) => {
        return /*#__PURE__*/_jsxDEV(React.Fragment, {
          children: [/*#__PURE__*/_jsxDEV("h2", {
            children: committee
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "members",
            children: committeeMembers[committee].map((member, index2) => /*#__PURE__*/_jsxDEV(CommitteeMember, {
              name: member.name,
              position: member.position,
              image: member.img
            }, index2, false))
          }, void 0, false)]
        }, index, true);
      })
    }, void 0, false)]
  }, void 0, true);
}
function CommitteeMember({
  name,
  position,
  image
}) {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "member",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "image",
      children: /*#__PURE__*/_jsxDEV("img", {
        src: image,
        alt: name
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "text",
      children: [/*#__PURE__*/_jsxDEV("h3", {
        children: name
      }, void 0, false), position ? /*#__PURE__*/_jsxDEV("h4", {
        children: position
      }, void 0, false) : null]
    }, void 0, true)]
  }, void 0, true);
}
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
if (window.location.pathname === "/admin" || window.location.pathname === "/singers/admin.html") {
  const adminApp = document.getElementById('admin_app');
  const adminAppRoot = ReactDOM.createRoot(adminApp);
  adminAppRoot.render(/*#__PURE__*/_jsxDEV(Admin, {}, void 0, false));
}

// TODO:
// add and remove committee members
// add and remove committee categories
// sort backend for save with authentication and git commit

function Admin({}) {
  const [content, setContent] = React.useState(null);
  const [status, setStatus] = React.useState('');
  React.useEffect(() => {
    fetch("/content.json").then(response => response.json()).then(data => setContent(data)).catch(err => console.error("Failed to load content:", err));
  }, []);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    let newContent = {
      ...content
    };

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
  const handleSave = async e => {
    e.preventDefault();
    const useTotp = window.confirm("Choose verification method:\n\nOK = Authenticator code\nCancel = Password");
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...credentials,
          content
        })
      });
      if (response.ok) {
        setStatus('Changes saved successfully!');
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
  if (!content) return /*#__PURE__*/_jsxDEV("div", {
    className: "admin",
    children: "Loading content..."
  }, void 0, false);
  return /*#__PURE__*/_jsxDEV("div", {
    className: "admin",
    children: [/*#__PURE__*/_jsxDEV("h1", {
      className: "admin-title",
      children: "Content Management"
    }, void 0, false), /*#__PURE__*/_jsxDEV("form", {
      onSubmit: handleSave,
      className: "admin-form",
      children: [/*#__PURE__*/_jsxDEV("section", {
        children: [/*#__PURE__*/_jsxDEV("h2", {
          children: "Details"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "admin-row",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "admin-field",
            children: [/*#__PURE__*/_jsxDEV("label", {
              children: "Rehearsal Details"
            }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
              name: "rehearsalDetails",
              type: "text",
              value: content.rehearsalDetails,
              onChange: handleChange
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
        className: "admin-section",
        children: [/*#__PURE__*/_jsxDEV("h2", {
          children: "About Us"
        }, void 0, false), /*#__PURE__*/_jsxDEV("textarea", {
          name: "about",
          value: content.about,
          onChange: handleChange,
          className: "admin-textarea",
          rows: "8",
          placeholder: "Enter the about description..."
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
        className: "admin-section",
        children: [/*#__PURE__*/_jsxDEV("h2", {
          children: "Social Media"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "admin-row",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "admin-field",
            children: [/*#__PURE__*/_jsxDEV("label", {
              children: "Facebook Link"
            }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
              name: "fb.link",
              type: "text",
              value: content.fb.link,
              onChange: handleChange
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "admin-field",
            children: [/*#__PURE__*/_jsxDEV("label", {
              children: "Facebook Display Text"
            }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
              name: "fb.text",
              type: "text",
              value: content.fb.text,
              onChange: handleChange
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "admin-row",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "admin-field",
            children: [/*#__PURE__*/_jsxDEV("label", {
              children: "Email Address"
            }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
              name: "email.address",
              type: "email",
              value: content.email.address,
              onChange: handleChange
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
        className: "admin-section",
        children: [/*#__PURE__*/_jsxDEV("h2", {
          children: "Committee Members"
        }, void 0, false), Object.keys(content.committeeMembers).map(category => /*#__PURE__*/_jsxDEV("div", {
          className: "admin-category",
          children: [/*#__PURE__*/_jsxDEV("h3", {
            children: category
          }, void 0, false), content.committeeMembers[category].map((member, mIdx) => /*#__PURE__*/_jsxDEV("div", {
            className: "admin-row",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "admin-field",
              children: [/*#__PURE__*/_jsxDEV("label", {
                children: "Name"
              }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
                name: `committeeMembers.${category}[${mIdx}].name`,
                value: member.name,
                onChange: handleChange
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "admin-field",
              children: [/*#__PURE__*/_jsxDEV("label", {
                children: "Position"
              }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
                name: `committeeMembers.${category}[${mIdx}].position`,
                value: member.position || '',
                onChange: handleChange
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "admin-field",
              children: [/*#__PURE__*/_jsxDEV("label", {
                children: "Image Path"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "admin-input-preview",
                children: [/*#__PURE__*/_jsxDEV("input", {
                  name: `committeeMembers.${category}[${mIdx}].img`,
                  value: member.img,
                  onChange: handleChange
                }, void 0, false), member.img && /*#__PURE__*/_jsxDEV("img", {
                  src: member.img,
                  className: "admin-image-preview",
                  alt: "Preview"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, mIdx, true))]
        }, category, true))]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "admin-actions",
        children: [/*#__PURE__*/_jsxDEV("button", {
          type: "submit",
          className: "admin-save-btn",
          children: "Save All Changes"
        }, void 0, false), status && /*#__PURE__*/_jsxDEV("p", {
          className: "admin-status",
          children: status
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true)]
  }, void 0, true);
}
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const app = document.getElementById('app');
const appRoot = ReactDOM.createRoot(app);
appRoot.render(/*#__PURE__*/_jsxDEV(App, {}, void 0, false));
function App({}) {
  const [content, setContent] = React.useState(null);
  React.useEffect(() => {
    fetch("/content.json").then(response => response.json()).then(data => {
      setContent(data);
    });
  }, []);
  if (!content) return /*#__PURE__*/_jsxDEV("div", {
    className: "loading",
    children: "Loading..."
  }, void 0, false);
  return /*#__PURE__*/_jsxDEV(React.Fragment, {
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: `title_card snap ${mobileCheck() ? "mobile" : ""}`,
      id: "home",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "group_photo",
        children: /*#__PURE__*/_jsxDEV("img", {
          src: "/img/photo.jpg",
          alt: "group photo"
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "text",
        children: [/*#__PURE__*/_jsxDEV("svg", {
          width: "0",
          height: "0",
          children: /*#__PURE__*/_jsxDEV("defs", {
            children: /*#__PURE__*/_jsxDEV("filter", {
              id: "smooth-outline",
              x: "-20%",
              y: "-20%",
              width: "140%",
              height: "140%",
              children: [/*#__PURE__*/_jsxDEV("feMorphology", {
                in: "SourceAlpha",
                operator: "dilate",
                radius: "2",
                result: "thicken"
              }, void 0, false), /*#__PURE__*/_jsxDEV("feGaussianBlur", {
                in: "thicken",
                stdDeviation: "0.8",
                result: "soft"
              }, void 0, false), /*#__PURE__*/_jsxDEV("feComposite", {
                in: "soft",
                in2: "SourceAlpha",
                operator: "out",
                result: "outline"
              }, void 0, false), /*#__PURE__*/_jsxDEV("feMerge", {
                children: [/*#__PURE__*/_jsxDEV("feMergeNode", {
                  in: "outline"
                }, void 0, false), /*#__PURE__*/_jsxDEV("feMergeNode", {
                  in: "SourceGraphic"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "logo",
          children: [/*#__PURE__*/_jsxDEV("img", {
            className: "logo",
            src: "/img/logoA.svg"
          }, void 0, false), /*#__PURE__*/_jsxDEV("img", {
            className: "logo",
            src: "/img/logoB.svg"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("h2", {
          style: {
            filter: "url(#smooth-outline)"
          },
          children: content.rehearsalDetails
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "contact",
          children: [/*#__PURE__*/_jsxDEV("a", {
            href: content.fb.link,
            className: "facebook",
            target: "_blank",
            children: [/*#__PURE__*/_jsxDEV(Icon, {
              icon: content.fb.icon
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "linkText",
              children: content.fb.text
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
            href: `mailto:${content.email.address}`,
            className: "email",
            target: "_blank",
            children: [/*#__PURE__*/_jsxDEV(Icon, {
              children: content.email.icon
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "linkText",
              children: content.email.address
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV(Nav, {}, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV(Events, {}, void 0, false), /*#__PURE__*/_jsxDEV(About, {
      content: content
    }, void 0, false)]
  }, void 0, true);
}
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
function Events({}) {
  const [eventsJson, setEventsJson] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [current, setCurrent] = React.useState(0);
  const calendarID = "5ed625756269cf77deab7070dd37ddc88d865b92dab32ebfc77eb0ff0bd7e8ac@group.calendar.google.com";
  const apiKey = "AIzaSyCxXc28FCub4QScbrWUkaL9Ml13xx2qJl4";
  const count = events.length;
  const isMobile = mobileCheck();
  const prev = () => setCurrent(i => Math.max(0, i - 1));
  const next = () => setCurrent(i => Math.min(count - 1, i + 1));
  React.useEffect(() => {
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?key=${apiKey}`).then(response => response.json()).then(data => {
      console.log(data);
      let tempEvents = [];
      data.items.forEach((event, i) => {
        if (event.status === "confirmed" && new Date(event.start.dateTime) > Date.now()) {
          tempEvents.push(event);
        }
      });
      tempEvents.sort((a, b) => {
        return a.start.dateTime.localeCompare(b.start.dateTime);
      });
      setEventsJson(tempEvents);
    });
  }, []);
  React.useEffect(() => {
    let tempEvents = [];
    eventsJson.forEach((event, i) => {
      tempEvents.push(/*#__PURE__*/_jsxDEV(Event, {
        event: event,
        apiKey: apiKey,
        index: i,
        isMobile: isMobile
      }, i, false));
    });
    setEvents(tempEvents);
  }, [eventsJson]);
  React.useEffect(() => {
    if (events.length) {
      document.querySelector(`#event_${current}`).scrollIntoView({
        behavior: "smooth",
        container: "nearest"
      });
    }
  }, [current]);
  return /*#__PURE__*/_jsxDEV("div", {
    id: "events",
    className: `snap ${isMobile ? "mobile" : ""}`,
    children: [/*#__PURE__*/_jsxDEV("h1", {
      className: "title",
      children: "Upcoming Events"
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "events",
      children: events
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "buttons",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "button left",
        onClick: prev,
        children: /*#__PURE__*/_jsxDEV("span", {
          className: "material-symbols-outlined",
          children: "arrow_back"
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "button right",
        onClick: next,
        children: /*#__PURE__*/_jsxDEV("span", {
          className: "material-symbols-outlined",
          children: "arrow_forward"
        }, void 0, false)
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
}
function Event({
  event,
  apiKey,
  index,
  isMobile
}) {
  const imgRef = React.useRef(null);
  function getAttachmentUrl(driveUrl) {
    let idIndex = driveUrl.lastIndexOf("id=");
    let fileID = driveUrl.substring(idIndex + 3);
    return `https://content.googleapis.com/drive/v3/files/${fileID}?key=${apiKey}&alt=media&source=downloadUrl`;
  }
  function onLoad() {
    imgRef.current.style.aspectRatio = `${imgRef.current.naturalWidth}/${imgRef.current.naturalHeight}`;
  }
  function Poster() {
    if (isMobile) {
      return /*#__PURE__*/_jsxDEV("div", {
        className: "poster",
        children: /*#__PURE__*/_jsxDEV("img", {
          src: getAttachmentUrl(event.attachments[0].fileUrl),
          alt: `Poster for ${event.summary}`
        }, void 0, false)
      }, void 0, false);
    } else {
      return /*#__PURE__*/_jsxDEV("img", {
        src: getAttachmentUrl(event.attachments[0].fileUrl),
        alt: `Poster for ${event.summary}`
      }, void 0, false)
      // <img onLoad={onLoad} ref={imgRef} src={"/img/poster1.webp"} alt={`Poster for ${event.summary}`}/>
;
    }
  }
  return /*#__PURE__*/_jsxDEV("div", {
    className: `event ${isMobile ? "mobile" : ""}`,
    id: `event_${index}`,
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "content",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "title",
        children: /*#__PURE__*/_jsxDEV("h1", {
          children: event.summary
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "time",
        children: /*#__PURE__*/_jsxDEV("h2", {
          children: formatDateWithOrdinal(event.start.dateTime)
        }, void 0, false)
      }, void 0, false), event.location ? /*#__PURE__*/_jsxDEV("div", {
        className: "location",
        children: /*#__PURE__*/_jsxDEV("a", {
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`,
          target: "_blank",
          children: /*#__PURE__*/_jsxDEV("h3", {
            children: event.location.split(", ")[0]
          }, void 0, false)
        }, void 0, false)
      }, void 0, false) : null, /*#__PURE__*/_jsxDEV("div", {
        className: "description",
        children: /*#__PURE__*/_jsxDEV(Markdown, {
          content: event.description
        }, void 0, false)
      }, void 0, false)]
    }, void 0, true), event.attachments.length ? Poster() : /*#__PURE__*/_jsxDEV(React.Fragment, {}, void 0, false)]
  }, void 0, true);
}
/**
 * Formats a Date into: "20th January 2023 7.30pm"
 * @param {Date|string|number} dateInput – a Date instance, ISO/date string, or timestamp
 * @returns {string}
 */
function formatDateWithOrdinal(dateInput) {
  const date = new Date(dateInput);
  const day = date.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // 12-hour clock and am/pm
  let hours = date.getHours();
  const isPM = hours >= 12;
  hours = hours % 12 || 12; // convert “0” to “12”
  let minutes = date.getMinutes();
  const minuteStr = minutes < 10 ? "0" + minutes : minutes;

  // get ordinal suffix for day
  function ordinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }
  return `${day}${ordinal(day)} ${month} ${year} ` + `${hours}.${minuteStr}${isPM ? "pm" : "am"}`;
}
function mobileCheck() {
  let check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
function History({}) {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "history",
    id: "history",
    children: [/*#__PURE__*/_jsxDEV("h2", {
      children: "History"
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "timeline",
      children: [/*#__PURE__*/_jsxDEV(Point, {
        year: 1918,
        children: "The Women's Institute (WI) choir was established in 1918, marking the beginning of organized choral music in Kingsclere."
      }, void 0, false), /*#__PURE__*/_jsxDEV(Point, {
        year: 1922,
        children: "‘The Kingsclere Choral Society’, was formed in the 1922 by the addition of men’s voices to the WI choir."
      }, void 0, false), /*#__PURE__*/_jsxDEV(Point, {
        year: 1925,
        children: "100 years ago, the annual membership subscription was just 3 shillings - £10.84 in today's money."
      }, void 0, false), /*#__PURE__*/_jsxDEV(Point, {
        year: 1992,
        children: "The group registered as a charity with the aim to promote the public's education and appreciation of music through the preservation of Choir Concerts."
      }, void 0, false), /*#__PURE__*/_jsxDEV(Point, {
        year: 2025,
        children: "The group meets every Monday (7.30pm to 9.15pm) at the Fieldgate Centre, Field Gate Drive, Kingsclere, RG20 5SQ."
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
}
function Point({
  year,
  children
}) {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "point",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "date",
      children: /*#__PURE__*/_jsxDEV("h1", {
        children: year
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "text",
      children: children
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "line"
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "circle",
      children: " "
    }, void 0, false)]
  }, void 0, true);
}
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const iconPaths = {
  admin: "M13 17C13 12 16 8 21 8S29 12 29 17 25 25 21 25 13 21 13 17M25 38C25 36 26 34 28 33V32C28 31 28 31 28 30 26 29 23 29 21 29 12 29 4 33 4 38V42H25V38M46 38V45C46 47 45 48 43 48H32C30 48 29 47 29 45V38C29 37 30 35 32 35V32C32 29 35 27 38 27 40 27 43 29 43 32V35C45 35 46 37 46 38M41 32C41 31 39 30 38 30 36 30 34 31 34 32V35H41V32Z",
  add: "M25 42C16 42 8 34 8 25 8 16 16 8 25 8 34 8 42 16 42 25 42 34 34 42 25 42M25 4A21 21 0 0 0 4 25 21 21 0 0 0 25 46 21 21 0 0 0 46 25 21 21 0 0 0 25 4M27 15H23V23H15V27H23V35H27V27H35V23H27V15Z",
  blog_icon: "m41.667 22.917h-33.333v-6.25h33.333m0 14.583h-14.583v-4.167h14.583m0 12.5h-14.583v-4.167h14.583m-18.75 4.167h-14.583v-12.5h14.583m19.437-17.354-3.458-3.479-3.479 3.479-3.479-3.479-3.458 3.479-3.479-3.479-3.479 3.479-3.458-3.479-3.479 3.479-3.479-3.479-3.458 3.479-3.479-3.479v33.333a4.167 4.167 0 0 0 4.167 4.167h33.333a4.167 4.167 0 0 0 4.167-4.167v-33.333l-3.479 3.479z",
  circle: "M25 15A10 10 0 0 0 15 25 10 10 0 0 0 25 35 10 10 0 0 0 35 25 10 10 0 0 0 25 15Z",
  copy_icon: "m41 44h-23v-29h23m0-4h-23a4 4 0 0 0-4 4v29a4 4 0 0 0 4 4h23a4 4 0 0 0 4-4v-29a4 4 0 0 0-4-4m-6-8h-25a4 4 0 0 0-4 4v29h4v-29h25v-4z",
  cross: "M5 5 45 45M5 45 45 5",
  dashboard: "M27 6V19H44V6M27 44H44V23H27M6 44H23V31H6M6 27H23V6H6V27Z",
  doc: "M29 4H12A4 4 0 0 0 8 8V42A4 4 0 0 0 12 46H38A4 4 0 0 0 42 42V17L29 4M32 42H29L25 27 21 42H18L14 23H17L20 37 24 23H26L30 37 33 23H36L32 42M27 19V7L39 19H27Z",
  drama: "M16.896 40.521C12.375 38.854 8.792 34.958 7.729 29.896L4.271 13.625C3.771 11.375 5.208 9.167 7.458 8.688L27.813 4.375 27.875 4.354C30.104 3.917 32.292 5.354 32.75 7.563L33.479 11.042 42.542 12.979H42.604C44.792 13.479 46.208 15.688 45.75 17.896L42.292 34.188C40.625 42.042 32.875 47.083 25 45.396 21.708 44.708 18.917 42.938 16.896 40.521V40.521M41.667 17.042 21.313 12.708 17.854 29V29.063C16.667 34.646 20.271 40.146 25.875 41.333 31.479 42.521 37.021 38.938 38.208 33.333L41.667 17.042M33.333 34.375C32.021 36.604 29.396 37.833 26.729 37.271 24.083 36.708 22.188 34.521 21.875 31.958L33.333 34.375M17.646 10.771 8.333 12.771 11.792 29.042 11.813 29.104C12.125 30.583 12.75 31.917 13.604 33.063 13.396 31.458 13.438 29.792 13.792 28.125L14.688 23.958C13.75 23.792 12.938 23.271 12.5 22.521 12.625 21.25 13.667 20.125 15.104 19.792 15.271 19.792 15.417 19.792 15.625 19.792L17.25 11.854C17.333 11.458 17.458 11.104 17.646 10.771M31.313 25.479C31.979 24.375 33.396 23.792 34.833 24.104 36.271 24.396 37.313 25.5 37.5 26.792 36.813 27.875 35.417 28.458 33.958 28.125 32.521 27.854 31.479 26.75 31.313 25.479M21.146 23.313C21.813 22.208 23.208 21.625 24.646 21.938 26.042 22.229 27.146 23.354 27.313 24.625 26.625 25.708 25.229 26.313 23.792 26.042 22.354 25.688 21.313 24.583 21.146 23.313M24.938 9.229 29.021 10.104 28.688 8.438 24.938 9.229Z",
  email_icon: "M50 14.583H45.833V27.083H50V14.583M50 31.25H45.833V35.417H50V31.25M41.667 12.5C41.667 10.208 39.792 8.333 37.5 8.333H4.167C1.875 8.333 0 10.208 0 12.5V37.5C0 39.792 1.875 41.667 4.167 41.667H37.5C39.792 41.667 41.667 39.792 41.667 37.5V12.5M37.5 12.5 20.833 22.917 4.167 12.5H37.5M37.5 37.5H4.167V16.667L20.833 27.083 37.5 16.667V37.5Z",
  eye: "M4.03 0c-2.53 0-4.03 3-4.03 3s1.5 3 4.03 3c2.47 0 3.97-3 3.97-3s-1.5-3-3.97-3zm-.03 1c1.11 0 2 .9 2 2 0 1.11-.89 2-2 2-1.1 0-2-.89-2-2 0-1.1.9-2 2-2zm0 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1c0-.1-.04-.19-.06-.28-.08.16-.24.28-.44.28-.28 0-.5-.22-.5-.5 0-.2.12-.36.28-.44-.09-.03-.18-.06-.28-.06z",
  fb_icon: "M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z",
  file: "M27 19V7L39 19M12 4C10 4 8 6 8 8V42A4 4 0 0 0 12 46H37A4 4 0 0 0 42 42V17L29 4H12Z",
  filter: "m12.5 27.083h25v-4.167h-25m-6.25-10.417v4.167h37.5v-4.167m-22.917 25h8.333v-4.167h-8.333v4.167z",
  fullscreen: "m6.333 6.333h13.333v5.333h-8v8h-5.333v-13.833m24 0h13.333v13.333h-5.333v-8h-8v-5.833m8 24h5.333v13.333h-13.333v-5.333h8v-8.5m-18.667 8v5.333h-13.333v-13.333h5.333v8h8z",
  fullscreen_exit: "m30.333 30.333h13.333v5.333h-8v8h-5.333v-13.833m-24 0h13.333v13.333h-5.333v-8h-8v-5.833m8-24h5.333v13.333h-13.333v-5.333h8v-8.5m29.333 8v5.333h-13.333v-13.333h5.333v8h8z",
  help: "M23 38H27V33H23V38M25 13A8 8 0 0 0 17 21H21A4 4 0 0 1 25 17 4 4 0 0 1 29 21C29 25 23 24 23 31H27C27 27 33 26 33 21A8 8 0 0 0 25 13M10 6H40A4 4 0 0 1 44 10V40A4 4 0 0 1 40 44H10A4 4 0 0 1 6 40V10A4 4 0 0 1 10 6Z",
  ig_icon: "M 35.2059 0 H 14.9382 C 6.7012 0 0 6.7012 0 14.9382 v 20.2677 c 0 8.237 6.7012 14.9382 14.9382 14.9382 h 20.2677 c 8.237 0 14.9382 -6.7012 14.9382 -14.9382 V 14.9382 C 50.144 6.7012 43.4428 0 35.2059 0 z M 45.0996 35.2059 c 0 5.4641 -4.4296 9.8937 -9.8937 9.8937 H 14.9382 c -5.4641 0 -9.8937 -4.4296 -9.8937 -9.8937 V 14.9382 c 0 -5.4642 4.4296 -9.8937 9.8937 -9.8937 h 20.2677 c 5.4641 0 9.8937 4.4295 9.8937 9.8937 L 45.0996 35.2059 L 45.0996 35.2059 z M 25.072 12.103 C 17.9209 12.103 12.103 17.9209 12.103 25.072 s 5.8179 12.969 12.969 12.969 S 38.0411 32.2231 38.0411 25.072 S 32.2232 12.103 25.072 12.103 z M 25.072 32.9966 c -4.3766 0 -7.9246 -3.5479 -7.9246 -7.9246 s 3.548 -7.9246 7.9246 -7.9246 c 4.3766 0 7.9246 3.5479 7.9246 7.9246 C 32.9966 29.4486 29.4486 32.9966 25.072 32.9966 z M34.9233,12.1884a3.1045,3.1045 0 1,0 6.209,0a3.1045,3.1045 0 1,0 -6.209,0",
  important: "m27 27h-4v-13h4m0 21h-4v-4h4m-2-27a21 21 0 0 0-21 21 21 21 0 0 0 21 21 21 21 0 0 0 21-21 21 21 0 0 0-21-21z",
  logout: "M33 35V29H19V21H33V15L44 25 33 35M29 4A4 4 0 0 1 33 8V12H29V8H10V42H29V38H33V42A4 4 0 0 1 29 46H10A4 4 0 0 1 6 42V8A4 4 0 0 1 10 4H29Z",
  magnify: "M19.792 6.25A13.542 13.542 0 0 1 33.333 19.792C33.333 23.146 32.104 26.229 30.083 28.604L30.646 29.167H32.292L42.708 39.583 39.583 42.708 29.167 32.292V30.646L28.604 30.083C26.229 32.104 23.146 33.333 19.792 33.333A13.542 13.542 0 0 1 6.25 19.792 13.542 13.542 0 0 1 19.792 6.25M19.792 10.417C14.583 10.417 10.417 14.583 10.417 19.792 10.417 25 14.583 29.167 19.792 29.167 25 29.167 29.167 25 29.167 19.792 29.167 14.583 25 10.417 19.792 10.417Z",
  membership: "M41.667 4.167H8.333c-2.313 0-4.167 1.854-4.167 4.167v22.917c0 2.312 1.854 4.167 4.167 4.167h8.333v10.417l8.333-4.167 8.333 4.167v-10.417h8.333c2.313 0 4.167-1.854 4.167-4.167V8.333c0-2.313-1.854-4.167-4.167-4.167zm0 27.083H8.333v-4.167h33.333v4.167zm0-10.417H8.333V8.333h33.333v12.5z",
  msg: "M27 23H23V10H27M27 31H23V27H27M42 4H8C6 4 4 6 4 8V46L12 38H42C44 38 46 36 46 33V8C46 6 44 4 42 4Z",
  note: "M29 21H41L29 9V21M10 6H31L44 19V40A4 4 0 0 1 40 44H10C8 44 6 42 6 40V10C6 8 8 6 10 6M10 25V29H40V25H10M10 33V38H29V33H10Z",
  other_icon: "M 47.9375 12.14 L 37.845 2.05 c -0.7375 -0.7375 -2.0425 -0.7375 -2.78 0 L 21.87 15.245 c -0.7675 0.7675 -0.7675 2.0125 0 2.78 l 3.655 3.655 l -3.8325 3.8375 L 18.0375 21.865 c -0.7675 -0.7675 -2.0125 -0.7675 -2.78 0 l -13.195 13.19 c -0.7675 0.7675 -0.7675 2.0125 0 2.78 l 10.0925 10.0925 c 0.385 0.3825 0.8875 0.575 1.39 0.575 c 0.5025 0 1.0075 -0.1925 1.39 -0.575 l 13.2 -13.19 c 0.37 -0.37 0.575 -0.8675 0.575 -1.39 c 0 -0.5225 -0.2075 -1.0225 -0.575 -1.39 l -3.66 -3.66 l 3.8325 -3.8375 l 3.655 3.655 c 0.3825 0.3825 0.8875 0.575 1.39 0.575 c 0.5025 0 1.005 -0.1925 1.39 -0.575 l 13.195 -13.195 c 0.3675 -0.3675 0.575 -0.8675 0.575 -1.39 C 48.515 13.0075 48.305 12.51 47.9375 12.14 z M 23.9625 33.3475 l -10.4175 10.41 l -7.3125 -7.3125 l 10.415 -10.41 l 2.265 2.2625 l -1.675 1.67 c -0.7675 0.7675 -0.7675 2.0125 0 2.78 c 0.385 0.3825 0.89 0.575 1.39 0.575 c 0.5075 0 1.0075 -0.1925 1.39 -0.575 l 1.675 -1.67 L 23.9625 33.3475 z M 33.3525 23.945 l -2.265 -2.265 l 1.6575 -1.655 c 0.7675 -0.7675 0.7675 -2.0125 0 -2.78 c -0.7675 -0.7675 -2.0125 -0.7675 -2.78 0 L 28.305 18.9 l -2.265 -2.265 l 10.415 -10.415 l 7.3125 7.3125 L 33.3525 23.945 z",
  pdf: "M26.25 25.625H22.083V32.292H26.458C27.708 32.292 28.333 31.875 28.958 31.25 29.583 30.625 29.792 30 29.792 28.958 29.792 27.917 29.583 27.292 28.958 26.667 28.333 26.042 27.5 25.625 26.25 25.625M29.167 4.167H12.5A4.167 4.167 0 0 0 8.333 8.333V41.667A4.167 4.167 0 0 0 12.5 45.833H37.5A4.167 4.167 0 0 0 41.667 41.667V16.667L29.167 4.167M31.667 33.333C30.417 34.375 29.375 34.792 26.667 34.792H22.083V41.667H18.75V22.917H26.667C29.375 22.917 30.625 23.542 31.667 24.583 32.917 25.833 33.333 27.083 33.333 28.958 33.333 30.833 32.917 32.292 31.667 33.333M27.083 18.75V7.292L38.542 18.75H27.083Z",
  person: "m25 8a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8m0 21c9 0 17 4 17 8v4h-33v-4c0-5 7-8 17-8z",
  post: "M42 17 25 27 8 17V13L25 23 42 13M42 8H8C6 8 4 10 4 13V38A4 4 0 0 0 8 42H42A4 4 0 0 0 46 38V13C46 10 44 8 42 8Z",
  search: "M19.792 6.25A13.542 13.542 0 0 1 33.333 19.792C33.333 23.146 32.104 26.229 30.083 28.604L30.646 29.167H32.292L42.708 39.583 39.583 42.708 29.167 32.292V30.646L28.604 30.083C26.229 32.104 23.146 33.333 19.792 33.333A13.542 13.542 0 0 1 6.25 19.792 13.542 13.542 0 0 1 19.792 6.25M19.792 10.417C14.583 10.417 10.417 14.583 10.417 19.792 10.417 25 14.583 29.167 19.792 29.167 25 29.167 29.167 25 29.167 19.792 29.167 14.583 25 10.417 19.792 10.417Z",
  ticket: "m41.667 25c0-2.292 1.875-4.167 4.167-4.167v-8.333c0-2.292-1.875-4.167-4.167-4.167h-33.333c-2.292 0-4.146 1.875-4.146 4.167v8.333c2.292 0 4.146 1.875 4.146 4.167s-1.854 4.167-4.167 4.167v8.333c0 2.292 1.875 4.167 4.167 4.167h33.333c2.292 0 4.167-1.875 4.167-4.167v-8.333c-2.292 0-4.167-1.875-4.167-4.167zm-9.208 10-7.458-4.792-7.458 4.792 2.25-8.583-6.854-5.604 8.833-.521 3.229-8.208 3.208 8.229 8.833.521-6.854 5.604 2.271 8.563",
  trash: "M39.583 8.333H32.292L30.208 6.25H19.792L17.708 8.333H10.417V12.5H39.583M12.5 39.583A4.167 4.167 0 0 0 16.667 43.75H33.333A4.167 4.167 0 0 0 37.5 39.583V14.583H12.5V39.583Z",
  tw_icon: "M 44.71 14.75 c 0.02 0.44 0.03 0.87 0.03 1.32 c 0 13.5 -10.28 29.08 -29.08 29.08 c -5.77 0 -11.14 -1.69 -15.67 -4.59 c 0.8 0.09 1.62 0.14 2.44 0.14 c 4.79 0 9.19 -1.63 12.69 -4.37 c -4.47 -0.09 -8.24 -3.04 -9.54 -7.1 c 0.62 0.12 1.26 0.18 1.92 0.18 c 0.93 0 1.83 -0.12 2.69 -0.36 c -4.67 -0.94 -8.2 -5.07 -8.2 -10.02 c 0 -0.04 0 -0.09 0 -0.13 c 1.38 0.77 2.95 1.22 4.63 1.28 C 3.89 18.35 2.09 15.21 2.09 11.67 c 0 -1.87 0.5 -3.63 1.38 -5.14 c 5.04 6.18 12.57 10.25 21.06 10.68 c -0.17 -0.75 -0.26 -1.53 -0.26 -2.33 c 0 -5.64 4.57 -10.22 10.22 -10.22 c 2.94 0 5.59 1.24 7.45 3.22 c 2.33 -0.46 4.52 -1.31 6.49 -2.48 c -0.77 2.39 -2.38 4.39 -4.49 5.65 c 2.07 -0.24 4.04 -0.79 5.87 -1.61 C 48.44 11.5 46.7 13.3 44.71 14.75 z",
  xlsx: "m29 4h-17a4 4 0 0 0-4 4v33a4 4 0 0 0 4 4h25a4 4 0 0 0 4-4v-25l-12-12m4 37h-4l-4-7-4 7h-4l6-9-6-9h4l4 7 4-7h4l-6 9 6 9m-6-23v-11l11 11h-11z",
  sort_ascending: "M39.583 35.417H45.833L37.5 43.75 29.167 35.417H35.417V6.25H39.583M4.167 35.417H25V39.583H4.167M12.5 10.417V14.583H4.167V10.417M4.167 22.917H18.75V27.083H4.167V22.917Z",
  sort_descending: "M39.583 14.583H45.833L37.5 6.25 29.167 14.583H35.417V43.75H39.583M4.167 35.417H25V39.583H4.167M12.5 10.417V14.583H4.167V10.417M4.167 22.917H18.75V27.083H4.167V22.917Z",
  sort_alphabetical_ascending: "m39.583 35.417h6.25l-8.333 8.333-8.333-8.333h6.25v-29.167h4.167m-16.667 20.833v4.167l-6.937 8.333h6.938v4.167h-12.5v-4.167l6.938-8.333h-6.937v-4.167m8.333-20.833h-4.167c-2.292 0-4.167 1.875-4.167 4.167v12.5h4.167v-4.167h4.167v4.167h4.167v-12.5c0-2.292-1.854-4.167-4.167-4.167m0 8.333h-4.167v-4.167h4.167z",
  sort_alphabetical_descending: "m39.583 14.583h6.25l-8.333-8.333-8.333 8.333h6.25v29.167h4.167m-16.667-16.667v4.167l-6.937 8.333h6.938v4.167h-12.5v-4.167l6.938-8.333h-6.937v-4.167m8.333-20.833h-4.167c-2.292 0-4.167 1.875-4.167 4.167v12.5h4.167v-4.167h4.167v4.167h4.167v-12.5c0-2.292-1.854-4.167-4.167-4.167m0 8.333h-4.167v-4.167h4.167z",
  sort_clock_ascending: "M41.667 35.417H47.917L39.583 43.75 31.25 35.417H37.5V6.25H41.667V35.417M16.667 10.417C8.625 10.417 2.083 16.938 2.083 25 2.083 33.063 8.604 39.583 16.667 39.583 24.708 39.583 31.25 33.063 31.25 25 31.25 16.938 24.729 10.417 16.667 10.417M21.229 30.271 14.583 26.438V18.75H17.708V24.625L22.792 27.563 21.229 30.271Z",
  sort_clock_descending: "M37.5 14.583H31.25L39.583 6.25 47.917 14.583H41.667V43.75H37.5V14.583M16.667 10.417C8.625 10.417 2.083 16.938 2.083 25 2.083 33.063 8.604 39.583 16.667 39.583 24.708 39.583 31.25 33.063 31.25 25 31.25 16.938 24.729 10.417 16.667 10.417M21.229 30.271 14.583 26.438V18.75H17.708V24.625L22.792 27.563 21.229 30.271Z"
};
const iconRoots = [];
const tags = document.querySelectorAll('react-icon');
for (let i = 0; i < tags.length; i++) {
  let tag = tags[i];
  iconRoots.push(ReactDOM.createRoot(tag));
  iconRoots[i].render(/*#__PURE__*/_jsxDEV(Icon, {
    icon: tag.getAttribute('icon'),
    timeline: tag.getAttribute('timeline')
  }, void 0, false));
}
function Icon({
  icon = "",
  timeline,
  onClick,
  className = "",
  iconStyle = "outlined",
  tabIndex,
  children
}) {
  let opts = {};
  function handleEnter(e) {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === '13' || keycode === 13) {
      onClick();
    }
  }
  if (tabIndex !== undefined) {
    opts.tabIndex = tabIndex;
    opts.onKeyPress = handleEnter;
  }
  if (Object.keys(iconPaths).includes(icon) || icon === "siteLogo") {
    let d = iconPaths[icon];
    const context = React.useContext(app);
    if (icon === "siteLogo") {
      return /*#__PURE__*/_jsxDEV("span", {
        ...opts,
        className: "icon",
        onClick: onClick,
        dangerouslySetInnerHTML: {
          __html: context.siteJson.site_logo
        }
      }, void 0, false);
    }
    return /*#__PURE__*/_jsxDEV("svg", {
      ...opts,
      className: `icon ${className}`,
      viewBox: "0 0 50 50",
      onClick: onClick,
      children: [/*#__PURE__*/_jsxDEV("path", {
        d: d
      }, void 0, false), timeline === "up" ? /*#__PURE__*/_jsxDEV("path", {
        shapeRendering: "crispEdges",
        d: "m 24.5 5 l 0 -35 l 1 0 l 0 35 l -1 0 z"
      }, void 0, false) : null, timeline === "down" ? /*#__PURE__*/_jsxDEV("path", {
        shapeRendering: "crispEdges",
        d: "m 24.5 26 l 0 27 l 1 0 l 0 -27 l -1 0 z"
      }, void 0, false) : null]
    }, void 0, true);
  } else if (icon === "facebook") {
    return /*#__PURE__*/_jsxDEV("svg", {
      viewBox: "0 0 36 36",
      className: "icon",
      children: [/*#__PURE__*/_jsxDEV("path", {
        style: {
          fill: "blue"
        },
        d: "M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z"
      }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
        d: "M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z"
      }, void 0, false)]
    }, void 0, true);
  } else if (icon !== "") {
    return /*#__PURE__*/_jsxDEV("div", {
      ...opts,
      onClick: onClick,
      className: "react_icon",
      children: /*#__PURE__*/_jsxDEV("span", {
        className: `material-symbols-outlined ${className}`,
        children: icon
      }, void 0, false)
    }, void 0, false);
  } else {
    return /*#__PURE__*/_jsxDEV("div", {
      ...opts,
      onClick: onClick,
      className: "react_icon",
      children: /*#__PURE__*/_jsxDEV("span", {
        className: `material-symbols-${iconStyle} ${className}`,
        children: children
      }, void 0, false)
    }, void 0, false);
  }
}
function QRCode({
  data
}) {
  let rows = [];
  for (let i = 0; i < data.length; i++) {
    let row = [];
    for (let j = 0; j < data[i].length; j++) {
      row.push(/*#__PURE__*/_jsxDEV("span", {
        className: `cell ${data[i][j]}`
      }, `${i} ${j}`, false));
    }
    rows.push(/*#__PURE__*/_jsxDEV("div", {
      className: "row",
      children: row
    }, i, false));
  }
  return /*#__PURE__*/_jsxDEV("div", {
    className: "qrcode",
    children: rows
  }, void 0, false);
}
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
// TODO LIST
// TODO: refresh page on error unless recently refreshed.

function getID(a) {
  for (var b = 65521, c = 1, d = 0, e = 0, f; f = a.charCodeAt(e++); d = (d + c) % b) c = (c + f) % b;
  return d << 16 | c;
}
const md = new remarkable.Remarkable('full');
md.inline.ruler.enable(['footnote_inline', 'ins', 'mark', 'sub', 'sup']);
function MarkdownMedia({
  i,
  src,
  alt,
  title
}) {
  if (RegExp("/video/").test(src)) {
    return /*#__PURE__*/_jsxDEV(Video, {
      i: i,
      src: src,
      alt: alt,
      title: title
    }, void 0, false);
  } else {
    return /*#__PURE__*/_jsxDEV(Image, {
      i: i,
      src: src,
      alt: alt,
      title: title
    }, void 0, false);
  }
}
function preRenderMD(array = []) {
  let output = [];
  let openRegex = RegExp("(.*)_open$");
  let closeRegex = RegExp("(.*)_close$");
  let skipTo = 0;
  for (let i = 0; i < array.length; i++) {
    if (i >= skipTo) {
      let item = array[i];
      let level = item.level;
      let open_match = openRegex.exec(item.type);
      let copy = {
        ...item
      };
      delete copy["level"];
      delete copy["lines"];
      delete copy["type"];
      delete copy["tight"];
      delete copy["children"];
      if (open_match) {
        for (let j = i + 1; j < array.length; j++) {
          let close_match = closeRegex.exec(array[j].type);
          if (close_match && open_match[1] === close_match[1] && array[j].level === level) {
            skipTo = j + 1;
            output.push({
              type: open_match[1],
              children: preRenderMD(array.slice(i + 1, j)),
              ...copy
            });
            break;
          }
        }
      } else if (item.type === "inline") {
        output.push(...preRenderMD(item.children));
      } else {
        if (item.children) {
          output.push({
            type: item.type,
            ...copy,
            children: preRenderMD(item.children)
          });
        } else {
          output.push({
            type: item.type,
            ...copy
          });
        }
      }
    }
  }
  return output;
}
function codeCopy(codeId) {
  navigator.clipboard.writeText(document.getElementById(codeId).innerText);
}
function renderMD(array = []) {
  let output = [];
  let checked_box = RegExp("^\\[[xX]\\]");
  let unchecked_box = RegExp("^(\\[\\]|\\[ \\])");
  const tagTranslations = {
    paragraph: "p",
    ordered_list: "ol",
    bullet_list: "ul",
    list_item: "li",
    link: "a"
  };
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    let tag = item.type;
    let props = {
      ...item
    };
    props.className = props.class;
    delete props["class"];
    delete props["type"];
    delete props["children"];
    if (item.type === "heading") {
      tag = "h" + item.hLevel;
      delete props["hLevel"];
    } else if (item.type === "text") {
      output.push(item.content);
      tag = "";
    } else if (item.type === "list_item") {
      if (item.children[0].type === "paragraph" && item.children[0].children[0].type === "text") {
        if (item.children[0].children[0].content.match(checked_box)) {
          item.children[0].class = "task_list_item";
          item.children[0].children[0].content = item.children[0].children[0].content.replace(checked_box, "");
          item.children[0].children.unshift({
            type: "checkbox",
            checked: true
          });
        } else if (item.children[0].children[0].content.match(unchecked_box)) {
          item.children[0].class = "task_list_item";
          item.children[0].children[0].content = item.children[0].children[0].content.replace(unchecked_box, "");
          item.children[0].children.unshift({
            type: "checkbox",
            checked: false
          });
        }
      }
    } else if (item.type === "checkbox") {
      tag = "";
      output.push(/*#__PURE__*/_jsxDEV("input", {
        className: "task_list_checkbox",
        type: "checkbox",
        disabled: true,
        defaultChecked: item.checked
      }, void 0, false));
    } else if (item.type === "image") {
      tag = "";
      output.push(/*#__PURE__*/_jsxDEV(MarkdownMedia, {
        i: item.src,
        src: item.src,
        alt: item.alt,
        title: item.title
      }, void 0, false));
    } else if (item.type === "code" || item.type === "fence") {
      tag = "";
      if (item.block || item.type === "fence") {
        let codeId = getID(String(item.content));
        output.push(/*#__PURE__*/_jsxDEV("pre", {
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "code_header",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "code_language",
              children: item.params
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "copy_button",
              onClick: () => {
                codeCopy(codeId);
              },
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "copy",
                children: "📋 Copy"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "copied",
                children: "Copied!"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("code", {
            id: codeId,
            children: item.content
          }, codeId, false)]
        }, `${codeId}_pre`, true));
      } else {
        output.push(/*#__PURE__*/_jsxDEV("code", {
          children: item.content
        }, `output_${output.length}_${String(item.content).slice(0, 10)}`, false));
      }
    } else if (item.type === "footnote_ref") {
      tag = "";
      let id;
      if (!item.subId) {
        id = `ref-${item.id + 1}`;
      } else {
        id = `ref-${item.id + 1}-${item.subId + 1}`;
      }
      output.push(/*#__PURE__*/_jsxDEV("sup", {
        id: id,
        children: /*#__PURE__*/_jsxDEV("a", {
          href: `#footnote-${item.id + 1}`,
          children: item.id + 1
        }, `#footnote-${item.id + 1}`, false)
      }, `footref_${item.id + 1}`, false));
    } else if (item.type === "footnote_block") {
      tag = "";
      output.push(/*#__PURE__*/_jsxDEV("section", {
        className: "footnotes",
        children: [/*#__PURE__*/_jsxDEV("h3", {
          children: "Footnotes"
        }, void 0, false), /*#__PURE__*/_jsxDEV("ol", {
          children: renderMD(item.children)
        }, void 0, false)]
      }, "#footnote-block", true));
    } else if (item.type === "footnote") {
      tag = "";
      let id;
      if (!item.subId) {
        id = `footnote-${item.id + 1}`;
      } else {
        id = `footnote-${item.id + 1}-${item.subId + 1}`;
      }
      output.push(/*#__PURE__*/_jsxDEV("li", {
        id: id,
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "marker"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "content",
          children: renderMD(item.children)
        }, void 0, false)]
      }, id, true));
    } else if (item.type === "footnote_anchor") {
      tag = "";
      let dest;
      let label;
      let sup = [];
      if (!item.subId) {
        dest = `#ref-${item.id + 1}`;
        label = `Back to reference ${item.id + 1}`;
      } else {
        dest = `#ref-${item.id + 1}-${item.subId + 1}`;
        label = `Back to reference ${item.id + 1}-${item.subId + 1}`;
        sup.push(/*#__PURE__*/_jsxDEV("sup", {
          children: item.subId + 1
        }, `${dest}_sup`, false));
      }
      output.push(/*#__PURE__*/_jsxDEV("a", {
        href: dest,
        "aria-label": label,
        children: ["↩", sup]
      }, dest, true));
    } else if (item.type === "hardbreak" || item.type === "softbreak") {
      tag = "";
      output.push(" ");
    }
    if (Object.keys(tagTranslations).includes(item.type)) {
      tag = tagTranslations[item.type];
    }
    if (tag !== "") {
      output.push(React.createElement(tag, {
        ...props,
        key: `output_${output.length}_${String(item.content).slice(0, 10)}`
      }, ...renderMD(item.children)));
    }
  }
  return output;
}
function Markdown({
  className = "",
  content
}) {
  let parsed = md.parse(content, {});
  let preRendered = preRenderMD(parsed);
  let rendered = renderMD(preRendered);
  return /*#__PURE__*/_jsxDEV("div", {
    className: `markdown ${className}`,
    children: rendered
  }, void 0, false);
}
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
function Nav({}) {
  function handleClick(e) {
    console.log(e.target);
    console.log(document.getElementById(e.target.dataset.sectionId));
    document.getElementById(e.target.dataset.sectionId).scrollIntoView();
  }
  return /*#__PURE__*/_jsxDEV("nav", {
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "link",
      "data-section-id": "home",
      onClick: handleClick,
      children: /*#__PURE__*/_jsxDEV("span", {
        "data-section-id": "home",
        children: "Home"
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "link",
      "data-section-id": "events",
      onClick: handleClick,
      children: /*#__PURE__*/_jsxDEV("span", {
        "data-section-id": "events",
        children: "Events"
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "link",
      "data-section-id": "about",
      onClick: handleClick,
      children: /*#__PURE__*/_jsxDEV("span", {
        "data-section-id": "about",
        children: "About"
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
}
