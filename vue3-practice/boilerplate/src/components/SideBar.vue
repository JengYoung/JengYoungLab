<template>
  <nav ref="nav" :style="{ width: `${navWidth}px` }">
    <div class="header">
      <div class="user-profile"></div>
      JengYoung's Notion
    </div>
    <ul>
      <SubDocument
        v-for="workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace"
      />
    </ul>
    <div class="actions">
      <div
        class="action"
        @click="
          $store.dispatch('workspace/createWorkspace')
        "
      >
        <span class="material-icons">add</span> 새로운
        페이지
      </div>
    </div>
    <div
      ref="resizeHandle"
      class="resize-handle"
      @dblclick="navWidth = 240"
    ></div>
  </nav>
</template>

<script>
import interact from 'interactjs';
import SubDocument from '@/components/SubDocument';
export default {
  components: {
    SubDocument,
  },
  data() {
    return {
      navWidth: 240,
    };
  },
  computed: {
    workspaces() {
      console.log(this.$store.state.workspace.workspaces);
      return this.$store.state.workspace.workspaces;
    },
  },
  created() {
    this.workspacesInit();
  },
  mounted() {
    this.navInit();
  },
  methods: {
    async workspacesInit() {
      await this.$store.dispatch(
        'workspace/readWorkspaces',
      );
    },
    navInit() {
      interact(this.$refs.nav)
        .resizable({
          edges: {
            right: this.$refs.resizeHandle,
          },
        })
        .on('resizemove', event => {
          this.navWidth = event.rect.width;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  max-width: 31.25rem;
  min-width: 10rem;
  display: flex;
  position: relative;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  background-color: $color-background;
  .header {
    display: flex;
    padding: 0.875rem;
    font-weight: 700;
    .user-profile {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 0.25rem;
      margin-right: 0.625rem;
      background-image: url('https://avatars.githubusercontent.com/u/78713176?v=4');
      background-size: cover;
    }
  }
  ul {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .actions {
    border-top: 1px solid $color-border;
    .action {
      height: 2.8125rem;
      display: flex;
      align-items: center;
      padding: 0 0.875rem;
      color: $color-icon;
      cursor: pointer;
      &:hover {
        background-color: $color-background--hover1;
      }
      .material-icons {
        margin-right: 4px;
        color: $color-icon;
      }
    }
  }
  .resize-handle {
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: col-resize;
    transition: 0.4s;
    &:hover {
      background-color: $color-border;
    }
  }
}
</style>
