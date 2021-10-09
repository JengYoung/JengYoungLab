<template>
  <li>
    <div
      :style="{ paddingLeft: `${14 * depth}px` }"
      :class="{
        active: $route.params.id === `${workspace.id}`,
      }"
      class="title"
      @click="onClick"
    >
      <span
        :class="{ active: showChildren }"
        class="material-icons"
        @click.stop="showChildren = !showChildren"
      >
        play_arrow
      </span>
      <span class="text">
        {{ workspace.title || '제목 없음' }}
      </span>
      <div class="actions">
        <span
          class="material-icons"
          @click.stop="createWorkspace"
        >
          add
        </span>
        <span
          class="material-icons"
          @click.stop="deleteWorkspace"
        >
          delete
        </span>
      </div>
    </div>
    <div
      v-if="!hasChildren && showChildren"
      class="no-children"
      :style="{ paddingLeft: `${14 * depth + 22}px` }"
    >
      하위 페이지가 없어요!
    </div>
    <ul v-if="hasChildren && showChildren">
      <SubDocument
        v-for="subDocs in workspace.documents"
        :key="subDocs.id"
        :workspace="subDocs"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    workspace: {
      type: Object,
      default: () => ({}),
    },
    depth: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      showChildren: false,
    };
  },
  computed: {
    hasChildren() {
      return this.workspace.documents?.length;
    },
  },
  created() {
    this.showChildren =
      this.$store.state.workspace.currentWorkspacePath.some(
        ({ id }) => id === this.workspace.id,
      );
  },
  methods: {
    async createWorkspace() {
      await this.$store.dispatch(
        'workspace/createWorkspace',
        {
          parentId: this.workspace.id,
        },
      );
      this.showChildren = true;
    },
    deleteWorkspace() {
      this.$store.dispatch('workspace/deleteWorkspace', {
        id: this.workspace.id,
      });
    },
    onClick() {
      this.$router.push({
        name: 'Workspace',
        params: {
          id: this.workspace.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  .title {
    display: flex;
    align-items: center;
    height: 1.875rem;
    padding: 0 0.875rem;
    color: rgba($color-font, 0.7);
    &:hover {
      cursor: pointer;
      background-color: $color-background--hover1;
      padding-right: 0.25rem;
      .actions {
        display: flex;
      }
    }
    &.active {
      .text {
        font-weight: 700;
        color: rgba($color-font, 0.8);
      }
    }
    &.active {
      .text {
        font-weight: 700;
        color: rgba($color-font, 0.8);
      }
    }
  }
  .material-icons {
    font-size: 18px;
    color: $color-icon;
    margin-right: 0.25rem;
    transition: all 100ms;
    cursor: pointer;
    &:hover {
      color: darken($color-background--hover2, 40%);
    }
    &.active {
      transform: rotate(90deg);
    }
  }
  .text {
    flex-grow: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .actions {
    display: none;
    align-items: center;
  }
  .no-children {
    color: rgba($color-font, 0.35);
    height: 1.875rem;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
