<template>
  <header>
    <div class="titles">
      <template
        v-for="(workspace, idx) in $store.state.workspace
          .currentWorkspacePath"
        :key="workspace.id"
      >
        <div v-if="idx > 0" class="division">></div>
        <button
          class="title"
          @click="
            $router.push({
              name: 'Workspace',
              params: {
                id: workspace.id,
              },
            })
          "
        >
          {{ workspace.title || '제목 없음' }}
        </button>
      </template>
    </div>
    <nav class="actions">
      <button>공유</button>
      <button>업데이트</button>
      <button>즐겨찾기</button>
      <button>기타</button>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 2.8125rem;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  .titles {
    display: flex;
    align-items: center;
    flex-grow: 1;
    .division {
      margin: 0 0.125rem;
      color: rgba($color-font, 0.4);
    }
    .title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .actions {
    display: flex;
    flex-shrink: 0;
  }
}
button {
  color: $color-font;
  background: none;
  border: none;
  outline: none;
  font-size: 0.875rem;
  height: 1.75rem;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  &:hover {
    cursor: pointer;
    background-color: $color-background;
  }
}
</style>
