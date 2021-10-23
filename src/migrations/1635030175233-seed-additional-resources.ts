import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';

const resources = [
  {
    Name: 'React',
    Url: 'https://reactjs.org/',
    Details: 'A JavaScript library for building user interfaces',
    UUID: null,
  },
  {
    Name: 'Blueprint',
    Url: 'https://blueprintjs.com/docs/',
    Details:
      'Blueprint is a React-based UI toolkit for the web. It is optimized for building complex data-dense interfaces for desktop applications.',
    UUID: null,
  },
  {
    Name: 'Svelte Kit',
    Url: 'https://kit.svelte.dev/',
    Details:
      "SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing. Unlike single-page apps, SvelteKit doesn't compromise on SEO, progressive enhancement or the initial load experience — but unlike traditional server-rendered apps, navigation is instantaneous for that app-like feel.",
    UUID: null,
  },
  {
    Name: 'Daisy UI',
    Url: 'https://daisyui.com/',
    Details:
      'Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.',
    UUID: null,
  },
];

export class seedAdditionalResources1635030175233
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const resourceRepo = await manager.getRepository('resource');
    for (let data of resources) {
      data.UUID = v4();
      await resourceRepo.save(data);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
