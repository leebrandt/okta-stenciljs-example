import { Component, Prop, State } from "@stencil/core";
import { Event, EventEmitter } from "@stencil/core";
import { RouterHistory } from "@stencil/router";

//declare const OktaAuth: any;

@Component({
  tag: "app-profile",
  styleUrl: "app-profile.scss"
})
export class AppProfile {
  @Prop() history: RouterHistory;
  @Prop() authClient: any;
  @State() user: AppUser;
  @Event() updateUserInfo: EventEmitter;

  constructor() {
    // this.authClient = new OktaAuth({
    //   clientId: "0oacgzn2fb8qxCKka0h7",
    //   url: "https://dev-846291.oktapreview.com",
    //   issuer: "default"
    // });
    let token = JSON.parse(localStorage.getItem("okta_id_token"));
    this.user = token.claims;
  }

  // componentWillLoad() {
  //   let token = JSON.parse(localStorage.getItem("okta_id_token"));
  //   if (token) {
  //    this.updateUserInfo.emit(token.claims);
  //   }else{
  //     this.history.push("/login", {});
  //   }
  // }

  // @Listen("updateUserInfo")
  // updateUser(event) {
  //   this.user = event.detail;
  // }

  render() {
    let keys = Object.keys(this.user);
    console.log(keys);
    return <div class="app-profile">
        <h2>User Claims</h2>
        <ul>
          {keys.map(key => <li><span>{key}</span>: {this.user[key]}</li>)}
        </ul>
      </div>;
  }
}
