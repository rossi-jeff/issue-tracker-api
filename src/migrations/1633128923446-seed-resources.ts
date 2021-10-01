import { MigrationInterface, QueryRunner } from 'typeorm';

const resources = [
  {
    Name: 'Vue.JS',
    Url: 'https://vuejs.org/',
    Details:
      'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.',
  },
  {
    Name: 'Vue-Router',
    Url: 'https://github.com/vuejs/vue-router',
    Details:
      'Vue Router is part of the Vue Ecosystem and is an MIT-licensed open source project with its ongoing development made possible entirely by the support of Sponsors.',
  },
  {
    Name: 'Vuex',
    Url: 'https://github.com/vuejs/vuex',
    Details:
      'Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.',
  },
  {
    Name: 'Bootstrap Vue',
    Url: 'https://bootstrap-vue.org/',
    Details:
      "With BootstrapVue you can build responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library — Bootstrap v4.",
  },
  {
    Name: 'Heroku',
    Url: 'https://heroku.com',
    Details:
      'Heroku is a container-based cloud Platform as a Service (PaaS). Developers use Heroku to deploy, manage, and scale modern apps. Our platform is elegant, flexible, and easy to use, offering developers the simplest path to getting their apps to market.',
  },
];

export class seedResources1633128923446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const resourceRepo = await manager.getRepository('resource');
    for (let data of resources) {
      await resourceRepo.save(data);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
