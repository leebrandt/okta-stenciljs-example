import { Component, State } from "@stencil/core";
import { Event, EventEmitter, Listen } from "@stencil/core";

@Component({
  tag: "session-list",
  styleUrl: "session-list.scss"
})
export class SessionList {
  @State() sessions: Session[];
  @Event() updateSessions: EventEmitter;

  componentWillLoad() {
    fetch("https://sessionize.com/api/v2/p6zq3lqb/view/sessions")
      .then(data => data.json())
      .then(jsonData => {
        this.updateSessions.emit(jsonData[0].sessions);
      });
  }

  @Listen('updateSessions')
  updateSessionList(event) {
    this.sessions = event.detail;
  }

  render() {
    return this.sessions ? (
      <ul>{this.sessions.map(session => <li>{session.title}</li>)}</ul>
    ) : <div>No Sessions</div>;
  }
}
