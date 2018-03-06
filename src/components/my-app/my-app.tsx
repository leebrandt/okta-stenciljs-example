import { Component } from '@stencil/core';


@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  render() {
    return <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route url="/" component="app-home" exact={true} />
            <stencil-route url="/profile" component="app-profile" />
            <stencil-route url="/sessions" component="session-list" exact={true} />
            <stencil-route url="/login" component="app-auth" exact={true} />
          </stencil-router>
        </main>
      </div>;
  }
}
