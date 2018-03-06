import { Component, Prop } from "@stencil/core";
import { Event, EventEmitter, Listen } from "@stencil/core";
import { RouterHistory } from "@stencil/router";

declare const OktaAuth: any;

@Component({
  tag: "app-profile",
  styleUrl: "app-profile.scss"
})
export class AppProfile {
  @Prop() history: RouterHistory;
  @Prop() authClient: any;
  @Prop() user: AppUser;
  @Event() updateUserInfo: EventEmitter;

  constructor() {
    this.authClient = new OktaAuth({
      clientId: "0oacgzn2fb8qxCKka0h7",
      url: "https://dev-846291.oktapreview.com",
      issuer: "default"
    });
  }

  componentWillLoad() {
    let token = this.authClient.tokenManager.get("okta_id_token");
    //if (token) {
      this.updateUserInfo.emit(token.claims);
    // }else{
    //   this.history.push("/login", {});
    // }
  }

  @Listen("updateUserInfo")
  updateUser(event) {
    this.user = event.detail;
  }

  render() {
    return this.user ? <h1>User Claims</h1> : <h1>No User Info</h1>;
  }
}
