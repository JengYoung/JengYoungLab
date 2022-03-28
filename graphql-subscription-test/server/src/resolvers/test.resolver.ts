import { Query, Resolver } from 'type-graphql';

@Resolver()
export class TestResolver {
  @Query(() => String)
  async test(): Promise<string> {
    return 'World!';
  }
}
