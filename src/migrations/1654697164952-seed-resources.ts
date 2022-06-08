import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';

const resources = [
  {
    Name: 'Vue.JS',
    Url: 'https://vuejs.org/',
    Details:
      'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.',
    UUID: v4(),
  },
  {
    Name: 'Vue-Router',
    Url: 'https://github.com/vuejs/vue-router',
    Details:
      'Vue Router is part of the Vue Ecosystem and is an MIT-licensed open source project with its ongoing development made possible entirely by the support of Sponsors.',
    UUID: v4(),
  },
  {
    Name: 'Vuex',
    Url: 'https://github.com/vuejs/vuex',
    Details:
      'Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.',
    UUID: v4(),
  },
  {
    Name: 'Bootstrap Vue',
    Url: 'https://bootstrap-vue.org/',
    Details:
      "With BootstrapVue you can build responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library — Bootstrap v4.",
    UUID: v4(),
  },
  {
    Name: 'Heroku',
    Url: 'https://heroku.com',
    Details:
      'Heroku is a container-based cloud Platform as a Service (PaaS). Developers use Heroku to deploy, manage, and scale modern apps. Our platform is elegant, flexible, and easy to use, offering developers the simplest path to getting their apps to market.',
    UUID: v4(),
  },
  {
    Name: 'React',
    Url: 'https://reactjs.org/',
    Details: 'A JavaScript library for building user interfaces',
    UUID: v4(),
  },
  {
    Name: 'Blueprint',
    Url: 'https://blueprintjs.com/docs/',
    Details:
      'Blueprint is a React-based UI toolkit for the web. It is optimized for building complex data-dense interfaces for desktop applications.',
    UUID: v4(),
  },
  {
    Name: 'Svelte Kit',
    Url: 'https://kit.svelte.dev/',
    Details:
      "SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing. Unlike single-page apps, SvelteKit doesn't compromise on SEO, progressive enhancement or the initial load experience — but unlike traditional server-rendered apps, navigation is instantaneous for that app-like feel.",
    UUID: v4(),
  },
  {
    Name: 'Svelte Material UI',
    Url: 'https://sveltematerialui.com/',
    Details:
      'SMUI provides strictly typed Svelte components and actions for a wide variety of interface elements. SMUI also provides helper utilities for building custom and advanced UI components.',
    UUID: v4(),
  },
];

export class seedResources1654697164952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const resourceRepo = await manager.getRepository('resource');
    for (const data of resources) {
      data.UUID = v4();
      await resourceRepo.save(data);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
