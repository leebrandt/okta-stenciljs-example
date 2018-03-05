import { Component } from "@stencil/core";
import * as OktaAuth from '@okta/okta-auth-js';

@Component({
  tag: "app-auth",
  styleUrl: "app-auth.scss"
})
export class AppAuth {

  login(){
    let form = document.querySelector('form.app-auth');
    let inputs = form.querySelectorAll('input');
    let user = {username: inputs[0].value, password: inputs[1].value};

    let authClient = new OktaAuth({
      clientId: "0oacgzn2fb8qxCKka0h7",
      url: "https://dev-846291.oktapreview.com",
      issuer: "default"
    });

    authClient
      .signIn(user)
      .then(trx => {
        if (trx.status === "SUCCESS") {
          authClient.session.setCookieAndRedirect(trx.sessionToken); // Sets a cookie on redirect
        } else {
          throw `Unable to handle ${trx.status} status code`;
        }
      })
      .fail(function(err) {
        console.error(err);
      });
  }

  render() {
    return <form class="app-auth">
        <div class="form-item">
          <label>
            Username:
            <input type="text" name="username" autocomplete="username" />
          </label>
        </div>
        <div class="form-item">
          <label>
            Password:
            <input type="password" name="password" autocomplete="current-password" />
          </label>
        </div>
        <div class="form-actions">
          <button type="button" onClick={() => this.login()}>
            Login
          </button>
        </div>
      </form>;
  }
}
