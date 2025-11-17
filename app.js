"use strict";

function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function About(_ref) {
  _objectDestructuringEmpty(_ref);
  var committeeMembers = [{
    name: "Jessica Craker",
    position: "Chairperson"
  }, {
    name: "Trish Le Flufy",
    position: "Secretary"
  }, {
    name: "Mandy Larby",
    position: "Treasurer"
  }, {
    name: "Hazel O'Leary",
    position: "Musical Director"
  }, {
    name: "Helen Follett",
    position: "Events Coordinator"
  }, {
    name: "Michelle Mader",
    position: "Publicity Coordinator"
  }, {
    name: "George March",
    position: "Choir Liaison"
  }, {
    name: "Val H",
    position: "Music Librarian"
  }, {
    name: "Vanessa H",
    position: "Music Librarian"
  }];
  var isMobile = mobileCheck();
  // test2
  return /*#__PURE__*/React.createElement("div", {
    id: "about",
    className: "about snap ".concat(isMobile ? "mobile" : "")
  }, /*#__PURE__*/React.createElement("h1", {
    className: "title"
  }, "About Kingsclere Singers"), /*#__PURE__*/React.createElement("div", {
    className: "spiel"
  }, /*#__PURE__*/React.createElement("p", null, "Kingsclere Singers is a group of people who are passionate about music and singing. We meet most Mondays at the Fieldgate Centre, Field Gate Drive, Kingsclere, RG20 5SQ."), /*#__PURE__*/React.createElement("p", null, "We love singing and know you will to - drop in if you are at all interested.")), /*#__PURE__*/React.createElement("div", {
    className: "committee"
  }, /*#__PURE__*/React.createElement("h2", null, "Committee"), /*#__PURE__*/React.createElement("div", {
    className: "members"
  }, committeeMembers.map(function (member, index) {
    return /*#__PURE__*/React.createElement(CommitteeMember, {
      key: index,
      name: member.name,
      position: member.position,
      image: "img/profile_picture.webp"
    });
  }))));
}
function CommitteeMember(_ref2) {
  var name = _ref2.name,
    position = _ref2.position,
    image = _ref2.image;
  return /*#__PURE__*/React.createElement("div", {
    className: "member"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name
  })), /*#__PURE__*/React.createElement("div", {
    className: "text"
  }, /*#__PURE__*/React.createElement("h3", null, name), /*#__PURE__*/React.createElement("h4", null, position)));
}
"use strict";

function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
var app = document.getElementById('app');
var appRoot = ReactDOM.createRoot(app);
appRoot.render(/*#__PURE__*/React.createElement(App, null));
function App(_ref) {
  _objectDestructuringEmpty(_ref);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "title_card snap ".concat(mobileCheck() ? "mobile" : ""),
    id: "home"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "/img/photo.jpg",
    alt: "group photo"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "0",
    height: "0"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "smooth-outline",
    x: "-20%",
    y: "-20%",
    width: "140%",
    height: "140%"
  }, /*#__PURE__*/React.createElement("feMorphology", {
    "in": "SourceAlpha",
    operator: "dilate",
    radius: "2",
    result: "thicken"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    "in": "thicken",
    stdDeviation: "0.8",
    result: "soft"
  }), /*#__PURE__*/React.createElement("feComposite", {
    "in": "soft",
    in2: "SourceAlpha",
    operator: "out",
    result: "outline"
  }), /*#__PURE__*/React.createElement("feMerge", null, /*#__PURE__*/React.createElement("feMergeNode", {
    "in": "outline"
  }), /*#__PURE__*/React.createElement("feMergeNode", {
    "in": "SourceGraphic"
  }))))), /*#__PURE__*/React.createElement("h1", {
    style: {
      filter: "url(#smooth-outline)"
    }
  }, "Kingsclere Singers"), /*#__PURE__*/React.createElement("h2", {
    style: {
      filter: "url(#smooth-outline)"
    }
  }, "Monday Nights 7.30pm at Kingsclere Fieldgate Centre")), /*#__PURE__*/React.createElement(Nav, null)), /*#__PURE__*/React.createElement(Events, null), /*#__PURE__*/React.createElement(About, null));
}
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function Events(_ref) {
  _objectDestructuringEmpty(_ref);
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    eventsJson = _React$useState2[0],
    setEventsJson = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    events = _React$useState4[0],
    setEvents = _React$useState4[1];
  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    current = _React$useState6[0],
    setCurrent = _React$useState6[1];
  var calendarID = "silchesterplayers@gmail.com";
  var apiKey = "AIzaSyC6CR2FdJB6KeujubYP42FFh74DIR1IiXg";
  var count = events.length;
  var isMobile = mobileCheck();
  var prev = function prev() {
    return setCurrent(function (i) {
      return Math.max(0, i - 1);
    });
  };
  var next = function next() {
    return setCurrent(function (i) {
      return Math.min(count - 1, i + 1);
    });
  };
  React.useEffect(function () {
    fetch("https://www.googleapis.com/calendar/v3/calendars/".concat(calendarID, "/events?key=").concat(apiKey)).then(function (response) {
      return response.json();
    }).then(function (data) {
      var tempEvents = [];
      data.items.forEach(function (event, i) {
        if (event.status === "confirmed" && !event.summary.toLowerCase().includes("rehearsal") && !event.summary.toLowerCase().includes("set") && !event.summary.toLowerCase().includes("charity")) {
          tempEvents.push(event);
        }
      });
      tempEvents.sort(function (a, b) {
        return a.start.dateTime.localeCompare(b.start.dateTime);
      });
      setEventsJson(tempEvents);
    });
  }, []);
  React.useEffect(function () {
    console.log(eventsJson);
    var tempEvents = [];
    eventsJson.forEach(function (event, i) {
      tempEvents.push(/*#__PURE__*/React.createElement(Event, {
        event: event,
        apiKey: apiKey,
        index: i,
        key: i,
        isMobile: isMobile
      }));
    });
    setEvents(tempEvents);
  }, [eventsJson]);
  React.useEffect(function () {
    console.log(current);
    if (events.length) {
      document.querySelector("#event_".concat(current)).scrollIntoView({
        behavior: "smooth",
        container: "nearest"
      });
    }
  }, [current]);
  return /*#__PURE__*/React.createElement("div", {
    id: "events",
    className: "snap ".concat(isMobile ? "mobile" : "")
  }, /*#__PURE__*/React.createElement("h1", {
    className: "title"
  }, "Upcoming Events"), /*#__PURE__*/React.createElement("div", {
    className: "events"
  }, events), /*#__PURE__*/React.createElement("div", {
    className: "buttons"
  }, /*#__PURE__*/React.createElement("div", {
    className: "button left",
    onClick: prev
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined"
  }, "arrow_back")), /*#__PURE__*/React.createElement("div", {
    className: "button right",
    onClick: next
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-outlined"
  }, "arrow_forward"))));
}
function Event(_ref2) {
  var event = _ref2.event,
    apiKey = _ref2.apiKey,
    index = _ref2.index,
    isMobile = _ref2.isMobile;
  var imgRef = React.useRef(null);
  function getAttachmentUrl(driveUrl) {
    var idIndex = driveUrl.lastIndexOf("id=");
    var fileID = driveUrl.substring(idIndex + 3);
    return "https://content.googleapis.com/drive/v3/files/".concat(fileID, "?key=").concat(apiKey, "&alt=media&source=downloadUrl");
  }
  function onLoad() {
    imgRef.current.style.aspectRatio = "".concat(imgRef.current.naturalWidth, "/").concat(imgRef.current.naturalHeight);
  }
  function Poster() {
    if (isMobile) {
      return /*#__PURE__*/React.createElement("div", {
        className: "poster"
      }, /*#__PURE__*/React.createElement("img", {
        onLoad: onLoad,
        ref: imgRef,
        src: "/img/poster1.webp",
        alt: "Poster for ".concat(event.summary)
      }));
    } else {
      return (
        /*#__PURE__*/
        // <img src={getAttachmentUrl(event.attachments[0].fileUrl)} alt={`Poster for ${event.summary}`}/>
        React.createElement("img", {
          onLoad: onLoad,
          ref: imgRef,
          src: "/img/poster1.webp",
          alt: "Poster for ".concat(event.summary)
        })
      );
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "event ".concat(isMobile ? "mobile" : ""),
    id: "event_".concat(index)
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, /*#__PURE__*/React.createElement("h1", null, event.summary)), /*#__PURE__*/React.createElement("div", {
    className: "time"
  }, /*#__PURE__*/React.createElement("h2", null, formatDateWithOrdinal(event.start.dateTime))), /*#__PURE__*/React.createElement("div", {
    className: "location"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.google.com/maps/search/?api=1&query=".concat(encodeURIComponent(event.location)),
    target: "_blank"
  }, /*#__PURE__*/React.createElement("h3", null, event.location.split(", ")[0]))), /*#__PURE__*/React.createElement("div", {
    className: "description"
  }, /*#__PURE__*/React.createElement(Markdown, {
    content: event.description
  }))), event.attachments.length ? Poster() : /*#__PURE__*/React.createElement(React.Fragment, null));
}
"use strict";

/**
 * Formats a Date into: "20th January 2023 7.30pm"
 * @param {Date|string|number} dateInput – a Date instance, ISO/date string, or timestamp
 * @returns {string}
 */
function formatDateWithOrdinal(dateInput) {
  var date = new Date(dateInput);
  var day = date.getDate();
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = monthNames[date.getMonth()];
  var year = date.getFullYear();

  // 12-hour clock and am/pm
  var hours = date.getHours();
  var isPM = hours >= 12;
  hours = hours % 12 || 12; // convert “0” to “12”
  var minutes = date.getMinutes();
  var minuteStr = minutes < 10 ? "0" + minutes : minutes;

  // get ordinal suffix for day
  function ordinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }
  return "".concat(day).concat(ordinal(day), " ").concat(month, " ").concat(year, " ") + "".concat(hours, ".").concat(minuteStr).concat(isPM ? "pm" : "am");
}
function mobileCheck() {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
"use strict";

function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function History(_ref) {
  _objectDestructuringEmpty(_ref);
  return /*#__PURE__*/React.createElement("div", {
    className: "history",
    id: "history"
  }, /*#__PURE__*/React.createElement("h2", null, "History"), /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, /*#__PURE__*/React.createElement(Point, {
    year: 1918
  }, "The Women's Institute (WI) choir was established in 1918, marking the beginning of organized choral music in Kingsclere."), /*#__PURE__*/React.createElement(Point, {
    year: 1922
  }, "\u2018The Kingsclere Choral Society\u2019, was formed in the 1922 by the addition of men\u2019s voices to the WI choir."), /*#__PURE__*/React.createElement(Point, {
    year: 1925
  }, "100 years ago, the annual membership subscription was just 3 shillings - \xA310.84 in today's money."), /*#__PURE__*/React.createElement(Point, {
    year: 1992
  }, "The group registered as a charity with the aim to promote the public's education and appreciation of music through the preservation of Choir Concerts."), /*#__PURE__*/React.createElement(Point, {
    year: 2025
  }, "The group meets every Monday (7.30pm to 9.15pm) at the Fieldgate Centre, Field Gate Drive, Kingsclere, RG20 5SQ.")));
}
function Point(_ref2) {
  var year = _ref2.year,
    children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "point"
  }, /*#__PURE__*/React.createElement("div", {
    className: "date"
  }, /*#__PURE__*/React.createElement("h1", null, year)), /*#__PURE__*/React.createElement("div", {
    className: "text"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "circle"
  }, " "));
}
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// TODO LIST
// TODO: refresh page on error unless recently refreshed.

function getID(a) {
  for (var b = 65521, c = 1, d = 0, e = 0, f; f = a.charCodeAt(e++); d = (d + c) % b) c = (c + f) % b;
  return d << 16 | c;
}
var md = new remarkable.Remarkable('full');
md.inline.ruler.enable(['footnote_inline', 'ins', 'mark', 'sub', 'sup']);
function MarkdownMedia(_ref) {
  var i = _ref.i,
    src = _ref.src,
    alt = _ref.alt,
    title = _ref.title;
  if (RegExp("/video/").test(src)) {
    return /*#__PURE__*/React.createElement(Video, {
      i: i,
      src: src,
      alt: alt,
      title: title
    });
  } else {
    return /*#__PURE__*/React.createElement(Image, {
      i: i,
      src: src,
      alt: alt,
      title: title
    });
  }
}
function preRenderMD() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var output = [];
  var openRegex = RegExp("(.*)_open$");
  var closeRegex = RegExp("(.*)_close$");
  var skipTo = 0;
  for (var i = 0; i < array.length; i++) {
    if (i >= skipTo) {
      var item = array[i];
      var level = item.level;
      var open_match = openRegex.exec(item.type);
      var copy = _objectSpread({}, item);
      delete copy["level"];
      delete copy["lines"];
      delete copy["type"];
      delete copy["tight"];
      delete copy["children"];
      if (open_match) {
        for (var j = i + 1; j < array.length; j++) {
          var close_match = closeRegex.exec(array[j].type);
          if (close_match && open_match[1] === close_match[1] && array[j].level === level) {
            skipTo = j + 1;
            output.push(_objectSpread({
              type: open_match[1],
              children: preRenderMD(array.slice(i + 1, j))
            }, copy));
            break;
          }
        }
      } else if (item.type === "inline") {
        output.push.apply(output, _toConsumableArray(preRenderMD(item.children)));
      } else {
        if (item.children) {
          output.push(_objectSpread(_objectSpread({
            type: item.type
          }, copy), {}, {
            children: preRenderMD(item.children)
          }));
        } else {
          output.push(_objectSpread({
            type: item.type
          }, copy));
        }
      }
    }
  }
  return output;
}
function codeCopy(codeId) {
  navigator.clipboard.writeText(document.getElementById(codeId).innerText);
}
function renderMD() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var output = [];
  var checked_box = RegExp("^\\[[xX]\\]");
  var unchecked_box = RegExp("^(\\[\\]|\\[ \\])");
  var tagTranslations = {
    paragraph: "p",
    ordered_list: "ol",
    bullet_list: "ul",
    list_item: "li",
    link: "a"
  };
  var _loop = function _loop() {
    var item = array[i];
    var tag = item.type;
    var props = _objectSpread({}, item);
    props.className = props["class"];
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
          item.children[0]["class"] = "task_list_item";
          item.children[0].children[0].content = item.children[0].children[0].content.replace(checked_box, "");
          item.children[0].children.unshift({
            type: "checkbox",
            checked: true
          });
        } else if (item.children[0].children[0].content.match(unchecked_box)) {
          item.children[0]["class"] = "task_list_item";
          item.children[0].children[0].content = item.children[0].children[0].content.replace(unchecked_box, "");
          item.children[0].children.unshift({
            type: "checkbox",
            checked: false
          });
        }
      }
    } else if (item.type === "checkbox") {
      tag = "";
      output.push(/*#__PURE__*/React.createElement("input", {
        className: "task_list_checkbox",
        type: "checkbox",
        disabled: true,
        defaultChecked: item.checked
      }));
    } else if (item.type === "image") {
      tag = "";
      output.push(/*#__PURE__*/React.createElement(MarkdownMedia, {
        i: item.src,
        src: item.src,
        alt: item.alt,
        title: item.title
      }));
    } else if (item.type === "code" || item.type === "fence") {
      tag = "";
      if (item.block || item.type === "fence") {
        var codeId = getID(String(item.content));
        output.push(/*#__PURE__*/React.createElement("pre", {
          key: "".concat(codeId, "_pre")
        }, /*#__PURE__*/React.createElement("div", {
          className: "code_header"
        }, /*#__PURE__*/React.createElement("span", {
          className: "code_language"
        }, item.params), /*#__PURE__*/React.createElement("span", {
          className: "copy_button",
          onClick: function onClick() {
            codeCopy(codeId);
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "copy"
        }, "\uD83D\uDCCB Copy"), /*#__PURE__*/React.createElement("span", {
          className: "copied"
        }, "Copied!"))), /*#__PURE__*/React.createElement("code", {
          key: codeId,
          id: codeId
        }, item.content)));
      } else {
        output.push(/*#__PURE__*/React.createElement("code", {
          key: "output_".concat(output.length, "_").concat(String(item.content).slice(0, 10))
        }, item.content));
      }
    } else if (item.type === "footnote_ref") {
      tag = "";
      var id;
      if (!item.subId) {
        id = "ref-".concat(item.id + 1);
      } else {
        id = "ref-".concat(item.id + 1, "-").concat(item.subId + 1);
      }
      output.push(/*#__PURE__*/React.createElement("sup", {
        key: "footref_".concat(item.id + 1),
        id: id
      }, /*#__PURE__*/React.createElement("a", {
        href: "#footnote-".concat(item.id + 1),
        key: "#footnote-".concat(item.id + 1)
      }, item.id + 1)));
    } else if (item.type === "footnote_block") {
      tag = "";
      output.push(/*#__PURE__*/React.createElement("section", {
        className: "footnotes",
        key: "#footnote-block"
      }, /*#__PURE__*/React.createElement("h3", null, "Footnotes"), /*#__PURE__*/React.createElement("ol", null, renderMD(item.children))));
    } else if (item.type === "footnote") {
      tag = "";
      var _id;
      if (!item.subId) {
        _id = "footnote-".concat(item.id + 1);
      } else {
        _id = "footnote-".concat(item.id + 1, "-").concat(item.subId + 1);
      }
      output.push(/*#__PURE__*/React.createElement("li", {
        key: _id,
        id: _id
      }, /*#__PURE__*/React.createElement("div", {
        className: "marker"
      }), /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, renderMD(item.children))));
    } else if (item.type === "footnote_anchor") {
      tag = "";
      var dest;
      var label;
      var sup = [];
      if (!item.subId) {
        dest = "#ref-".concat(item.id + 1);
        label = "Back to reference ".concat(item.id + 1);
      } else {
        dest = "#ref-".concat(item.id + 1, "-").concat(item.subId + 1);
        label = "Back to reference ".concat(item.id + 1, "-").concat(item.subId + 1);
        sup.push(/*#__PURE__*/React.createElement("sup", {
          key: "".concat(dest, "_sup")
        }, item.subId + 1));
      }
      output.push(/*#__PURE__*/React.createElement("a", {
        href: dest,
        key: dest,
        "aria-label": label
      }, "\u21A9", sup));
    } else if (item.type === "hardbreak" || item.type === "softbreak") {
      tag = "";
      output.push(" ");
    }
    if (Object.keys(tagTranslations).includes(item.type)) {
      tag = tagTranslations[item.type];
    }
    if (tag !== "") {
      var _React;
      output.push((_React = React).createElement.apply(_React, [tag, _objectSpread(_objectSpread({}, props), {}, {
        key: "output_".concat(output.length, "_").concat(String(item.content).slice(0, 10))
      })].concat(_toConsumableArray(renderMD(item.children)))));
    }
  };
  for (var i = 0; i < array.length; i++) {
    _loop();
  }
  return output;
}
function Markdown(_ref2) {
  var _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className,
    content = _ref2.content;
  var parsed = md.parse(content, {});
  var preRendered = preRenderMD(parsed);
  var rendered = renderMD(preRendered);
  return /*#__PURE__*/React.createElement("div", {
    className: "markdown ".concat(className)
  }, rendered);
}
"use strict";

function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function Nav(_ref) {
  _objectDestructuringEmpty(_ref);
  function handleClick(e) {
    console.log(e.target);
    console.log(document.getElementById(e.target.dataset.sectionId));
    document.getElementById(e.target.dataset.sectionId).scrollIntoView();
  }
  return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
    className: "link",
    "data-section-id": "home",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("span", {
    "data-section-id": "home"
  }, "Home")), /*#__PURE__*/React.createElement("div", {
    className: "link",
    "data-section-id": "events",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("span", {
    "data-section-id": "events"
  }, "Events")), /*#__PURE__*/React.createElement("div", {
    className: "link",
    "data-section-id": "about",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("span", {
    "data-section-id": "about"
  }, "About")));
}
