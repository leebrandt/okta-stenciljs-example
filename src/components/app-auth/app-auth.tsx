import { Component, Prop, State, Element, Listen } from "@stencil/core";
import { RouterHistory } from "@stencil/router";
declare const OktaAuth:any;

@Component({
  tag: "app-auth",
  styleUrl: "app-auth.scss"
})
export class AppAuth {
  @Prop() history: RouterHistory;
  @State() authClient: any;
  @Element() host: HTMLElement;

  constructor() {
    this.authClient = new OktaAuth({
      clientId: "0oacgzn2fb8qxCKka0h7",
      url: "https://dev-846291.oktapreview.com",
      issuer: "default"
    });
  }

  componentWillLoad() {
    let idToken = this.authClient.tokenManager.get("okta_id_token");
    if(idToken){
      this.history.push("/profile", {});
    }
  }

  @Listen("keydown.enter")
  handleEnter() {
    this.login();
  }

  login() {
    let inputs = this.host.querySelectorAll("input");
    let user = { username: inputs[0].value, password: inputs[1].value };

    this.authClient
      .signIn(user)
      .then(trx => {
        if (trx.status === "SUCCESS") {
          this.authClient.token
            .getWithoutPrompt({
              responseType: "id_token",
              scopes: ["openid", "profile", "email"],
              sessionToken: trx.sessionToken,
              redirectUri: "http://localhost:3333"
            })
            .then(token => {
              console.log(token);
              localStorage.setItem('okta_id_token', JSON.stringify(token));
              //this.authClient.tokenManager.add('okta_id_token', token);
            });

          this.history.push("/profile", {});
        } else {
          throw `Unable to handle ${trx.status} status code`;
        }
      })
      .fail(function(err) {
        console.error(err);
      });
  }

  render() {
    return (
      <form class="app-auth">
        <div class="form-item">
          <label>
            Username:
            <input type="text" name="username" autocomplete="username" />
          </label>
        </div>
        <div class="form-item">
          <label>
            Password:
            <input
              type="password"
              name="password"
              autocomplete="current-password"
            />
          </label>
        </div>
        <div class="form-actions">
          <button type="button" onClick={() => this.login()}>
            Login
          </button>
        </div>
      </form>
    );
  }
}
