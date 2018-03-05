import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';


@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.scss'
})
export class AppProfile {

  @Prop() match: MatchResults;

  render() {
    if (this.match && this.match.params.name) {
      return <div>
          <p class="app-profile">
            Hello! My name is {this.match.params.name}. My name was passed
            in through a route param!
          </p>
          <stencil-route-link url="/">
            <button>Back Home</button>
          </stencil-route-link>
        </div>;
    }
  }
}
