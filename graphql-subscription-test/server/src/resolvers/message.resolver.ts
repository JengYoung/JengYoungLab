import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  PubSub,
  Root,
  Subscription,
  PubSubEngine,
  Resolver,
} from 'type-graphql';
// import { PubSubEngine } from 'graphql-subscriptions';

@ObjectType()
class MessagePayload {
  @Field()
  message: string;
}

@Resolver()
export class MessageResolver {
  @Mutation(() => String)
  async sendMessage(
    @Arg('message') message: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<string> {
    await pubSub.publish('MESSAGE_NOTIFICATION', { message });
    /* eslint-disable-next-line no-console */
    console.log('publish');
    return message;
  }

  @Subscription(() => MessagePayload, {
    topics: 'MESSAGE_NOTIFICATION',
  })
  async receiveMessage(@Root() root: MessagePayload): Promise<MessagePayload> {
    /* eslint-disable-next-line no-console */
    console.log('message receive: ', root);
    return root;
  }
}
